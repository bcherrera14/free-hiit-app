import React from 'react'
import { useEffect, useState } from 'react'
import { Form } from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import WorkoutItem from '../components/WorkoutItem'


function Explore() {
  const [workouts, setWorkouts] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        //Get Reference
        const workoutsRef = collection(db, 'workouts')

        //Create a query
        const q = query(workoutsRef, orderBy('date', 'desc'), limit(7))

        //Execute query
        const querySnap = await getDocs(q)

        let workouts = []

        querySnap.forEach((doc) => {
          workouts.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setWorkouts(workouts)
        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch workouts.')
      }
    }

    fetchWorkouts()

  }, [])


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Workout List</p>
      </header>

      {loading ? <Spinner/> : workouts && workouts.length > 0 ? 
      <div className='d-flex flex-column align-items-center'>
        <button className='btn btn-lime mb-4'>Create Workout</button>
        <main className='w-100'>
          <ul className='d-flex flex-column p-0'>
            {workouts.map((workout) => (
              <WorkoutItem workout={workout.data} id={workout.id} key={workout.id}/>
            ))}
          </ul>
        </main>
      </div> : <p>No Workouts Available</p>}
    </div>
  )
}

export default Explore