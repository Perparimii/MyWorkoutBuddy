import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Dashboard(){

    const navigate = useNavigate();

    function handleLogOut(){
        console.log("Button clicked");

        localStorage.removeItem("token");

        navigate("/");
    }

    return( 

        <section className="flex items-center">
            <div>
                <h1>This is the dashboard</h1>

                <Button className="w-full" onClick={handleLogOut}>Log out</Button>
            </div>
        </section>
    
    
    )

}

export default Dashboard;