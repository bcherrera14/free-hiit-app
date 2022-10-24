import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import {getAuth} from 'firebase/auth'
import checkIcon from '../assets/circle-check-solid.svg'



function WorkoutItem({workout, id}) {
    const [isCompleted, setIsCompleted] = useState(false)

    const d = new Date(workout.date)
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const date = d.toLocaleDateString("en-US", options)

    useEffect(() => {
      const auth = getAuth()
      const getCompletedWorkouts = async () => {
        
          const userRef = doc(db, 'users', auth.currentUser.uid)
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {
            const completedWorkouts = docSnap.data().completedWorkouts
            setIsCompleted(completedWorkouts.includes(id))
          }
          
      }
      getCompletedWorkouts()
      
    }, [id])

  return (
    <li className='workout-card card mb-3 shadow-sm'>
        <Link to={`/workout/${id}`} className='workout-body card-body d-flex justify-content-between align-items-center'>
            {date} {isCompleted && <img src={checkIcon} width='20px' height='20px' alt="check" className='checkIcon' />}
        </Link>
    </li>
  )
}

export default WorkoutItem