import React from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import PdfIcon from '../../../img/pdf-icon.png'
import HistoryIcon from '../../../img/history-icon.png'
class SalesBillingHistory extends React.Component {
  constructor(props) {
    super(props)
    this.billingHistory = [
      {amount: '¥ 10,890', dueDate: '2021年5月31日', invoiceNo: 'INV00024143', invoiceDate: '2021年5月1日', paymentDate: '未払い'},
      {amount: '¥ 11,220', dueDate: '2021年4月30日', invoiceNo: 'INV00024011', invoiceDate: '2021年4月1日', paymentDate: '2021年4月30日'},
      {amount: '¥ 10,890', dueDate: '2021年3月31日', invoiceNo: 'INV00023561', invoiceDate: '2021年3月1日', paymentDate: '2021年3月31日'},
    ]
  }

  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = (this.props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
    }
    return(
      <div className="w-full h-full relative group">
        <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle 2xl:p-3 xl:p-3 lg:p-4 relative mb-2">
            <img src={HistoryIcon} className="bg-history-icon w-6 h-5 bg-cover bg-no-repeat float-left mt-1"/>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-4 float-left">H&Tからの請求書</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="h-widgetBody w-full bg-white overflow-hidden bg-mainbg space-y-2">
            {
              this.billingHistory.map((item, index) => {
                let stripe = ((index % 2)) ? 'bg-white' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' w-full h-auto py-3 pl-14 relative text-sm'} key={index}>
                    <div className="inline-block w-1/3">
                      <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求日 </div>
                      {item.invoiceDate}
                    </div>
                    <p className="inline-block w-1/3">
                      <div className="text-gray-500 2xl:inline-block lg:block pr-2">支払期限  </div>
                      {item.dueDate}
                    </p>

                    <div className="inline-block w-1/3">
                      <a href="#">
                        <div id="widget-name" className="p-1 bg-gray-100 float-right 2xl:mr-10 xl:mr-8 lg:mr-6 sm:mr-4 relative">
                          <p className="text-gray-400 text-xxs font-sans">Download</p>
                          <img src={PdfIcon} className="w-5 h-5 absolute top-0 -right-5"/>
                        </div>
                      </a>
                    </div>
                    <div className="inline-block w-1/3">
                      <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求額 </div>
                      <div className="text-red-500 2xl:inline-block">{item.amount}</div>
                    </div>
                    <p className="inline-block w-1/3">
                      <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求日 </div>
                      {item.paymentDate}
                    </p>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
            <div id="widget-footer-control" className="float-right">

              <a href="/company/billing">
                <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">
                      さらに表示
                </button>
              </a>

            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default SalesBillingHistory
