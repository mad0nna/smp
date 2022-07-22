import React, { useState, useEffect } from 'react'
import Ellipsis from '../../img/ellipsis.png'
import spinner from '../../img/spinner.gif'

const BillingHistory = () => {
  const [state, setState] = useState({
    loading: true,
    billingHistory: []
  })

  useEffect(() => {
    fetch('/company/getBilling', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        data = data.slice(0, 9)
        setState({
          loading: false,
          billingHistory: data
        })
      })
      .catch(() => {
        document.getElementsByClassName('billing-loading')[0].style.display =
          'none'
      })
  }, [])

  return (
    <div className="w-full h-full relative group">
      <div className="dashboard-widget-list overflow-hidden w-full h-full relative bg-white rounded-lg shadow-xl pt-3 px-3">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="flex flex-row justify-between w-full pb-2">
              <div>
                <h2 className="text-green-800 text-lg font-bold">請求書</h2>
              </div>
            </div>
          </div>
          <div className="absolute w-5 h-1 -top-1 -right-1 hidden group-hover:block">
            <img alt="Ellipsis" src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full">
          {state.loading === true ? (
            <div className="w-full relative mt-24 h-24 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center billing-loading">
                請求書を読み込み中です
                <img
                  alt="Spinner"
                  className="mx-auto h-12 mt-5"
                  src={spinner}
                />
              </div>
            </div>
          ) : (
            state.billingHistory.map((item, index) => {
              let stripe = index % 2 ? 'bg-white' : ''
              return (
                <div
                  id="widget-content-item"
                  className={
                    stripe +
                    ' w-full h-auto relative px-3 py-4 hover:bg-gray-50 border-b border-gray-100'
                  }
                  key={index}
                >
                  <div className="2xl:w-5/12 lg: xl:w-5/12 lg:w-5/12 sm:w-6/12 h-full inline-block align-top 2xl:mr-4 xl:mr-3 lg:mr-2 sm:mr-0">
                    <h5 className="text-right font-semibold 2xl:text-lg xl:3xl lg:text-base md:text-sm sm:text-xs text-gray-500 font-sans">
                      {`${item.amount} `} <span>円(税込)</span>
                    </h5>
                    <p className="2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans">
                      支払期限
                    </p>
                    <p className="2xl:text-sm xl:text-xxs lg:text-xxs  xs:text-xxs text-gray-500 font-sans font-semibold">
                      {item.dueDate}
                    </p>
                  </div>
                  <div className="w-1/2 h-full inline-block tracking-tighter align-top">
                    <div className="-mt-1">
                      <div className="text-gray-400 inline-block 2xl:text-xs lg:text-xxs sm:text-xxs 2xl:mr-3 xl:mr-2 lg:mr-1 sm:mr-0 tracking-widest">
                        請求書番号
                      </div>
                      <div className="text-gray-500 inline-block 2xl:text-xs lg:text-xxs sm:text-xxs xs:text-xxs font-bold tracking-wider">
                        {item.invoiceNumber}
                      </div>
                    </div>
                    <div className="-mt-1 mb-1">
                      <div className="text-gray-400 inline-block 2xl:text-xs xl:text-xs lg:text-xxs sm:text-xxs tracking-widest">
                        請求日
                      </div>
                      <div className="text-gray-500 inline-block 2xl:text-xs xl:text-xs lg:text-xxs sm:text-xxs xs:text-xxs font-bold 2xl:ml-6 xl:ml-3 lg:ml-1 sm:ml-1 tracking-wider">
                        {item.invoiceDate}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
        <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
          {!state.loading ? (
            <div id="widget-footer-control" className="float-right">
              <a
                href="/company/billing"
                className="border-tertiary-500 text-bold w-24 border-2 text-tertiary-500 rounded-3xl tracking-tighter px-2"
              >
                さらに表示
              </a>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default BillingHistory
