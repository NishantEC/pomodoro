import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import './timer.scss'

const Timer = ({ setGradientAngle }) => {
  const [IsRunning, setIsRunning] = useState(false)
  const [IsSettingOpen, setIsSettingOpen] = useState(false)
  const [PathLength, setPathLength] = useState(1)
  const [IsBreak, setIsBreak] = useState(false)

  const hours = 0,
    minutes = 0,
    seconds = 30
  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds])
  const time = hours * 60 + minutes * 60 + seconds

  const timerPathLength = () => {
    const tempTime = hrs * 60 + mins * 60 + secs
    const temp = parseFloat(tempTime / time).toFixed(5)
    setPathLength(temp)
    setGradientAngle(temp)
  }

  const tick = () => {
    if (hrs === 0 && mins === 0 && secs === 0) {
      setIsRunning(false)
    } else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, 59, 59])
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59])
    } else {
      setTime([hrs, mins, secs - 1])
    }
  }

  const reset = () => {
    setPathLength(1)
    setGradientAngle(1)
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)])
    setIsRunning(false)
  }

  useEffect(() => {
    if (IsRunning) {
      timerPathLength()
      const timerId = setInterval(() => tick(), 1000)
      return () => clearInterval(timerId)
    }
  })

  return (
    <div className="timer-container">
      {IsSettingOpen ? (
        <motion.div></motion.div>
      ) : (
        <motion.div className="timer-wrapper">
          <svg className="timer-svg">
            <circle
              cx="50%"
              cy="50%"
              r="30%"
              fill="transparent"
              strokeLinecap="round"
              className="timer-stroke-shadow"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="30%"
              fill="transparent"
              animate={{ pathLength: PathLength }}
              transition={{ type: 'linear' }}
              className="timer-stroke"
            />
          </svg>
          <div className="timerDisplay-wrapper">
            <div className="timerDisplay">
              <AnimatePresence mode="wait">
                <motion.span
                  key={hrs}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(hrs).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              :
              <AnimatePresence mode="wait">
                <motion.span
                  key={mins}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(mins).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
              :
              <AnimatePresence mode="wait">
                <motion.span
                  key={secs}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 10, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {String(secs).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
      <div className="timerBtns">
        <div className="timerbtn" onClick={() => setIsRunning(!IsRunning)}>
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <motion.path
              animate={{
                d: IsRunning
                  ? 'M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z'
                  : 'M3 22v-20l18 10-18 10z',
              }}
              transition={{ duration: 0 }}
            />
          </motion.svg>
        </div>
        <div className="timerbtn " onClick={() => reset()}>
          {' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m3.508 6.726c1.765-2.836 4.911-4.726 8.495-4.726 5.518 0 9.997 4.48 9.997 9.997 0 5.519-4.479 9.999-9.997 9.999-5.245 0-9.553-4.048-9.966-9.188-.024-.302.189-.811.749-.811.391 0 .715.3.747.69.351 4.369 4.012 7.809 8.47 7.809 4.69 0 8.497-3.808 8.497-8.499 0-4.689-3.807-8.497-8.497-8.497-3.037 0-5.704 1.597-7.206 3.995l1.991.005c.414 0 .75.336.75.75s-.336.75-.75.75h-4.033c-.414 0-.75-.336-.75-.75v-4.049c0-.414.336-.75.75-.75s.75.335.75.75z" />
          </svg>
        </div>
        <div className="rollableBtn" onClick={() => setIsBreak(!IsBreak)}>
          <motion.div
            className={`"rollableBtn-left" ${!IsBreak ? 'active' : null}`}
          >
            {'Focus'}
          </motion.div>
          <motion.div
            className={`"rollableBtn-left" ${IsBreak ? 'active' : null}`}
          >
            {'Break'}
          </motion.div>
        </div>
        <div
          className="timerbtn rotatable"
          onClick={() => setIsSettingOpen(!IsSettingOpen)}
        >
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Timer
