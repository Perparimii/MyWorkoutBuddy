//import { Button } from "@/components/ui/button";
//import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar"


function Dashboard(){

    const navigate = useNavigate();

    function handleLogOut(){
        console.log("Button clicked");

        localStorage.removeItem("token");

        navigate("/");
    }


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
                        You currently don't have a selected plan. Please navigate to Plans to select your plan.
                    </p>
                </div>
            </section>

    </main>
    
    )

}

export default Dashboard;