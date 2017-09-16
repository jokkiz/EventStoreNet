using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace EventStore.Models.BindingTargets
{
    public class EventData
    {
        [Required]
        public string Name { get => Event.Name; set => Event.Name = value; }
        [Required]
        public string Category { get => Event.Category; set => Event.Category = value; }
        [Required]
        public string Description { get => Event.Description; set => Event.Description = value; }
        [Range(1, int.MaxValue, ErrorMessage = "Цена участия в мероприятии должна быть больше 1")]
        public decimal Price { get => Event.Price; set => Event.Price = value; }
        public DateTime DateBegin { get => Event.DateBegin; set => Event.DateBegin = value; }
        public DateTime DateEnd { get => Event.DateEnd; set => Event.DateEnd = value; }
        public long? Church {
            get => Event.Church?.ChurchId ?? null;
            set {
                if (!value.HasValue)
                {
                    Event.Church = null;
                } else
                {
                    if (Event.Church == null)
                    {
                        Event.Church = new Church();
                    }
                    Event.Church.ChurchId = value.Value;
                }
            }
        }
        public Event Event { get; set; } = new Event();
    }
}
