using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace EventStore.Models.BindingTargets
{
    public class ChurchData
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        public string GeoData { get; set; }
        public Church Church => new Church
        {
            Name = Name,
            City = City,
            Street = Street,
            GeoData = GeoData
        };
    }
}
