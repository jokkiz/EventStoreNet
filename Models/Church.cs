using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventStore.Models
{
    public class Church
    {
        public long ChurchId { get; set; }
        /// <summary>
        /// Наименование церкви
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Город
        /// </summary>
        public string City { get; set; }
        public string Street { get; set; }
        public string GeoData { get; set; }
        public IEnumerable<Event> Events { get; set; }
    }
}
