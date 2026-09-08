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


    const[todaysWorkout, setTodaysWorkout] = useState<TodaysWorkout | null>(null);


    useEffect(() => {
    const fetchTodaysWorkout = async () => {
        try {
            const response = await fetch(`https://localhost:7027/api/Workouts/todaysworkout`,{
                            method: "GET",
                            headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`
        }});

            if (response.status === 404) {
                setTodaysWorkout(null);
                return;
            }

            if (!response.ok) {
                throw new Error("Failed to fetch today's workout");
            }

            const data = await response.json();
            setTodaysWorkout(data);

            console.log(data);

        } catch (error) {
            console.error(error);
        }
    };

    fetchTodaysWorkout();
}, []);


return (
    <main className="min-h-screen grid grid-cols-[250px_1fr]">

        <section>
            <DashboardSidebar />
        </section>
       
        <section className="p-8">
            <div className="max-w-6xl mx-auto">


            {todaysWorkout === null ? (
                <div>
                    <h1 className="text-4xl font-bold">
                        Rest Day 😴
                    </h1>

                    <p className="text-muted-foreground mt-2">
                        No workout scheduled for today. Take some time to
                        recover and come back stronger tomorrow!
                    </p>
                </div>
            ) : (
            
                <div className="w-full">

                    
                    <div className="flex justify-between items-center">
                         <h2 className="text-lg font-medium">{todaysWorkout.DayOfWeek}</h2>

                        <h1 className="text-5xl font-bold">{todaysWorkout.WorkoutName}</h1>
                    </div>

                    <div className="mt-6 space-y-3">
                        {todaysWorkout.Exercises.map((exercise) => (
                             <Item>
                                <ItemContent>
                                <ItemTitle>{exercise.name}</ItemTitle>
                                    <ItemDescription>
                                        {exercise.WarmupSets} warmup sets ·{" "}
                                        {exercise.WorkingSets} working sets ·{" "}
                                        {exercise.MinReps}-{exercise.MaxReps} reps
                                    </ItemDescription>
                                 </ItemContent>
                             </Item>
                        ))}
                    </div>

                </div>
            
        )}

            </div>
        </section>

    </main>
);
}

export default TodaysWorkout;