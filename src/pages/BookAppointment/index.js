import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/dist";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetBarberById } from "../../apicalls/barbers";
import { message } from "antd";

function BookAppointment() {
  const [barber, setBarber] = React.useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

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

  useEffect(() => {
    getData();
  }, [id]);

  //barber?.firstName nevem zakaj ze v naprej neda moznosti firstName pa lastName
  return (
    barber && (
      <div className="bg-white p-2">
        <h1 className="uppercase my-1">
          <b>{barber?.firstName} {barber?.lastName}</b>
        </h1>

        <hr />

        <div className="w-400 flex flex-col gap-1 my-1">
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
        </div>

        <hr />
      </div>
    )
  );
}

export default BookAppointment;
