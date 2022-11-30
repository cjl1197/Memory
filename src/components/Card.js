import React from "react";

class Square extends React.Component {
    render() {
      var squareStyle = {
        height: 150,
        borderRadius: 5,
        backgroundColor: this.props.color
      };
      return(
        <div style={squareStyle}></div>
      );
    }
  }
  
  class Label extends React.Component {
    render() {
      var labelStyle = {
        textAlign: "center",
        fontFamily: "sans-serif",
        fontWeight: "bold",
      };
      return (
        <p style={labelStyle}>{this.props.color}</p>
      );
    }
  }
   
  class Card extends React.Component {
  
    render() {
      var cardStyle = {
        height: 200,
        width: 150,
        backgroundColor: "#FFF",
        display: "inline-block",
        boxShadow: "0px 0px 5px #666",
        borderRadius: 5
      };
  
      return (
        
        <div style={cardStyle} >
          <Square color={this.props.color}/>
          <Label color={this.props.color}/>
        </div>
      );
  
    }
  }
  
  export default Card