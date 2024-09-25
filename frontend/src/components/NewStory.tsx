import React, { useState } from "react";
import { useBlog } from "../context/useBlog";
import toast from "react-hot-toast";

export default function NewStory() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { isAdding, createBlog } = useBlog();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(title, content);
        if (!title && !content) {
            return;
        }
        const res = await createBlog({ title, content });
        if (res.success) {
            toast.success("Blog added Sucessfully");
            setTitle("");
            setContent("");
        }
        console.log(res);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col  items-center align-middle gap-4 mt-10">
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-1/2  h-10 font-bold size-10 px-5 text-2xl border-b-2 border-slate-400 "
                />
                <textarea
                    placeholder="Tell your story..."
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-1/2 font-bold text-wrap px-5 text-1xl  border-b-2 border-slate-400 "
                />
                <button
                    type="submit"
                    disabled={isAdding}
                    className="font-bold bg-slate-400 text-white w-1/3 h-10 hover:bg-slate-500 "
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
