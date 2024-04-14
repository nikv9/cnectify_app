import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useRoutes } from "react-router-dom";
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

const App = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [dispatch, navigate]);

  return (
    <div className="app">
      <Header />
      <div className="flex">
        {auth.user && <MenuBar />}

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
        </Routes>
      </div>
    </div>
  );
};

export default App;
