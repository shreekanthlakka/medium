import {
    createContext,
    useReducer,
    Dispatch,
    useContext,
    useEffect,
} from "react";
import {
    loggedInUserService,
    logoutService,
    SignIn,
    signInService,
} from "../services/userService";

interface State {
    userAccount: Record<string, unknown>;
    isLoading: boolean;
    error: Record<string, unknown> | null;
    isLoggedIn: boolean;
    isAuthenticated: boolean | undefined;
}

interface UserAccount {
    // Define the expected structure for userAccount, adjust as needed
    id?: string;
    name?: string;
    email?: string;
    [key: string]: unknown;
}

interface Action {
    type: string;
    payload?: UserAccount | Record<string, unknown>;
    isAuthenticated?: boolean | undefined;
}

interface UserContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    login: (formData: SignIn) => Promise<object>;
    logout: () => Promise<object>;
}

const initialState: State = {
    userAccount: {},
    isLoading: false,
    isLoggedIn: false,
    error: null,
    isAuthenticated: false,
};

function userReducer(state: State, action: Action): State {
    switch (action.type) {
        case "START":
            return { ...state, isLoading: true, error: {} };
        case "ERROR":
            return {
                ...state,
                isLoading: false,
                error: action.payload || null,
            };
        case "LOGIN":
            return {
                ...state,
                isLoading: false,
                userAccount: (action.payload as UserAccount) || {},
                isLoggedIn: true,
                isAuthenticated: true,
            };
        case "LOGOUT":
            return { ...initialState };
        case "CURRENT_USER":
            return {
                ...state,
                isLoading: false,
                userAccount: (action.payload as UserAccount) || {},
                isLoggedIn: true,
                isAuthenticated: action.isAuthenticated,
            };
        default:
            return { ...state };
    }
}

const userContext = createContext<UserContextProps | undefined>(undefined);

function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(
        userReducer,
        localStorage.getItem("userAccount")
            ? JSON.parse(localStorage.getItem("userAccount") || "")
            : initialState
    );

    useEffect(() => {
        localStorage.setItem("userAccount", JSON.stringify(state));
    }, [state]);

    const { userAccount, isLoading, isLoggedIn, error, isAuthenticated } =
        state;

    const login = async (formData: SignIn) => {
        dispatch({ type: "START" });
        try {
            const res = await signInService(formData);
            if (!res.success) {
                throw {
                    statusCode: res.statusCode,
                    message: res.message,
                };
            }
            dispatch({ type: "LOGIN", payload: res.data });
            return res;
        } catch (error) {
            if (error instanceof Error) {
                // If error is an instance of the Error object
                dispatch({
                    type: "ERROR",
                    payload: { message: error.message },
                });
            } else if (typeof error === "object" && error !== null) {
                // If error is an object, assume it has a message property
                dispatch({
                    type: "ERROR",
                    payload: error as Record<string, unknown>,
                });
            } else {
                // Fallback for unknown error types
                dispatch({
                    type: "ERROR",
                    payload: { message: "An unknown error occurred" },
                });
            }
        }
    };

    const loggedInUser = async () => {
        dispatch({ type: "START" });
        const res = await loggedInUserService();
        if (!res.success) {
            dispatch({
                type: "ERROR",
                payload: {
                    message: res.message,
                    statusCode: res.statusCode,
                },
            });
            return res;
        }
        dispatch({ type: "CURRENT_USER", payload: res.data });
        return res;
    };

    const logout = async () => {
        dispatch({ type: "START" });
        try {
            const res = await logoutService();
            if (!res.success) {
                throw {
                    statusCode: res.statusCode,
                    message: res.message,
                };
            }
            dispatch({ type: "LOGOUT" });
            return res;
        } catch (error) {
            if (error instanceof Error) {
                // If error is an instance of the Error object
                dispatch({
                    type: "ERROR",
                    payload: { message: error.message },
                });
            } else if (typeof error === "object" && error !== null) {
                // If error is an object, assume it has a message property
                dispatch({
                    type: "ERROR",
                    payload: error as Record<string, unknown>,
                });
            } else {
                // Fallback for unknown error types
                dispatch({
                    type: "ERROR",
                    payload: { message: "An unknown error occurred" },
                });
            }
        }
    };

    const value = {
        userAccount,
        isLoading,
        isAuthenticated,
        isLoggedIn,
        dispatch,
        login,
        logout,
        loggedInUser,
        error,
        state,
    };
    return (
        <userContext.Provider value={value}>{children}</userContext.Provider>
    );
}

function useUser() {
    const context = useContext(userContext);
    if (!context) {
        throw new Error("Context used outside scope");
    }
    return context;
}

export { UserContextProvider, useUser };
