import React from 'react'
import ReactDom from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
class PurchaseHistory extends React.Component {
  constructor(props) {
    super(props)
    this.purchaseHistory = [
      // {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日', purchaseDate: '05/25/2021', qty: '1', amount: '¥ 10,000', status: '支払済み' },
      // {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日', purchaseDate: '05/18/2021', qty: '6', amount: '¥ 6,000', status: '支払済み'},
      // {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日', purchaseDate: '05/11/2021', qty: '10', amount: '¥ 20,000', status: '支払済み'},
      // {category: '指紋スキャナー', date:'2020年12月10日 - ¥ 10 , 000', billTo: '株式会社町田', paymentDate: '2020年12月11日', purchaseDate: '05/09/2021', qty: '2', amount: '¥ 5,000', status: '支払済み'},
      {productName:'指紋スキャナー', purchaseDate: '2021年3月5日', numberOfUnits: '5', amount:'¥25,000',  status:'支払済み', date: '05/25/2021' },
      {productName:'指紋スキャナー', purchaseDate: '2021年2月6日', numberOfUnits: '7', amount:'¥35,000',  status:'支払済み', date: '05/18/2021' },
      {productName:'指紋スキャナー', purchaseDate: '2020年12月4日', numberOfUnits: '10', amount:'¥50,000',  status:'支払済み', date: '05/11/2021' },
      {productName: '指紋スキャナー', purchaseDate:'2020年12月10日', numberOfUnits: '10', amount:'¥50,000',  status:'支払済み', date: '05/09/2021'},
    ]

    if (this.props.version === undefined) this.purchaseHistory.pop() //remove the last element to display only 3 items.
  }

  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = (this.props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
    }
    return(
      <div className="w-full h-full relative group ">
        <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 bg-white">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="bg-cart-icon w-6 h-6 bg-cover bg-no-repeat float-left"/>
            <div id="widget-name" className="text-primary-200 font-sans font-black ml-8">購入履歴</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="w-full bg-gray-50 py-2 space-y-2">
            {
              this.props.version === undefined &&               
              this.purchaseHistory.map((item, index)=>{
                let stripe = (!(index % 2)) ? 'bg-gray-50' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' font-sans font-bold text-xs w-full box-border align-middle h-1/3 relative text-gray-500 grid grid-cols-2'} key={index}>
                    <div className="ml-20">購入履歴</div>
                    <div>&nbsp;</div>
                    <div className="ml-20">商品名</div>
                    <div>{item.productName}</div>
                    <div className="ml-20">購入日</div>
                    <div>{item.purchaseDate}</div>
                    <div className="ml-20">購入数</div>
                    <div>{item.numberOfUnits}</div>
                    <div className="ml-20">合計金額</div>
                    <div>{item.amount}</div>
                    <div className="ml-20">状態</div>
                    <div className="" >{item.status}</div>
                  </div>
                )
              })
 
            }
        
            {
              this.props.version === '2'  && 
              this.purchaseHistory.map((item, index)=>{
                let stripe = (!(index % 2)) ? 'bg-gray-50' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' w-full h-24 box-border align-middle'} key={index}>
                    <div id="item-content" className="font-sans text-xs px-4 py-2">
                      <span className="text-gray-500">商品名 </span><span className="font-black"> {item.productName}</span> <br/>
                      <span className="text-gray-500">購入日 </span><span className="font-black"> {item.date}</span><br/>
                      <span className="text-gray-500">購入数 </span><span className="font-black"> {item.numberOfUnits}</span><br/>
                      <span className="text-gray-500">合計金額 </span><span className="font-black"> {item.amount}</span><br/>
                      <span className="text-gray-500">状態 </span><span className="font-black"> {item.status}</span>
                    </div>
                  </div>
                )
              })              
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white pt-2 pr-2">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">さらに表示</button>
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
