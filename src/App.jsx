import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import CreatePostPage from "./pages/CreatePostPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
