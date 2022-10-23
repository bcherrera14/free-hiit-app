import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, semdPasswordResetEmail, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const auth = getAuth()

      await sendPasswordResetEmail(auth, email)
      toast.success('Reset email sent.')
    } catch (error) {
      toast.error('Could not send reset email.')
    }
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit} className='d-flex flex-column justify-content-center'>
          <div className="input-group my-4">
            <input type="text" id="email" placeholder='Email' className='form-control' value={email} onChange={onChange}/>
          </div>
          <div className="d-grid gap-2 col-12 mx-auto mb-4">
            <button className="btn btn-secondary fw-bold" type="submit">Send Reset Link</button>
          </div>
          <Link className='forgotPassword' to='/sign-in'>Sign In</Link>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword