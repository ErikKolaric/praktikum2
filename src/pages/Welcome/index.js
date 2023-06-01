import React from "react";
import piling from "../../images/piling.jpg";
import brada1 from "../../images/brada1.jpg";
import hair1 from "../../images/hair1.jpg";
import barber from "../../images/barber.jpeg";
import barber2 from "../../images/barber2.jpeg";
import barber3 from "../../images/barber3.jpeg";
import barber4 from "../../images/barber4.jpeg";
import barber5 from "../../images/barber5.jpeg";
import friz from "../../images/friz.jpeg";
import friz2 from "../../images/friz2.jpeg";
import friz3 from "../../images/friz3.jpeg";
import friz4 from "../../images/friz4.jpeg";
import friz5 from "../../images/friz5.jpeg";
import friz6 from "../../images/friz6.jpeg";
import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper shadow font-white wrapper--home mx-auto d-flex space-between align-items-center w-full">
      <div className="relative mx-auto">
        <h1 className="title p-3 absolute w-full mx-auto z">
          WELCOME TO THE BEST BARBER SALON REO
        </h1>
      </div>
      <Carousel
        className="h-700"
        effect="fade"
        autoplaySpeed={3000}
        autoplay="true"
        pauseOnHover="false"
        swipeToSlide="true"
      >
        <img className="slika" src={barber} alt="br1" />
        <img className="slika" src={barber2} alt="hair1" />
        <img className="slika" src={barber3} alt="piling" />
        <img className="slika" src={barber4} alt="piling" />
        <img className="slika" src={barber5} alt="piling" />
      </Carousel>
      <div className="py-3 mx-auto">
        <h1 className="title p-3 w-full z">LATEST WORK</h1>
        <div className="grid-container">
          <div className="grid-item">
            <img className="friz" src={friz4} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz5} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz6} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz2} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz3} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz4} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz5} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={friz6} alt="piling" />
          </div>
        </div>
        <div className="text-center">
          <h2>
            If you want to book your appointment{" "}
            <span
              className="cursor-pointer red"
              onClick={() => navigate("/barbers")}
            >
              click here
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
