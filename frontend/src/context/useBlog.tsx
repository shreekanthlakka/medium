import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
    BlogFormData,
    createBlogService,
    getAllBlogsService,
    getSingleBlogService,
} from "../services/blogService";

enum BlogActionTypes {
    GET_ALL_POSTS = "GET_ALL_POSTS",
    CREATE_POST = "CREATE_POST",
    DELETE_POST = "DELETE_POST",
    EDIT_POST = "EDIT_POST",
    STATUS_ISLOADING = "STATUS_ISLOADING",
    STATUS_ISADDING = "STATUS_ISADDING",
    STATUS_ISDELETING = "STATUS_ISDELETING",
    STATUS_ISEDITING = "STATUS_ISEDITING",
    ERROR = "ERROR",
    SELECTED_BLOG_ID = "SELECTED_BLOG_ID",
    CLEAR_BLOG_ID = "CLEAR_BLOG_ID",
    GET_BLOG_BY_ID = "GET_BLOG_BY_ID",
}

interface GetSelectedBlogById {
    type: BlogActionTypes.GET_BLOG_BY_ID;
    payload: Blog;
}

interface SelectedBlogId {
    type: BlogActionTypes.SELECTED_BLOG_ID;
    payload: string;
}
interface ClearBlogId {
    type: BlogActionTypes.CLEAR_BLOG_ID;
}

interface GetAllPostsAction {
    type: BlogActionTypes.GET_ALL_POSTS;
    payload: Blog[];
}

interface CreatePostAction {
    type: BlogActionTypes.CREATE_POST;
    payload: Blog;
}

interface DeletePostAction {
    type: BlogActionTypes.DELETE_POST;
    payload: string; // ID of the blog to delete
}

interface EditPostAction {
    type: BlogActionTypes.EDIT_POST;
    payload: Blog;
}

interface StatusIsLoadingAction {
    type: BlogActionTypes.STATUS_ISLOADING;
}

interface StatusIsAddingAction {
    type: BlogActionTypes.STATUS_ISADDING;
}

interface StatusIsDeletingAction {
    type: BlogActionTypes.STATUS_ISDELETING;
}

interface StatusIsEditingAction {
    type: BlogActionTypes.STATUS_ISEDITING;
}

interface ErrorAction {
    type: BlogActionTypes.ERROR;
    payload: Record<string, unknown>;
}

// Union of all action types
type Action =
    | GetAllPostsAction
    | CreatePostAction
    | DeletePostAction
    | EditPostAction
    | StatusIsLoadingAction
    | StatusIsAddingAction
    | StatusIsDeletingAction
    | StatusIsEditingAction
    | ErrorAction
    | SelectedBlogId
    | ClearBlogId
    | GetSelectedBlogById;

interface Status {
    isLoading: boolean;
    isAdding: boolean;
    isEditing: boolean;
    isDeleting: boolean;
}

interface Blog {
    id: string;
    title: string;
    content: string;
    published?: boolean;
    authorId?: string;
}

interface State {
    blogs: Blog[];
    status: Status;
    error: Record<string, unknown> | null;
    selectedBlogId: string | null;
    selectedBlog: Blog | null;
}

// interface Action {
//     type: string;
//     payload?: Blog | Record<string, unknown> | string;
// }

interface BlogContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    blogs: Blog[];
    error: Record<string, unknown> | null;
    isAdding: boolean;
    isDeleting: boolean;
    isEditing: boolean;
    isLoading: boolean;
    createBlog: (formData: Blog) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Blog;
    }>;
    getAllBlogs: () => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Blog[];
    }>;
    selectedBlogId: string | null;
    selectedBlog: Blog | null;
    getBlogById: (blogId: string) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Blog;
    }>;
}

const initialStatus = {
    isLoading: false,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
};

const initialState = {
    blogs: [],
    status: initialStatus,
    error: null,
    selectedBlogId: null,
    selectedBlog: null,
};

const blogContext = createContext<BlogContextProps | undefined>(undefined);

function blogReducer(state: State, action: Action) {
    switch (action.type) {
        case BlogActionTypes.STATUS_ISLOADING:
            return {
                ...state,
                status: { ...state.status, isLoading: true },
                error: null,
            };
        case BlogActionTypes.GET_ALL_POSTS:
            return {
                ...state,
                status: { ...initialStatus },
                blogs: action.payload,
            };
        case BlogActionTypes.STATUS_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                error: null,
            };
        case BlogActionTypes.CREATE_POST:
            return {
                ...state,
                status: { ...state.status, isAdding: false },
                blogs: [...state.blogs, action.payload],
            };
        case BlogActionTypes.STATUS_ISDELETING:
            return {
                ...state,
                status: { ...state.status, isDeleting: true },
                error: null,
            };
        case BlogActionTypes.DELETE_POST:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                blogs: state.blogs.filter((ele) => {
                    return ele.id !== action.payload;
                }),
            };
        case BlogActionTypes.STATUS_ISEDITING:
            return {
                ...state,
                status: { ...state.status, isEditing: true },
                error: null,
            };
        case BlogActionTypes.EDIT_POST:
            return {
                ...state,
                status: { ...state.status, isEditing: false },
                blogs: state.blogs.map((ele) => {
                    return ele.id === action.payload.id ? action.payload : ele;
                }),
            };
        case BlogActionTypes.ERROR:
            return {
                ...state,
                status: { ...initialStatus },
                error: action.payload,
            };
        case BlogActionTypes.SELECTED_BLOG_ID:
            return {
                ...state,
                selectedBlogId: action.payload,
            };
        case BlogActionTypes.CLEAR_BLOG_ID:
            return {
                ...state,
                selectedBlogId: null,
                selectedBlog: null,
            };
        case BlogActionTypes.GET_BLOG_BY_ID:
            return {
                ...state,
                status: { ...state.status, isLoading: false },
                selectedBlog: action.payload,
            };

        default:
            return state;
    }
}

function BlogContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    const { blogs, status, error, selectedBlogId, selectedBlog } = state;
    const { isAdding, isDeleting, isEditing, isLoading } = status;

    const createBlog = async (blog: BlogFormData) => {
        dispatch({ type: BlogActionTypes.STATUS_ISADDING });
        const res = await createBlogService(blog);
        if (!res.success) {
            dispatch({
                type: BlogActionTypes.ERROR,
                payload: { message: res.message, statusCode: res.statusCode },
            });
            return res;
        }
        dispatch({ type: BlogActionTypes.CREATE_POST, payload: res.data });
        return res;
    };

    const getAllBlogs = async () => {
        dispatch({ type: BlogActionTypes.STATUS_ISLOADING });
        const res = await getAllBlogsService();
        if (!res.success) {
            dispatch({
                type: BlogActionTypes.ERROR,
                payload: { message: res.message, statusCode: res.statusCode },
            });
            return res;
        }
        dispatch({ type: BlogActionTypes.GET_ALL_POSTS, payload: res.data });
        return res;
    };

    const getBlogById = async (blogId: string) => {
        dispatch({ type: BlogActionTypes.STATUS_ISLOADING });
        const res = await getSingleBlogService(blogId);
        if (!res.success) {
            dispatch({ type: BlogActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: BlogActionTypes.GET_BLOG_BY_ID, payload: res.data });
        return res;
    };

    const value = {
        state,
        dispatch,
        createBlog,
        getAllBlogs,
        blogs,
        isAdding,
        isDeleting,
        isEditing,
        isLoading,
        error,
        selectedBlogId,
        getBlogById,
        selectedBlog,
    };

    return (
        <blogContext.Provider value={value}>{children}</blogContext.Provider>
    );
}

function useBlog() {
    const context = useContext(blogContext);
    if (!context) {
        throw new Error("useBlog must be used within a BlogContextProvider");
    }
    return context;
}

export { BlogContextProvider, useBlog, BlogActionTypes };
