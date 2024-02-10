import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./components/route/Protected";
import Cookies from "js-cookie";
import { clrUser } from "./redux/auth_store";
import Header from "./components/Header";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenId = Cookies.get("tokenId");
    if (!tokenId) {
      dispatch(clrUser());
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <Protected auth={user}>
              <Home />
            </Protected>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <Protected auth={user}>
              <Profile />
            </Protected>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
