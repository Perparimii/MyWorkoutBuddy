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
    <main className="min-h-screen grid grid-cols-[250px_1fr] bg-background">

        <section className="border-r border-border">
            <DashboardSidebar />
        </section>
       
        <section className="min-h-screen bg-background px-8 py-10">
            <div className="mx-auto w-full max-w-6xl">


            {todaysWorkout === null ? (
                <div className="flex min-h-[70vh] items-center justify-center">

                     <div className="text-center max-w-md">

                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-3xl">
                            😴 
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight">
                             Rest Day
                        </h1>

                        <p className="text-muted-foreground mt-3 leading-6">
                            No workout is scheduled for today.
                            Take some time to recover and come back
                            stronger tomorrow.
                        </p>

                </div>

            </div>
            
            ) : (
            
                <div className="mb-10">

                    <div className="flex items-center justify-between">

                         <div>
                             <p className="text-sm font-medium text-primary mb-2">{days[todaysWorkout.dayOfWeek]}</p>

                             <h1 className="text-4xl font-bold tracking-tight">{todaysWorkout.workoutName}</h1>

                             <p className="text-muted-foreground mt-2">Here's what you have planned for today's workout.</p>
                        </div>

                        <div className="rounded-xl border border-border bg-card px-5 py-4">
                           <p className="text-xs uppercase tracking-wider text-muted-foreground">Today's Workout</p>

                           <p className="text-sm font-semibold mt-1">{todaysWorkout.exercises.length} Exercises </p>
                        </div>

                    </div>

                    <div className="mb-5">
                        <h2 className="text-xl font-semibold">Exercises</h2>
                        <p className="text-sm text-muted-foreground mt-1">Complete each exercise according to your plan.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        {todaysWorkout.exercises.map((Exercise) => (
                             <Item key={Exercise.name} className="rounded-xl border border-border border-l-2 border-l-primary/60 bg-card px-5 py-5 transition-all hover:border-primary/40 hover:bg-accent">
                                <ItemContent>
                                <ItemTitle className="text-base font-semibold">{Exercise.name}</ItemTitle>
                                    
                                    <div className="flex items-center gap-3 mt-3">
                                        
                                        <div className="rounded-lg bg-secondary px-3 py-2">
                                            <p className="text-xs text-muted-foreground">Warmup</p>
                                            <p className="text-sm font-semibold">{Exercise.warmupSets} sets</p>
                                        </div>

                                        <div className="rounded-lg bg-secondary px-3 py-2">
                                            <p className="text-xs text-muted-foreground">Working</p>
                                            <p className="text-sm font-semibold">{Exercise.workingSets} sets</p>
                                        </div>

                                        <div className="rounded-lg bg-secondary px-3 py-2">
                                            <p className="text-xs text-muted-foreground">Reps</p>

                                            <p className="text-sm font-semibold">{Exercise.minReps}-{Exercise.maxReps}</p>
                                        </div>

                                    </div>

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