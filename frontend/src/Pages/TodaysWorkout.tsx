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


return(
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-4xl mx-auto px-6 space-y-4">
                {todaysWorkout.map((TodaysWorkout) => (
                    <Item className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                    <ItemContent>
                        <ItemTitle>{TodaysWorkout.Exercises.}</ItemTitle>
                        <ItemDescription>{TodaysWorkout.WorkoutName}</ItemDescription>
                        <ItemFooter>Format: {TodaysWorkout.DayOfWeek}</ItemFooter>
                    </ItemContent>
                </Item>
                ))}
            </div>
        </section>
    </main>
);

}

export default TodaysWorkout;