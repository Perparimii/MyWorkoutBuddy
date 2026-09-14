//import { Button } from "@/components/ui/button";
//import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
//import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar"
import { useEffect, useState } from "react";


function Dashboard(){
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
    const [plan, setPlan] = useState<Plan | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(()=> {

    const getPlan = async ()=> {

        const planId = user?.planId;

        const response = await fetch(`https://localhost:7027/api/Plans/${planId}`,{
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

        const data = await response.json();

        setPlan(data);

    };

    getPlan();

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

        

    return( 
    
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">

        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>


        <section className="flex flex-col items-center justify-center w-full ">
                <div>
                    <h1 className="text-5xl font-bold">
                        Welcome to your homepage
                    </h1>

                    <p className="mt-4 text-lg">
                        You don't have a selected plan. Please navigate to Plans to select your plan.
                    </p>
                </div>
            </section>

    </main>
    
    )

}

export default Dashboard;