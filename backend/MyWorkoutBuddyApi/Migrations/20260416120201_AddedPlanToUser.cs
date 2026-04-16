using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWorkoutBuddyApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedPlanToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PlanId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkoutPlanId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_WorkoutPlanId",
                table: "Users",
                column: "WorkoutPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Plans_WorkoutPlanId",
                table: "Users",
                column: "WorkoutPlanId",
                principalTable: "Plans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Plans_WorkoutPlanId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_WorkoutPlanId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "WorkoutPlanId",
                table: "Users");
        }
    }
}
