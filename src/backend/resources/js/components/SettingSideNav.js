import React from 'react'

const SettingSideNav = () => {
  return (
    <div>
      <div className="mb-4">
        <div className="bg-cover bg-no-repeat bg-arrow-left w-8 h-8 inline-block"></div>
        <h1 className="inline-block align-middle mb-4">Back</h1>
      </div>
      <h1 className="pl-8 text-lg font-black">Settings</h1>
      <div className="space-y-2">
        <div id="settings-navigation-item" className="group cursor-pointer">
          <a href="/admin/settings">
            <div className="pl-8 py-4 group-hover:bg-green-500 group-hover:text-white">
              Invoice Template List
            </div>
          </a>
        </div>
        <div id="settings-navigation-item" className="group cursor-pointer">
          <a href="/admin/settings/invoice/detail">
            <div className="pl-8 py-4 group-hover:bg-green-500 group-hover:text-white">
              Invoice Template Details
            </div>
          </a>
        </div>
        <div id="settings-navigation-item" className="group cursor-pointer">
          <a href="#">
            <div className="pl-8 py-4 group-hover:bg-green-500 group-hover:text-white">
              Widget
            </div>
          </a>
        </div>
        <div id="settings-navigation-item" className="group cursor-pointer">
          <a href="#">
            <div className="pl-8 py-4 group-hover:bg-green-500 group-hover:text-white">
              Account
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}
export default SettingSideNav
