import React from 'react'
import ReactDom from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
class PurchaseHistory extends React.Component {
  constructor(props) {
    super(props)
    this.purchaseHistory = [
      {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日'},
      {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日'},
      {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日'}
    ]
  }

  render() {
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="bg-cart-icon w-6 h-6 bg-cover bg-no-repeat float-left"/>
            <div id="widget-name" className="text-primary-200 font-sans font-black ml-8">購入履歴</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="h-widgetBody w-full bg-gray-50 py-2 space-y-2">
            {
              this.purchaseHistory.map((item, index)=>{
                let stripe = (!(index % 2)) ? 'bg-gray-50' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' w-full h-20 box-border align-middle p-2.5 pl-12 relative text-gray-500'} key={index}>
                    <div id="item-content" className="font-sans font-bold text-xs w-widgetBody">
                      {item.category} <br/>
                      {item.date}<br/>
                                      請求先 : {item.billTo}<br/>
                      <p className="text-widget-xs">支払日: {item.paymentDate}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">さらに表示</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PurchaseHistory

if (document.getElementById('purchase')) {
  ReactDom.render(
    <PurchaseHistory/>,
    document.getElementById('purchase')
  )
}
