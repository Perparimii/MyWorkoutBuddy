import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
//import { Icon } from "lucide-react";

function Plans(){

return(
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full">
            <div>
                <Item className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                    <ItemContent>
                        <ItemTitle>Example plan</ItemTitle>
                        <ItemDescription>
                            Example descritption for the example plan to show the example blablabla
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button>Select</Button>
                    </ItemActions>
                </Item>
            </div>
        </section>
    </main>
);

}

export default Plans;