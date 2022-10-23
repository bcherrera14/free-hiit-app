import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {setDoc, doc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'


function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '' 
  })

  const {name, email, password}= formData

  const navigate = useNavigate()

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
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })

      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/explore')

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'> Welcome</p>
      </header>

      <form onSubmit={onSubmit} className='d-flex flex-column'>
      <div className="input-group mt-4 mb-4">
          <input type="text" placeholder='Name' id='name' value={name} onChange={onChange} className='form-control' />
        </div>
        <div className="input-group mb-4">
          <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} className='form-control' />
        </div>
        <div className="input-group mb-4">
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={onChange} className='form-control' />
          <span className="input-group-text" id="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}><i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i></span>
        </div>
        {/* <Link to='/forgot-password' className='forgotPassword'>Forgot Password?</Link> */}
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button className="btn btn-light fw-bold" type="submit">Sign Up</button>
        </div>
      </form>

      {/* {Google OAuth} */}

    </div>
  )
}

export default SignUp