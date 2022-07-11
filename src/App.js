import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Login } from "./components/Login/Login";
import { Routes, Route } from "react-router-dom";
import { Timezones } from "./components/Timezone/Timezone";
import SignUp from "./components/Signup/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext, useState } from "react";
import UserContext from "./Context/userContext";
import Users from "./components/Users/Users";
import AppNav from "./core/Navbar/Navbar";

function App() {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="colored"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AppNav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="timezone" element={<Timezones />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
