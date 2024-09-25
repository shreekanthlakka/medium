import React, { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { userAccount, loggedInUser, isAuthenticated, isLoading } = useAuth();

    useEffect(() => {
        loggedInUser();
    }, []);

    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center h-screen text-3xl">
                Loading...{" "}
            </div>
        );
    if (!isLoading && !isAuthenticated) return <Navigate to="/signin" />;

    if (isAuthenticated) return children;
}
