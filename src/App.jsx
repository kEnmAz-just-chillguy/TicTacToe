import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import circle_icon from "/circle.png"
import cross_icon from "/cross.png"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='container'>
      <h1 className='title'>Tic Tac Toe</h1>
      <div className='board'>

      </div>
      <div>Reset</div>
    </div>
    </>
  )
}

export default App
