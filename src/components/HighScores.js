import React, {useState, useEffect} from "react";
import axios from 'axios';

function Scores() {
  const [scores2, setScores2] = useState([]);

  useEffect(() => {
    getScores()
  },[])

  const getScores = () => {
        axios.get('https://mynodeserver.duckdns.org:8080/api')
        .then((response) => {
          const data = response.data
          setScores2(data)
          console.log('Data has been received!')
        })
        .catch(() => {
          console.log('There was an error receiving the data.')
        })
     };
  
    return scores2.map((score, index) => {
      return  <div key={index}>
               <h3>{score.name} {score.time}</h3>
              </div>
    })
}


class ScoreLabel extends React.Component {
    
    render() {
        var labelStyle = {
            justifyContent: "center",
        };        
    
        return (
            <div style={labelStyle}>
                <h2>High Scores</h2>
            </div>
        );
    }
}

class HighScore extends React.Component {
  
    render() {
      var cardStyle = {
        height: 600,
        width: 300,
        backgroundColor: "grey",
        display: "inline-block",
        boxShadow: "0px 0px 5px #666",
        borderRadius: 5
      };
  
      return (
        
        <div style={cardStyle} >
            <ScoreLabel />
            <Scores />
        </div>
      );
  
    }
  }
  
  export default HighScore