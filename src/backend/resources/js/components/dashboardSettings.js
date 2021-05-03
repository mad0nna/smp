import React from 'react'
import ReactDOM from 'react-dom'
import imgMethPayment from './../../img/meth-payment.png'
import imgCancelService from './../../img/cancel-service.png'
import imgNotice from './../../img/notice.png'
import imgSupport from './../../img/support.png'
import imgSettingsIcon from '../../img/settings-icon.png'
import Ellipsis from './../../img/ellipsis.png'

const DashboardSettings =(props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = (props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
  }
  return(
    <div className="w-full h-full relative group">
      <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-gray-200 w-full h-full bg-white group pt-3">
        <div className="component-header w-full h-4 pl-4">
          <img className="inline" src={imgSettingsIcon}   />
          <span className="ml-2 p-0 inline text-green-600 font-bold ">設定</span>
          <img className= "float-right mr-4 hidden group-hover:block" src={Ellipsis} />
        </div>
        <div className="justify-around w-full h-full overflow-hidden relative">
          <div className="flex flex-wrap px-8 py-6 pb-4 h-full">
            <div className="flex justify-center md:w-1/2 md:h-1/2 2xlg:px-1 sm:pr-2">
              <img className= "p-0 rounded-l" src={imgMethPayment} style={{height : '80%'}} />
            </div>
            <div className="flex justify-center md:w-1/2 md:h-1/2 2xlg:px-1 sm:pl-2">
              <img className= "p-0 rounded-l" src={imgCancelService} style={{height : '80%'}} />
            </div>
            <div className="flex justify-center md:w-1/2 md:h-1/2 2xlg:px-1 sm:pr-2">
              <img className= "p-0 rounded-l" src={imgNotice} style={{height : '80%'}} />
            </div>
            <div onClick={props.showWidgets} className="cursor-pointer flex justify-center md:w-1/2 md:h-1/2 2xlg:px-1 sm:pl-2">
              <img className= "p-0 rounded-l" src={imgSupport} style={{height : '80%'}} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default DashboardSettings
if (document.getElementById('dashboardSettings')){
  ReactDOM.render(<DashboardSettings/>,document.getElementById('dashboardSettings'))
}
