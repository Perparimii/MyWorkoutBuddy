import { DashboardSidebar } from "@/components/customComponents/dashboardSidebar";

function TodaysWorkout(){

return(
    <main className="mmin-h-screen grid grid-cols-[250px_1fr]">
        <section className="flex items-center justify-center">
            <div>
                <DashboardSidebar></DashboardSidebar>
            </div>
        </section>
    </main>
);

}

export default TodaysWorkout;