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
  const buttons = [
    { label: '支払い方法', onClick: '', font: '3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-lg md: text-md sm:text-md', url: '#', photo: imgMethPayment},
    { label: 'サービスをキャンセル', onClick: '', font: '3xl:text-2xl 2xl:text-xl xl:text-lg lg:text-md md: text-sm sm:text-xs', url: '', photo: imgCancelService},
    { label: '通知', onClick: '', font: '3xl:text-5xl 2xl:text-4xl xl:text-3xl lg:text-2xl md: text-xl sm:text-lg', url: '#', photo: imgNotice },
    { label: 'サポート', onClick: props.showWidgets, font: '3xl:text-4xl 2xl:text-3xl xl:text-2xl lg:text-xl md: text-lg sm:text-md', url: '#', photo: imgSupport},
  ]

  return(
    <div className="w-full h-full relative group">
      <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
      <div className="relative flex flex-col items-center gap-3 rounded-lg border-2 border-gray-200 w-full h-full bg-white group pt-3">
        <div className="w-full h-12 pl-4">
          <img className="inline" src={imgSettingsIcon}/>
          <span className="ml-2 p-0 inline text-green-600 font-bold ">設定</span>
          <img className= "float-right mr-4 hidden group-hover:block" src={Ellipsis} />
        </div>
        <div className=" w-full px-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {
              buttons.map((button, index) => {
                return (
                  <div key={index} onClick={button.onClick} className="cursor-pointer col-span-2 xl:col-span-1 h-36 bg-center bg-no-repeat bg-cover flex items-center justify-center rounded-lg" style={{ backgroundImage: `url("${button.photo}")` }}>
                    <h3 className={'font-bold text-white ' + button.font }>{button.label}</h3>
                  </div>
                )
              })
            }
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
