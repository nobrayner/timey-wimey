import React from 'react'
import { useDispatch } from 'react-redux'
import './app.css'

function App() {
  const dispatch = useDispatch()
  const newTimeCard = () => dispatch({ type: 'noop' })

  return (
    <>
      <h1>{new Date().toLocaleDateString()}</h1>
      <p data-testid="helptext">Click the '+ New Card' button to start adding time cards!</p>
      <button onClick={newTimeCard}>+ New Card</button>
    </>
  )
}

export default App
