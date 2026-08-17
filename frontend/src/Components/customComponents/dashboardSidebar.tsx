import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";



function DashboardSidebar(){

    const navigate = useNavigate();

    function handleLogOut(){
        console.log("Button clicked");

        localStorage.removeItem("token");

        navigate("/");
    }

    return(
            <SidebarProvider>
                    <Sidebar>
                        <SidebarContent className="flex-1">
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu className="gap-3">
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navigate("/dashboard") } className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                                                Home
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navigate("/plans") } className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                                                Plans
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton onClick={() => navigate("/myworkouts") } className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
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
    )
}

export {DashboardSidebar};