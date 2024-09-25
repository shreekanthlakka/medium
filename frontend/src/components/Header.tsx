import Logo from "./Logo";
import RightHeaderSection from "./RightHeaderSection";
import Search from "./Search";

export default function Header() {
    return (
        <header>
            <div className="flex flex-row m-2 border-b-2 mb-3 justify-between align-middle">
                <div className="flex flex-row">
                    <Logo />
                    <Search />
                </div>
                <RightHeaderSection />
            </div>
        </header>
    );
}
