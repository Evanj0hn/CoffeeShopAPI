﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CoffeeShopAPI.Migrations
{
    /// <inheritdoc />
    public partial class LinkOrdersToUsers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");
        }
    }
}
