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
        {
          serviceIcon: KotAttendanceIcon,
          serviceOwner: KotIcon,
          serviceName: '勤怠管理'
        },
        {
          serviceIcon: KotDataAnalysisIcon,
          serviceOwner: KotIcon,
          serviceName: 'セキュアログイン'
        },
        {
          serviceIcon: KotSecureLoginIcon,
          serviceOwner: KotIcon,
          serviceName: 'データ分析'
        }
      ]
    }

    if (this.props.displayType === 'small') {
      this.state.contractedServices.pop()
    }
  }

  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = this.props.interActivePages.includes(location.pathname)
        ? 'group-hover:block'
        : ''
    }

    console.log('contractedServices' + this.state.contractedServices)

    return (
      <div
        className={
          this.props.displayType === 'small'
            ? 'h-12/12'
            : 'h-full' + ' h-full w-full relative group'
        }
      >
        <div
          className={
            'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 2xl:border-2 lg:border cursor-move hidden ' +
            showMoveButton
          }
        >
          Move
        </div>
        <div className="dashboard-widget-list w-full h-full relative  rounded-lg border-2 border-gray-200 bg-white">
          <div
            id="widget-header"
            className="max-w-full h-12 bg-white box-border align-middle p-3 relative"
          >
            <div
              id="widget-icon"
              className="2xl:w-2 w-1 h-6 bg-primary-200 float-left 2xl:ml-4"
            >
              {' '}
            </div>
            <div
              id="widget-name"
              className="text-primary-200 font-sans font-bold 2xl:ml-8 lg:ml-4"
            >
              契約サービス
            </div>
            <img
              className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
              src={Ellipsis}
            />
          </div>
          <div
            id="widget-body"
            className="w-full bg-white 2xl:space-y-1 overflow-hidden "
          >
            {this.state.contractedServices.map((item, index) => {
              let stripe = !(index % 2) ? 'bg-mainbg' : 'bg-white'
              return (
                <span
                  id="widget-content-item"
                  className={
                    stripe +
                    ' xl:w-4/5 lg:w-8/10 h-auto align-middle xl:mx-6 lg:mx-2 rounded-3xl py-1 overflow-hidden inline-block whitespace-nowrap'
                  }
                  key={index}
                >
                  <img
                    src={item.serviceIcon}
                    className="w-auto h-6 lg:mx-1.5 2xl:mx-2 inline"
                  />
                  <img src={item.serviceOwner} className="w-auto h-3 inline" />
                  <span
                    id="item-content"
                    className="font-sans text-gray-400 font-black text-xs 2xl:ml-4 lg:mx-2 inline tracking-tighter overflow-hidden"
                  >
                    {item.serviceName}
                  </span>
                </span>
              )
            })}
          </div>
          {this.props.displayType === 'small' ? this.addFooter() : ''}
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <div id="widget-footer" className="w-full h-10 pr-4 mt-3">
        <div id="widget-footer-control" className="float-right">
          <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">
            もっと見る
          </button>
        </div>
      </div>
    )
  }
}
export default ContractedServices
if (document.getElementById('contracted-services')) {
  ReactDOM.render(
    <ContractedServices />,
    document.getElementById('contracted-services')
  )
}
