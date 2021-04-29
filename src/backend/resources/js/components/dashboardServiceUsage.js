import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import imgActiveUsers from '../../../../img/dashboard/active-users.png'
import inActiveUsers from '../../../../img/dashboard/inactive-users.png'
import imgLogUsers from '../../../../img/dashboard/log-users.png'
import imgResizeIcon from '../../../../img/dashboard/resize-icon.png'
 
class DashboardServiceUsage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render (){
    return(
      <div className="flex flex-wrap justify-around gap-4 w-full h-full rounded border border-gray-300 pb-2">
        <div className="component-header w-full mt-1 ml-2 p-0 relative">
          <span className="border-green-600 border-solid border-l-4 border-t-0" style={{fontSize: '12px'}}> </span>
          <span className="ml-1 p-0 inline text-green-600 text-sm ">Status of Service Usage</span>
          <img className= "absolute  top-1 right-1" src={imgResizeIcon}   />
          <div className="-ml-2 mt-1 p-2 text-xs block bg-gray-200 text-gray-500">
              サービス最終利用日時 
              <span className="ml-2 pr-4 text-xs border border-gray-500"> 2021年3月15日</span>
          </div>
        </div>
        <div className="justify-around w-full h-10/12" style={{color: '#5B5B5B'}}> 
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative">             
              <img className= "p-0 rounded-l" src={imgActiveUsers}   />  
              <p className="absolute top-11 left-4 text-2xl text-white font-semibold">750 / 1000</p>           
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative">             
              <img className= "p-0 rounded-l" src={inActiveUsers}   /> 
              <p className="absolute top-11 left-4 text-2xl text-white font-semibold">150 / 1000</p>          
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative">
              <img className= "p-0 rounded-l" src={imgLogUsers} />
              <p className="absolute top-11 left-4 text-2xl text-white font-semibold">550 / 1000</p>          
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardServiceUsage
if (document.getElementById('dashboardServiceUsage')){
  ReactDOM.render(<DashboardServiceUsage/>,document.getElementById('dashboardServiceUsage'))
}
