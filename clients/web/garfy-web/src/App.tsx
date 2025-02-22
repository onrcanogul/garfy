import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/Header";
import Blog from "./screens/BlogScreen";
import SocialMedia from "./screens/SocialMediaScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Login from "./screens/Login";
import ProtectedRoute from "./screens/ProtectedRoute";
import Register from "./screens/RegisterScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/blog" element={<Blog />} />
        <Route path="/social-media" element={<SocialMedia />} />
        <Route path="/profile/:username" element={<ProfileScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/settings" element={<SettingsScreen />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
