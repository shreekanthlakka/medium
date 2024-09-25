import { useBlog } from "../context/useBlog";
import Blog from "./Blog";

export default function Blogs() {
    const { blogs, isLoading } = useBlog();

    return (
        <div className="grid grid-cols-3 w-full h-screen">
            <div className=" col-span-2 flex flex-col gap-4 items-center">
                {blogs.map((ele) => (
                    <Blog post={ele} key={ele.id} />
                ))}
            </div>
            <div className="bg-slate-300"></div>
        </div>
    );
}
