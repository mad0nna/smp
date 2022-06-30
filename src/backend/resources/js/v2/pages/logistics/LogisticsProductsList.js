import React from 'react'
import ReactDOM from 'react-dom'

const LogisticsProductsList = () => {
  return (
    <div className="px-10">
      This is the logistics products list landing page.
    </div>
  )
}

export default LogisticsProductsList

if (document.getElementById('logistics-products-list')) {
  ReactDOM.render(
    <LogisticsProductsList />,
    document.getElementById('logistics-products-list')
  )
}
