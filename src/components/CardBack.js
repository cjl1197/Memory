import React from "react";
import image from "../images/logo192.png";
import "./CardBack.css";

class CardBack extends React.Component {
    render() {
      var cardStyle = {
        height: 197,
        width: 146,
        backgroundColor: "#000",
        display: "inline-block",
        boxShadow: "0px 0px 5px #666",
        border: "2px solid grey",
        borderRadius: 5
      };
      return (
        <div style={cardStyle}>
          <img className="img" src={image} alt="react logo"></img>
        </div>
      );
  
    }
  }

  export default CardBack

