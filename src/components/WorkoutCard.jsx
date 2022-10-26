import React from 'react'
import { useState, useEffect } from 'react'
import { ReactComponent as EditIcon } from '../assets/pen-to-square-solid.svg'


function WorkoutCard({workout,workoutId, isAdmin}) {
    const [parts, setParts] = useState([])
    

    useEffect(() => {
        const part = []

        for(let i = 0; i < workout.parts; i++){
            let key = 'part' + (i+1).toString()
            part.push('Part ' + (i+1).toString())
            part.push(workout[key])
        }
        setParts(part)
    }, [])
    
  return (
    <div>
        <div className="workout-card card shadow-sm">
            <div className=" card-body">
                {isAdmin && 
                <a href={`/workout/${workoutId}`} className='editIcon' data-bs-workout={JSON.stringify(workout)}>
                    <EditIcon  width='16px' height='16px'></EditIcon>
                </a>}
                {
                    parts.map((item, index) => (item.includes(',') ? (item.split(',').map((item, index)=><p key={index}>{item}</p>)) : <p key={index} className={(item.includes('Part')) ? 'fw-bold' : ''}>{item}</p>))
                }
            </div>
        </div>
    </div>
  )
}

export default WorkoutCard