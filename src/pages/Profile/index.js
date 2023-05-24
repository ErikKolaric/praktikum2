import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";
import BarberForm from "../BarberForm";

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
        </Tabs.Pane>
      </Tabs>
    </div>
  );
};

export default Profile;
