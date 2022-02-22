import React from 'react'
import unpaidBillingIcon from '../../img/unpaid-billing-icon.png'

const UnpaidBillingInformation = (props) => {
  const { data } = props

  return (
    <div className="flex flex-col w-2/3 min-w-min pl-3 overflow">
      <div className="w-full mt-3 mb-3 ml-4">
        <span className="text-green-600 font-semibold text-left">
          <img className="inline h-6 w-8 mr-4" src={unpaidBillingIcon} />
          未払い情報
        </span>
      </div>
      <table className="table-fixed w-full mt-1 ml-3 rounded-lg shadow-lg divide-y divide-slate-200">
        <thead>
          <tr className="divide-x divide-slate-200">
            <th className="text-green-500 text-center font-extralight p-3">
              支払期日 :
            </th>
            <th className="text-green-500 text-center font-extralight p-3">
              支払期限 :
            </th>
            <th className="text-green-500 text-center font-extralight p-3">
              未払額 :
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="divide-x divide-slate-200">
            <td className="text-gray-600 text-center font-extralight p-3">
              {data.due_billed_deadline_date}
            </td>
            <td className="text-gray-600 text-center font-extralight p-3">
              {data.due_billed_payment_period}
            </td>
            <td className="text-red-600 text-center font-semibold p-3">
              {data.total_billed_amount}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default UnpaidBillingInformation
