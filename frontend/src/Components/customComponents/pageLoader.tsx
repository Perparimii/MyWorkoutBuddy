import { LoaderCircle } from "lucide-react";

function PageLoader() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <LoaderCircle className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
}

export default PageLoader;