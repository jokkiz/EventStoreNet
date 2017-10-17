using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventStore.Models;
using System.Collections.Generic;
using System.Linq;

namespace EventStore.Controllers {
    [Route("/api/orders")]
    public class OrderValuesController: Controller {
        private DataContext context;

        public OrderValuesController(DataContext ctx){
            context = ctx;
        }

        [HttpGet]
        public IEnumerable<Order> GetOrders() {
            return context.Orders.Include(o => o.Events).Include(o => o.Payment);
        }

        [HttpPost("{id}")]
        public void MarkShipped(long id) {
            Order order = context.Orders.Find(id);
            if (order != null) {
                order.Shipped = true;
                context.SaveChanges();
            }
        }
        [HttpPost]
        public IActionResult CreateOrder([FromBody] Order order) {
            if (ModelState.IsValid) {
                order.OrderId = 0;
                order.Shipped = false;
                order.Payment.Total = GetPrice(order.Events);

                ProcessPayment(order.Payment);

                if (order.Payment.AuthCode != null) {
                    context.Add(order);
                    context.SaveChanges();
                    return Ok(new {
                        orderId = order.OrderId,
                        authCode = order.Payment.AuthCode,
                        amount = order.Payment.Total
                    });
                } else {
                    return BadRequest("Оплата не прошла");
                }

            }
            return BadRequest(ModelState);
        }

        private decimal GetPrice(IEnumerable<CartLine> lines){
            IEnumerable<long> ids = lines.Select(l => l.EventId);
            return context.Events
                    .Where(e => ids.Contains(e.EventId))
                    .Select(e => lines
                        .First(l => l.EventId == e.EventId).Quantity * e.Price)
                    .Sum();
        }

        private void ProcessPayment(Payment payment) {
            // TODO: сделать здесь процесс оплаты
            payment.AuthCode = "12345";
        }
    }
}