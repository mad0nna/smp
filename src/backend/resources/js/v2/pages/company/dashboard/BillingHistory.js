import React, { useState, useEffect } from 'react'
import Ellipsis from '../../../../../img/ellipsis.png'
import spinner from '../../../../../img/spinner.gif'

const BillingHistory = () => {
  const [state, setState] = useState({
    loading: true,
    billingHistory: []
  })

  useEffect(() => {
    let isMounted = true

    async function getBilling() {
      fetch('/company/getBilling', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => {
          data = data.slice(0, 9)
          if (isMounted) {
            setState({
              loading: false,
              billingHistory: data
            })
          }
        })
        .catch(() => {
          document.getElementsByClassName('billing-loading')[0].style.display =
            'none'
        })
    }
    getBilling()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="w-full h-full relative group">
      <div className="dashboard-widget-list overflow-hidden w-full h-full relative bg-white rounded-lg pt-3 px-3">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="flex flex-row justify-between w-full">
              <div>
                <span className="text-green-800 text-28px font-bold pb-9 opacity-100">
                  請求書
                </span>
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
              return (
                <div
                  id="widget-content-item"
                  className={
                    ' w-full h-auto relative p-5 bg-hex-F5F5F5  border-b border-hex-F5F5F5  rounded-2xl mb-3'
                  }
                  key={index}
                >
                  <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-x-10 pb-5">
                    <div className="grid">
                      <div className="text-3xl text-hex-007B53 font-bold tracking-tighter opacity-100">
                        {`${item.amount} `} <span>円(税込)</span>
                      </div>
                    </div>

                    <div className="grid">
                      <div>
                        <span className="text-lg text-hex-007B53 font-semibold tracking-tighter opacity-100">
                          請求書番号{' '}
                        </span>
                        <div className="text-hex-1E1E1E font-semibold tracking-tighter opacity-100">
                          {item.invoiceNumber}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-x-10">
                    <div className="grid">
                      <div>
                        <span className="text-lg text-hex-007B53 font-semibold tracking-tighter opacity-100">
                          支払期限{' '}
                        </span>
                        <div className="text-1E1E1E font-semibold tracking-tighter opacity-100">
                          {item.dueDate}
                        </div>
                      </div>
                    </div>

                    <div className="grid">
                      <div>
                        <span className="text-lg text-hex-007B53 font-bold tracking-tighter opacity-100">
                          請求日{' '}
                        </span>
                        <div className="text-1E1E1E font-bold tracking-tighter opacity-100">
                          {item.invoiceDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
        {!state.loading ? (
          <div id="widget-footer" className="w-full h-10 p-4 mb-7">
            <div id="widget-footer-control" className="float-right">
              <a href="/company/shop">
                <button className="dashboard-widget-button bg-hex-007B53 text-white">
                  さらに表示
                </button>
              </a>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default BillingHistory
