import { useComment } from "../context/useComments";
import CommentCard from "./CommentCard";

export default function ShowComments() {
    const { comments, isFetching } = useComment();

    if (isFetching)
        return (
            <div className="flex flex-col justify-center align-middle text-2xl">
                Loading ...{" "}
            </div>
        );
    return (
        <div className="w-full flex flex-col gap-3">
            {comments.map((ele) => (
                <CommentCard key={ele.id} ele={ele} />
            ))}
        </div>
    );
}
