import React from "react";
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
import frizura5 from "../../images/frizura5.jpg";
import frizura7 from "../../images/frizura7.jpg";
import fer1 from "../../images/fer1.jpg";

import { Carousel } from "antd";
import { useNavigate } from "react-router-dom";

export const podatki = [
  {
    id: 1,
    fotka: barber3,
    naziv: "Hair",

    opis: "Always in step with the trends, with us you can get the most popular hairstyles today. Regardless of your wishes, we are here to fulfill everything! ",
  },
  {
    id: 2,
    fotka: barber2,
    naziv: "Beard",
    opis: "For men, the beard is definitely as important as the hairstyle! In order to always be well-groomed and above all satisfied, make an appointment with our perfect barbers! ",
  },
  {
    id: 3,
    fotka: barber5,
    naziv: "Face",
    opis: "It is important to treat the facial area in time to avoid accelerated aging. Although it is more commonly used by women, we also have peels for men!",
  },
];

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper shadow font-white wrapper--home mx-auto d-flex space-between align-items-center w-full">
      <div className="relative mx-auto">
        <h1 className="title p-3 absolute w-full mx-auto z">
          WELCOME TO THE BEST MEN'S SALON REO
        </h1>
      </div>
      <Carousel
        className="h-700"
        autoplaySpeed={3000}
        autoplay
        pauseOnHover={false}
      >
        <img className="slika" src={barber} alt="br1" />
        <img className="slika" src={barber2} alt="hair1" />
        <img className="slika" src={barber3} alt="piling" />
        <img className="slika" src={barber4} alt="piling" />
        <img className="slika" src={barber5} alt="piling" />
      </Carousel>

      <div className="text-center my-3">
        <h1>SERVICES WE OFFER</h1>
        <div className="storitve py-3 my-3">
          {podatki.map((podatek) => (
            <div className="storitev" key={podatek.id}>
              <img className="foto" src={podatek.fotka}></img>
              <h2>{podatek.naziv}</h2>
              <div className="p-2">
                <h4>{podatek.opis}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
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
            <img className="friz" src={frizura5} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={frizura7} alt="piling" />
          </div>
          <div className="grid-item">
            <img className="friz" src={fer1} alt="piling" />
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
