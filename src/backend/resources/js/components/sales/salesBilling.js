import React from 'react'
import ReactDOM from 'react-dom'
import BillingIcon from '../../../svg/billing-icon.svg'
import Pdf2Icon from '../../../img/pdf2-icon.png'
import Ellipsis from '../../../img/ellipsis.png'
import PrevButton from '../../../img/pagination-prev.png'
import NextButton from '../../../img/pagination-next.png'

class SalesBilling extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      billingList: [
        {no: 'INV00024522', invoiceName: 'KOT-HR 定期購読', billingDate: '2021年5月1日', dueDate: '2021年5月31日', amount: '¥458,040', paidOn: '未払い', state: '未払い'},
        {no: 'INV00024752', invoiceName: 'KOT-BG 定期購読', billingDate: '2021年3月1日', dueDate: '2021年3月31日', amount: '¥990,110', paidOn: '2021年3月20日', state: '支払い済み'},
        {no: 'INV00021789', invoiceName: 'KOT-NN 定期購読', billingDate: '2021年2月1日', dueDate: '2021年2月28日', amount: '¥1,224,510', paidOn: '2021年2月15日', state: '支払い済み'},
        {no: 'INV00026478', invoiceName: 'KOT-OP 定期購読', billingDate: '2021年1月1日', dueDate: '2021年1月31日', amount: '¥2,305,520', paidOn: '2021年1月15日', state: '支払い済み'},
        {no: 'INV00020245', invoiceName: 'KOT-FE 定期購読', billingDate: '2020年12月1日', dueDate: '2020年12月31日', amount: '¥150,660', paidOn: '2020年12月31日', state: '支払い済み'},
        {no: 'INV00026475', invoiceName: 'KOT-PS 定期購読', billingDate: '2021年3月1日', dueDate: '2021年3月31日', amount: '¥90,850', paidOn: '2021年3月19日', state: '支払い済み'},
        {no: 'INV00026478', invoiceName: 'KOT-ZE 定期購読', billingDate: '2020年11月1日', dueDate: '2020年11月30日', amount: '¥33,450', paidOn: '2020年11月4日', state: '支払い済み'},
        {no: 'INV00023647', invoiceName: 'KOT-FX 定期購読', billingDate: '2021年3月1日', dueDate: '2021年3月31日', amount: '¥1,567,400', paidOn: '2021年3月25日', state: '支払い済み'},
        {no: 'INV00045254', invoiceName: 'KOT-RN 定期購読', billingDate: '2021年4月1日', dueDate: '2021年4月30日', amount: '¥19,954,000', paidOn: '未払い', state: '未払い'},
        {no: 'INV00026485', invoiceName: 'KOT-NO 定期購読', billingDate: '2020年9月1日', dueDate: '2020年9月30日', amount: '¥204,500', paidOn: '2020年9月15日', state: '支払い済み'}
      ]
    }
  }

  render() {
    return (
      <div className="relative px-10 py-5 bg-mainbg">
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-32 bg-white box-border align-middle p-4 relative">
            <img src={BillingIcon} className="w-auto h-7 float-left ml-4"/>
            <div id="widget-name" className="text-primary-200 text-xl font-sans font-bold ml-4 float-left">請求履歴</div>
            <div id="widget-name" className="float-right mr-12">
              <div className="table-cell relative h-24 w-full align-middle">
                <div id="search-bar" className="bg-mainbg h-12 rounded-3xl w-96 mx-0 my-auto">
                  <svg className="text-gray-500 fill-current w-auto h-11 float-left mt-0.5 p-3" xmlns="http://www.w3.org/2000/svg" x="30px" y="30px"
                    viewBox="0 0 487.95 487.95"
                    xmlSpace="preserve">
                    <g>
                      <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                            c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                            c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"/>
                    </g>
                  </svg>
                  <input type="text" id="billingSearch" className="h-full w-80 bg-mainbg custom-outline-none" placeholder="検索"/>
                </div>
              </div>
            </div>
            <div>
            </div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="h-50 w-full bg-white overflow-hidden">
            <table className="stripe-table-row w-full h-auto text-center zebra-striped">
              <thead className="bg-table-header-Gray-100 h-3 font-bold text-lg tracking-tight">
                <tr className="h-12 w-12">
                  <td>請求書番号</td>
                  <td>請求書名</td>
                  <td>請求日</td>
                  <td>支払い期限</td>
                  <td>請求額</td>     
                  <td>支払日</td>             
                  <td>状態</td>
                  <td>操作</td>
                </tr>
              </thead>
              <tbody className="transform even:bg-gray-500">
                {
                  this.state.billingList.map((item, index) => {
                    let statusHighlight = (item.state === '未払い') ? 'text-red-600' : ''
                    return (
                      <tr className="stripe-table-row h-16 2xl:text-base lg:text-sm text-gray-900" key={index}>
                        <td className="w-10">{item.no}</td>
                        <td className="w-10">{item.invoiceName}</td>
                        <td className="w-10">{item.billingDate}</td>
                        <td className="w-10">{item.dueDate}</td>
                        <td className="w-10">{item.amount}</td>
                        <td className="w-10">{item.paidOn}</td>
                        <td className={statusHighlight + ' w-10'}>{item.state}</td>
                        <td className="w-10 cursor-pointer"><img src={Pdf2Icon} className="mx-auto w-6 h-auto"/> </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div id="billing-pagination" className="w-full h-12 p-3 text-center space-x-2">
          <img src={PrevButton} className="inline-block w-8 h-auto cursor-pointer"/>
          <div className="inline-block text-primary-200">
            <span className="text-white rounded-2xl bg-primary-200 px-3 py-2 cursor-pointer">1</span>
            <span className="px-3 py-2 cursor-pointer">2</span>
            <span className="px-3 py-2 rounded-2xl cursor-pointer">3</span>
          </div>
          <img src={NextButton} className="inline-block  w-8 h-auto cursor-pointer"/>
        </div>
      </div>
    )
  }
}

export default SalesBilling

if (document.getElementById('salesBilling')) {
  ReactDOM.render(
    <SalesBilling/>,
    document.getElementById('salesBilling')
  )
}
