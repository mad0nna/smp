import React from 'react'
import ReactDOM from 'react-dom'
import imgMethPayment from './../../img/company/meth-payment.png'
import imgSupport from './../../img/company/support.png'
import imgSettingsIcon from '../../img/settings-icon.png'
import Ellipsis from './../../img/ellipsis.png'

const DashboardSettings = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = props.interActivePages.includes(location.pathname)
      ? 'group-hover:block'
      : ''
  }
  const buttons = [
    {
      label: '支払い方法',
      onClick: '',
      font: '3xl:text-xl 2xl:text-lg xl:text-md lg:text-sm md: text-xs sm:text-xxs',
      url: '#',
      photo: imgMethPayment
    },
    {
      label: 'サポート',
      onClick: props.showWidgets,
      font: '3xl:text-xl 2xl:text-lg xl:text-md lg:text-sm md: text-xs sm:text-xxs',
      url: '#',
      photo: imgSupport
    }
  ]

  return (
    <div className="w-full h-full relative group">
      <div
        className={
          'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' +
          showMoveButton
        }
      >
        Move
      </div>
      <div className="dashboard-widget-list relative flex flex-col items-center gap-3 rounded-lg border-2 border-gray-200 w-full h-full bg-white group pt-2">
        <div className="w-full h-10 pl-4">
          <img className="inline" src={imgSettingsIcon} />
          <span className="ml-2 p-0 inline text-green-600 font-bold ">
            設定
          </span>
          <img
            className="float-right mr-4 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div className=" w-full px-2 overflow-y-auto">
          <div className="grid gap-2">
            {buttons.map((button, index) => {
              return (
                <div
                  key={index}
                  onClick={button.onClick}
                  className="xl:col-span-1 h-8 w-5/6 bg-center bg-no-repeat bg-primary-200 bg-cover flex-col flex items-center justify-center rounded-full mx-auto"
                >
                  <h3
                    className={
                      'text-center font-bold text-white ' + button.font
                    }
                  >
                    {button.label}
                  </h3>
                  <span
                    className={
                      'text-center block font-bold text-white ' + button.font
                    }
                  >
                    {' '}
                    {button.label2}{' '}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSettings
if (document.getElementById('dashboardSettings')) {
  ReactDOM.render(
    <DashboardSettings />,
    document.getElementById('dashboardSettings')
  )
}
