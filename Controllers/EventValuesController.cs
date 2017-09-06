using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventStore.Models;

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
            return context.Events.Find(id);
        }


    }
}
