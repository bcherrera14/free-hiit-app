import React from 'react'
import checkIcon from '../assets/circle-check-solid.svg'



function WorkoutItem({workout, id, isCompleted}) {

  return (
    <li className='workout-card card mb-3 shadow-sm'>
        <a href='#workoutQuickView' data-bs-toggle="offcanvas" data-bs-workout={JSON.stringify(workout)} className='workout-body card-body d-flex justify-content-between align-items-center'>
            {workout.date} {isCompleted && <img src={checkIcon} width='20px' height='20px' alt="check" className='checkIcon' />}
        </a>
    </li>
  )
}

export default WorkoutItem