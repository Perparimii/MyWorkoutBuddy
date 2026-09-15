import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Landing(){

    const[username, setUsername]= useState("");
    const[password, setPassword]= useState("");
    const[email, setEmail]= useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


return(
    <main className="min-h-screen grid grid-cols-2">

         <section className="flex items-center justify-center">
                <div>
                    <h1 className="text-5xl font-bold">
                        Welcome to MyWorkoutBuddy
                    </h1>

                    <p className="mt-4 text-lg">
                        The friend you need to let you keep up with your fitness goals.
                    </p>
                </div>
            </section>


        <section className="flex items-center justify-center">
                <Card className="w-[400px] p-6">
                    <h2 className="text-2xl font-bold">
                        Login
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Login to access your workouts.
                    </p>
                    <div className="mt-6 space-y-4">
                      <form className="mt-6 space-y-4" onSubmit={async (e) => {
                         e.preventDefault();

                         const response =await fetch("https://localhost:7027/api/Auth/login", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                username,
                                password
                            })
                         });

                         if(!response.ok){
                            setError("Invalid credentials!");
                            return;
                         }

                         const data = await response.json();

                         const token = data.result;

                         localStorage.setItem("token", token);

                         console.log("Login successful");

                         navigate("/dashboard");
                         }}>

                        <Input 
                            type="text"
                            placeholder="okto@pokto.com"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}/>

                        <Input 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e)=> setUsername(e.target.value)}/>

                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}/>
                    

                        <Button className="w-full" type="submit">
                            Log In
                        </Button>
                      </form>
                      {error && (
                        <p className="text-sm text-red-500">{error}</p>
)}
                        <Link to={"/register"} className="text-blue-600 hover:underline">
                        Don't have an account? Click here to register
                        </Link>
                    </div>

                </Card>
            </section>
    </main>
);
}
 export default Landing;
