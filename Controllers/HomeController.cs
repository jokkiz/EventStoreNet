using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using EventStore.Models;

namespace EventStore.Controllers
{
    public class HomeController : Controller
    {
        private DataContext context;

        public HomeController(DataContext ctx)
        {
            context = ctx;
        }
        public IActionResult Index()
        {
            ViewBag.Messages = "Event Store App";
            return View();
        }        
    }
}
