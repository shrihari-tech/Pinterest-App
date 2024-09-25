import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter ,Route, Routes} from 'react-router-dom'
import Feed from './components/Feed'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Feed}exact></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
