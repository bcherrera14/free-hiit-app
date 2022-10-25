import React from 'react'

function WorkooutPart({index, onDelete}) {

  return (
    <div className="mb-3 ">
        <label className="form-label">Part {index}</label>
        <div className="input-group">
          <input type="text" className="form-control" id={`part${index}`}/>
          <span className="input-group-text" id="basic-addon2" onClick={()=>onDelete(index)}><i className="fa-solid fa-circle-minus"></i></span>
        </div>
        <div className="form-text">Use comma separated values for new line.</div>
    </div>
  )
}

export default WorkooutPart