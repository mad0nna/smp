import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import KotIcon from '../../svg/kot-service-icon.svg'
import KotAttendanceIcon from '../../svg/kot-attendance.svg'
import KotSecureLoginIcon from '../../svg/kot-secure-login.svg'
import KotDataAnalysisIcon from '../../svg/kot-data-analysis.svg'
class ContractedServices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contractedServices: [
        {serviceIcon: KotAttendanceIcon, serviceOwner: KotIcon, serviceName: '勤怠管理'},
        {serviceIcon: KotDataAnalysisIcon, serviceOwner: KotIcon, serviceName: 'セキュアログイン'},
        {serviceIcon: KotSecureLoginIcon, serviceOwner: KotIcon, serviceName: 'データ分析'},
      ]
    }
  }
  render() {
    let servicesCounter = this.state.contractedServices.length
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="w-2 h-6 bg-primary-200 float-left ml-4"> </div>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-8">契約サービス</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className= 'h-widgetBody-sm w-full bg-white space-y-2 overflow-hidden'>
            {
              this.state.contractedServices.map((item, index) => {
                let stripe = (!(index % 2)) ? 'bg-mainbg' : 'bg-white'
                return (
                  <div id="widget-content-item" className={stripe + ' w-auto h-auto align-middle mx-6 rounded-3xl py-1'} key={index}>
                    <img src={item.serviceIcon} className="w-auto h-6 ml-2 mr-2 inline-block"/>
                    <img src={item.serviceOwner} className="w-auto h-3 inline-block"/>
                    <p id="item-content" className="font-sans text-gray-400 font-black text-xs ml-4 inline-block tracking-tighter">
                      {item.serviceName}
                    </p>
                  </div>
                )
              })
            }
          </div>
          {servicesCounter >= 3 ? this.addFooter() : ''}
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
        <div id="widget-footer-control" className="float-right">
          <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">もっと見る</button>
        </div>
      </div>
    )
  }
}
export default ContractedServices
if(document.getElementById('contracted-services')) {
  ReactDOM.render(
    <ContractedServices />
    , document.getElementById('contracted-services'))
}
