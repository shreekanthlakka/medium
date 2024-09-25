import { ChangeEvent } from "react";

interface InputType {
    type: string;
    label: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

function Input({ type, label, value, onChange, name }: InputType) {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">
                {label}
            </label>
            <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                type={type || "text"}
                value={value}
                name={name}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;
