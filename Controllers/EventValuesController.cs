﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventStore.Models;
using Microsoft.EntityFrameworkCore;
using EventStore.Models.BindingTargets;
using Microsoft.AspNetCore.JsonPatch;

namespace EventStore.Controllers
{
    [Route("api/events")]
    public class EventValuesController: Controller
    {
        private DataContext context;

        public EventValuesController(DataContext ctx)
        {
            context = ctx;
        }

        [HttpGet("{id}")]
        public Event GetEvent(long id)
        {
            Event result = context.Events
                .Include(e => e.Church).ThenInclude(e=>e.Events)
                .Include(e => e.Ratings)
                .First(e => e.EventId == id);

            if (result != null)
            {
                if (result.Church != null)
                {
                    result.Church.Events = result.Church.Events.Select(e=> 
                    new Event
                    {
                        EventId = e.EventId,
                        Name = e.Name,
                        Description = e.Description,
                        Category = e.Category,
                        Price = e.Price
                    });
                }

                if (result.Ratings != null)
                {
                    foreach(var rating in result.Ratings)
                    {
                        rating.Event = null;
                    }
                }
            }
            return result;
        }

        [HttpGet]
        public IActionResult GetEvents(string category, string search, int? year, bool related = false, bool metadata = false)
        {
            IQueryable<Event> query = context.Events;

            if (!string.IsNullOrWhiteSpace(category))
            {
                string categoryLow = category.ToLower();
                query = query.Where(e => e.Category.ToLower().Contains(categoryLow));
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                string searchLow = search.ToLower();
                query = query.Where(e => e.Name.ToLower().Contains(searchLow) || e.Description.ToLower().Contains(searchLow));
            }

            if (year != null && year.Value > 0)
            {
                int yearInt = year.Value;
                query = query.Where(e => e.DateEnd.Year == yearInt || e.DateBegin.Year == yearInt);
            }

            if (related)
            {
                query = query.Include(e => e.Church).Include(e => e.Ratings);
                List<Event> data = query.ToList();
                data.ForEach(e =>
                {
                    if (e.Church != null)
                    {
                        e.Church.Events = null;
                    }

                    if (e.Ratings != null)
                    {
                        e.Ratings.ForEach(r => r.Event = null);
                    }
                });

                return metadata ? CreateMetadata(data) : Ok(data);
            }
            else
            {
                return metadata ? CreateMetadata(query) : Ok(query);
            }
        }

        private IActionResult CreateMetadata(IEnumerable<Event> events)
        {
            return Ok(new { data = events, categories = context.Events.Select(e => e.Category).Distinct().OrderBy(c => c) });
        }

        [HttpPost]
        public IActionResult CreateEvent([FromBody] EventData eventData)
        {
            if (ModelState.IsValid)
            {
                Event newEvent = eventData.Event;
                if (newEvent.Church != null && newEvent.Church.ChurchId != 0)
                {
                    context.Attach(newEvent.Church);
                }
                context.Add(newEvent);
                context.SaveChanges();
                return Ok(newEvent.EventId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public IActionResult ReplaceEvent(long id, [FromBody] EventData edata)
        {
            if (ModelState.IsValid)
            {
                Event e = edata.Event;
                e.EventId = id;
                if (e.Church != null && e.Church.ChurchId != 0)
                {
                    context.Attach(e.Church);
                }
                context.Update(e);
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }            
        }
        
        [HttpPatch("{id}")]
        public IActionResult UpdateEvent(long id, [FromBody]JsonPatchDocument<EventData> patch)
        {
            Event evnt = context.Events
                .Include(c => c.Church)
                .FirstOrDefault(e => e.EventId == id);
            EventData edata = new EventData { Event = evnt };
            patch.ApplyTo(edata, ModelState);

            if (ModelState.IsValid && TryValidateModel(patch))
            {
                if (evnt.Church != null && evnt.Church.ChurchId != 0)
                {
                    context.Attach(evnt.Church);
                }
                context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest(ModelState);
            }           
        }

        [HttpDelete("{id}")]
        public void DeleteEvent(long id)
        {
            context.Events.Remove(new Event { EventId = id });
            context.SaveChanges();
        }
    }
}
