import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/protected_route";
import Cookies from "js-cookie";
import { clrUser, logoutAction } from "./redux/auth_store";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import { jwtDecode } from "jwt-decode";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Friends from "./pages/friends/Friends";
import Chat from "./pages/chat/Chat";
import Dashboard from "./pages/admin/Dashboard";
import UserList from "./pages/admin/UserList";
import UserDetail from "./pages/admin/UserDetail";
import PostList from "./pages/admin/PostList";

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const route = useLocation();

  useEffect(() => {
    const initializeApp = () => {
      const token = Cookies.get("tokenId");
      const path = window.location.pathname;
      if (!token && path !== "/pass/forgot") {
        dispatch(clrUser());
        navigate("/login");
      }
      if (token) {
        const decodedToken = jwtDecode(token);
        const remainingTime = decodedToken.exp - Date.now() / 1000;
        const intervalId = setTimeout(() => {
          if (decodedToken.exp < Date.now() / 1000) {
            alert(
              '"Oops! It looks like your session has expired. Please login again.'
            );
            dispatch(logoutAction());
          }
        }, remainingTime * 1000);

        return () => {
          clearTimeout(intervalId);
        };
      }
    };
    initializeApp();
  }, []);

  return (
    <div className="app">
      <div>
        <Header />
        <div className={route.pathname !== "/chat" ? "flex" : ""}>
          {auth.user && route.pathname !== "/chat" && <MenuBar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/pass/forgot" element={<ForgotPassword />} />

            <Route
              path="/"
              element={
                <ProtectedRoute auth={auth.user}>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile/:id"
              element={
                <ProtectedRoute auth={auth.user}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/friends"
              element={
                <ProtectedRoute auth={auth.user}>
                  <Friends />
                </ProtectedRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute auth={auth.user}>
                  <Chat />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard/admin"
              element={
                <ProtectedRoute auth={auth.user} role="admin">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/admin"
              element={
                <ProtectedRoute auth={auth.user} role="admin">
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user"
              element={
                <ProtectedRoute auth={auth.user} role="admin">
                  <UserDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/posts/admin"
              element={
                <ProtectedRoute auth={auth.user} role="admin">
                  <PostList />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
