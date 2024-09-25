import React, { createContext, Dispatch, useContext, useReducer } from "react";
import {
    createCommentService,
    deleteCommentService,
    editCommentService,
    getAllCommentsByBlogIdService,
} from "../services/commentService";

const initialStatus = {
    isFetching: false,
    isAdding: false,
    isEditing: false,
    isDeleting: false,
};

enum CommentActionTypes {
    STATUS_ISFETCHING = "STATUS_ISFETCHING",
    STATUS_ISADDING = "STATUS_ISADDING",
    STATUS_ISEDITING = "STATUS_ISEDITING",
    STATUS_ISDELETING = "STATUS_ISDELETING",

    GET_ALL_COMMENTS = "GET_ALL_COMMENTS",
    ADD_COMMENT = "ADD_COMMENT",
    EDIT_COMMENT = "EDIT_COMMENT",
    REMOVE_COMMENT = "REMOVE_COMMENT",
    ERROR = "ERROR",
}
interface GetAllCommentsAction {
    type: CommentActionTypes.GET_ALL_COMMENTS;
    payload: Comment[];
}

interface AddCommentAction {
    type: CommentActionTypes.ADD_COMMENT;
    payload: Comment;
}
interface EditCommentAction {
    type: CommentActionTypes.EDIT_COMMENT;
    payload: Comment;
}

interface DeleteCommentAction {
    type: CommentActionTypes.REMOVE_COMMENT;
    payload: string;
}

interface StatusIsFetchingAction {
    type: CommentActionTypes.STATUS_ISFETCHING;
}
interface StatusIsAddingAction {
    type: CommentActionTypes.STATUS_ISADDING;
}
interface StatusIsEditAction {
    type: CommentActionTypes.STATUS_ISEDITING;
}

interface StatusIsDeletingAction {
    type: CommentActionTypes.STATUS_ISDELETING;
}
interface ErrorAction {
    type: CommentActionTypes.ERROR;
    payload: Record<string, unknown> | null;
}

type Action =
    | GetAllCommentsAction
    | AddCommentAction
    | EditCommentAction
    | DeleteCommentAction
    | StatusIsFetchingAction
    | StatusIsAddingAction
    | StatusIsEditAction
    | StatusIsDeletingAction
    | ErrorAction;

interface Status {
    isFetching: boolean;
    isAdding: boolean;
    isEditing: boolean;
    isDeleting: boolean;
}

const initialState = {
    comments: [],
    status: initialStatus,
    error: null,
    selectedCommentId: null,
};

interface Comment {
    id: string;
    comment: string;
    userId: string;
    blogId: string;
}

interface State {
    comments: Comment[];
    status: Status;
    error: Record<string, unknown> | null;
    selectedCommentId: string | null;
}

interface CommentContextProps {
    state: State;
    dispatch: Dispatch<Action>;
    comments: Comment[];
    error: Record<string, unknown> | null;
    isAdding: boolean;
    isEditing: boolean;
    isFetching: boolean;
    isDeleting: boolean;
    createComment: (
        blogId: string,
        formData: { comment: string }
    ) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Comment;
    }>;
    getAllComments: (blogId: string) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Comment[];
    }>;
    editComment: (
        blogId: string,
        commentId: string,
        formData: { comment: string }
    ) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Comment;
    }>;
    deleteComment: (
        blogId: string,
        commentId: string
    ) => Promise<{
        success: boolean;
        message: string;
        error?: Record<string, unknown> | null;
        data?: Comment;
    }>;
}

const commentContext = createContext<CommentContextProps | undefined>(
    undefined
);

function commentReducer(state: State, action: Action): State {
    switch (action.type) {
        case CommentActionTypes.STATUS_ISFETCHING:
            return {
                ...state,
                status: { ...state.status, isFetching: true },
                error: null,
            };
        case CommentActionTypes.GET_ALL_COMMENTS:
            return {
                ...state,
                status: { ...state.status, isFetching: false },
                comments: action.payload,
            };
        case CommentActionTypes.STATUS_ISADDING:
            return {
                ...state,
                status: { ...state.status, isAdding: true },
                error: null,
            };
        case CommentActionTypes.ADD_COMMENT:
            return {
                ...state,
                status: { ...state.status, isAdding: false },
                comments: [...state.comments, action.payload],
            };
        case CommentActionTypes.STATUS_ISEDITING:
            return {
                ...state,
                status: { ...state.status, isEditing: true },
                error: null,
            };
        case CommentActionTypes.EDIT_COMMENT:
            return {
                ...state,
                status: { ...state.status, isEditing: false },
                comments: state.comments.map((ele) =>
                    ele.id === action.payload.id
                        ? { ...action.payload }
                        : { ...ele }
                ),
            };
        case CommentActionTypes.STATUS_ISDELETING:
            return {
                ...state,
                status: { ...state.status, isDeleting: true },
                error: null,
            };
        case CommentActionTypes.REMOVE_COMMENT:
            return {
                ...state,
                status: { ...state.status, isDeleting: false },
                comments: state.comments.filter(
                    (ele) => ele.id !== action.payload
                ),
            };
        case CommentActionTypes.ERROR:
            return {
                ...state,
                status: { ...initialStatus },
                error: action.payload,
            };
        default:
            return state;
    }
}

function CommentContextProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(commentReducer, initialState);

    const { comments, status, error } = state;
    const { isAdding, isEditing, isDeleting, isFetching } = status;

    const createComment = async (
        blogId: string,
        formData: { comment: string }
    ) => {
        dispatch({ type: CommentActionTypes.STATUS_ISADDING });

        const res = await createCommentService(blogId, formData);
        if (!res.success) {
            dispatch({ type: CommentActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({
            type: CommentActionTypes.ADD_COMMENT,
            payload: res.data,
        });
        return res;
    };

    const getAllComments = async (blogId: string) => {
        dispatch({ type: CommentActionTypes.STATUS_ISFETCHING });
        const res = await getAllCommentsByBlogIdService(blogId);
        if (!res.success) {
            dispatch({ type: CommentActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({
            type: CommentActionTypes.GET_ALL_COMMENTS,
            payload: res.data,
        });
        return res;
    };

    const editComment = async (
        blogId: string,
        commentId: string,
        formData: { comment: string }
    ) => {
        dispatch({ type: CommentActionTypes.STATUS_ISEDITING });
        const res = await editCommentService(blogId, commentId, formData);
        if (!res.success) {
            dispatch({ type: CommentActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({ type: CommentActionTypes.EDIT_COMMENT, payload: res.data });
        return res;
    };
    const deleteComment = async (blogId: string, commentId: string) => {
        dispatch({ type: CommentActionTypes.STATUS_ISDELETING });
        const res = await deleteCommentService(blogId, commentId);
        if (!res.success) {
            dispatch({ type: CommentActionTypes.ERROR, payload: res.error });
            return res;
        }
        dispatch({
            type: CommentActionTypes.REMOVE_COMMENT,
            payload: res.data.id,
        });
        return res;
    };

    const value = {
        state,
        dispatch,
        comments,
        error,
        isAdding,
        isDeleting,
        isEditing,
        isFetching,
        createComment,
        editComment,
        getAllComments,
        deleteComment,
    };
    return (
        <commentContext.Provider value={value}>
            {children}
        </commentContext.Provider>
    );
}

function useComment() {
    const context = useContext(commentContext);
    if (!context) {
        throw new Error("comment context used outside scope");
    }
    return context;
}

export { CommentContextProvider, useComment };
