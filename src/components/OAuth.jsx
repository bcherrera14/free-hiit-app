import React from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import googleIcon from '../assets/googleIcon.png'

function OAuth() {
    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists){
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                })
            }

            navigate('/workout')

        } catch (error) {
            toast.error('Could not authorize with Google.')
        }
    }

  return (
    <div className='d-flex flex-column align-items-center mt-5'>
        <p>Or sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
        <button className="btn socialIcon rounded-circle" onClick={onGoogleClick}><img src={googleIcon} alt="google"/></button>
    </div>
  )
}

export default OAuth