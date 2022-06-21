import React from 'react'
import ReactDOM from 'react-dom'

const LogisticsDashboard = () => {
  return (
    <div className="px-10">This is the logistics admin dashboard page.</div>
  )
}

export default LogisticsDashboard

if (document.getElementById('logistics-dashboard')) {
  ReactDOM.render(
    <LogisticsDashboard />,
    document.getElementById('logistics-dashboard')
  )
}
