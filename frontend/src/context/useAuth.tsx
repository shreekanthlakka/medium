import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
    loggedInUserService,
    logoutService,
    SignIn,
    signInService,
} from "../services/userService";

interface UserAccount {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    accessToken?: string;
}

interface State {
    userAccount: UserAccount | null;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: Record<string, unknown> | null;
    isAuthenticated: boolean;
}

enum UserActionTypes {
    START = "START",
    ERROR = "ERROR",
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
    CURRENT_USER = "CURRENT_USER",
}

interface StartAction {
    type: UserActionTypes.START;
}

interface ErrorAction {
    type: UserActionTypes.ERROR;
    payload: Record<string, unknown>;
}

interface LoginAction {
    type: UserActionTypes.LOGIN;
    payload: UserAccount;
}

interface LogoutAction {
    type: UserActionTypes.LOGOUT;
}

interface CurrentUserAction {
    type: UserActionTypes.CURRENT_USER;
    payload: UserAccount;
    isAuthenticated: boolean;
}

type Action =
    | CurrentUserAction
    | LoginAction
    | LogoutAction
    | StartAction
    | ErrorAction;

const initialState = {
    userAccount: null,
    isLoading: false,
    isLoggedIn: false,
    error: null,
    isAuthenticated: false,
};

interface AuthContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    userAccount: UserAccount | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    isLoggedIn: boolean;
    error: Record<string, unknown> | null;
    login: (formData: SignIn) => Promise<{
        success: boolean;
        error?: Record<string, unknown>;
        data?: UserAccount;
    }>;
    logout: () => Promise<{
        success: boolean;
        error?: Record<string, unknown>;
        data?: UserAccount;
    }>;
    loggedInUser: () => Promise<{
        success: boolean;
        error?: Record<string, unknown>;
        data: UserAccount;
        isAuthenticated: boolean;
    }>;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

function authReducer(state: State, action: Action): State {
    switch (action.type) {
        case UserActionTypes.START:
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case UserActionTypes.ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case UserActionTypes.LOGIN:
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload,
                isLoggedIn: true,
                isAuthenticated: true,
            };
        case UserActionTypes.CURRENT_USER:
            return {
                ...state,
                isLoading: false,
                userAccount: action.payload,
                isAuthenticated: action.isAuthenticated,
            };
        case UserActionTypes.LOGOUT:
            return {
                ...initialState,
            };
        default:
            return state;
    }
}

function AuthContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const { userAccount, isLoading, isAuthenticated, error, isLoggedIn } =
        state;

    const login = async (formData: SignIn) => {
        dispatch({ type: UserActionTypes.START });
        const res = await signInService(formData);
        if (!res.success) {
            dispatch({ type: UserActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: UserActionTypes.LOGIN, payload: res.data });
        return res;
    };

    const logout = async () => {
        dispatch({ type: UserActionTypes.START });
        const res = await logoutService();
        if (!res.success) {
            dispatch({ type: UserActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: UserActionTypes.LOGOUT });
        return res;
    };

    const loggedInUser = async () => {
        dispatch({ type: UserActionTypes.START });
        const res = await loggedInUserService();
        if (!res.success) {
            dispatch({ type: UserActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({
            type: UserActionTypes.CURRENT_USER,
            payload: res.data,
            isAuthenticated: res.isAuthenticated,
        });
        return res;
    };

    const value = {
        state,
        dispatch,
        userAccount,
        isAuthenticated,
        isLoading,
        isLoggedIn,
        error,
        login,
        logout,
        loggedInUser,
    };
    return (
        <authContext.Provider value={value}>{children}</authContext.Provider>
    );
}

function useAuth() {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("Auth context used outside scope");
    }
    return context;
}

export { AuthContextProvider, useAuth };
