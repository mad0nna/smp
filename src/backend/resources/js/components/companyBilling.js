import React from 'react'
import ReactDOM from 'react-dom'

import PdfIcon from '../../img/pdf2-icon.png'
import Ellipsis from '../../img/ellipsis.png'
import PrevButton from '../../img/pagination-prev.png'
import NextButton from '../../img/pagination-next.png'

const CompanyBilling = () => {
  const billingList = [
    {
      no: 'INV00024143',
      billingName: 'KOT-TM定期購読',
      billingDate: '2021年5月1日',
      dueDate: '2021年5月31日',
      amount: '¥10,890',
      paidOn: '-',
      status: '未払い'
    },
    {
      no: 'INV00024011',
      billingName: 'KOT-SL 定期購読',
      billingDate: '2021年4月1日',
      dueDate: '2021年4月30日',
      amount: '¥11,220',
      paidOn: '2021年4月30日',
      status: '支払い済み'
    },
    {
      no: 'INV00023561',
      billingName: 'KOT-TM 定期購読',
      billingDate: '2021年3月1日',
      dueDate: '2021年3月31日',
      amount: '¥10,890',
      paidOn: '2021年3月28日',
      status: '支払い済み'
    },
    {
      no: 'INV00012456',
      billingName: 'KOT-XC 定期購読',
      billingDate: '2021年2月1日',
      dueDate: '2021年2月28日',
      amount: '¥1,542,000',
      paidOn: '2021年2月20日',
      status: '支払い済み'
    },
    {
      no: 'INV00073895',
      billingName: 'KOT-SM 定期購読',
      billingDate: '2021年1月1日',
      dueDate: '2021年1月31日',
      amount: '¥5,040,220',
      paidOn: '2021年1月25日',
      status: '支払い済み'
    },
    {
      no: 'INV00072546',
      billingName: 'KOT-RT 定期購読',
      billingDate: '2020年12月1日',
      dueDate: '2020年12月31日',
      amount: '¥78,505,500',
      paidOn: '2020年12月22日',
      status: '支払い済み'
    },
    {
      no: 'INV00023451',
      billingName: 'KOT-WH 定期購読',
      billingDate: '2020年11月1日',
      dueDate: '2020年11月30日',
      amount: '¥2,024,520',
      paidOn: '2020年11月28日',
      status: '支払い済み'
    },
    {
      no: 'INV00078511',
      billingName: 'KOT-NB 定期購読',
      billingDate: '2020年10月1日',
      dueDate: '2020年10月31日',
      amount: '¥3,359,950',
      paidOn: '2020年10月29日',
      status: '支払い済み'
    },
    {
      no: 'INV00065224',
      billingName: 'KOT-RT 定期購読',
      billingDate: '2020年9月1日',
      dueDate: '2020年9月30日',
      amount: '¥11,520',
      paidOn: '2020年9月27日',
      status: '支払い済み'
    },
    {
      no: 'INV00012575',
      billingName: 'KOT-SL 定期購読',
      billingDate: '2020年8月1日',
      dueDate: '2020年8月31日',
      amount: '¥45,234,770',
      paidOn: '2020年8月19日',
      status: '支払い済み'
    }
  ]

  return (
    <div className="relative px-10 mt-5 bg-mainbg">
      <div className="w-full h-full bg-white overflow-hidden relative  rounded-lg shadow-xl">
        <div className="px-3 pt-3 pb-1">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">請求履歴</h2>
          </div>
        </div>

        <div
          id="widget-header"
          className="max-w-full h-24 bg-white box-border align-middle p-4 relative"
        >
          <div id="widget-name" className="float-right mr-3">
            <div className="table-cell relative h-20 w-full align-middle">
              <div
                id="search-bar"
                className="bg-gray-100 h-12 rounded-lg w-96 mx-0 my-auto"
              >
                <svg
                  className="text-gray-500 fill-current w-auto h-11 float-left mt-0.5 p-3"
                  xmlns="http://www.w3.org/2000/svg"
                  x="30px"
                  y="30px"
                  viewBox="0 0 487.95 487.95"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                            c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                            c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                    />
                  </g>
                </svg>
                <input
                  type="text"
                  id="billingSearch"
                  className="h-full w-80 bg-gray-100 custom-outline-none"
                  placeholder="検索"
                />
              </div>
            </div>
          </div>
          <div></div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div
          id="widget-body"
          className="h-50 w-full bg-white overflow-hidden px-3"
        >
          <table className="table-auto w-full h-auto text-center mb-6">
            <thead className="bg-gray-50 border-b border-t border-gray-200">
              <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                <th>請求書番号</th>
                <th>請求書名</th>
                <th>請求日</th>
                <th>支払期限</th>
                <th className="text-right">請求額</th>
                <th>支払日</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {billingList.map((item, index) => {
                let txtcolor =
                  item.status === '未払い' ? 'orange' : 'text-gray-500'
                return (
                  <tr
                    className="table-row h-16 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                    key={index}
                  >
                    <td className="text-center">{item.no}</td>
                    <td className="text-center">{item.billingName}</td>
                    <td className="text-center"> {item.billingDate}</td>
                    <td className="text-center">{item.dueDate}</td>
                    <td className="text-right">{item.amount}</td>
                    <td className="text-center">{item.paidOn}</td>
                    <td className={txtcolor + ' text-center'}>{item.status}</td>
                    <td className="text-center">
                      <img src={PdfIcon} className="mx-auto w-6 h-auto" />{' '}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="billing-pagination"
        className="w-full h-12 p-3 text-center space-x-2"
      >
        <img src={PrevButton} className="inline-block w-8 h-auto" />
        <div className="inline-block text-primary-200">
          <span className="text-white rounded-2xl bg-primary-200 px-3 py-1">
            1
          </span>
          <span className="px-3 py-2">2</span>
          <span className="px-3 py-2 rounded-2xl">3</span>
        </div>
        <img src={NextButton} className="inline-block  w-8 h-auto" />
      </div>
    </div>
  )
}

export default CompanyBilling

if (document.getElementById('companyBilling')) {
  ReactDOM.render(<CompanyBilling />, document.getElementById('companyBilling'))
}
