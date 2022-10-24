import React from 'react'
import { Link } from 'react-router-dom'
import checkIcon from '../assets/circle-check-solid.svg'



function WorkoutItem({workout, id}) {
    const d = new Date(workout.date)
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = d.toLocaleDateString("en-US", options)
    const completedWorkout = true
  return (
    <li className='workout-card card mb-3 shadow-sm'>
        <Link to={`/workout/${id}`} className='workout-body card-body d-flex justify-content-between align-items-center'>
            {date} {completedWorkout && <img src={checkIcon} width='20px' height='20px' alt="check" className='checkIcon' />}
        </Link>
    </li>
  )
}

export default WorkoutItem