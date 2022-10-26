import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {setDoc, doc, serverTimestamp, addDoc, collection} from 'firebase/firestore'
import {db} from '../firebase.config'
import { ReactComponent as AddIcon } from '../assets/circle-plus-solid.svg'
import WorkoutPart from '../components/WorkoutPart'
import { toast } from 'react-toastify'


function NewWorkout() {
  const [parts, setParts] = useState([])
  const [formData, setFormData] = useState({
    date: '',
    parts: parts.length + 1,
    part1: ''
  })

  const {date, part1} = formData

  useEffect(() => {
      setFormData((prevState) => ({
        ...prevState,
        parts: parts.length + 1
      }))
  }, [parts])
  
  const onClick = () => {
      const index = parts.length + 1
      setParts([...parts, index])
  }

  const onDelete = (index) => {
      if(index - 1 === parts.length ){
          console.log('Delete Item')
          setParts(parts.slice(0,parts.length-1))
      }
  }

  const onChange = (e) => {
    e.preventDefault()
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
    
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataCopy = {...formData}
      formDataCopy.timestamp = serverTimestamp()

      //Format Date
      formDataCopy.date = formDataCopy.date.split('-')
      const year = formDataCopy.date[0]
      formDataCopy.date.shift()
      formDataCopy.date.push(year)
      formDataCopy.date = formDataCopy.date.join('/')
      const workoutRef = doc(collection(db, 'workouts'))
      await setDoc(workoutRef, formDataCopy)
      toast.success('Workout created.')
      setParts([])
      setFormData({
        date: '',
        parts: parts.length + 1,
        part1: ''
      })
      
    } catch (error) {
      toast.error('Could not create new workout.')
    }

    
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Create Workout</p>
      </header>
      <main>
        <form onSubmit={onSubmit} className='d-flex flex-column'>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" id="date" value={date} onChange={onChange} required/>
            </div>
            <div className="mb-3">
                <label className="form-label">Part 1</label>
                <input type="text" className="form-control" id="part1" value={part1} onChange={onChange} required/>
                <div className="form-text">Use comma separated values for new line.</div>
            </div>
            {parts.length > 0 && parts.map((index) => <WorkoutPart onDelete={onDelete} index={index + 1} key={index} onChange={onChange}/>)}
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