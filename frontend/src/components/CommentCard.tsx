import { FaRegFaceGrin } from "react-icons/fa6";
import { FaHandsClapping } from "react-icons/fa6";
import { useAuth } from "../context/useAuth";
import { MdDelete } from "react-icons/md";

export default function CommentCard({ ele }: { ele: CommentCardTypes }) {
    const { userAccount } = useAuth();
    const isOwner = ele.userId === userAccount?.id;
    console.log("user => ", userAccount);
    console.log("ele", ele);
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row w-full gap-2">
                <div className=" text-5xl">
                    <FaRegFaceGrin />
                </div>
                <div>
                    <p>{ele?.user?.name}</p>
                    <p className="text-xs font-light">
                        {ele.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                    </p>
                </div>
            </div>
            <div>
                <p>{ele.comment}</p>
            </div>
            <div className="flex flex-row justify-between px-2">
                <div className="flex flex-row gap-3">
                    <FaHandsClapping />
                    {isOwner && <MdDelete />}
                </div>
                <div>Replay</div>
            </div>
            <div className="border border-b-0"></div>
        </div>
    );
}

interface CommentCardTypes {
    id: string;
    comment: string;
    blogId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}
