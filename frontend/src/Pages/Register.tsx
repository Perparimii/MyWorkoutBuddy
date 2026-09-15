import {Button} from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input} from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){

    const[username, setUsername]= useState("");
    const[password, setPassword]= useState("");
    const[email, setEmail]= useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

return (

 <main className="min-h-screen grid grid-cols-2">

     
         <section className="flex items-center justify-center">
                <div>
                    <h1 className="text-5xl font-bold">
                        Register
                    </h1>

                    <p className="mt-4 text-lg">
                        Please enter your credentials.
                    </p>
                </div>
            </section>


        <section className="flex items-center justify-center">
                <Card className="w-[400px] p-6">
                    <h2 className="text-2xl font-bold">
                        Register
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Enter your credentials.
                    </p>
                    <div className="mt-6 space-y-4">
                      <form className="mt-6 space-y-4" onSubmit={async (e) => {
                         e.preventDefault();

                         if (!username.trim()) {
                            setError("Username is required.");
                            return;
                        }

                        if (!email.trim()) {
                            setError("Email is required.");
                            return;
                        }

                        if(!passwordRegex.test(password)){
                            setError("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
                            return;
                        }

                         const response =await fetch("https://localhost:7027/api/Auth/register", {
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
                            console.log("Login failed!");
                            return;
                         }

                         navigate("/");
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
                            Create account
                        </Button>
                      </form>
                        {error && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                    </div>

                </Card>
            </section>
    </main>

    );

}

export default Register;