import React, { useState } from 'react'
import Timer from './components/Timer'
import Settings from './components/Settings'
import './styles/index.css'

const App: React.FC = () => {
  const [workMinutes, setWorkMinutes] = useState<number>(25)
  const [breakMinutes, setBreakMinutes] = useState<number>(5)

  return (
    <div className="app">
      <header>
        <h1>Pomodoro Timer</h1>
      </header>

      <main>
        <Timer workMinutes={workMinutes} breakMinutes={breakMinutes} />
        <Settings
          workMinutes={workMinutes}
          breakMinutes={breakMinutes}
          onWorkChange={setWorkMinutes}
          onBreakChange={setBreakMinutes}
        />
      </main>

      <footer>
        <p>Built with React + TypeScript</p>
      </footer>
    </div>
  )
}

export default App