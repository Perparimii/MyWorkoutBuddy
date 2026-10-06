import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./pageLoader";

interface RouteWrapperProps {
    children: React.ReactNode;
}

function RouteWrapper({ children }: RouteWrapperProps) {
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (loading) {
        return <PageLoader />;
    }

    return children;
}

export default RouteWrapper;