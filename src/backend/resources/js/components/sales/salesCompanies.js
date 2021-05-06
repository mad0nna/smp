import React from 'react'
import ReactDOM from 'react-dom'
import companyIcon from '../../../img/customer-company-profile.png'
import Ellipsis from '../../../img/ellipsis.png'
import PrevButton from '../../../img/pagination-prev.png'
import NextButton from '../../../img/pagination-next.png'
import viewIcon from '../../../svg/view-icon.svg'
import deleteIcon from '../../../svg/trash-icon.svg'
import yellowCircle from '../../../svg/yellow-circle.svg'

class SalesCompanies extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      billingList: [
        {HTTID: '19999ABCDEFG', companyName: '今井運送株式会社', industry: '業種', companyNumber: '100-150', contactPerson: '竜崎すばる', email: 'subaru@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '478567IBSIDJH', companyName: 'Ocean生命株式会社', industry: '貨物運送取扱業', companyNumber: '200-250', contactPerson: '如月蛍', email: 'hotaru@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '547894OSFENCS', companyName: '株式会社ロメロ', industry: '生命保険業', companyNumber: '300-350', contactPerson: '水無川八雲', email: 'yakumo@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '785164NHYSOIS', companyName: '大沼酒造有限会社', industry: '食堂・レストラン', companyNumber: '50-100', contactPerson: '工藤力也', email: 'rikiya@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '786345VBDUWSI', companyName: '大友建設合同会社', industry: '酒類製造業', companyNumber: '200-250', contactPerson: '藤堂源治', email: 'genji@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '789561HSDOLSJ', companyName: '青森園芸株式会社', industry: '建設工事業', companyNumber: '300-350', contactPerson: '大渡あかね', email: 'akane@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '894235ZBSYIPL', companyName: '株式会社れんと', industry: '園芸サービス業', companyNumber: '400-450', contactPerson: '森琴音', email: 'kotone@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '785647HSELCVI', companyName: 'Ohsako証券株式会社', industry: '証券業', companyNumber: '500-550', contactPerson: '榛原庄司', email: 'shoji@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '785269IOSDRBN', companyName: '洋服の小山株式会社', industry: '婦人・子供服小売業', companyNumber: '300-350', contactPerson: '山田海斗', email: 'kaito@sample.com', phoneNumber: '080-1234-5678'},
        {HTTID: '458765USSWVSD', companyName: 'R・F株式会社', industry: '印刷サービス業', companyNumber: '100-150', contactPerson: '平良岳弥', email: 'takeya@sample.com', phoneNumber: '080-1234-5678'},
      ]
    }
  }

  render() {
    return (
      <div className="relative px-10 py-5 bg-mainbg">
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-28 bg-white box-border align-middle p-4 relative">
            <img src={companyIcon} className="w-auto h-7 float-left ml-4"/>
            <div id="widget-name" className="text-primary-200 text-xl font-sans font-bold ml-4 float-left">企業一覧</div>
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
            <table className="stripe-table-row w-full h-auto text-center">
              <thead className="bg-table-header-Gray-100 text-table-header-Gray-400 text-gray-400 h-3 font-bold text-lg tracking-tight">
                <tr className="h-12 w-12">
                  <td className="">No.</td>
                  <td className="">HTT-ID</td>
                  <td className="">会社名</td>
                  <td className="">業種</td>
                  <td className="">従業員数</td>
                  <td className="">連絡担当者</td>
                  <td className="">メールアドレス</td>
                  <td className="">電話番号</td>
                  <td className="">アクション</td>
                </tr>
              </thead>
              <tbody className="transform even:bg-gray-500">
                {
                  this.state.billingList.map((item, index) => {
                    return (
                      <tr className="stripe-table-row h-16 2xl:text-base lg:text-sm text-gray-900" key={index}>
                        <td className="" ><div className="w-6 inline-block text-white" style={{ backgroundImage: `url(${yellowCircle})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '100%', height: '32px', width: '32px', padding: '3px 8px 3px 3px' }}>{index+1}</div></td>
                        <td className="">{item.HTTID}</td>
                        <td className="">{item.companyName}</td>
                        <td className="">{item.industry}</td>
                        <td className="">{item.companyNumber}</td>
                        <td className="">{item.contactPerson}</td>
                        <td className="">{item.email}</td>
                        <td className="">{item.phoneNumber}</td>
                        <td className=" cursor-pointer"><img src={viewIcon} className="mx-auto w-6 h-auto inline mt-2"/><img src={deleteIcon} className="mx-auto w-6 h-auto inline"/></td>
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
          <div className="inline-block text-primary-200" >
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

export default SalesCompanies

if (document.getElementById('sales-companies')) {
  ReactDOM.render(
    <SalesCompanies/>,
    document.getElementById('sales-companies')
  )
}
