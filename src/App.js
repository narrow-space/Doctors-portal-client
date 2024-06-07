import "./App.css";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import About from "./Pages/About/About";
import Footer from "./Pages/Shared/Footer/Footer";
import Appiontment from "./Pages/Appionment/Appiontment";
import Register from "./Pages/Register/Register";
import RequireAuth from "./Pages/Login/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Myreviews from "./Pages/Dashboard/Myreviews";
import Myappiontments from "./Pages/Dashboard/Myappiontments";

import MyHistory from "./Pages/Dashboard/MyHistory/MyHistory";
import "react-day-picker/dist/style.css";
import Alluser from "./Pages/Dashboard/Alluser";
import RequireAdmin from "./Pages/Login/RequireAdmin";
import Userinfo from "./Pages/Dashboard/Userinfo";
import { useState } from "react";
function App() {
  const [theme, setTheme] = useState(" ");
  return (
    <div className="bg:light dark:bg-black dark:text-white">
      <Navbar setTheme={setTheme} theme={theme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/appiontment"
          element={
            <RequireAuth>
              <Appiontment setTheme={setTheme} theme={theme} />
            </RequireAuth>
          }
        />

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Myappiontments></Myappiontments>}></Route>
          <Route path="review" element={<Myreviews />}></Route>
          <Route path="history" element={<MyHistory />}></Route>

          <Route
            path="alluser"
            element={
              <RequireAdmin>
                <Alluser />
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="userinfo"
            element={
              <RequireAdmin>
                <Userinfo />
              </RequireAdmin>
            }
          ></Route>
        </Route>

        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
