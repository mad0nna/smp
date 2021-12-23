import React, { useState, useEffect } from 'react'
import Ellipsis from '../../img/ellipsis.png'
import spinner from '../../img/spinner.gif'
import unpaidBillingIcon from '../../img/unpaid-billing-icon.png'

const UnpaidBillingInformation = () => {
  const [state, setState] = useState({
    loading: true,
    unpaidBillingData: []
  })

  useEffect(() => {
    fetch('/company/getUnpaidBillingInformation', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((results) => {
        setState({
          loading: false,
          unpaidBillingData: results.data
        })
      })
  }, [])

  return (
    <div className="w-full h-full relative group">
      <div className="dashboard-widget-list overflow-hidden w-full h-full relative bg-white rounded-lg shadow-xl pt-3 px-3">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="flex flex-row justify-between w-full pb-2 border-b border-green-800 border-opacity-80">
              <div className="flex flex-row items-center">
                <div className="mb-1 mr-3 h-2 w-4 bg-cover bg-no-repeat">
                  <img src={unpaidBillingIcon} />
                </div>
                <h2 className="text-green-800 text-lg font-bold">物販</h2>
              </div>
            </div>
          </div>
          <div className="absolute w-5 h-1 -top-1 -right-1 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        {state.loading === true ? (
          <div className="w-full relative mt-24 h-24 dashboard-widget-list overflow-hidden">
            <div className="mx-auto absolute bottom-1 w-full text-center billing-loading">
              <img className="mx-auto h-12 mt-5" src={spinner}></img>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col mt-3 ml-3 mr-3">
                <div className="text-green-500 text-sm">
                  未払額 :
                  <span className="text-red-700 float-right ml-3 font-semibold">
                    {state.unpaidBillingData.due_last_billed_amount
                      ? ` ¥ ${state.unpaidBillingData.due_last_billed_amount}`
                      : '-'}
                  </span>
                </div>
                <div className="text-green-500 text-sm">
                  支払期日 :
                  <span className="float-right ml-3 text-green-700">
                    {state.unpaidBillingData.due_last_billed_deadline_date
                      ? state.unpaidBillingData.due_last_billed_deadline_date
                      : '-'}
                  </span>
                </div>
                <div className="text-green-500 text-sm">
                  支払期限 :
                  <span className="float-right ml-3 text-green-700">
                    {state.unpaidBillingData.due_last_billed_payment_period
                      ? state.unpaidBillingData.due_last_billed_payment_period
                      : '-'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col ml-3 mr-3">
                <div className="text-green-500 text-sm">
                  未払額 :
                  <span className="text-red-700 float-right ml-3 font-semibold">
                    {state.unpaidBillingData.due_billed_amount
                      ? ` ¥ ${state.unpaidBillingData.due_billed_amount}`
                      : '-'}
                  </span>
                </div>
                <div className="text-green-500 text-sm">
                  支払期日 :
                  <span className="float-right ml-3 text-green-700">
                    {state.unpaidBillingData.due_billed_deadline_date
                      ? state.unpaidBillingData.due_billed_deadline_date
                      : '-'}
                  </span>
                </div>
                <div className="text-green-500 text-sm">
                  支払期限 :
                  <span className="float-right ml-3 text-green-700">
                    {state.unpaidBillingData.due_billed_payment_period
                      ? state.unpaidBillingData.due_billed_payment_period
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row-reverse">
              <div className="mt-5 mr-3 text-green-500 text-sm">
                合計 :
                <span className="text-red-700 ml-3 font-semibold">
                  {state.unpaidBillingData.due_billed_amount
                    ? state.unpaidBillingData.total_billed_amount
                    : '-'}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
export default UnpaidBillingInformation
