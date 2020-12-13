import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './app.css'
import TimeCardDisplay from './components/timeCard'
import { addTimeCard, selectTimeCards } from './store'

function App() {
  const dispatch = useDispatch()
  const timeCards = useSelector(selectTimeCards)

  const newTimeCard = () => dispatch(addTimeCard())

  return (
    <>
      <h1>{new Date().toLocaleDateString()}</h1>
      <h2>0h</h2>
      {timeCards.length > 0 ? 
        timeCards.map(card => (
          <TimeCardDisplay key={card.id} card={card} />
        )) : <p data-testid="helptext">Click the '+ New Card' button to start adding time cards!</p>}
      <button onClick={newTimeCard}>+ New Card</button>
    </>
  )
}

export default App
