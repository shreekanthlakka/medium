import { FormEvent, useState } from "react";
import Input from "./Input";
import { Link } from "react-router-dom";
import { signUpService } from "../services/userService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const res = await signUpService(formData);
        console.log(res);
        if (res.success) {
            navigate("/signin");
            toast.success("User Created Sucessfully");
        }
    }

    return (
        <div className=" flex flex-col justify-center mx-10 h-screen">
            <div className=" flex flex-col  gap-3">
                <div>
                    <h1 className="text-3xl font-bold">Sign up</h1>
                    <p>
                        Already have an account?{" "}
                        <Link to="/signin" className=" underline">
                            SignIn
                        </Link>
                    </p>
                </div>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        label="name"
                        value={formData.name}
                        name="name"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            });
                        }}
                    />
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
                        SignUp
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
