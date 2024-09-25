import { PiNotePencilThin } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Write() {
    return (
        <Link to="/new-story" className="write">
            <div className="flex flex-row align-middle font-bold m-2 ">
                <PiNotePencilThin fontSize={25} />
                <h1 className=" align-middle mx-1">Write</h1>
            </div>
        </Link>
    );
}
