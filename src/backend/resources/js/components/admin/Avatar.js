import React from 'react'
import ReactDOM from 'react-dom'
function Avatar() {
  return (
    <div className="container">
             
            This is my avatar 5.
             
    </div>
  )
}
export default Avatar
if (document.getElementById('avatar')) {
  ReactDOM.render(<Avatar />, document.getElementById('avatar'))
}
