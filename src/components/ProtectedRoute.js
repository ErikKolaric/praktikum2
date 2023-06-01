import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="layout">
      <div className="header bg-white p-2 flex justify-between items-center">
        <h1 className="flex items-center gap-1">
          <img src={logo} alt="Logo" width="50" height="50" />
          <strong className="">BarberShop</strong>
        </h1>
        <div>
          <ul className="nav gap-2">
            <li>
              <button
                className="transparent cursor-pointer"
                onClick={() => navigate("/")}
              >
                HOME
              </button>
            </li>
            <li>
              <button
                className="transparent cursor-pointer"
                onClick={() => navigate("/barbers")}
              >
                BARBERS
              </button>
            </li>
            <li>
              <button
                className="transparent cursor-pointer"
                onClick={() => navigate("/about")}
              >
                ABOUT US
              </button>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {user && <i className="ri-shield-user-line"></i>}
            <span
              className="uppercase cursor-pointer underline"
              onClick={() => {
                if (user.role === "admin") navigate("/admin");
                else navigate("/profile");
              }}
            >
              {user?.name}
            </span>
          </div>
          {!user && (
            <button
              className="cursor-pointer transparent "
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              LOGIN
            </button>
          )}
          {user && (
            <i
              className="ri-logout-box-r-line"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/login");
              }}
            ></i>
          )}
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
