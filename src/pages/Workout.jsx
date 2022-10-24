import React from 'react'
import { useState, useEffect } from 'react';
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

function Workout() {
  const [loading, setLoading] = useState(true)
  const [workout, setWorkout] = useState(null)
  const [workoutComplete, setWorkoutComplete] = useState(false)
  const d = new Date()
  const queryDate = d.toLocaleDateString("en-US");
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = d.toLocaleDateString("en-US", options)

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        //Get Reference
        const workoutsRef = collection(db, 'workouts')

        //Create a query
        const q = query(workoutsRef, where('date', '==', queryDate))

        //Execute query
        const querySnap = await getDocs(q)
        // console.log(querySnap.data())
        let todaysWorkout = []

        querySnap.forEach((doc) => {
          todaysWorkout.push({
            id: doc.id,
            data: doc.data()
          })
        })
        console.log(todaysWorkout)

        todaysWorkout.length ? setWorkout(todaysWorkout) : setWorkout(null)

        setLoading(false)
      } catch (error) {
        toast.error('Could not fetch workouts.')
      }
    }

    fetchWorkout()

  }, [queryDate])

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
        {loading ? <Spinner/> : 
          workout ? 
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
        <button type="button" onClick={onClick} className={`btn ${workoutComplete ? 'btn-lime' : 'btn-secondary'} w-100 mt-4`} >{!workoutComplete && 'Not' } Done</button>
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