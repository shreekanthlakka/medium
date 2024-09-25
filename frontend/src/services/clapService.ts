import { URI } from "./userService";

export const createClapService = async (blogId: string) => {
    try {
        const res = await fetch(`${URI}/claps/${blogId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getTotalClapService = async (blogId: string) => {
    try {
        const res = await fetch(`${URI}/claps/${blogId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};
