import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./pages/Landing";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <div className="appContainer">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/workout' element={<PrivateRoute/>}>
            <Route path="/workout" element={<Workout/>}/>
          </Route>
          <Route path='/explore' element={<PrivateRoute/>}>
            <Route path='/explore' element={<Explore/>}/>
          </Route>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;
