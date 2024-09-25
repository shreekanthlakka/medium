import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
    createClapService,
    getTotalClapService,
} from "../services/clapService";

enum ClapActionTypes {
    STATUS_ISLOADING = "STATUS_ISLOADING",
    STATUS_ISADDING = "STATUS_ISADDING",
    ERROR = "ERROR",
    ADD_CLAP = "ADD_CLAP",
    GET_ALL_CLAP = "GET_ALL_CLAP",
}

interface Clap {
    id: number;
    userId: string;
    postId: string;
    createdAt: string;
    updatedAt: string;
}

interface AddClap {
    type: ClapActionTypes.ADD_CLAP;
    payload: Clap;
}

interface GetAllClaps {
    type: ClapActionTypes.GET_ALL_CLAP;
    payload: Clap[];
}

interface Error {
    type: ClapActionTypes.ERROR;
    payload: Record<string, unknown> | null;
}

interface StatusIsLoading {
    type: ClapActionTypes.STATUS_ISLOADING;
}

interface StatusIsAdding {
    type: ClapActionTypes.STATUS_ISADDING;
}

type Action = AddClap | GetAllClaps | Error | StatusIsLoading | StatusIsAdding;

interface InitialStatus {
    isLoading: boolean;
    isAdding: boolean;
}

const initialStatus = {
    isLoading: false,
    isAdding: false,
};

const initialState = {
    claps: [],
    status: initialStatus,
    error: null,
};

interface State {
    claps: Clap[];
    status: InitialStatus;
    error: Record<string, unknown> | null;
}

interface ClapContextProps {
    state: State;
    dispatch: Dispatch<Action>;
}

const clapContext = createContext<ClapContextProps | undefined>(undefined);

function clapReducer(state: State, action: Action) {
    switch (action.type) {
        case ClapActionTypes.STATUS_ISLOADING:
            return {
                ...state,
                status: { ...state.status, isLoading: true },
                error: null,
            };
        case ClapActionTypes.GET_ALL_CLAP:
            return {
                ...state,
                claps: action.payload,
                status: { ...state.status, isLoading: false },
            };
        case ClapActionTypes.ERROR:
            return {
                ...state,
                status: { ...initialStatus },
                error: action.payload,
            };
        case ClapActionTypes.STATUS_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                error: null,
            };
        case ClapActionTypes.ADD_CLAP:
            return {
                ...state,
                claps: [...state.claps, action.payload],
                status: { ...state.status, isAdding: false },
            };
        default:
            return state;
    }
}

function ClapContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(clapReducer, initialState);

    const { claps, status, error } = state;
    const { isLoading, isAdding } = status;

    const getTotalClaps = async (blogId: string) => {
        dispatch({ type: ClapActionTypes.STATUS_ISLOADING });
        const res = await getTotalClapService(blogId);
        if (!res.success) {
            dispatch({ type: ClapActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: ClapActionTypes.GET_ALL_CLAP, payload: res.data });
        return res;
    };

    const addClap = async (blogId: string) => {
        dispatch({ type: ClapActionTypes.STATUS_ISADDING });
        const res = await createClapService(blogId);
        if (!res.success) {
            dispatch({ type: ClapActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: ClapActionTypes.ADD_CLAP, payload: res.data });
        return res;
    };

    const value = {
        state,
        dispatch,
        isAdding,
        isLoading,
        claps,
        error,
        getTotalClaps,
        addClap,
    };
    return (
        <clapContext.Provider value={value}>{children}</clapContext.Provider>
    );
}

function useClap() {
    const context = useContext(clapContext);
    if (!context) {
        throw new Error("useClap must be used within a ClapContextProvider");
    }
    return context;
}

export { ClapContextProvider, useClap };
