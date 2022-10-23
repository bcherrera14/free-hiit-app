import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as ExploreIcon } from '../assets/compass-regular.svg'
import { ReactComponent as RunIcon } from '../assets/person-running-solid.svg'
import { ReactComponent as ProfileIcon } from '../assets/user-solid.svg'


function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const pathMatchRoute = (route) => {
        if (route === location.pathname){
            return true
        }
     }
  return (
    <footer className='navbar'>
        <nav className="navbarNav">
            <ul className="navbarListItems">
                <li className="navbarListItem" onClick={()=> navigate('/explore')}>
                    <ExploreIcon fill={pathMatchRoute('/explore') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/explore') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Eplore</p>
                </li>
                <li className="navbarListItem" onClick={()=> navigate('/')}>
                    <RunIcon fill={pathMatchRoute('/') ? '#606060' : '#D9D9D9'} width='30px' height='30px' />
                    <p className={pathMatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Workout</p>
                </li>
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