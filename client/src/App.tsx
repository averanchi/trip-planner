import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Tailwind works</h1>
        <p className="mt-4 text-blue-600">React + Vite + Tailwind v4</p>
      </div>
    </>
  )
}

export default App
