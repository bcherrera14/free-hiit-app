import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Workout from "./pages/Workout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Workout/>}/>
          <Route path='/explore' element={<Explore/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
