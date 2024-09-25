import { useLocation } from "react-router";
import Signup from "./Signup";
import SignIn from "./SignIn";

function LeftPanel() {
    const location = useLocation();
    return (
        <div>{location.pathname === "/signin" ? <SignIn /> : <Signup />}</div>
    );
}

export default LeftPanel;
