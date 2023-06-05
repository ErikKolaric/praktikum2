import { Button, Dropdown } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const items = [
    {
      key: "1",
      label: (
        <li>
          <button
            className="transparent cursor-pointer"
            onClick={() => navigate("/")}
          >
            HOME
          </button>
        </li>
      ),
    },
    {
      key: "2",
      label: (
        <li>
          <button
            className="transparent cursor-pointer"
            onClick={() => navigate("/barbers")}
          >
            BOOK
          </button>
        </li>
      ),
    },
    {
      key: "3",
      label: (
        <li>
          <button
            className="transparent cursor-pointer"
            onClick={() => navigate("/about")}
          >
            ABOUT US
          </button>
        </li>
      ),
    },
    {
      key: "4",
      label: (
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
      ),
    },
    {
      key: "5",
      label: (
        <li>
          {!user && (
            <button
              className="cursor-pointer text-center transparent "
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
            >
              <span>LOGOUT</span>
            </i>
          )}
        </li>
      ),
    },
  ];

  return (
    <div className="layout mx-auto">
      <div className="header bg-brown p-2 flex justify-between items-center">
        <h1 className="flex items-center gap-1">
          <img src={logo} alt="Logo" width="50" height="50" />
          <strong className="logo">MEN'S SALON REO</strong>
        </h1>
        <div>
          <Dropdown
            className="dropdown bg-brown"
            menu={{
              items,
            }}
            placement="bottomRight"
          >
            <Button className="bg-dark-brown">
              <svg
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-20.79 -20.79 338.58 338.58"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g>
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M280.214,39.211H16.786C7.531,39.211,0,46.742,0,55.997v24.335c0,9.256,7.531,16.787,16.786,16.787h263.428 c9.255,0,16.786-7.531,16.786-16.787V55.997C297,46.742,289.469,39.211,280.214,39.211z"></path>{" "}
                        <path d="M280.214,119.546H16.786C7.531,119.546,0,127.077,0,136.332v24.336c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.336C297,127.077,289.469,119.546,280.214,119.546z"></path>{" "}
                        <path d="M280.214,199.881H16.786C7.531,199.881,0,207.411,0,216.668v24.335c0,9.255,7.531,16.786,16.786,16.786h263.428 c9.255,0,16.786-7.531,16.786-16.786v-24.335C297,207.411,289.469,199.881,280.214,199.881z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </Button>
          </Dropdown>
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
                BOOK
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
        <div className="flex login items-center gap-3">
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
            >
              LOGOUT
            </i>
          )}
        </div>
      </div>
      <div className="content">{children}</div>
      <div className="h-300 bg-white text-center py-3">FOOTER</div>
    </div>
  );
};

export default ProtectedRoute;
