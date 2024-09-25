import { Outlet } from "react-router";
import Header from "./Header";
import { useEffect } from "react";
import { useBlog } from "../context/useBlog";

export default function Layout() {
    const { isLoading, getAllBlogs } = useBlog();
    useEffect(() => {
        Promise.all([getAllBlogs()]);
    }, []);
    return (
        <div>
            <div className=" sticky top-0 overflow-hidden z-50 bg-white ">
                <Header />
            </div>
            <main className="h-screen">
                <Outlet />
            </main>
        </div>
    );
}
