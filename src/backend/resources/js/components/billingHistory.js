import React from 'react'
import ReactDom from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import PdfIcon from '../../img/pdf-icon.png'
import HistoryIcon from '../../img/history-icon.png'
class BillingHistory extends React.Component {
  constructor(props) {
    super(props)
    this.billingHistory = [
      {amount: '¥ 10,890', dueDate: '2021年5月31日', invoiceNo: 'INV00024143', invoiceDate: '2021年5月1日', paymentDate: '未払い'},
      {amount: '¥ 11,220', dueDate: '2021年4月30日', invoiceNo: 'INV00024011', invoiceDate: '2021年4月1日', paymentDate: '2021年4月30日'},
      {amount: '¥ 10,890', dueDate: '2021年3月31日', invoiceNo: 'INV00023561', invoiceDate: '2021年3月1日', paymentDate: '2021年3月31日'},
    ]
  }

  render() {
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle 2xl:p-3 xl:p-3 lg:p-4 relative">
            <img src={HistoryIcon} className="bg-history-icon w-6 h-5 bg-cover bg-no-repeat float-left mt-1"/>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-4 float-left">請求書</div>
            <div>
              <a href="#">
                <div id="widget-name" className="p-1 bg-gray-100 float-right 2xl:mr-10 xl:mr-8 lg:mr-6 sm:mr-4">
                  <p className="text-gray-400 text-xxs font-sans">Download</p>
                </div>
                <img src={PdfIcon} className="w-5 h-5 float-right"/>
              </a>
            </div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="h-widgetBody w-full bg-white overflow-hidden">
            {
              this.billingHistory.map((item, index) => {
                let stripe = ((index % 2)) ? 'bg-gray-50' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' w-full h-auto p-3 relative'} key={index}>
                    <div className="2xl:w-5/12 lg: xl:w-5/12 lg:w-5/12 sm:w-6/12 h-full inline-block align-top 2xl:mr-4 xl:mr-3 lg:mr-2 sm:mr-0 pl-4">
                      <h1 className="font-semibold 2xl:text-3xl xl:3xl lg:text-xl md:text-xs sm:text-xs text-gray-500 font-sans">{item.amount}</h1>
                      <p className="2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans">支払期限</p>
                      <p className="2xl:text-sm xl:text-xxs lg:text-xxs  xs:text-xxs text-gray-600 font-sans font-semibold">{item.dueDate}</p>
                    </div>
                    <div className="w-1/2 h-full inline-block tracking-tighter align-top">
                      <div className="-mt-1">
                        <div className="text-gray-400 inline-block 2xl:text-xs lg:text-xxs sm:text-xxs font-semibold 2xl:mr-3 xl:mr-2 lg:mr-1 sm:mr-0 tracking-  widest">請求書番号</div>
                        <div className="text-gray-600 inline-block 2xl:text-xs lg:text-xxs sm:text-xxs xs:text-xxs font-bold tracking-wider">{item.invoiceNo}</div>
                      </div>
                      <div className="-mt-1 mb-1">
                        <div className="text-gray-400 inline-block 2xl:text-xs xl:text-xs lg:text-xxs sm:text-xxs font-semibold 2xl:ml-3 xl:ml-2 lg:ml-1 sm:ml-1 tracking-widest">請求日</div>
                        <div className="text-gray-600 inline-block 2xl:text-xs xl:text-xs lg:text-xxs sm:text-xxs xs:text-xxs font-bold 2xl:ml-6 xl:ml-3 lg:ml-1 sm:ml-1 tracking-wider">{item.invoiceDate}</div>
                      </div>
                      <div className="bg-gray-200 block w-full h-auto 2xl:px-2 xl:px:2 lg:px-1 sm:px-1 rounded-lg">
                        <div className="text-gray-400 inline-block 2xl:text-xs xl:text-xs lg:text-xs sm:text-xxs font-semibold mr-3 tracking-widest">支払日 </div>
                        <div className="text-secondary-200 inline-block 2xl:text-xs xl:text-xs lg:text-xs sm:text-xxs font-bold tracking-wider">{item.paymentDate}</div>
                      </div>
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

export default BillingHistory
if (document.getElementById('billingHistory')) {
  ReactDom.render(
    <BillingHistory/>,
    document.getElementById('billingHistory')
  )
}
