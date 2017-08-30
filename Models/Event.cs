using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventStore.Models
{
    public class Event
    {
        /// <summary>
        /// Идентификатор мероприятия
        /// </summary>
        public long EventId { get; set; }
        /// <summary>
        /// Наименование мероприятия
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Категория мероприятия
        /// </summary>
        public string Category { get; set; }
        /// <summary>
        /// Подробное описание мероприятия
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Цена мероприятия
        /// </summary>
        public decimal Price { get; set; }
        /// <summary>
        /// Рейтинг мероприятия
        /// </summary>
        public List<Rating> Ratings { get; set; }
        // TODO: добавить свойства автора, лист покупателя
        /// <summary>
        /// Церковь, которая проводит мероприятие
        /// </summary>
        public Church Church { get; set; }

    }
}
