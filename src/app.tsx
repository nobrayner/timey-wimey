import React from 'react'
import './app.css'

function App() {
  return (
    <>
      <h1>{new Date().toLocaleDateString()}</h1>
      <p data-testid="helptext">Click the '+ New Card' button to start adding time cards!</p>
      <button>+ New Card</button>
    </>
  )
}

export default App
