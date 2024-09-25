import { FormEvent, useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { login } = useAuth();
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const res = await login(formData);
        // @ts-ignore
        if (res?.success) {
            navigate("/blog");
            toast.success("LoggedIn sucessfully");
        }
    }
    return (
        <div className=" flex flex-col justify-center mx-10 h-screen">
            <div className=" flex flex-col  gap-3">
                <div>
                    <h1 className="text-3xl font-bold">Sign up</h1>
                    <p>
                        New to our App?
                        <Link to="/signup" className=" underline mx-2">
                            SignUp
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        label="email"
                        value={formData.email}
                        name="email"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            });
                        }}
                    />
                    <Input
                        type="password"
                        label="password"
                        value={formData.password}
                        name="password"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            });
                        }}
                    />
                    <button
                        type="submit"
                        className="w-full bg-slate-400 text-white  font-bold my-6 py-3 rounded-md cursor-pointer hover:bg-slate-600"
                    >
                        SignIn
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;
