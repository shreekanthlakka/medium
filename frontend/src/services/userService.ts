export const URI = "http://localhost:3000/api/v1";

export interface SignIn {
    email: string;
    password: string;
}
export interface SignUp {
    name: string;
    email: string;
    password: string;
}

export interface Error {
    message: string;
    statusCode: number;
}

export const signInService = async (formdata: SignIn) => {
    try {
        const res = await fetch(`${URI}/users/signin`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const signUpService = async (formdata: SignUp) => {
    try {
        const res = await fetch(`${URI}/users/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const loggedInUserService = async () => {
    try {
        const res = await fetch(`${URI}/users/me`, {
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

export const logoutService = async () => {
    try {
        const res = await fetch(`${URI}/users/logout`, {
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
