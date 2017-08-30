using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using EventStore.Models;

namespace EventStore.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20170830185453_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EventStore.Models.Church", b =>
                {
                    b.Property<long>("ChurchId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("City");

                    b.Property<string>("GeoData");

                    b.Property<string>("Name");

                    b.Property<string>("Street");

                    b.HasKey("ChurchId");

                    b.ToTable("Churchies");
                });

            modelBuilder.Entity("EventStore.Models.Event", b =>
                {
                    b.Property<long>("EventId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<long?>("ChurchId");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.HasKey("EventId");

                    b.HasIndex("ChurchId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EventStore.Models.Rating", b =>
                {
                    b.Property<long>("RatingId")
                        .ValueGeneratedOnAdd();

                    b.Property<long?>("EventId");

                    b.Property<int>("Stars");

                    b.HasKey("RatingId");

                    b.HasIndex("EventId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("EventStore.Models.Event", b =>
                {
                    b.HasOne("EventStore.Models.Church", "Church")
                        .WithMany("Events")
                        .HasForeignKey("ChurchId");
                });

            modelBuilder.Entity("EventStore.Models.Rating", b =>
                {
                    b.HasOne("EventStore.Models.Event", "Event")
                        .WithMany("Ratings")
                        .HasForeignKey("EventId");
                });
        }
    }
}
