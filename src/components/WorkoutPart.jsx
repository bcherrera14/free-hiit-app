import React from 'react'

function WorkooutPart({index, onDelete, onChange}) {

  return (
    <div className="mb-3 ">
        <label className="form-label">Part {index}</label>
        <div className="input-group">
          <input type="text" className="form-control" id={`part${index}`} onChange={onChange} required/>
          <span className="input-group-text" onClick={()=>onDelete(index)}><i className="fa-solid fa-circle-minus"></i></span>
        </div>
        <div className="form-text">Use comma separated values for new line.</div>
    </div>
  )
}

export default WorkooutPart