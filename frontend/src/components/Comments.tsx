import { useState } from "react";
import { useComment } from "../context/useComments";
import toast from "react-hot-toast";
import { useParams } from "react-router";

export default function Comments() {
    const [comment, setComment] = useState("");
    const { createComment, isAdding } = useComment();
    const { blogId } = useParams();

    async function handleClick() {
        if (!comment) return;
        const res = await createComment(blogId || "", { comment });
        if (res?.success) {
            setComment("");
            toast.success("Comment added");
        } else {
            toast.error("Failed to add comment");
            console.error(res);
        }
    }

    return (
        <div>
            <textarea
                rows={4}
                className="border border-black rounded-lg w-full text-2xl p-2"
                placeholder="what are your thoughts?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <button
                className="bg-slate-400 h-10 w-full rounded-md hover:bg-slate-500 font-bold"
                onClick={handleClick}
                disabled={isAdding}
            >
                Submit
            </button>
        </div>
    );
}
