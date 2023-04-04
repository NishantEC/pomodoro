import { motion } from 'framer-motion'
import { useState } from 'react'

import './App.scss'
import Timer from './components/timer/Timer'

function App() {
  const [GradientAngle, setGradientAngle] = useState('360deg')

  return (
    <motion.div
      animate={{
        background: `conic-gradient(from ${GradientAngle},  #0B49E1,#1F241A)`,

      }}
      className="App"
      // transition={{type: "linear"}}
    >
      <Timer setGradientAngle={(value) => setGradientAngle(360 * value + 'deg')} />
    </motion.div>
  )
}

export default App
