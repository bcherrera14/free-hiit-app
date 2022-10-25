import React from 'react'
import { useState, useEffect } from 'react'

function WorkoutCard({workout}) {
    const [parts, setParts] = useState([])
    

    useEffect(() => {
        const part = []

        for(let i = 0; i < workout.parts; i++){
            // console.log('part', i)
            let key = 'part' + (i+1).toString()
            part.push('Part ' + (i+1).toString())
            part.push(workout[key])
        }
        // console.log(part)
        setParts(part)
    }, [])
    
    
  return (
    <div>
        <div className="workout-card card shadow-sm">
            <div className=" card-body">
                {
                    parts.map((item, index) => (item.includes(',') ? (item.split(',').map((item, index)=><p key={index}>{item}</p>)) : <p key={index} className={(item.includes('Part')) ? 'fw-bold' : ''}>{item}</p>))
                }
            </div>
        </div>
    </div>
  )
}

export default WorkoutCard