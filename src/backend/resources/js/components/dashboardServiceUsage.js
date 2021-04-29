import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import imgActiveUsers from '../../img/active-users.png'
import inActiveUsers from '../../img/inactive-users.png'
import imgLogUsers from '../../img/log-users.png'
import Ellipsis from '../../img/ellipsis.png'
 
class DashboardServiceUsage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      
    }
  }

  render (){
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block z-0">Move</div>
        <div className="relative flex flex-col items-center justify-center gap-4  rounded-lg border-2 border-gray-200 w-full h-full bg-white group z-20">
          <div className="component-header w-full ml-8 relative">
            <span className="border-green-600 border-solid border-l-4 border-t-0" style={{fontSize: '15px'}}> </span>
            <span className="ml-1 p-0 inline text-green-600 font-bold ">サービス利用状況</span>
            <img className= "float-right mr-6 hidden group-hover:block" src={Ellipsis}   />    
            <div className="-ml-4 mr-4 p-2 pl-4 text-xs block bg-gray-200 text-gray-500">
              サービス最終利用日時
              <span className="ml-2 pr-4 text-xs border border-gray-500"> 2021年3月15日</span>
            </div>
          </div>
          <div className="justify-around w-full h-10/12 px-3" style={{color: '#5B5B5B'}}> 
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative" style={{ height: '90px', backgroundImage: `url(${imgActiveUsers})`, backgroundRepeat: 'no-repeat', backgroundSize: '90% 90%', backgroundPosition: 'center' }}>
                <p className="absolute top-11 left-4 text-2xl text-white font-semibold">750 / 1000</p>           
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative" style={{ height: '90px', backgroundImage: `url(${inActiveUsers})`, backgroundRepeat: 'no-repeat', backgroundSize: '90% 90%', backgroundPosition: 'center' }}>
                <p className="absolute top-11 left-4 text-2xl text-white font-semibold">150 / 1000</p>          
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-2 py-2 relative" style={{ height: '90px', backgroundImage: `url(${imgLogUsers})`, backgroundRepeat: 'no-repeat', backgroundSize: '90% 90%', backgroundPosition: 'center' }}>
                <p className="absolute top-11 left-4 text-2xl text-white font-semibold">550 / 1000</p>          
              </div>
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
