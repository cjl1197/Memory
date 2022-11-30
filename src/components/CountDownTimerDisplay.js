import React, { useState, useEffect} from "react";

function Timer2({active, time}) {
    
    const [minutes, setMinutes] =useState(0)
    const [seconds1, setSeconds1] = useState(0)
    const [seconds2, setSeconds2] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
      let interval = null;
      setIsActive(active)
      if (isActive){
        interval = setInterval (() => {
          setSeconds1(seconds1 => seconds1 + 1);
          if (seconds1 === 9)
          {
            setSeconds1(0)
            setSeconds2(seconds2 => seconds2 + 1)
          }
          if (seconds2 === 5 && seconds1 === 9)
          {
            setSeconds1(0)
            setSeconds2(0)
            setMinutes(minutes => minutes + 1)
          }
        }, 1000)
      }
      else if (!isActive && seconds1 !== 0) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [isActive, seconds1, seconds2, minutes]);

    time(minutes.toString() + ':' + seconds2.toString() + seconds1.toString())

    return (
      <div>
        {minutes}:{seconds2}{seconds1}
      </div>
    );
}

    function CountDownTimerDisplay({active, time}) {

      var commonStyle = {
        margin: 0,
        padding: 0
      };
   
      var divStyle = {
        width: 250,
        textAlign: "center",
        padding: 20,
        margin: "auto",
        marginLeft: 111,
        marginRight: 50,
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
        fontWeight: "bold",
    };
   
      return (
        <div style={divStyle}>
          <h2 style={textStyles.smallEmphasis}>Time</h2>
          
          <div style={counterStyle}>{!active && time}{active && <Timer2 active = {active} time={time}/>}</div>
        </div>
      );
    }



  export default CountDownTimerDisplay