import React, { useEffect, useRef, useState } from 'react'

type Mode = 'work' | 'break'

interface TimerProps {
  workMinutes: number
  breakMinutes: number
}

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const Timer: React.FC<TimerProps> = ({ workMinutes, breakMinutes }) => {
  const [mode, setMode] = useState<Mode>('work')
  const [running, setRunning] = useState<boolean>(false)
  const [secondsLeft, setSecondsLeft] = useState<number>(workMinutes * 60)
  const intervalRef = useRef<number | null>(null)

  // Sync secondsLeft when durations change and timer is not running
  useEffect(() => {
    if (!running) {
      setSecondsLeft(mode === 'work' ? workMinutes * 60 : breakMinutes * 60)
    }
  }, [workMinutes, breakMinutes, mode])

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [running])

  // When secondsLeft changes, handle transitions
  useEffect(() => {
    if (secondsLeft <= 0) {
      // Swap mode and reset
      const nextMode: Mode = mode === 'work' ? 'break' : 'work'
      setMode(nextMode)
      setSecondsLeft(nextMode === 'work' ? workMinutes * 60 : breakMinutes * 60)
      // simple beep using the Web Audio API
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const o = ctx.createOscillator()
        o.type = 'sine'
        o.frequency.value = 880
        const g = ctx.createGain()
        g.gain.value = 0.05
        o.connect(g)
        g.connect(ctx.destination)
        o.start()
        setTimeout(() => {
          o.stop()
          ctx.close()
        }, 300)
      } catch {
        // ignore audio errors
      }
    }
  }, [secondsLeft, mode, workMinutes, breakMinutes])

  const handleStartPause = () => setRunning((r) => !r)
  const handleReset = () => {
    setRunning(false)
    setMode('work')
    setSecondsLeft(workMinutes * 60)
  }

  return (
    <section className={`timer ${mode}`}>
      <div className="timer-display">
        <h2>{mode === 'work' ? 'Work' : 'Break'}</h2>
        <div className="time">{formatTime(Math.max(0, secondsLeft))}</div>
      </div>

      <div className="timer-controls">
        <button onClick={handleStartPause} className="btn primary">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} className="btn">
          Reset
        </button>
      </div>
    </section>
  )
}

export default Timer