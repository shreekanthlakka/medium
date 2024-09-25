import { CiSearch } from "react-icons/ci";

export default function Search() {
    return (
        <div className="relative flex items-center">
            <CiSearch className="absolute left-6 text-slate-500" />
            <input
                type="text"
                placeholder="Search..."
                className="border rounded-full pl-10 pr-3 py-2 text-slate-500 font-bold mx-2  bg-slate-50"
            />
        </div>
    );
}
