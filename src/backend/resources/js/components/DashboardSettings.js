import React from 'react'
import imgMethPayment from './../../img/company/meth-payment.png'
import imgSupport from './../../img/company/support.png'
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
      url: 'https://support.ta.kingoftime.jp/hc/ja',
      photo: imgSupport
    }
  ]

  return (
    <div className="w-full h-full relative group">
      <div className="relative gap-3 bg-white rounded-lg shadow-xl w-full h-full">
        <div
          id="widget-header"
          className="relative box-border pt-3 pl-3 pr-3 pb-2"
        >
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                クイックリンク
              </h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>

        <div className=" w-full px-1">
          <div className="grid gap-1">
            {buttons.map((button, index) => {
              return (
                <div
                  key={index}
                  className="xl:col-span-1 h-10 w-full bg-center bg-no-repeat flex-col flex items-center justify-center py-3 rounded-full mx-auto"
                >
                  {button.url !== '#' ? (
                    <h3
                      className={
                        'cursor-pointer rounded-xl bg-white w-5/6 h-10 font-bold text-center border-1 shadow-md text-primary-200 py-2 align-middle ' +
                        button.font
                      }
                      onClick={() => {
                        window.open(button.url, '_blank')
                      }}
                    >
                      {button.label}
                    </h3>
                  ) : (
                    <h3
                      className={
                        'rounded-full bg-white w-5/6 h-10 font-bold text-center border-1 shadow-md text-primary-200 py-2 align-middle ' +
                        button.font
                      }
                    >
                      {button.label}
                    </h3>
                  )}
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
