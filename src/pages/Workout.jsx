import React from 'react'
import { useState, useEffect } from 'react';
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import WorkoutCard from '../components/WorkoutCard';

function Workout() {
  const [loading, setLoading] = useState(true)
  const [workoutId, setWorkoutId] = useState(null)
  const [workout, setWorkout] = useState(null)
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  const [workoutComplete, setWorkoutComplete] = useState(null)

  const d = new Date()
  const queryDate = d.toLocaleDateString("en-US");
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const date = d.toLocaleDateString("en-US", options)
  const auth = getAuth()

  useEffect(() => {

    const fetchWorkout = async () => {
      const workoutRef = collection(db, 'workouts')
      const q = query(workoutRef, where('date', '==', queryDate))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if(doc.id){
          setWorkoutId(doc.id)
          setWorkout(doc.data())
          // console.log(doc.id, " => ", doc.data());
        }
        
      });
      setLoading(false)
    }

    const getCompletedWorkouts = async () => {
      // const auth = getAuth()
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        const completedWorkouts = docSnap.data().completedWorkouts
        setCompletedWorkouts(completedWorkouts)
        setWorkoutComplete(completedWorkouts.includes(workoutId))
      }
        
    }

    if(!workoutId){
      fetchWorkout()
    }else{
      getCompletedWorkouts()
    }

  }, [workoutId])


const updateCompletedWorkoutList = async (updatedList) => {
  // Update database
    try {
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          completedWorkouts: [...updatedList]
        })
    } catch (error) {
      toast.error('Could not update profile details.')
    }
}
  

  const onClick = async () => {
    if(workoutComplete){
      //Remove workout id
      const updatedWorkoutList = completedWorkouts.filter((id) => workoutId !== id)
      setCompletedWorkouts(updatedWorkoutList)
      updateCompletedWorkoutList(updatedWorkoutList)
    }else{
      //Add workout id
      setCompletedWorkouts([...completedWorkouts, workoutId])
      updateCompletedWorkoutList([...completedWorkouts, workoutId])
    }
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
            <WorkoutCard workout={workout}/>
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