import React from 'react'
import ReactDOM from 'react-dom'
import clock from '../../../img/admin/dashboard-maintenance.png'

const TempAdminDashboard = () => {
  return (
    <div className="px-10">
      <div className="flex w-full">
        <div className="flex-grow"></div>
        <div className="flex-grow" style={{ height: '90vh' }}>
          <div className="grid grid-cols-2">
            <div className="-mr-72">
              <img style={{ height: '90vh' }} alt="Clock" src={clock}></img>
            </div>
            <div className="flex items-center justify-left">
              <h1 className="text-tertiary-500 text-3xl">販売実績表示予定</h1>
            </div>
          </div>
        </div>
        <div className="flex-grow"></div>
      </div>
    </div>
  )
}
export default TempAdminDashboard

if (document.getElementById('admin-dashboard')) {
  ReactDOM.render(
    <TempAdminDashboard />,
    document.getElementById('admin-dashboard')
  )
}
