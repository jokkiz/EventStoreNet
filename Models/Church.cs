using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventStore.Models
{
    /// <summary>
    /// Церковь
    /// </summary>
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
        /// <summary>
        /// Адрес
        /// </summary>
        public string Street { get; set; }
        /// <summary>
        /// Геоданные
        /// </summary>
        public string GeoData { get; set; }
        /// <summary>
        /// Церковные события
        /// </summary>
        public IEnumerable<Event> Events { get; set; }
    }
}
