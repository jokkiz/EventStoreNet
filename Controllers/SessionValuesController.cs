using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using EventStore.Models;
using EventStore.Models.BindingTargets;

namespace EventStore.Controllers
{
    [Route("/api/sesion")]
    public class SessionValuesController : Controller
    {
        [HttpGet("cart")]
        public IActionResult GetCart() {
            return Ok(HttpContext.Session.GetString("cart"));
        }

        [HttpPost("cart")]
        public void SetCart([FromBody] EventSelection[] events) {
            var jsonData = JsonConvert.SerializeObject(events);
            HttpContext.Session.SetString("cart", jsonData);
        }

        [HttpGet("checkout")]
        public IActionResult GetCheckout() {
            return Ok(HttpContext.Session.GetString("checkout"));
        }
        [HttpPost("checkout")]
        public void StoreCheckout([FromBody] CheckoutState data) {
            HttpContext.Session.SetString("checkout", JsonConvert.SerializeObject(data));
        }
    }
}