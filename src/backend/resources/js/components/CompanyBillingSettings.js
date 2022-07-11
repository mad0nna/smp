import React from 'react'

const CompanyBillingSettings = () => {
  const buttons = [
    {
      label: 'お支払い方法',
      onClick: '',
      font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs',
      url: '/company/setting/payment-method',
      photo: '',
      newTab: false
    },
    {
      label: 'サポート',
      onClick: '',
      font: '3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs',
      url: 'https://support.ta.kingoftime.jp/hc/ja',
      photo: '',
      newTab: true
    }
  ]

  return (
    <div className="w-1/4 min-w-min h-full relative group overflow-hidden mb-3">
      <div className="relative gap-3 bg-white rounded-lg shadow-xl w-full h-full">
        <div id="widget-header" className="relative box-border p-3 ml-6">
          <div>
            <div>
              <h2 className="text-green-600 font-semibold">クイックリンク</h2>
            </div>
          </div>
        </div>

        <div className=" w-full px-1">
          <div className="grid gap-1">
            {buttons.map((button, index) => {
              return (
                <div
                  key={index}
                  className="xl:col-span-1 h-14 w-full bg-center bg-no-repeat flex-col flex items-center justify-center py-3 rounded-full mx-auto"
                >
                  {button.url !== '#' ? (
                    <h3
                      className={
                        'cursor-pointer rounded-xl bg-white w-5/6 h-14 font-bold text-center border-1 shadow-md text-tertiary-500 py-2 align-middle ' +
                        button.font
                      }
                      onClick={() => {
                        if (button.newTab) {
                          window.open(button.url, '_blank')
                        } else {
                          location.replace(button.url)
                        }
                      }}
                    >
                      {button.label}
                    </h3>
                  ) : (
                    <h3
                      className={
                        'rounded-full bg-white w-5/6 h-14 font-bold text-center border-1 shadow-md text-tertiary-500 py-2 align-middle ' +
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

export default CompanyBillingSettings
