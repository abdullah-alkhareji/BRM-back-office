using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BRM_back_office_server.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    CustomerNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    CustomerName = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", maxLength: 1, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.CustomerNumber);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Customer_CustomerNumber",
                table: "Customer",
                column: "CustomerNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
