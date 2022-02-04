import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./routes/home";
import Authorize from "./routes/authorize";
import Search from "./routes/search";
import Profile from "./routes/profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { UserContextProvider } from "./hooks/UserContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="authorize" element={<Authorize />} />
          <Route
            index
            element={
              <UserContextProvider>
                <Home />
              </UserContextProvider>
            }
          />
          <Route path="search" element={<Search />} />
          <Route
            path="profile"
            element={
              <UserContextProvider>
                <Profile />
              </UserContextProvider>
            }
          />
          <Route
            path="/login"
            element={
              <UserContextProvider>
                <Login />
              </UserContextProvider>
            }
          />
          <Route
            path="/signup"
            element={
              <UserContextProvider>
                <Signup />
              </UserContextProvider>
            }
          />
          <Route
            path="*"
            element={
              <main className="p-2">
                <h2 className="text-red-200">There's nothing here! :O</h2>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
