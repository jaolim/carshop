import { useState } from 'react'
import CarList from './components/CarList'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CarList />
    </>
  )
}

export default App
