import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/compass-regular.svg'
import { ReactComponent as RunIcon } from '../assets/person-running-solid.svg'
import { ReactComponent as ProfileIcon } from '../assets/user-solid.svg'
import { ReactComponent as AddIcon } from '../assets/circle-plus-solid.svg'
import {getAuth} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { useAuthStatus } from '../hooks/useAuthStatus'






function Navbar() {
    const auth = getAuth()
    const [isAdmin, setIsAdmin] = useState(null)
    const {loggedIn, checkingStatus} = useAuthStatus()

    useEffect(() => {
        const getAdminStatus = async () => {
            
          const userRef = doc(db, 'users', auth.currentUser.uid)
          const docSnap = await getDoc(userRef)
          if (docSnap.exists()) {
            setIsAdmin(docSnap.data().isAdmin)
          }
          
        }
        if(loggedIn){
            getAdminStatus()
        }
      }, [loggedIn])

    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if (route === location.pathname){
            return true
        }
     }

    if(pathMatchRoute('/') || pathMatchRoute('/sign-up') || pathMatchRoute('/sign-in')){
        console.log('landing page no navbar')
        return
    }

  return (
    <footer className='navbar'>
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={()=> navigate('/explore')}>
                    <ExploreIcon fill={pathMatchRoute('/explore') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/explore') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Eplore</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/workout')}>
                    <RunIcon fill={pathMatchRoute('/workout') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/workout') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Workout</p>
                </li>
                {isAdmin && <li className="navbarListItem" onClick={()=> navigate('/new-workout')}>
                    <AddIcon fill={pathMatchRoute('/new-workout') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/new-workout') ? 'navbarListItemNameActive' : 'navbarListItemName'}>New</p>
                </li>}
                <li className="navbarListItem" onClick={()=> navigate('/profile')}>
                    <ProfileIcon fill={pathMatchRoute('/profile') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
  )
}

export default Navbar