import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";
import BarberForm from "../BarberForm";
import moment from "moment/moment";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Tabs>
        <Tabs.Pane tab="Appointments" key="2">
          <Appointments />
        </Tabs.Pane>
        <Tabs.Pane tab="Profile" key="1">
          {user.role === "barber" && <BarberForm />}
          {user.role !== "barber" && <div
            className="my-1 bg-white p-1 flex flex-col gap-1"> 
           <div className=".flex.gap-2">
            <h4>
              <b>
                Name : {user.name}
              </b>
            </h4>
           </div>
           <div className=".flex.gap-2">
            <h4>
              <b>
                Email : {user.email}
              </b>
            </h4>
           </div>
           <div className=".flex.gap-2">
            <h4>
              <b>
                Created on : {
                  moment(user?.createdAt).format("DD-MM-YYYY hh:mm A")
                }
              </b>
            </h4>
           </div>
            </div>}
        </Tabs.Pane>
      </Tabs>
    </div>
  );
};

export default Profile;
