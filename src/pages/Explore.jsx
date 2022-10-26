import React from 'react'
import { useEffect, useState } from 'react'
import {collection, getDocs, query, orderBy, limit, startAt} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import WorkoutItem from '../components/WorkoutItem'


function Explore({completedWorkouts, isAdmin}) {
  const [workouts, setWorkouts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [parts, setParts] = useState([])


  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        //Get Reference
        const workoutsRef = collection(db, 'workouts')

        //Create a query
        const d = new Date()
        const queryDate = d.toLocaleDateString("en-US");
        const q = isAdmin ? query(workoutsRef, orderBy('date', 'desc'), limit(7)) : query(workoutsRef, orderBy('date', 'desc'), startAt(queryDate), limit(7))

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

    // Set Offcanvas Data
    var workoutQuickView = document.getElementById('workoutQuickView')
    workoutQuickView.addEventListener('show.bs.offcanvas', function (event) {
      // Button that triggered the modal
      var button = event.relatedTarget
      // Extract info from data-bs-* attributes
      var workout = JSON.parse(button.getAttribute('data-bs-workout')) 
      // Format workout data
      const part = []

      for(let i = 0; i < workout.parts; i++){
          let key = 'part' + (i+1).toString()
          part.push('Part ' + (i+1).toString())
          part.push(workout[key])
      }
      setParts(part)
      var date = workoutQuickView.querySelector('.workout-title')
      date.textContent = workout.date
    })

  }, [])

  


  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Workout List</p>
      </header>

      {loading ? <Spinner/> : workouts && workouts.length > 0 ? 
      <div className='d-flex flex-column align-items-center'>
        <main className='w-100'>
          <ul className='d-flex flex-column p-0'>
            {workouts.map((workout) => (
              <WorkoutItem workout={workout.data} id={workout.id} key={workout.id} isCompleted={completedWorkouts.includes(workout.id)}/>
            ))}
          </ul>
        </main>
      </div> : <p>No Workouts Available</p>}
      {/* OffCanvas */}
      <div className="offcanvas offcanvas-end" tabIndex="-1" id="workoutQuickView" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div className="workout-card card shadow-sm mb-4">
            <div className="workout-title card-body">Date</div>
          </div>
          <div className="workout-card card shadow-sm">
            <div className=" card-body">
                {
                  parts.map((item, index) => (item.includes(',') ? (item.split(',').map((item, index)=><p key={index}>{item}</p>)) : <p key={index} className={(item.includes('Part')) ? 'fw-bold' : ''}>{item}</p>))
                }
            </div>
        </div>
        </div>
      </div>
      {/* OffCanvas */}

    </div>
  )
}

export default Explore