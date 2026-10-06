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


return (
    <main className="min-h-screen grid grid-cols-[250px_1fr] bg-background">

        {/* Sidebar */}
        <section className="border-r border-border">
            <DashboardSidebar />
        </section>

        {/* Main content */}
        <section className="min-h-screen bg-background px-8 py-10">
            <div className="mx-auto w-full max-w-5xl">

                {/* Header */}
                <div className="mb-10">
                    <p className="text-sm font-medium text-primary mb-2">
                        MY WORKOUTS
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Your Workouts
                    </h1>

                    <p className="text-muted-foreground mt-2 max-w-xl">
                        View the workouts included in your current workout plan.
                    </p>
                </div>

                {/* Workouts */}
                <div className="flex flex-col gap-4">
                    {workouts.map((Workout) => (
                        <Item
                            key={Workout.name}
                            className="rounded-xl border border-border border-l-2 border-l-primary/60 bg-card p-6 transition-all hover:border-primary/40 hover:bg-accent"
                        >
                            <ItemContent>

                                <ItemTitle className="text-lg font-semibold">
                                    {Workout.name}
                                </ItemTitle>

                                <ItemDescription className="mt-3">
                                    <span className="text-muted-foreground">
                                        Day
                                    </span>

                                    <span className="mx-2 text-border">
                                        •
                                    </span>

                                    <span className="text-foreground">
                                        {Workout.dayOfWeek}
                                    </span>

                                    <span className="mx-3 text-border">
                                        •
                                    </span>

                                    <span className="text-muted-foreground">
                                        Exercises
                                    </span>

                                    <span className="ml-2 text-foreground">
                                        {Workout.exerciseNumber}
                                    </span>
                                </ItemDescription>

                            </ItemContent>
                        </Item>
                    ))}
                </div>

            </div>
        </section>

    </main>
);

}

export default MyWorkouts;