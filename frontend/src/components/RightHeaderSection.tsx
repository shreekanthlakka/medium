import Profile from "./Profile";
import Write from "./Write";

export default function RightHeaderSection() {
    return (
        <div className="flex flex-row">
            <Write />
            <Profile />
        </div>
    );
}
