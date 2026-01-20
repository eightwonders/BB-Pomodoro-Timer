import React from 'react'

interface SettingsProps {
  workMinutes: number
  breakMinutes: number
  onWorkChange: (minutes: number) => void
  onBreakChange: (minutes: number) => void
}

const Settings: React.FC<SettingsProps> = ({ workMinutes, breakMinutes, onWorkChange, onBreakChange }) => {
  return (
    <section className="settings">
      <h3>Settings</h3>
      <div className="settings-row">
        <label>
          Work (minutes)
          <input
            type="number"
            min={1}
            max={120}
            value={workMinutes}
            onChange={(e) => onWorkChange(Math.max(1, Number(e.target.value || 0)))}
          />
        </label>

        <label>
          Break (minutes)
          <input
            type="number"
            min={1}
            max={60}
            value={breakMinutes}
            onChange={(e) => onBreakChange(Math.max(1, Number(e.target.value || 0)))}
          />
        </label>
      </div>
      <p className="hint">Change durations while paused or reset.</p>
    </section>
  )
}

export default Settings