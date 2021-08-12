import React from 'react'
import ReactDom from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'

const PurchaseHistory = (props) => {
  const purchaseHistory = [
    {
      productName: '指紋スキャナー',
      purchaseDate: '2021年3月5日',
      numberOfUnits: '5',
      amount: '¥25,000',
      status: '支払済み',
      date: '05/25/2021'
    },
    {
      productName: '指紋スキャナー',
      purchaseDate: '2021年2月6日',
      numberOfUnits: '7',
      amount: '¥35,000',
      status: '支払済み',
      date: '05/18/2021'
    },
    {
      productName: '指紋スキャナー',
      purchaseDate: '2020年12月4日',
      numberOfUnits: '10',
      amount: '¥50,000',
      status: '支払済み',
      date: '05/11/2021'
    },
    {
      productName: '指紋スキャナー',
      purchaseDate: '2020年12月10日',
      numberOfUnits: '10',
      amount: '¥50,000',
      status: '支払済み',
      date: '05/09/2021'
    }
  ]

  if (props.version === undefined) purchaseHistory.pop() //remove the last element to display only 3 items.

  return (
    <div className="w-full h-full relative group ">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-lg shadow-xl pt-3 px-3">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">購入履歴</h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>

        <div id="widget-body" className="w-full">
          {props.version === undefined &&
            purchaseHistory.map((item, index) => {
              let stripe = !(index % 2) ? '' : 'bg-white'
              return (
                <div
                  id="widget-content-item"
                  className={
                    stripe +
                    ' font-sans font-medium text-xs w-full h-1/3 relative text-gray-500 grid grid-cols-2 px-3 py-4 border-b border-gray-100 hover:bg-gray-50'
                  }
                  key={index}
                >
                  <div>商品名</div>
                  <div>{item.productName}</div>
                  <div>購入日</div>
                  <div>{item.purchaseDate}</div>
                  <div>購入数</div>
                  <div>{item.numberOfUnits}</div>
                  <div>合計金額</div>
                  <div>{item.amount}</div>
                  <div>状態</div>
                  <div className="">{item.status}</div>
                </div>
              )
            })}

          {props.version === '2' &&
            purchaseHistory.map((item, index) => {
              let stripe = !(index % 2) ? 'bg-gray-50' : 'bg-white'
              return (
                <div
                  id="widget-content-item"
                  className={stripe + ' w-full h-24 box-border align-middle'}
                  key={index}
                >
                  <div
                    id="item-content"
                    className="font-sans text-xs px-4 py-2"
                  >
                    <span className="text-gray-500">商品名 </span>
                    <span className="font-black"> {item.productName}</span>{' '}
                    <br />
                    <span className="text-gray-500">購入日 </span>
                    <span className="font-black"> {item.date}</span>
                    <br />
                    <span className="text-gray-500">購入数 </span>
                    <span className="font-black"> {item.numberOfUnits}</span>
                    <br />
                    <span className="text-gray-500">合計金額 </span>
                    <span className="font-black"> {item.amount}</span>
                    <br />
                    <span className="text-gray-500">状態 </span>
                    <span className="font-black"> {item.status}</span>
                  </div>
                </div>
              )
            })}
        </div>
        <div id="widget-footer" className="w-full h-10 bg-white pt-3 pr-2">
          <div id="widget-footer-control" className="float-right">
            <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">
              さらに表示
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory

if (document.getElementById('purchase')) {
  ReactDom.render(<PurchaseHistory />, document.getElementById('purchase'))
}
