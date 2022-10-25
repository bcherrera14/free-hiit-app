import React from 'react'
import { useState, useEffect } from 'react'
import { ReactComponent as AddIcon } from '../assets/circle-plus-solid.svg'
import WorkoutPart from '../components/WorkoutPart'


function NewWorkout() {
    const [parts, setParts] = useState([])

    useEffect(() => {
        console.log(parts)
    }, [parts])
    
    const onClick = () => {
        const index = parts.length + 1
        setParts([...parts, index])
    }

    const onDelete = (index) => {
        if(index - 1 === parts.length){
            console.log('Delete Item')
            setParts(parts.slice(0,parts.length-1))
        }
    }
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Create Workout</p>
      </header>
      <main>
        <form className='d-flex flex-column'>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" id="date"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Part 1</label>
                <input type="text" className="form-control" id="part1"/>
                <div className="form-text">Use comma separated values for new line.</div>
            </div>
            {parts.length > 0 && parts.map((index) => <WorkoutPart onDelete={onDelete} index={index + 1} key={index}/>)}
            <div className='d-flex align-items-center mb-3' onClick={onClick}>
                <AddIcon width='20px' height='20px' />
                <p className='ms-2 mb-0'>Add another part.</p>
            </div>
            <button type='submit' className="btn btn-lime w-100">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default NewWorkout