import { useState } from 'react'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <div className='max-h-[76vh] overflow-auto'>
        <Manager />
      </div>
      <Footer />
    </>
  )
}

export default App
