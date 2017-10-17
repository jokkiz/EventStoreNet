using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EventStore.Migrations
{
    public partial class Order : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Churchies_ChurchId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Events_EventId",
                table: "Ratings");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Churchies_ChurchId",
                table: "Events",
                column: "ChurchId",
                principalTable: "Churchies",
                principalColumn: "ChurchId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Events_EventId",
                table: "Ratings",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Churchies_ChurchId",
                table: "Events");

            migrationBuilder.DropForeignKey(
                name: "FK_Ratings_Events_EventId",
                table: "Ratings");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Churchies_ChurchId",
                table: "Events",
                column: "ChurchId",
                principalTable: "Churchies",
                principalColumn: "ChurchId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Ratings_Events_EventId",
                table: "Ratings",
                column: "EventId",
                principalTable: "Events",
                principalColumn: "EventId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
