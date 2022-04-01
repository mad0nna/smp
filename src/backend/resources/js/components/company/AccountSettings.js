import React from 'react'
import ReactDOM from 'react-dom'
import SettingSideNav from '../SettingSideNav'
const AccountSettings = () => {
  var minheight = { 'min-height': '700px' }
  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <SettingSideNav />
      <div className="bg-white rounded-lg my-10 w-8/12 mx-auto col-span-5">
        <div className="p-3 pb-6">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">
              Account Settings
            </h2>
          </div>
          <div className="text-center">
            {/* <h2>You are about to get the updated data from Salesforce.</h2>
            <h2>These are the details that might be affected:</h2> */}

            {/* You are about to get the updated from Salesforce. These are the
            details that you're going to get: - Company details - Opportunity
            details - Contact persons details - List of unpaid companies */}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AccountSettings
if (document.getElementById('company-settings-account')) {
  ReactDOM.render(
    <AccountSettings />,
    document.getElementById('company-settings-account')
  )
}
