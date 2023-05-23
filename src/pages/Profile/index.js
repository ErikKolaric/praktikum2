import React from "react";
import { Tabs } from "antd";
import Appointments from "./Appointments";

const Profile = () => {
    return(
        <div>
            <Tabs>
                <Tabs.Pane tab="Profile" key="1">
                    <Appointments />
                </Tabs.Pane>
                <Tabs.Pane tab="Appointments" key="2"></Tabs.Pane>
            </Tabs>
        </div>
    )
    
}

export default Profile;