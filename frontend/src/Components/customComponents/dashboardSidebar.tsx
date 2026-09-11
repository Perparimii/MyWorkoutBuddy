import { SidebarProvider, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";
import {Home,Dumbbell,Calendar,LogOut} from "lucide-react";



function DashboardSidebar(){

    const navigate = useNavigate();

    function handleLogOut(){
        console.log("Button clicked");

        localStorage.removeItem("token");

        navigate("/");
    }

    return (
        <SidebarProvider>
            <Sidebar className="border-r border-border">
                <SidebarHeader className="h-20 border-b border-border px-5">
                     <div className="flex h-full items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                            <Dumbbell className="h-5 w-5" />
                         </div>
                        <span className="text-lg font-semibold">MyWorkoutBuddy</span>
                     </div>
                </SidebarHeader>
                <SidebarContent className="flex-1 px-3 pt-4">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-2">
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigate("/dashboard")}
                                        className="h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                                    >
                                        <Home />
                                        <span>Dashboard</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigate("/plans")}
                                        className="h-11 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Calendar />
                                        <span>Plans</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigate("/myworkouts")}
                                        className="h-11 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Dumbbell />
                                        <span>My Workouts</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() => navigate("/todaysworkout")}
                                        className="h-11 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                    >
                                        <Dumbbell />
                                        <span>Today's Workout</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            </SidebarMenu>

                        </SidebarGroupContent>

                    </SidebarGroup>

                </SidebarContent>

                <SidebarFooter className="border-t border-border p-3">

                    <SidebarMenu>
                        <SidebarMenuItem>

                            <SidebarMenuButton
                                onClick={handleLogOut}
                                className="h-11 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <LogOut />
                                <span>Log out</span>
                            </SidebarMenuButton>

                        </SidebarMenuItem>
                    </SidebarMenu>

                </SidebarFooter>

            </Sidebar>
        </SidebarProvider>
    );
}


export {DashboardSidebar};