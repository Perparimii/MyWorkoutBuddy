import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemMedia, ItemTitle } from "@/components/ui/item";
import { Button } from "@/components/ui/button";
//import { Icon } from "lucide-react";
import { useState, useEffect } from "react";


function Plans(){

    interface Plan {
    id: number;
    name: string;
    description: string;
    format: string
}

const[plans, setPlans] = useState<Plan[]>([]);

useEffect(()=> {

    const getPlans = async ()=> {

        const response = await fetch("https://localhost:7027/api/Plans")

        const data = await response.json();

        console.log(data);

        setPlans(data);

    };

    getPlans();

        
    }, []);

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
                    <Item className="border border-blue-200 rounded-md hover:bg-blue-50 hover:border-blue-300">
                    <ItemContent>
                        <ItemTitle>{Plan.name}</ItemTitle>
                        <ItemDescription>{Plan.description}</ItemDescription>
                        <ItemFooter>Format: {Plan.format}</ItemFooter>
                    </ItemContent>
                    <ItemActions>
                        <Button>Select</Button>
                    </ItemActions>
                </Item>
                ))}
            </div>
        </section>
    </main>
);

}

export default Plans;