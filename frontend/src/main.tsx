import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BlogContextProvider } from "./context/useBlog.tsx";
import { CommentContextProvider } from "./context/useComments.tsx";
import { ClapContextProvider } from "./context/useClap.tsx";
import { AuthContextProvider } from "./context/useAuth.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthContextProvider>
            <BlogContextProvider>
                <CommentContextProvider>
                    <ClapContextProvider>
                        <App />
                    </ClapContextProvider>
                </CommentContextProvider>
            </BlogContextProvider>
        </AuthContextProvider>
    </StrictMode>
);
