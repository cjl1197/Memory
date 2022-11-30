import React from 'react'
import './SingleCard.css'

function SingleCard({cardFront, cardBack, handleChoice, flipped, solved, disabled}) {

    
    
        const handleClick = () => {
          if(!disabled)
            handleChoice(cardFront)
        }
      

   
  return (
    <div className = "card">
      <div className={solved ? "solved" : ""}>
              <div className={flipped ? "flipped" : ""}>
                <div className='front'>{cardFront}</div>
                <div className='back'
                    onClick={handleClick}>{cardBack}
                </div>
                </div>
                </div>
            </div> 
  )
}


export default SingleCard
