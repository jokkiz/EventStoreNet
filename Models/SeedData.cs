using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EventStore.Models;
using Microsoft.EntityFrameworkCore;

namespace EventStore.Models
{
    public class SeedData
    {
        public static void SeedDatabase(DataContext context)
        {
            context.Database.Migrate();
            if (context.Events.Count() == 0)
            {
                var c1 = new Church { Name = "Поклонная Гора", City = "Санкт-Петербург", Street = "ул. Большая Озерная, д. 27" };
                var c2 = new Church { Name = "Нарвская", City = "Санкт-Петербург", Street = "Нарвский пр., 13Б" };

                context.Events.AddRange(
                    new Event {
                        Name = "Open Air 2015",
                        Category = "Open Air",
                        DateBegin = new DateTime(2015, 7, 2, 14, 0, 0),
                        DateEnd = new DateTime(2015, 7, 5, 14, 0, 0),
                        Price = 1500m,
                        Ratings = new List<Rating>{
                            new Rating {Stars = 4},
                            new Rating {Stars = 5}
                        }
                    },
                    new Event
                    {
                        Name = "Open Air 2016",
                        Category = "Open Air",
                        Price = 1750m,
                        DateBegin = new DateTime(2016, 6, 30, 14, 0, 0),
                        DateEnd = new DateTime(2016, 7, 3, 14, 0, 0),
                        Ratings = new List<Rating>{
                            new Rating {Stars = 4},
                            new Rating {Stars = 4},
                            new Rating {Stars = 5}
                        }
                    },
                    new Event
                    {
                        Name = "Open Air 2017",
                        Category = "Open Air",
                        DateBegin = new DateTime(2017, 6, 29, 14, 0, 0),
                        DateEnd = new DateTime(2017, 7, 2, 14, 0, 0),
                        Price = 2500m,
                        Ratings = new List<Rating>{
                            new Rating {Stars = 5},
                            new Rating {Stars = 5},
                            new Rating {Stars = 4}
                        }
                    },
                    new Event
                    {
                        Name = "Ночное бдение",
                        Category = "Бдение",
                        Price = 100m,
                        DateBegin = new DateTime(2017, 9, 2, 14, 0, 0),
                        DateEnd = new DateTime(2017, 9, 3, 14, 0, 0),
                        Ratings = new List<Rating>{
                            new Rating {Stars = 5},
                            new Rating {Stars = 5},
                            new Rating {Stars = 4}
                        }
                        , Church = c2
                    },
                    new Event
                    {
                        Name = "Велопробег",
                        Category = "Спорт",
                        Price = 4000m,
                        DateBegin = new DateTime(2017, 8, 2, 14, 0, 0),
                        DateEnd = new DateTime(2017, 8, 3, 14, 0, 0),
                        Ratings = new List<Rating>{
                            new Rating {Stars = 3},
                            new Rating {Stars = 5},
                            new Rating {Stars = 4}
                        },
                        Church = c1
                    }
                );
                context.SaveChanges();
            }
        }
    }
}
