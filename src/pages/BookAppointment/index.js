import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom/dist";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetBarberById } from "../../apicalls/barbers";
import { message } from "antd";
import moment from "moment";
import { BookBarberAppointment, GetBarberAppointmentsOnDate } from "../../apicalls/appointments";

function BookAppointment() {
  const [problem="", setProblem] = useState("")
  const [date = "", setDate] = useState("");
  const [barber, setBarber] = useState(null);
  const [selectedSlot = "", setSelectedSlot] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookedSlots = [], setBookedSlots] = useState([])

  const getData = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetBarberById(id);
      if (response.success) {
        setBarber(response.data);
      } else {
        message.error(response.message);
      }

      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };

  const getSlotsData = () => {
    const day = moment(date).format("dddd");
    if (!barber.days.includes(day)) {
      return (
        <h3>Barber is not available on {moment(date).format("DD-MM-YYYY")}</h3>
      );
    }

    let startTime = moment(barber.startTime, "HH:mm");
    let endTime = moment(barber.endTime, "HH:mm");
    let slotDuration = 30; 
    const slots = [];
    while (startTime < endTime) {
      slots.push(startTime.format("HH:mm"));
      startTime.add(slotDuration, "minutes");
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots.find(
        (bookedSlot) => bookedSlot.slot === slot && bookedSlot.status !== "cancelled"
      )
      return (
        <div
          className="bg-white p-1 curser-pointer w-100 text-center"
          onClick={() => setSelectedSlot(slot)}
          style={{
            border:
              selectedSlot === slot ? "3px solid green" : "1px solid gray",
            backgroundColor: isBooked ? "#d6d6d6" : "white" ,
            pointerEvents: isBooked ? "none" : "auto",
            cursor: isBooked ? "not-allowed" : "pointer"
          }}
        >
          <span>
            {moment(slot, "HH:mm A").format("hh:mm")} -{" "}
            {moment(slot, "HH:mm A")
              .add(slotDuration, "minutes")
              .format("hh:mm")}
          </span>
        </div>
      );
    });
  };
  const onBookAppointment = async()  => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        barberId: barber.id,
        userId : JSON.parse(localStorage.getItem("user")).id,
        date,
        slot : selectedSlot,
        barberName : `${barber.firstName} ${barber.lastName}`,
        userName : JSON.parse(localStorage.getItem("user")).name,
        bookedOn : moment().format("DD-MM-YYYY hh:mm A"),
        problem,
        status: "pending"
      };
      const response = await BookBarberAppointment(payload);
      if (response.success) {
        message.success(response.message);
        navigate("/profile");
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    }
      catch (error){
        message.error(error.message);
        dispatch(ShowLoader(false));
      }

  }
  const getBookedSlots = async() => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetBarberAppointmentsOnDate(id, date)
      dispatch(ShowLoader(false))
      if(response.success) {
        console.log(response.data)
        setBookedSlots(response.data)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }
  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    if(date) {
      getBookedSlots()
    }
  }, [date])

  return (
    barber && (
      <div className="bg-white p-2">
        <h1 className="uppercase my-1">
          <b>
            {barber?.firstName} {barber?.lastName}
          </b>
        </h1>

        <hr />

        <div className="flex flex-col gap-1 my-1 w-half">
          <div className="flex justify-between w-full">
            <h4>
              <b>Experience:</b>
            </h4>
            <h4>
              {barber.experience}
              Years
            </h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Email:</b>
            </h4>
            <h4>{barber.email}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Phone:</b>
            </h4>
            <h4>{barber.phone}</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4>
              <b>Address:</b>
            </h4>
            <h4>{barber.adress}</h4>
          </div>
          {/* <div className="flex justify-between w-full">
            <h4>
              <b>Fee:</b>
            </h4>
            <h4>{barber.fee}€ Per Session</h4>
          </div> */}
          <div className="flex justify-between w-full">
            <h4>
              <b>Days Available:</b>
            </h4>
            <h4>{barber.days.join(", ")}</h4>
          </div>
        </div>

        <hr />

        {/* slots here */}
        <div className="flex flex-col gap-1 my-2">
          <div className="flex gap-2 w-400 items-end">
            <div>
              <span>Select date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format("DD-MM-YYYY")}
              />
            </div>
          </div>
          <div className="flex gap-2 scroll-horizontal">{date && getSlotsData()}</div>

          {selectedSlot && (
            <div>
              <textarea 
                placeholder="What do you need?" 
                value={problem} 
                onChange={(e) => setProblem(e.target.value)} 
                rows="10"></textarea>
              <div className="flex gap-2 justify-center my-3">
                <button
                  className="outlined-btn"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Cancel
                </button>
              
                <button className="contained-btn" onClick={onBookAppointment}>Book Appointment</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
}

export default BookAppointment;
