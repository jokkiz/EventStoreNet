using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EventStore.Models
{
    public class Rating
    {
        /// <summary>
        /// Идентификатор рейтинга
        /// </summary>
        public long RatingId { get; set; }
        /// <summary>
        /// Рейтинг в звездах
        /// </summary>
        public int Stars { get; set; }
        /// <summary>
        /// Событие
        /// </summary>
        public Event Event { get; set; }
    }
}
