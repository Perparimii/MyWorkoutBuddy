import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";

function TodaysWorkout(){

    //Interfaces:
    
    interface Exercise {
    name: string;
    WarmupSets: number;
    WorkingSets: number;
    MinReps: number;
    MaxReps: number;
    }

    interface TodaysWorkout{
        WorkoutName: string;
        DayOfWeek: number,
        Exercises: Exercise[]
    }   


return(
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>
    </main>
);

}

export default TodaysWorkout;