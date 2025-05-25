using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server_practice.Migrations
{
    /// <inheritdoc />
    public partial class AddIsGirlColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isGirl",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isGirl",
                table: "Users");
        }
    }
}
