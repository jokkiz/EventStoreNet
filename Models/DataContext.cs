using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EventStore.Models
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> opts) : base(opts) { }

        public DbSet<Event> Events { get; set; }
        public DbSet<Church> Churchies { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().HasMany<Rating>(e => e.Ratings)
                .WithOne(r => r.Event).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Event>().HasOne<Church>(e => e.Church)
                .WithMany(r => r.Events).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
