import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemFooter, ItemActions } from "@/components/ui/item";
import { useState, useEffect } from "react";

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
        id: number,
        WorkoutName: string;
        DayOfWeek: number,
        Exercises: Exercise[]
    }   


    const[todaysWorkout, setTodaysWorkout] = useState<TodaysWorkout[]>([]);


    useEffect(() =>{
        const getTodaysWorkout = async ()=> {

        const response = await fetch("https://localhost:7027/api/Workouts/todaysworkout");

        const data = await response.json();

        console.log(data);

        setTodaysWorkout(data);

    };
    getTodaysWorkout();
    }, []);


return (
    <main className="min-h-screen grid grid-cols-[250px_1fr]">

        {/* Sidebar */}
        <section>
            <DashboardSidebar />
        </section>

        {/* Today's Workout */}
        <section className="p-8">
            {todaysWorkout.map((workout) => (
                <div key={workout.id} className="w-full">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">
                            {workout.DayOfWeek}
                        </h2>

                        <h1 className="text-4xl font-bold">
                            {workout.WorkoutName}
                        </h1>
                    </div>

                    {/* Exercises */}
                    <h2 className="text-xl font-semibold mt-10 mb-4">
                        Exercises
                    </h2>

                    {/* Exercise cards will go here */}

                </div>
            ))}
        </section>

    </main>
);
}

export default TodaysWorkout;