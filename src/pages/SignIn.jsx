import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import OAuth from '../components/OAuth'


function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '' 
  })

  const {email, password}= formData

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
      const userCredential = await signInWithEmailAndPassword(auth, email, password)

      if(userCredential.user){
        navigate('/workout')
      }
      
    } catch (error) {
      toast.error('Wrong user credentials.')
    }


  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'> Welcome Back!</p>
      </header>

      <form onSubmit={onSubmit} className='d-flex flex-column'>
        <div className="input-group mt-4 mb-4">
          <input type="email" placeholder='Email' id='email' value={email} onChange={onChange} className='form-control' />
        </div>
        <div className="input-group mb-4">
          <input type={showPassword ? 'text' : 'password'} placeholder='Password' id='password' value={password} onChange={onChange} className='form-control' />
          <span className="input-group-text" id="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}><i className={showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'}></i></span>
        </div>
        <Link to='/forgot-password' className='forgotPassword'>Forgot Password?</Link>
        <div className="d-grid gap-2 col-12 mx-auto mt-4">
          <button className="btn btn-light fw-bold" type="submit">Sign In</button>
        </div>
      </form>

      <OAuth></OAuth>

    </div>
  )
}

export default SignIn