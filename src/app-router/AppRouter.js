import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuAppBar from "../components/MenuAppBar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NewBlog from "../pages/NewBlog";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import Profile from "../pages/Profile";
import UpdateBlog from "../pages/UpdateBlog";
import { AuthContext } from "../contexts/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
  }

  return (
    <div>
      <BrowserRouter>
        <MenuAppBar />

        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/newblog" element={<NewBlog />} />
          <Route path="/details/:cardId" element={<PrivateRouter />}>
            <Route path="/details/:cardId" element={<Details />} />
          </Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/update/:cardId" element={<UpdateBlog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
