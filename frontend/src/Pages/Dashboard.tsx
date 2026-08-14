//import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";


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
                <SidebarProvider>
                    <Sidebar>
                        <SidebarContent className="flex-1">
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu className="gap-3">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="border border-blue-200 rounded-md hover:bg-...">
                                                Home
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                                                Plans
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                                                My Workouts
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                        <SidebarFooter className="p-10 border-t border-blue-100 p-3 gap-2">
                                    <SidebarMenu>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton className="border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300" onClick={handleLogOut}>
                                                Log out
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </SidebarMenu>
                                </SidebarFooter>
                    </Sidebar>
                </SidebarProvider>
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