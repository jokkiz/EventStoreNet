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
        public string Name { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public string Description { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Цена участия в мероприятии должна быть больше 1")]
        public decimal Price { get; set; }
        public DateTime DateBegin { get; set; }
        public DateTime DateEnd { get; set; }
        public long Church { get; set; }
        public Event Event => new Event
        {
            Name = Name,
            Category = Category,
            Description = Description,
            Price = Price,
            Church = Church == 0 ? null : new Church { ChurchId = Church },
            DateBegin = DateBegin,
            DateEnd = DateEnd
        };
    }
}
