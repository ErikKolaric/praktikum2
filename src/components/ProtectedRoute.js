import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="layout p-2">
      <div className="header bg-white p-2 flex justify-between items-center">
        <h2 className="cursor-pointer" onClick={() => navigate("/")}>
          <strong className="text-primary">BarberShop</strong>
        </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <i className="ri-shield-user-line"></i>
              <h3
                className="uppercase cursor-pointer underline"
                onClick={() => {
                  if (user.role === "admin") navigate("/admin");
                  else navigate("/profile");
                }}
              >
                {user?.name}
              </h3>
            </div>
            {!user && 
              <button className="cursor-pointer transparent " onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}>LOGIN</button>  
            }
            {user && 
              <i
                className="ri-logout-box-r-line"
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
              ></i>
            }
          </div>
      </div>
      <div className="content my-1">{children}</div>
    </div>
  );
};

export default ProtectedRoute;
