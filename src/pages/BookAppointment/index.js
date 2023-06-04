import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom/dist";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetBarberById } from "../../apicalls/barbers";
import { message } from "antd";
import moment from "moment";
import {
  BookBarberAppointment,
  GetBarberAppointmentsOnDate,
} from "../../apicalls/appointments";
import emailjs from "@emailjs/browser";

function BookAppointment() {
  const [service = "", setService] = useState("");
  const [userName = "", setUserName] = useState("");
  const [email = "", setEmail] = useState("");
  const [phoneNumber = "", setPhoneNumber] = useState("");
  const [cardNumber = "", setCardNumber] = useState("");
  const [description = "", setDescription] = useState("");

  const [date = "", setDate] = useState("");
  const [barber, setBarber] = useState(null);
  const [selectedSlot = "", setSelectedSlot] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [bookedSlots = [], setBookedSlots] = useState([]);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qu3x28k",
        "contact_form",
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
        (bookedSlot) =>
          bookedSlot.slot === slot && bookedSlot.status !== "cancelled"
      );
      return (
        <div>
          <div
            className="bg-white p-1 curser-pointer w-100 text-center"
            onClick={() => setSelectedSlot(slot)}
            style={{
              border:
                selectedSlot === slot ? "3px solid green" : "1px solid gray",
              backgroundColor: isBooked ? "#d6d6d6" : "white",
              pointerEvents: isBooked ? "none" : "auto",
              cursor: isBooked ? "not-allowed" : "pointer",
            }}
          >
            <span>
              {moment(slot, "HH:mm A").format("hh:mm")} -{" "}
              {moment(slot, "HH:mm A")
                .add(slotDuration, "minutes")
                .format("hh:mm")}
            </span>
          </div>
        </div>
      );
    });
  };

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true));
      const payload = {
        barberId: barber.id,
        userId: 1, // vredo je tak hmmm :P
        date,
        slot: selectedSlot,
        barberName: `${barber.firstName} ${barber.lastName}`,
        service,
        userName,
        email,
        phoneNumber,
        cardNumber,
        bookedOn: moment().format("DD-MM-YYYY hh:mm A"),
        description,
        status: "approved",
      };
      const response = await BookBarberAppointment(payload);
      if (response.success) {
        message.success(response.message);
        navigate("/");
      } else {
        message.error(response.message);
      }
      dispatch(ShowLoader(false));
    } catch (error) {
      message.error(error.message);
      dispatch(ShowLoader(false));
    }
  };
  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetBarberAppointmentsOnDate(id, date);
      dispatch(ShowLoader(false));
      if (response.success) {
        console.log(response.data);
        setBookedSlots(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(ShowLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  useEffect(() => {
    if (date) {
      getBookedSlots();
    }
  }, [date]);

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
          <div className="flex justify-between w-full">
            <h4>
              <b>Speciality:</b>
            </h4>
            <h4>{barber.speciality}</h4>
          </div>
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
          <div className="flex gap-2 scroll-horizontal">
            {date && getSlotsData()}
          </div>

          {selectedSlot && (
            <form
              className="w-600 my-3 mx-auto"
              ref={form}
              onSubmit={sendEmail}
            >
              <input
                className="none"
                type="text"
                name="barber"
                value={barber.firstName + " " + barber.lastName}
              />
              <input className="none" type="text" name="date" value={date} />
              <input
                className="none"
                type="text"
                name="selectedSlot"
                value={selectedSlot}
              />
              <label>Service:</label>
              <select
                name="service"
                id="service"
                onChange={(e) => setService(e.target.value)}
              >
                <option></option>
                {barber.services.map((serv) => (
                  <option value={serv.service}>
                    {serv.service} ({serv.price}€)
                  </option>
                ))}
              </select>
              <label>Name:</label>
              <input
                type="text"
                value={userName}
                name="userName"
                onChange={(e) => setUserName(e.target.value)}
              />{" "}
              <label>Email:</label>
              <input
                type="text"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              <label>Phone Number:</label>
              <input
                type="number"
                value={phoneNumber}
                name="phoneNumber"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />{" "}
              <label>Message:</label>
              <textarea
                placeholder="What do you need?"
                value={description}
                name="message"
                onChange={(e) => setDescription(e.target.value)}
                rows="10"
              ></textarea>
              <label>Card Number:</label>
              <input
                type="number"
                value={cardNumber}
                name="cardNumber"
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                className="contained-btn"
                type="submit"
                onClick={onBookAppointment}
                placeholder="Book Appointment"
              />
            </form>
          )}
        </div>
      </div>
    )
  );
}

export default BookAppointment;
