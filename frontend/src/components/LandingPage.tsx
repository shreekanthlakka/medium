import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";

function LandingPage() {
    return (
        <div className=" grid grid-cols-1 lg:grid-cols-2 ">
            <div>
                <LeftPanel />
            </div>
            <div className="hidden lg:block">
                <RightPanel />
            </div>
        </div>
    );
}

export default LandingPage;
