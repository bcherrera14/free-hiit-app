import React from 'react'

function NewWorkout() {
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Create Workout</p>
      </header>
      <main>
        <form className='d-flex flex-column'>
            <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" class="form-control" id="date"/>
            </div>
            <div className="mb-3">
                <label className="form-label">Part 1</label>
                <input type="text" className="form-control" id="date"/>
                <div className="form-text">Use comma separated values for new line.</div>
            </div>
            
            <button type='submit' className="btn btn-lime w-100">Submit</button>
        </form>
      </main>
    </div>
  )
}

export default NewWorkout