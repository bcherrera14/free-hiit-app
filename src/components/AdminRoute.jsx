import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useState, useEffect} from 'react'
import {getAuth} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'


const AdminRoute = () => {
    // const {loggedIn, checkingStatus} = useAuthStatus()
    const [isAdmin, setIsAdmin] = useState(null)
    const auth = getAuth()

    useEffect(() => {
        const getAdminStatus = async () => {
            
          const userRef = doc(db, 'users', auth.currentUser.uid)
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {
            setIsAdmin(docSnap.data().isAdmin)
          }
          
        }
        getAdminStatus()
      }, [])


  return isAdmin ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default AdminRoute