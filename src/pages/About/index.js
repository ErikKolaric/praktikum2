import React from "react";
import stef  from "../../images/stef.jpg";
import  jess  from "../../images/jess.png";
import  naslovna  from "../../images/naslovna.jpg";


import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Carousel } from "antd";


//import "./Home.css";

//HEADER, PARAGRAFI, GOOGLE MAPS LOKACIJA NASA, KONTAKT ITD.
//const About = () => {
   // return(<div><h1>ABOUT US</h1></div>)

class About extends React.Component {
  onRedirectHandler = () => {
   // this.props.history.push(Routes.SIGNUP);
  };

  render() {
    const { isAuthenticated } = this.props;
    
    return (
      <div className="wrapper wrapper--home d-flex space-between align-items-center">
        <div>
          <h2 className="title">
            Beard Specialists, Hair, Face for Men 
          </h2>
          <img  />
          
        </div>
        <div>
          <p className="title">
          The barber salon was created in 2017 as a result of a long-conceived plan. We are located at Gabelsbergerstraße 31-19, 80333 Munich, Germany. It was founded by Stef Mike and Mark Held, who are considered the best barbers in Europe. We guarantee you quality! The pleasure is ours!          </p>
          
        </div>
        
        <Carousel dotPosition="bottom" autoplay="true">
          <div className="slide">
          <img src={stef} alt="stef" width={600} height={500}/>
            <h3>Stef Majk</h3>
            <div>Hair Specialist</div>
          </div>
          <div>
          <img src={jess} alt="jess" width={400} height={400}/>
        
            <h3>Mark Held</h3>
            <div>
              <br /> Beard Specialist
            </div>
          </div>
           
        </Carousel>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};





export default About