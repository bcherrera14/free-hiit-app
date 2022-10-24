import React from 'react'
import { useState, useEffect } from 'react';

function Workout() {
  const [workout, setWorkout] = useState(true)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const d = new Date()
  const queryDate = d.toLocaleDateString("en-US");
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = d.toLocaleDateString("en-US", options)

  const onClick = () => {
    setWorkoutComplete(!workoutComplete)
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Today's Workout</p>
      </header>
      <main className='d-flex flex-column'>
        <div className="workout-card card shadow-sm mb-4">
          <div className="workout-title card-body">{date}</div>
        </div>
        {workout ? 
          <div>
          <div className="workout-card card shadow-sm">
          <div className=" card-body">
            <p className="fw-bold">Part 1</p>
            <p>Run 2 miles</p>
            <p className="fw-bold">Part 2</p>
            <p>3 rounds</p>
            <p>15 wall balls</p>
            <p>800m bike</p>
            <p>15 box jumps</p>
          </div>
        </div>
        <button type="button" onClick={onClick} class={`btn ${workoutComplete ? 'btn-lime' : 'btn-secondary'} w-100 mt-4`} >{!workoutComplete && 'Not' } Done</button>
      </div> :
      <div className="workout-card card shadow-sm mb-4">
        <div className="workout-body card-body">No workout for today.</div>
      </div>
      }
      </main>
    </div>
  )
}

export default Workout