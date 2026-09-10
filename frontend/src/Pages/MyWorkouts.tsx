import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { useState, useEffect } from "react";

function MyWorkouts(){

interface Workout{
    Name: string,
    DayOfWeek: number,
    ExerciseNumber: number,
    PlanId: number
}

const[workouts, setWorkouts] = useState<Workout[]>([]);

useEffect(() => {
    const getWorkouts = async () => {
        const response = await fetch("https://localhost:7027/api/Workout");

        const data = await response.json();

        setWorkouts(data);
    }

    getWorkouts();

} ,[])


return(
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-4xl mx-auto px-6 space-y-4">

            </div>
        </section>

    </main>
);

}

export default MyWorkouts;