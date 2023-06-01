
import React from "react";
import  naslovna  from "../../images/naslovna.jpg";
import  piling  from "../../images/piling.jpg";
import  bar  from "../../images/bar.jpg";
import  brada1  from "../../images/brada1.jpg";
import  hair1  from "../../images/hair1.jpg";






import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Carousel } from "antd";



class Welcome extends React.Component {
  onRedirectHandler = () => {
   // this.props.history.push(Routes.SIGNUP);
  };

  render() {
    const { isAuthenticated } = this.props;
    
    return (
      <div className="wrapper wrapper--home d-flex space-between align-items-center w-full">
        <div>
          <h2 className="title">
            WELCOME TO THE BEST BARBER SALON REO
          </h2>
         
            <img src={bar} alt="bar"
          />

        </div>
        <div>
              
        </div>
        
        <Carousel dotPosition="bottom" autoplay="true">
          <div className="slide">
            <h3>BEARD</h3>
            <div>Whatever you want !
            <img src={brada1} alt="br1"
          />
          


          


            </div>
          </div>
          <div>
        
            <h3>HAIR</h3>
            <div>
              <br />Only the best 
              <img src={hair1} alt="hair1"
          />
            </div>
          </div>

          <div>
        
        <h3>FACE PEELING</h3>
        <div>
          <br />Skin care 
          <img src={piling} alt="piling"
      />
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





export default Welcome
// H1, PARAGRAFI, SLIKE(NAJBOLJE SLIDER Z VEC SLIK) ITD.
//const Welcome = () => {
   // return(<div><h1>WELCOME</h1></div>)
//}

