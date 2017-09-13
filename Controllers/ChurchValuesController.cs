using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventStore.Models;
using EventStore.Models.BindingTargets;

namespace EventStore.Controllers
{
    [Route("api/churchies")]
    public class ChurchValuesController : Controller
    {
        private DataContext context;
        public ChurchValuesController(DataContext ctx)
        {
            context = ctx;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<Church> GetChurchies()
        {
            return context.Churchies;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public IActionResult CreateChurch([FromBody]ChurchData churchParam)
        {
            if (ModelState.IsValid)
            {
                Church newChurch = churchParam.Church;
                context.Add(newChurch);
                context.SaveChanges();
                return Ok(newChurch.ChurchId);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
