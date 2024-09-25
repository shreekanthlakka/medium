import { URI } from "./userService";

export const createCommentService = async (
    blogId: string,
    formData: { comment: string }
) => {
    try {
        const res = await fetch(`${URI}/comments/${blogId}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log("Data Comment => ", data);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllCommentsByBlogIdService = async (id: string) => {
    try {
        const res = await fetch(`${URI}/comments/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const deleteCommentService = async (
    blogId: string,
    commentId: string
) => {
    try {
        const res = await fetch(`${URI}/comments/${blogId}/${commentId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const editCommentService = async (
    blogId: string,
    commentId: string,
    formData: { comment: string }
) => {
    try {
        const res = await fetch(`${URI}/comments/${blogId}/${commentId}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};
