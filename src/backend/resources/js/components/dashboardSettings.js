import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import imgMethPayment from './../../img/meth-payment.png'
import imgCancelService from './../../img/cancel-service.png'
import imgNotice from './../../img/notice.png'
import imgSupport from './../../img/support.png'
import imgSettingsIcon from '../../img/settings-icon.png'
import Ellipsis from './../../img/ellipsis.png'
 
class DashboardSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render (){
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-gray-200 w-full h-full bg-white group pt-3">
          <div className="component-header w-full h-4 pl-4">
            <img className="inline" src={imgSettingsIcon}   />
            <span className="ml-2 p-0 inline text-green-600 font-bold ">設定</span>
            <img className= "float-right mr-4 hidden group-hover:block" src={Ellipsis} />
          </div>
          <div className="justify-around w-full h-full overflow-hidden relative"> 
            <div className="flex flex-wrap px-8 py-6 pb-4 -mt-4 h-full">
              <div className="flex justify-center md:w-1/2 md:h-1/2 px-4 py-4">             
                <img className= "p-0 rounded-l" src={imgMethPayment}  />             
              </div>
              <div className="flex justify-center md:w-1/2 md:h-1/2 px-4 py-4">             
                <img className= "p-0 rounded-l" src={imgCancelService} />           
              </div>
              <div className="flex justify-center md:w-1/2 md:h-1/2 px-4 py-4">
                <img className= "p-0 rounded-l" src={imgNotice} />          
              </div>
              <div className="flex justify-center md:w-1/2 md:h-1/2 px-4 py-4">             
                <img className= "p-0 rounded-l" src={imgSupport}  />            
              </div>
            </div>
          </div>
        </div>
      </div>  
    )
  }
}

export default DashboardSettings
if (document.getElementById('dashboardSettings')){
  ReactDOM.render(<DashboardSettings/>,document.getElementById('dashboardSettings'))
}
