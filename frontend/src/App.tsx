import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
import NewStory from "./components/NewStory";
import Blogs from "./components/Blogs";
import SingleBlog from "./components/SingleBlog";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signin" element={<LandingPage />} />
                    <Route path="/signup" element={<LandingPage />} />
                    <Route
                        element={
                            <>
                                <Layout />
                            </>
                        }
                    >
                        <Route
                            index
                            element={<Navigate replace to="/blog" />}
                        />
                        <Route path="/blog" element={<Blogs />} />
                        <Route path="new-story" element={<NewStory />} />
                        <Route
                            path={`/blog/:blogId`}
                            element={<SingleBlog />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 1500,
                    },
                    error: {
                        duration: 2500,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "white",
                        color: "gray",
                    },
                }}
            />
        </div>
    );
}

export default App;
