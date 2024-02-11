import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./routes/protected_route";
import Cookies from "js-cookie";
import { clrUser } from "./redux/auth_store";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";

const App = () => {
  const auth = useSelector((state) => state.auth);
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
      <div className="flex">
        {auth.user && <MenuBar />}

        <Routes>
          <Route path="/login" element={<Login />} />

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
