import React from 'react'
import ReactDOM from 'react-dom'
// import { Clients } from './menu'

const Logistics = () => {
  return (
    <div>
      <h1>Logistics Page</h1>
    </div>
  )
}

export default Logistics

if (document.getElementById('logistics-dashboard')) {
  ReactDOM.render(<Logistics />, document.getElementById('logistics-dashboard'))
}
