//import { Button } from "@/components/ui/button";
//import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
//import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar"
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function Dashboard(){
    //interfaces
    interface Plan {
    id: number;
    name: string;
    description: string;
    format: string
    }
    interface UserProfile {
    id: number;
    userName: string;
    email: string;
    planId: number | null;
}
interface Workout{
    name: string,
    dayOfWeek: number,
    exerciseNumber: number,
    planId: number
}

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
    const [plan, setPlan] = useState<Plan | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
    const getUser = async () => {
        const response = await fetch(`https://localhost:7027/api/User`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const userData = await response.json();

        setUser(userData);
    };

    getUser();
}, []);
    
    
    useEffect(()=> {

    const getPlan = async ()=> {
        if (!user?.planId) {
        return;
    }

        const planId = user?.planId;

        const response = await fetch(`https://localhost:7027/api/Plans/${planId}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

        const planData = await response.json();

        setPlan(planData);

    };

        getPlan();

        }, [user]);

        useEffect(() => {
            const getWorkouts = async () => {
                const response = await fetch(`https://localhost:7027/api/Workout`,{
                                method: "GET",
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                                }
                });

                const workoutsData = await response.json();

                setWorkouts(workoutsData);
            }

    getWorkouts();
        }, []);
        

    return( 
    
    <main className="min-h-screen grid grid-cols-[250px_1fr] bg-background">

        <section className="border-r border-border">
            <DashboardSidebar></DashboardSidebar>
        </section>
        
        <section className="min-h-screen bg-background px-8 py-10">

            <div className="mx-auto w-full max-w-6xl">

                {plan === null ? (
                    <div className="flex min-h-[70vh] items-center justify-center">

                        <div className="w-full max-w-xl text-center">

                            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
                                <Dumbbell className="h-8 w-8" />
                            </div>

                            <p className="text-sm font-medium text-primary mb-2">
                                GET STARTED
                            </p>

                            <h1 className="text-4xl font-bold tracking-tight">
                                Welcome to MyWorkoutBuddy
                            </h1>

                            <p className="mt-4 text-muted-foreground leading-6">
                                You don't have a workout plan yet.
                                Choose a plan to start building your workout
                                routine and track your progress.
                            </p>

                            <Button
                                className="mt-8"
                                onClick={() => navigate("/plans")}
                            >
                                Choose a Plan
                            </Button>

                        </div>

                    </div>

                ) : (
                    <div className="w-full max-w-4xl mx-auto">

                         <div className="flex items-start justify-between mb-10">

                            <div>
                                <p className="text-sm font-medium text-primary mb-2">CURRENT PLAN</p>

                                <h1 className="text-4xl font-bold tracking-tight text-primary">{plan?.name}</h1>
                             </div>

                            <Button variant="outline" onClick={() => navigate("/plans")}>Change Plan</Button>

                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-5">Workouts</h2>

                        <div className="flex flex-col gap-3">
                            {workouts.map((Workout) => (
                                <div key={Workout.name}className="rounded-xl border border-border border-l-2 border-l-primary/60 bg-card p-5 transition-all hover:border-primary/40 hover:bg-accent">
                                    <p className="text-sm text-primary font-medium">{days[Workout.dayOfWeek]}</p>
                                     <h3 className="text-lg font-semibold mt-1">{Workout.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                    

                </div>
                )

                }

            </div>

        </section>

    </main>
    
    )

}

export default Dashboard;