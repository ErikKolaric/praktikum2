import { Col, Row, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ShowLoader } from "../../redux/loaderSlice";
import { GetAllBarbers } from "../../apicalls/barbers";

const Home = () => {
  const [filter, setFilter] = useState("")
  const [barbers = [], setBarbers] = useState([]);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  }

  const getData = async () => {
    try {
      dispatch(ShowLoader(true));
      const response = await GetAllBarbers();
      if (response.success) {
        setBarbers(response.data);
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
  }, []);

  const navigate = useNavigate();

  const barbersFilter = barbers.filter((barber) => {
    if(barber.role === filter) {
        return barber;
    } else if(filter === "all") {
        return barber
    }
  });

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <input placeholder="Search barbers" className="w-400 rounded" />
        </div>
        <div className="flex">
        <label for="services">Filter by services:</label>
          <select name="services" id="services" onChange={handleChangeFilter}>
            <option value="all">All</option>
            <option value="hair">Hair</option>
            <option value="beard">Beard</option>
            <option value="face">Face</option>
          </select>
        </div>
        {user.role !== "barber" && (
          <button
            className="outlined-btn"
            onClick={() => navigate("/apply-barber")}
          >
            Apply Barber
          </button>
        )}
      </div>
      <div>
        <Row gutter={[16, 16]} className="my-1">
          {barbersFilter.map((barber) => {
            return (
              <Col span={8}>
                {console.log(barber)}
                <div
                  className="bg-white p-1 flex-col gap-1 cursor-pointer"
                  onClick={() => navigate(`/book-appointment/${barber.id}`)}
                >
                  <div className="flex justify-between w-full">
                    <h2 className="uppercase">
                      {barber.firstName} {barber.lastName}
                    </h2>
                  </div>
                  <br />
                  <hr />
                  <br />
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
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Home;
