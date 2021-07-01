import React from 'react'
import imgMethPayment from './../../img/company/meth-payment.png'
import imgSupport from './../../img/company/support.png'
import imgSettingsIcon from '../../img/settings-icon.png'
import Ellipsis from './../../img/ellipsis.png'

const DashboardSettings = () => {
  const buttons = [
    {
      label: '支払い方法',
      onClick: '',
      font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs ',
      url: '#',
      photo: imgMethPayment
    },
    {
      label: 'サポート',
      onClick: '',
      font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs',
      url: '#',
      photo: imgSupport
    }
  ]

  return (
    <div className="w-full h-full relative group">
      <div className="dashboard-widget-list relative flex flex-col items-center gap-3 w-full h-full bg-main">
        <div className="w-full h-7 pl-4">
          <img className="inline" src={imgSettingsIcon} />
          <span className="ml-2 p-0 inline text-green-600 font-bold">
            クイックリンク
          </span>
          <img
            className="float-right mr-4 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div className=" w-full px-1">
          <div className="grid gap-1">
            {buttons.map((button, index) => {
              return (
                <div
                  key={index}
                  className="xl:col-span-1 h-12 w-full bg-center bg-no-repeat flex-col flex items-center justify-center rounded-full mx-auto"
                >
                  <h3
                    className={
                      'rounded-full bg-white w-5/6 h-10 font-bold text-center border-1 shadow-md text-primary-200 py-2 align-middle ' +
                      button.font
                    }
                  >
                    {button.label}
                  </h3>
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
