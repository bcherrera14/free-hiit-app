import React from 'react'
import {getAuth, updateProfile} from 'firebase/auth'
import { useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {doc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { ReactComponent as LogoutIcon } from '../assets/right-from-bracket-solid.svg'
import {toast} from 'react-toastify'



function Profile({isAdmin, completedWorkouts}) {
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })


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
              <div className="mb-4">
                <label className="form-label">Profile Name</label>
                <input type="text" id="name" className={!changeDetails ? 'form-control profileName' : 'form-control profileNameActive' } disabled={!changeDetails} value={name} onChange={onChange}/>
              </div>
              <div className="mb-4">
                <label className="form-label">Email</label>
                <input type="text" id="email" className='form-control' disabled value={email} onChange={onChange}/>
              </div>
              <div className='d-flex justify-content-between'>
                <p className='m-0 fw-bold'>Completed Workouts</p>
                <div className="badge text-bg-admin text-dark my-auto">{completedWorkouts.length}</div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )

}

export default Profile