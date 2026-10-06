import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
//import { Icon } from "lucide-react";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";


function Plans(){
//needed interfaces
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
//


const[plans, setPlans] = useState<Plan[]>([]);
const [user, setUser] = useState<UserProfile | null>(null);
const navigate = useNavigate();


const selectPlan = async (planId: number)=>{

    const response = await fetch(`https://localhost:7027/api/Plans/${planId}`,{
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if(response.ok){
        navigate("/dashboard");
    }
}


useEffect(()=> {

    const getPlans = async ()=> {

        const response = await fetch("https://localhost:7027/api/Plans");

        const data = await response.json();

        setPlans(data);

    };

    getPlans();

    const getUser = async () =>{
        const response = await fetch(`https://localhost:7027/api/User`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const data = await response.json();

    setUser(data);
    };

    getUser();

    }, []);

return (
    <main className="min-h-screen grid grid-cols-[250px_1fr] bg-background">

        <section className="border-r border-border">
            <DashboardSidebar />
        </section>

        <section className="min-h-screen bg-background px-8 py-10">
            <div className="mx-auto w-full max-w-5xl">

                <div className="mb-10">
                    <p className="text-sm font-medium text-primary mb-2">
                        WORKOUT PLANS
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight">
                        Choose your plan
                    </h1>

                    <p className="text-muted-foreground mt-2 max-w-xl">
                        Select a workout plan that fits your goals. You can change
                        your plan at any time.
                    </p>
                </div>


                <div className="grid gap-4">
                    {plans.map((plan) => (
                        <Item
                            key={plan.id}
                            className={
                                `rounded-xl border bg-card p-6 transition-all ` +
                                (user?.planId === plan.id
                                    ? "border-primary/60 bg-primary/5"
                                    : "border-border hover:border-primary/40 hover:bg-accent")}>
                            <ItemContent>

                                <div className="flex items-center gap-3">
                                    <ItemTitle className="text-lg font-semibold">
                                        {plan.name}
                                    </ItemTitle>

                                    {user?.planId === plan.id && (
                                        <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
                                            Current Plan
                                        </span>
                                    )}
                                </div>

                                <ItemDescription className="mt-2">
                                    {plan.description}
                                </ItemDescription>

                                <ItemFooter className="mt-4 text-sm text-muted-foreground">
                                    Format: {plan.format}
                                </ItemFooter>

                            </ItemContent>

                            <ItemActions>
                                <Button
                                    onClick={() => selectPlan(plan.id)}
                                    variant={
                                        user?.planId === plan.id
                                            ? "secondary"
                                            : "default"
                                    }
                                    className={
                                        user?.planId === plan.id
                                            ? "border border-border"
                                            : ""
                                    }
                                >
                                    {user?.planId === plan.id
                                        ? "Selected"
                                        : "Select Plan"}
                                </Button>
                            </ItemActions>
                        </Item>
                    ))}
                </div>

            </div>
        </section>
    </main>
);

}

export default Plans;