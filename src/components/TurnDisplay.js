import React from "react";

function TurnDisplay({count}) {
    var commonStyle = {
      margin: 0,
      padding: 0
    }

    var divStyle = {
      width: 250,
      textAlign: "center",
      padding: 20,
      margin: "auto",
      fontFamily: "sans-serif",
      color: "#999999",
      borderRadius: 10, 
      float: "left"
    };

    var textStyles = {
      emphasis: {
      fontSize: 38,
      ...commonStyle
      },
      smallEmphasis: {
      ...commonStyle
      },
      small: {
      fontSize: 17,
      opacity: 0.5,
      ...commonStyle
      }
    };

    var counterStyle = {
      color: "#61dafb",
      fontSize: 30,
      margin: 0,
      fontWeight: "bold"
    };
   
      return (
        <div style={divStyle}>
          <h2 style={textStyles.smallEmphasis}>Turns</h2>
            <div style={counterStyle}>{count}</div>
          </div>
      );
    }

    export default TurnDisplay