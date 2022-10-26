import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {doc, getDoc, updateDoc} from 'firebase/firestore'
import {db} from '../firebase.config'
import { toast } from 'react-toastify'
import WorkoutPart from '../components/WorkoutPart'

function EditWorkout() {
    const [workout, setWorkout] = useState(null)
    const [parts, setParts] = useState([])
    const [formData, setFormData] = useState({})
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchWorkout = async () => {
            const docRef = doc(db, 'workouts', location.pathname.split('/').pop())
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setWorkout(docSnap.data())
              } else {
                toast.error("Workout does not exists.");
              }
        }
        if(!workout){
            fetchWorkout()
        }
    })

    useEffect(() => {
        if(workout){
            console.log(workout.parts)
            let partsArray = []
            let formDataCopy = {}
            for(let i = 0; i < workout.parts; i ++){
                partsArray.push(`part${i+1}`)
                formDataCopy[`part${i+1}`] = workout[`part${i+1}`]
            }
            setParts(partsArray)
            setFormData({...formDataCopy})

        }
    }, [workout])
    
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
            const workoutRef = doc(db, "workouts", location.pathname.split('/').pop());
            await updateDoc(workoutRef, {
                ...formData
              });
            toast.success('Workout updated.')
            navigate('/workout')
        
        } catch (error) {
            toast.error('Could not update workout.')
        }
    }
    

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Edit Workout</p>
      </header>
      <main>
        <form onSubmit={onSubmit} className='d-flex flex-column'>
            <div className="edit-container mb-3">
                {
                    parts.map((title, index) => <WorkoutPart onChange={onChange} value={formData[title]} index={index + 1} key={index}></WorkoutPart>)
                }
            </div>
            <button type='submit' className="btn btn-lime w-100">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default EditWorkout