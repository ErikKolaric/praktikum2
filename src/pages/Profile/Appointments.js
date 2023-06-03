import { message, Table } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  GetBarberAppointments,
  GetUserAppointments,
  UpdateAppointmentStatus,
} from "../../apicalls/appointments";
import { ShowLoader } from "../../redux/loaderSlice";
import emailjs from "@emailjs/browser";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getData = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "barber") {
      const response = await GetBarberAppointments(user.id);
      if (response.success) {
        setAppointments(response.data);
      }
    } else {
      const response = await GetUserAppointments(user.id);
      if (response.success) {
        setAppointments(response.data);
      }
    }
  };

  const onUpdate = async (id, status) => {
    try {
      dispatch(ShowLoader(true));
      const response = await UpdateAppointmentStatus(id, status);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qu3x28k",
        "cancel_booking",
        e.target,
        "LWe-UrSziUXrStoT7"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Time",
      dataIndex: "slot",
    },
    {
      title: "Barber",
      dataIndex: "barberName",
    },
    {
      title: "User",
      dataIndex: "userName",
    },
    {
      title: "Booked At",
      dataIndex: "bookedOn",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (record.status === "approved" && user.role === "barber") {
          return (
            <div className="flex">
              {console.log(record)}
              <form className="mx-auto" ref={form} onSubmit={sendEmail}>
                <input
                  placeholder="BARBER"
                  className="none"
                  type="text"
                  name="barberName"
                  value={record.barberName}
                />
                <input
                  placeholder="BOOKED ON"
                  className="none"
                  type="text"
                  name="bookedOn"
                  value={record.bookedOn}
                />
                <input
                  placeholder="DATE"
                  className="none"
                  type="text"
                  name="date"
                  value={record.date}
                />
                <input
                  placeholder="SLOT"
                  className="none"
                  type="text"
                  name="slot"
                  value={record.slot}
                />
                <input
                  placeholder="EMAIL"
                  className="none"
                  type="email"
                  name="email"
                  value={record.email}
                />
                <input
                  placeholder="NAME"
                  className="none"
                  type="text"
                  name="userName"
                  value={record.userName}
                />
                <input
                  type="submit"
                  placeholder="Cancel"
                  className="cursor-pointer"
                  value="CANCEL"
                  onClick={() => onUpdate(record.id, "cancelled")}
                />
                {console.log(form)}
              </form>
            </div>
          );
        }
        // if (record.status === "cancelled" && user.role === "barber") {
        //   return (
        //     <div className="flex gap-1">
        //       <span
        //         className="underline cursor-pointer"
        //         onClick={() => onUpdate(record.id, "approved")}
        //       >
        //         Approve
        //       </span>
        //     </div>
        //   );
        // }
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={appointments} />
    </div>
  );
}

export default Appointments;
