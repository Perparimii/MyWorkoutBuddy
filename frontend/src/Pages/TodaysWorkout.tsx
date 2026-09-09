import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemContent, ItemTitle, ItemDescription, ItemFooter, ItemActions } from "@/components/ui/item";
import { useState, useEffect } from "react";

function TodaysWorkout(){

    //Interfaces:
    
    interface Exercise {
    name: string;
    warmupSets: number;
    workingSets: number;
    minReps: number;
    maxReps: number;
    }

    interface TodaysWorkout{
        id: number,
        workoutName: string;
        dayOfWeek: number,
        exercises: Exercise[]
    }   


    const[todaysWorkout, setTodaysWorkout] = useState<TodaysWorkout | null>(null);

    const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];


    useEffect(() => {
    const fetchTodaysWorkout = async () => {
        try {
            const response = await fetch(`https://localhost:7027/api/Workout/todaysworkout`,{
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
                         <h1 className="text-3xl font-bold border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">{days[todaysWorkout.dayOfWeek]}</h1>

                        <h1 className="text-2xl font-bold border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">{todaysWorkout.workoutName}</h1>
                    </div>

                    <div className="mt-6 space-y-3">
                        {todaysWorkout.exercises.map((Exercise) => (
                             <Item key={todaysWorkout.id} className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                                <ItemContent>
                                <ItemTitle>{Exercise.name}</ItemTitle>
                                    <ItemDescription>
                                        {Exercise.warmupSets} warmup sets ·{" "}
                                        {Exercise.workingSets} working sets ·{" "}
                                        {Exercise.minReps}-{Exercise.maxReps} reps
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