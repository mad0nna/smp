import React from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import PdfIcon from '../../../img/pdf-icon.png'
import HistoryIcon from '../../../img/history-icon.png'

const SalesBillingHistory = (props) => {
  const billingHistory = [
    {
      amount: '¥458,040',
      dueDate: '2021年5月31日',
      invoiceNo: 'INV00024522',
      invoiceDate: '2021年5月1日',
      paymentDate: '未払い'
    },
    {
      amount: '¥990,110',
      dueDate: '2021年3月31日',
      invoiceNo: 'INV00024752',
      invoiceDate: '2021年3月1日',
      paymentDate: '2021年3月20日'
    },
    {
      amount: '¥1,224,510',
      dueDate: '2021年2月28日',
      invoiceNo: 'INV00021789',
      invoiceDate: '2021年2月1日',
      paymentDate: '2021年2月15日'
    },
    {
      amount: '¥2,305,520',
      dueDate: '2021年1月31日',
      invoiceNo: 'INV00026478',
      invoiceDate: '2021年1月1日',
      paymentDate: '2021年1月15日'
    },
    {
      amount: '¥150,660',
      dueDate: '2020年12月31日',
      invoiceNo: 'INV00020245',
      invoiceDate: '2020年12月1日',
      paymentDate: '2020年12月31日'
    },
    {
      amount: '¥90,850',
      dueDate: '2020年11月30日',
      invoiceNo: 'INV00026475',
      invoiceDate: '2020年11月1日',
      paymentDate: '2020年11月19日'
    },
    {
      amount: '¥33,450',
      dueDate: '2020年10月31日',
      invoiceNo: 'INV00026478',
      invoiceDate: '2020年10月1日',
      paymentDate: '2020年10月4日'
    },
    {
      amount: '¥1,567,400',
      dueDate: '2021年9月30日',
      invoiceNo: 'INV00023647',
      invoiceDate: '2021年9月1日',
      paymentDate: '2020年9月25日'
    },
    {
      amount: '¥19,954,000',
      dueDate: '2021年8月31日',
      invoiceNo: 'INV00045254',
      invoiceDate: '2021年8月1日',
      paymentDate: '2020年8月20日'
    },
    {
      amount: '¥204,500',
      dueDate: '2020年7月31日',
      invoiceNo: 'INV00026485',
      invoiceDate: '2020年7月1日',
      paymentDate: '2020年7月15日'
    }
  ]

  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = props.interActivePages.includes(location.pathname)
      ? 'group-hover:block'
      : ''
  }
  return (
    <div className="w-full h-full relative group">
      <div
        className={
          'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' +
          showMoveButton
        }
      >
        Move
      </div>
      <div className="dashboard-widget-list w-full h-full overflow-auto relative  rounded-lg border-2 border-gray-200 bg-white">
        <div
          id="widget-header"
          className="max-w-full h-12 bg-white box-border align-middle py-2 px-3 relative pt-3 mb-1"
        >
          <img
            src={HistoryIcon}
            className="bg-history-icon w-6 h-5 bg-cover bg-no-repeat float-left mt-1"
          />
          <div
            id="widget-name"
            className="text-tertiary-500 font-sans font-bold ml-4 float-left"
          >
            H&Tからの請求書
          </div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div
          id="widget-body"
          className="w-full bg-primaryBg py-1 mb-1 space-y-1"
        >
          {billingHistory.map((item, index) => {
            let stripe = index % 2 ? 'bg-white' : 'bg-white'
            return (
              <div
                id="widget-content-item"
                className={
                  stripe +
                  ' w-full h-auto py-3 2xl:pl-14 xl:pl-10 lg:pl-5 relative text-sm'
                }
                key={index}
              >
                <div className="flex">
                  <div className="inline-block w-1/3">
                    <div className="text-gray-500 2xl:inline-block lg:block pr-2">
                      請求日{' '}
                    </div>
                    {item.invoiceDate}
                  </div>
                  <div className="inline-block w-1/3 whitespace-nowrap overflow-hidden">
                    <div className="text-gray-500 2xl:inline-block lg:block pr-2">
                      支払期限{' '}
                    </div>
                    {item.dueDate}
                  </div>
                </div>
                <div className="flex">
                  <div className="inline-block w-1/3">
                    <div className="text-gray-500 2xl:inline-block lg:block pr-2">
                      請求額{' '}
                    </div>
                    <div className="text-red-500 2xl:inline-block float-right pr-14">
                      {item.amount}
                    </div>
                  </div>
                  <div className="inline-block w-1/3">
                    <div className="text-gray-500 2xl:inline-block lg:block pr-2">
                      請求日{' '}
                    </div>
                    {item.paymentDate}
                  </div>
                </div>

                <div className="absolute right-3 top-3 w-1/3 lg:w-1/4">
                  <a href="#">
                    <div
                      id="widget-name"
                      className="p-1 bg-gray-100 float-right 2xl:mr-10 xl:mr-8 lg:mr-6 sm:mr-4 relative"
                    >
                      <div className="text-gray-400 text-xxs font-sans">
                        Download
                      </div>
                      <img
                        src={PdfIcon}
                        className="w-5 h-5 absolute top-0 -right-5"
                      />
                    </div>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
        <div id="widget-footer" className="w-full h-10 bg-white pr-2.5 pt-2">
          <div id="widget-footer-control" className="float-right">
            <a href="/sales/billing">
              <button className="border-tertiary-500 text-bold w-24 border-2 text-tertiary-500 rounded-3xl tracking-tighter pointer-events-none">
                さらに表示
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesBillingHistory
