import { Card } from "@/components/ui/card";

function Landing(){

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

                    {/* Form will go here */}
                </Card>
            </section>
    </main>
);
}
 export default Landing;
