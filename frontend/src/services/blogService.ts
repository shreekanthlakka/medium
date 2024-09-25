import { URI } from "./userService";

export interface BlogFormData {
    title: string;
    content: string;
    published?: boolean;
}

export const createBlogService = async (formData: BlogFormData) => {
    try {
        const res = await fetch(`${URI}/blog`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllBlogsService = async () => {
    try {
        const res = await fetch(`${URI}/blog`, {
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

export const getSingleBlogService = async (id: string) => {
    try {
        const res = await fetch(`${URI}/blog/${id}`, {
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

export const updateSingleBlogService = async ({
    id,
    updatedObj,
}: {
    id: string;
    updatedObj: object;
}) => {
    try {
        const res = await fetch(`${URI}/blog/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedObj),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const delteBlogService = async (id: string) => {
    try {
        const res = await fetch(`${URI}/blog/${id}`, {
            method: "DELETE",
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
