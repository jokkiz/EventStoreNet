using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
namespace EventStore.Models
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> opts) : base(opts) { }

        public DbSet<Event> Events { get; set; }
        public DbSet<Church> Churchies { get; set; }
        public DbSet<Rating> Ratings { get; set; }

    }
}
