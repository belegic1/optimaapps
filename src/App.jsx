import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bill from './components/Bill'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Bill />
    </div>
      
  )
}

export default App
