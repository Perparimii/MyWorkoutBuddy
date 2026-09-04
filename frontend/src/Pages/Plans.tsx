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

        console.log(data);

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

    console.log(user);

return(

    <main className="mmin-h-screen grid grid-cols-[250px_1fr] px-8">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full">
            <div className="w-full max-w-4xl mx-auto px-6 space-y-4">
                {plans.map((Plan) => (
                    <Item key={Plan.id} className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                    <ItemContent>
                        <ItemTitle>{Plan.name}</ItemTitle>
                        <ItemDescription>{Plan.description}</ItemDescription>
                        <ItemFooter>Format: {Plan.format}</ItemFooter>
                    </ItemContent>
                    <ItemActions>
                        <Button onClick={() => selectPlan(Plan.id)} 
                        className={
                        user?.planId === Plan.id ? "bg-green-600 text-white hover:bg-green-700": "bg-blue-600 text-white hover:bg-blue-700"} >{user?.planId === Plan.id ? "Selected" : "Select"}</Button>
                    </ItemActions>
                </Item>
                ))}
            </div>
        </section>
    </main>
);

}

export default Plans;