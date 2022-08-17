import React from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./contexts/AuthContext";
import AppRouter from "./app-router/AppRouter";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
