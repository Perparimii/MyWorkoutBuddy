using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MyWorkoutBuddyApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedWorkoutToDbContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workout_Plans_WorkoutPlanId",
                table: "Workout");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Workout",
                table: "Workout");

            migrationBuilder.RenameTable(
                name: "Workout",
                newName: "Workouts");

            migrationBuilder.RenameIndex(
                name: "IX_Workout_WorkoutPlanId",
                table: "Workouts",
                newName: "IX_Workouts_WorkoutPlanId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workouts",
                table: "Workouts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Plans_WorkoutPlanId",
                table: "Workouts",
                column: "WorkoutPlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Plans_WorkoutPlanId",
                table: "Workouts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Workouts",
                table: "Workouts");

            migrationBuilder.RenameTable(
                name: "Workouts",
                newName: "Workout");

            migrationBuilder.RenameIndex(
                name: "IX_Workouts_WorkoutPlanId",
                table: "Workout",
                newName: "IX_Workout_WorkoutPlanId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Workout",
                table: "Workout",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Workout_Plans_WorkoutPlanId",
                table: "Workout",
                column: "WorkoutPlanId",
                principalTable: "Plans",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
