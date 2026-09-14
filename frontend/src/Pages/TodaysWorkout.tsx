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
       
        <section className="min-h-screen bg-background px-8 py-10">
            <div className="mx-auto w-full max-w-6xl">


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

                    
                    <div className="flex items-center justify-between w-full max-w-4xl mx-auto mb-10">
                         <div>
                             <p className="text-sm text-muted-foreground mb-2">{days[todaysWorkout.dayOfWeek]}</p>

                             <h1 className="text-4xl font-bold tracking-tight">{todaysWorkout.workoutName}</h1>
                        </div>

                    <div className="rounded-lg border border-border bg-card px-4 py-2">
                        <span className="text-sm text-muted-foreground">Today's Workout</span>
                     </div>
                </div>

                    <div className="flex flex-col items-center justify-center w-full w-full max-w-4xl mx-auto px-6 space-y-4">
                        <h2 className="text-xl font-semibold mb-4">Exercises</h2>
                        {todaysWorkout.exercises.map((Exercise) => (
                             <Item key={todaysWorkout.id} className="bg-blue-100 border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
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