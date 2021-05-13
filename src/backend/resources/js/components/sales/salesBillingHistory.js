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
      {amount: '¥ 9,860', dueDate: '2021年2月31日', invoiceNo: 'INV00023562', invoiceDate: '2021年2月1日', paymentDate: '2021年2月28日'},
      {amount: '¥ 10,290', dueDate: '2021年1月31日', invoiceNo: 'INV00023467', invoiceDate: '2021年1月1日', paymentDate: '2021年1月3日'},
      {amount: '¥ 12,180', dueDate: '2020年12月31日', invoiceNo: 'INV00023564', invoiceDate: '2020年12月1日', paymentDate: '2020年12月31日'},
      {amount: '¥ 15,780', dueDate: '2020年11月31日', invoiceNo: 'INV00023461', invoiceDate: '2020年11月1日', paymentDate: '2020年11月30日'},
      {amount: '¥ 13,830', dueDate: '2020年10月31日', invoiceNo: 'INV00023363', invoiceDate: '2020年10月1日', paymentDate: '2020年10月9日'},
      {amount: '¥ 11,110', dueDate: '2020年9月31日', invoiceNo: 'INV00023264', invoiceDate: '2020年9月1日', paymentDate: '2020年9月30日'},
      {amount: '¥ 9,870', dueDate: '2020年8月31日', invoiceNo: 'INV00023169', invoiceDate: '2020年8月1日', paymentDate: '2020年8月3日'},
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
        <div className="dashboard-widget w-full h-full overflow-auto relative  rounded-lg border-2 border-gray-200 bg-white">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle py-2 px-3 relative pt-3 mb-1">
            <img src={HistoryIcon} className="bg-history-icon w-6 h-5 bg-cover bg-no-repeat float-left mt-1"/>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-4 float-left">H&Tからの請求書</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className=" w-full  bg-mainbg py-1 space-y-1  mb-1">
            {
              this.billingHistory.map((item, index) => {
                let stripe = ((index % 2)) ? 'bg-white' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe + ' w-full h-auto py-3 2xl:pl-14 xl:pl-10 lg:pl-5 relative text-sm'} key={index}>
                    <div className="flex">
                      <div className="inline-block w-1/3">
                        <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求日 </div>
                        {item.invoiceDate}
                      </div>
                      <p className="inline-block w-1/3 whitespace-nowrap overflow-hidden">
                        <div className="text-gray-500 2xl:inline-block lg:block pr-2">支払期限  </div>
                        {item.dueDate}
                      </p>
                    </div>
                    <div className="flex">
                      <div className="inline-block w-1/3">
                        <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求額 </div>
                        <div className="text-red-500 2xl:inline-block">{item.amount}</div>
                      </div>
                      <p className="inline-block w-1/3">
                        <div className="text-gray-500 2xl:inline-block lg:block pr-2">請求日 </div>
                        {item.paymentDate}
                      </p>
                    </div>

                    <div className="absolute right-3 top-3 w-1/3 lg:w-1/4">
                      <a href="#">
                        <div id="widget-name" className="p-1 bg-gray-100 float-right 2xl:mr-10 xl:mr-8 lg:mr-6 sm:mr-4 relative">
                          <p className="text-gray-400 text-xxs font-sans">Download</p>
                          <img src={PdfIcon} className="w-5 h-5 absolute top-0 -right-5"/>
                        </div>
                      </a>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-10 bg-white pr-2.5 pt-2">
            <div id="widget-footer-control" className="float-right">
              <a href="/sales/billing">
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
