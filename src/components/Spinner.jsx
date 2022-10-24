import React from 'react'

function Spinner() {
  return (
    <div className='loadingSpinnerContainer'>
        {/* <div className="loadingSpinner"></div> */}
        <div className="spinner-grow text-lime" role="status">
          <span className="sr-only">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner