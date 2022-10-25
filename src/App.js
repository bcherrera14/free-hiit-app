import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {getAuth} from 'firebase/auth'
import { useAuthStatus } from './hooks/useAuthStatus'
import {doc, getDoc} from 'firebase/firestore'
import {db} from './firebase.config'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NewWorkout from "./pages/NewWorkout";


function App() {
  const auth = getAuth()
  const [isAdmin, setIsAdmin] = useState(false)
  const [completedWorkouts, setCompletedWorkouts] = useState([])
  // const [date, setDate] = useState('')
  const {loggedIn} = useAuthStatus()

  


  useEffect(() => {
    if(loggedIn){
      const getUserDetails = async () => {
        
        const userRef = doc(db, 'users', auth.currentUser.uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setCompletedWorkouts(docSnap.data().completedWorkouts)
          setIsAdmin(docSnap.data().isAdmin)
          console.log('IsAdmin: ', docSnap.data().isAdmin)
          console.log('completed workouts: ', docSnap.data().completedWorkouts)
        } 
      }
      getUserDetails()

      // const d = new Date()
      // const options = { weekday: 'long', month: 'long', day: 'numeric' };
      // setDate(d.toLocaleDateString("en-US", options))
    }
    console.log('app useEffect ran')
  }, [loggedIn])
  

  return (
    <div className="appContainer">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>

          {/* Private Routes */}
          <Route path='/workout' element={<PrivateRoute/>}>
            <Route path="/workout" element={<Workout completedWorkouts={completedWorkouts} setCompletedWorkouts={setCompletedWorkouts}/>}/>
          </Route>
          <Route path='/explore' element={<PrivateRoute/>}>
            <Route path='/explore' element={<Explore completedWorkouts={completedWorkouts}/>}/>
          </Route>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile completedWorkouts={completedWorkouts} isAdmin={isAdmin}/>}/>
          </Route>
          <Route path='/new-workout' element={<PrivateRoute/>}>
            <Route path="/new-workout" element={<NewWorkout/>}/>
          </Route>
        </Routes>
        {loggedIn && <Navbar admin={isAdmin}/>}
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
