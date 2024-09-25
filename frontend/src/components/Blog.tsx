import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogActionTypes, useBlog } from "../context/useBlog";
import { getTotalClapService } from "../services/clapService";

export default function Blog({ post }) {
    // console.log("post => ", post);
    const navigate = useNavigate();
    const { dispatch } = useBlog();

    const [clapCount, setClapCount] = useState(0);

    function handleClick() {
        dispatch({ type: BlogActionTypes.SELECTED_BLOG_ID, payload: post.id });
        navigate("/blog/" + post.id);
    }

    useEffect(() => {
        (async () => {
            const res = await getTotalClapService(post.id);
            setClapCount(res.data.length);
        })();
    }, [post]);

    return (
        <div className="w-2/3">
            <div className="flex flex-row gap-1">
                {post.author?.profilePic ? (
                    <img
                        src={post.author?.profilePic}
                        alt={`profile pic for ${post.author?.name}`}
                    />
                ) : (
                    <AccountCircleIcon />
                )}
                <p>{post.author?.name}</p>
            </div>
            <div>
                <button onClick={handleClick}>
                    <h1 className="text-4xl font-extrabold">{post.title}</h1>
                </button>

                <p>{post.content}</p>
            </div>
            <div className="flex flex-row gap-3 items-center my-3">
                <p className=" text-sm font-serif">
                    {post.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                </p>
                {/* <ThumbUpIcon fontSize="small" /> */}
                <div className="flex flex-row gap-1">
                    <SignLanguageIcon fontSize="small" />
                    <h4>{clapCount}</h4>
                </div>

                <ModeCommentIcon fontSize="small" />
            </div>
            <div className="border border-b-2 my-5"></div>
        </div>
    );
}
