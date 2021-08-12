import React from 'react'
import ReactDom from 'react-dom'

const PurchaseHistorySmall = () => {
  const purchaseHistory = [
    {
      category: '指紋スキャナー',
      date: '2020年12月10日',
      billTo: '株式会社町田',
      amount: '¥ 10 , 000',
      paymentDate: '2020年12月11日',
      status: '未払い'
    },
    {
      category: '指紋スキャナー',
      date: '2020年12月10日',
      billTo: '株式会社町田',
      amount: '¥ 10 , 000',
      paymentDate: '2020年12月11日',
      status: '未払い'
    },
    {
      category: '指紋スキャナー',
      date: '2020年12月10日',
      billTo: '株式会社町田',
      amount: '¥ 10 , 000',
      paymentDate: '2020年12月11日',
      status: '未払い'
    },
    {
      category: '指紋スキャナー',
      date: '2020年12月10日',
      billTo: '株式会社町田',
      amount: '¥ 10 , 000',
      paymentDate: '2020年12月11日',
      status: '未払い'
    }
  ]

  return (
    <div className="w-full h-12/12 relative border-2 border-gray-200 rounded-lg bg-white">
      <div
        id="widget-header"
        className="max-w-full h-12 box-border align-middle p-3 relative"
      >
        <div
          id="widget-icon"
          className="bg-history-icon w-6 h-6 bg-cover bg-no-repeat float-left"
          style={{ height: '20px' }}
        />
        <div
          id="widget-name"
          className="text-primary-200 font-sans font-black ml-8"
        >
          請求履歴
        </div>
      </div>
      <div id="widget-body" className="w-full bg-gray-50">
        {purchaseHistory.map((item, index) => {
          let stripe = !(index % 2) ? 'bg-gray-50' : 'bg-white'
          return (
            <div
              id="widget-content-item"
              className={
                stripe +
                ' w-full h-10 box-border align-middle py-2.5  relative text-gray-500'
              }
              key={index}
            >
              <div id="item-content" className="font-sans text-xs   text-black">
                <span className="w-1/4 inline-block text-center">
                  {item.date}
                </span>{' '}
                <span className="w-1/4 inline-block text-center">
                  請求先 : {item.billTo}
                </span>{' '}
                <span className="w-1/4 inline-block text-center">
                  {item.amount}
                </span>{' '}
                <span className="w-1/5 inline-block text-center">
                  支払日: {item.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div id="widget-footer" className="w-full h-14 p-3.5">
        <div id="widget-footer-control" className="float-right">
          <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">
            さらに表示
          </button>
        </div>
      </div>
    </div>
  )
}
export default PurchaseHistorySmall

if (document.getElementById('purchase')) {
  ReactDom.render(<PurchaseHistorySmall />, document.getElementById('purchase'))
}
