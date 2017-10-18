using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using EventStore.Models;

namespace EventStore.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20171018191331_Payment")]
    partial class Payment
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("EventStore.Models.CartLine", b =>
                {
                    b.Property<long>("CartLineId")
                        .ValueGeneratedOnAdd();

                    b.Property<long>("EventId");

                    b.Property<long?>("OrderId");

                    b.Property<int>("Quantity");

                    b.HasKey("CartLineId");

                    b.HasIndex("OrderId");

                    b.ToTable("CartLine");
                });

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

                    b.Property<DateTime>("DateBegin");

                    b.Property<DateTime>("DateEnd");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<decimal>("Price");

                    b.HasKey("EventId");

                    b.HasIndex("ChurchId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("EventStore.Models.Order", b =>
                {
                    b.Property<long>("OrderId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<long>("PaymentId");

                    b.Property<bool>("Shipped");

                    b.HasKey("OrderId");

                    b.HasIndex("PaymentId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("EventStore.Models.Payment", b =>
                {
                    b.Property<long>("PaymentId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("AuthCode");

                    b.Property<string>("CardExpiry")
                        .IsRequired();

                    b.Property<string>("CardNumber")
                        .IsRequired();

                    b.Property<int>("CardSecurityCode");

                    b.Property<decimal>("Total");

                    b.HasKey("PaymentId");

                    b.ToTable("Payment");
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

            modelBuilder.Entity("EventStore.Models.CartLine", b =>
                {
                    b.HasOne("EventStore.Models.Order")
                        .WithMany("Events")
                        .HasForeignKey("OrderId");
                });

            modelBuilder.Entity("EventStore.Models.Event", b =>
                {
                    b.HasOne("EventStore.Models.Church", "Church")
                        .WithMany("Events")
                        .HasForeignKey("ChurchId")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("EventStore.Models.Order", b =>
                {
                    b.HasOne("EventStore.Models.Payment", "Payment")
                        .WithMany()
                        .HasForeignKey("PaymentId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("EventStore.Models.Rating", b =>
                {
                    b.HasOne("EventStore.Models.Event", "Event")
                        .WithMany("Ratings")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
