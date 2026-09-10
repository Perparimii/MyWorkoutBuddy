import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { useState, useEffect } from "react";

function MyWorkouts(){

interface Workout{
    name: string,
    dayOfWeek: number,
    exerciseNumber: number,
    planId: number
}

const[workouts, setWorkouts] = useState<Workout[]>([]);

useEffect(() => {
    const getWorkouts = async () => {
        const response = await fetch(`https://localhost:7027/api/Workout`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

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
            <div  className="w-full max-w-4xl mx-auto px-6 space-y-4">
                {workouts.map((Workout) =>(
                    <Item className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                        <ItemContent>
                            <ItemTitle>{Workout.name}</ItemTitle>
                            <ItemDescription>
                                Day: {Workout.dayOfWeek} {" "} Exercise number: {Workout.exerciseNumber}
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                ))}
            </div>
        </section>

    </main>
);

}

export default MyWorkouts;