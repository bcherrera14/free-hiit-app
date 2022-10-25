import React from 'react'
import WorkoutItem from '../components/WorkoutItem'
import {getAuth, updateProfile} from 'firebase/auth'
import { useState, useEffect } from 'react'
import {useNavigate, Link} from 'react-router-dom'
import {collection, getDocs, query, where, orderBy, limit, startAfter} from 'firebase/firestore'
import {doc, updateDoc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { ReactComponent as LogoutIcon } from '../assets/right-from-bracket-solid.svg'
import {toast} from 'react-toastify'



function Profile() {
  const auth = getAuth()
  const [isAdmin, setIsAdmin] = useState(null)
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const [completedWorkoutId, setCompletedWorkoutId] = useState(null)
  const [completedWorkoutList, setcompletedWorkoutList] = useState([])

  useEffect(() => {
    const getCompletedWorkouts = async () => {
        
      const userRef = doc(db, 'users', auth.currentUser.uid)
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        const completed = docSnap.data().completedWorkouts
        setIsAdmin(docSnap.data().isAdmin)
        setCompletedWorkoutId([...completed])
      }
      
    }
    getCompletedWorkouts()
  }, [])

  useEffect(() => {

    const fetchWorkout = async (id) => {
      const snap = await getDoc(doc(db,'workouts', id));
      if (snap.exists()) {
        console.log(snap.data())
        let workouts = []
        workouts.push({
          id: snap.id,
          data: snap.data()
        })
        setcompletedWorkoutList([...completedWorkoutList, workouts])
      }
      else {
        console.log("No such document")
      }

      // setLoading(false)
    }


    if(completedWorkoutId){
      // fetchWorkout()
      completedWorkoutId.forEach((id) => fetchWorkout(id))
      // console.log(completedWorkouts[0])
    }
    
  }, [completedWorkoutId])
  
  

  const {name, email} = formData

  const navigate = useNavigate()

  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }

  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name){
        //Update display name in fb
        await updateProfile(auth.currentUser, {
          displayName: name
        })

        //Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name
        })
      }
    } catch (error) {
      toast.error('Could not update profile details.')
    }
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  
  return (
    <div className='pageContainer'>
      <header className='d-flex justify-content-between align-items-center mb-3'>
        <p className='pageHeader m-0'> My Profile</p>
        {isAdmin && <div className="badge text-bg-admin text-dark my-auto">Admin</div>}
        <LogoutIcon className='logoutBtn'  width='24px' height='24px' onClick={onLogout} />
      </header>

      <main>
        <div className='d-flex justify-content-between'>
          <p>Personal Details</p>
          <p className='changePersonalDetails' onClick={()=> {
            changeDetails && onSubmit()
            setChangeDetails((prevState) => !prevState)
          }}
          >{changeDetails ? 'Save' : 'Edit'}</p>
        </div>
        <div className="card shadow-sm">
          <div className="card-body">
            <form>
              <div className="input-group mb-4">
                <input type="text" id="name" className={!changeDetails ? 'form-control profileName' : 'form-control profileNameActive' } disabled={!changeDetails} value={name} onChange={onChange}/>
              </div>
              <div className="input-group">
                <input type="text" id="email" className='form-control' disabled value={email} onChange={onChange}/>
              </div>
            </form>
          </div>
        </div>
        {completedWorkoutList .length > 0 && 
          <div className='d-flex flex-column align-items-center mt-4'>
            <p className='fw-bold'>Completed Workouts</p>
            <ul className='d-flex flex-column p-0'>
            {/* {completedWorkoutList.map((workout) => (
              <WorkoutItem workout={workout.data} id={workout.id} key={workout.id}/>
            ))} */}
          </ul>
          </div>
        }
      </main>
    </div>
  )

}

export default Profile