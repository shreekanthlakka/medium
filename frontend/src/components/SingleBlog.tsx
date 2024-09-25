import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { BlogActionTypes, useBlog } from "../context/useBlog";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { FaFaceGrinWide } from "react-icons/fa6";
import {
    createClapService,
    getTotalClapService,
} from "../services/clapService";
import Comments from "./Comments";
import ShowComments from "./ShowComments";
import { useComment } from "../context/useComments";

export default function SingleBlog() {
    const { blogId } = useParams();
    const { dispatch, getBlogById, isLoading, selectedBlog } = useBlog();
    const { getAllComments, isFetching, comments } = useComment();
    const [claps, setClaps] = useState(0);
    const [isClapped, setIsClapped] = useState(false);

    async function handleClick() {
        try {
            const res = await createClapService(blogId || "");
            console.log("Res => ", res);
            if (res.success) {
                // toast.success("clapped sucessfully");
                setIsClapped((p) => !p);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (blogId) {
            getBlogById(blogId);
        }
        return () => {
            dispatch({ type: BlogActionTypes.CLEAR_BLOG_ID });
        };
    }, [blogId, dispatch]);

    useEffect(() => {
        if (blogId) {
            getAllComments(blogId);
        }
    }, [blogId, comments.length]);

    useEffect(() => {
        (async () => {
            const res = await getTotalClapService(blogId || "");
            if (res.success) {
                setClaps(res.data.length);
            }
        })();
    }, [isClapped, blogId]);

    if (isLoading) {
        <div className=" flex flex-col h-screen justify-center align-middle text-3xl font-bold">
            Loading ...{" "}
        </div>;
    }

    return (
        <>
            <div className="flex flex-col w-full items-center ">
                <div className="flex flex-col  w-2/3 items-center gap-3">
                    <h1 className="font-extrabold text-3xl">
                        {selectedBlog?.title}
                    </h1>
                    <div className=" text-5xl flex flex-row w-full gap-3">
                        <FaFaceGrinWide />
                        <div className=" font-bold text-lg">
                            <div>
                                {selectedBlog?.author?.name} -{" "}
                                <span className=" text-green-500 text-sm">
                                    Follow
                                </span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <p>7 min read</p>
                                <p>
                                    {selectedBlog?.createdAt
                                        .split("T")[0]
                                        .split("-")
                                        .reverse()
                                        .join("-")}
                                </p>
                            </div>
                        </div>
                    </div>
                    <p>{selectedBlog?.content}</p>
                </div>
                <div className="flex w-2/3 gap-5 m-5 items-center">
                    <button onClick={handleClick} className="flex flex-row">
                        <SignLanguageIcon fontSize="small" />
                        <p className="mx-1">{claps}</p>
                    </button>
                    <ModeCommentIcon fontSize="small" />
                </div>
                <div className="mt-5 w-1/3">
                    <Comments />
                </div>
                <div className="mt-5 w-2/3">
                    <ShowComments />
                </div>
            </div>
        </>
    );
}
