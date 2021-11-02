import React from 'react'
import Ellipsis from './../../img/ellipsis.png'

const DashboardSettings = () => {
  const buttons = [
    // {
    //   label: 'Payment Method',
    //   onClick: '',
    //   font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs',
    //   url: '',
    //   photo: ''
    // },
    {
      label: 'サポート',
      onClick: '',
      font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs',
      url: 'https://support.ta.kingoftime.jp/hc/ja',
      photo: ''
    }
  ]

  return (
    <div className="w-full h-full relative group overflow-hidden">
      <div className="relative gap-3 bg-white rounded-lg shadow-xl w-full h-full">
        <div
          id="widget-header"
          className="relative box-border pt-3 pl-3 pr-3 pb-7"
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
            <div className="xl:col-span-1 h-10 w-full bg-center bg-no-repeat flex-col flex items-center justify-center py-3 rounded-full mx-auto">
              <h3 className="rounded-full bg-white w-5/6 h-10 font-bold text-center border-1 shadow-md text-primary-200 py-2 align-middle 3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs">
                <form
                  method="POST"
                  action="https://linkpt.cardservice.co.jp/cgi-bin/credit/order.cgi"
                  target="_top"
                >
                  <input type="hidden" name="clientip" value="2019001618" />
                  <input type="hidden" name="money" value="10000" />
                  <input type="hidden" name="sendid" value="TEST" />
                  <input type="hidden" name="sendpoint" value="TEST123" />
                  <input type="hidden" name="telno" value="0334989030" />
                  <input
                    type="hidden"
                    name="email"
                    value="santos.ma@sprobe.com"
                  />
                  <input
                    type="hidden"
                    name="success_url"
                    value="https://v2-idaten.sprobe.ph/company/dashboard"
                  />
                  <input
                    type="hidden"
                    name="success_str"
                    value="success test"
                  />
                  <input
                    type="hidden"
                    name="failure_url"
                    value="https://v2-idaten.sprobe.ph/company/dashboard"
                  />
                  <input type="hidden" name="failure_str" value="failed test" />
                  <input
                    type="submit"
                    name="To Credit Page"
                    value="Payment Method"
                    className="cursor-pointer font-bold text-center bg-transparent text-primary-200 py-2 align-middle 3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs"
                  />
                </form>
              </h3>
            </div>
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
