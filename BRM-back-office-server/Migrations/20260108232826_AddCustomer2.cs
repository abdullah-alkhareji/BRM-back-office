using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BRM_back_office_server.Migrations
{
    /// <inheritdoc />
    public partial class AddCustomer2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Customer",
                table: "Customer");

            migrationBuilder.RenameTable(
                name: "Customer",
                newName: "Customers");

            migrationBuilder.RenameIndex(
                name: "IX_Customer_CustomerNumber",
                table: "Customers",
                newName: "IX_Customers_CustomerNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Customers",
                table: "Customers",
                column: "CustomerNumber");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Customers",
                table: "Customers");

            migrationBuilder.RenameTable(
                name: "Customers",
                newName: "Customer");

            migrationBuilder.RenameIndex(
                name: "IX_Customers_CustomerNumber",
                table: "Customer",
                newName: "IX_Customer_CustomerNumber");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Customer",
                table: "Customer",
                column: "CustomerNumber");
        }
    }
}
