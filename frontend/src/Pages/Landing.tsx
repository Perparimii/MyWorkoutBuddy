import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, type SubmitEventHandler } from "react"

function Landing(){

    const[username, setUsername]= useState("");
    const[password, setPassword]= useState("");
    const[email, setEmail]= useState("");

// const handleSubmit = (e: SubmitEventHandler<HTMLFormElement>) => {

       



return(
    <main className="min-h-screen grid grid-cols-2">

     {/*Left side*/}

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

    {/*Right side*/} 

        <section className="flex items-center justify-center">
                <Card className="w-[400px] p-6">
                    <h2 className="text-2xl font-bold">
                        Login
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Login to access your workouts.
                    </p>
                    <div className="mt-6 space-y-4">
                      <form className="mt-6 space-y-4" onSubmit={(e) => {
                         e.preventDefault();

                         console.log("Username:", username);
                         console.log("Password:", password);
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
                    </div>

                    {/* Form will go here */}
                </Card>
            </section>
    </main>
);
}
 export default Landing;
