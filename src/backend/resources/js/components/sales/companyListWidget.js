import React from 'react'

class CompanyListWidget extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      billingList: [
        {HTTID: '19999ABCDEFG', companyName: '今井運送株式会社', industry: '業種', companyNumber: '100-150', contactPerson: '竜崎すばる', email: 'subaru@sample.com', phoneNumber: '080-1234-5678', salesAmount: '12,580,450'},
        {HTTID: '478567IBSIDJH', companyName: 'Ocean生命株式会社', industry: '貨物運送取扱業', companyNumber: '200-250', contactPerson: '如月蛍', email: 'hotaru@sample.com', phoneNumber: '080-1234-5678', salesAmount: '10,930,350'},
        {HTTID: '547894OSFENCS', companyName: '株式会社ロメロ', industry: '生命保険業', companyNumber: '300-350', contactPerson: '水無川八雲', email: 'yakumo@sample.com', phoneNumber: '080-1234-5678', salesAmount: '10,180,150'},
        {HTTID: '785164NHYSOIS', companyName: '大沼酒造有限会社', industry: '食堂・レストラン', companyNumber: '50-100', contactPerson: '工藤力也', email: 'rikiya@sample.com', phoneNumber: '080-1234-5678', salesAmount: '9,850,650'},
        {HTTID: '786345VBDUWSI', companyName: '大友建設合同会社', industry: '酒類製造業', companyNumber: '200-250', contactPerson: '藤堂源治', email: 'genji@sample.com', phoneNumber: '080-1234-5678', salesAmount: '9,220,450'},
        {HTTID: '789561HSDOLSJ', companyName: '青森園芸株式会社', industry: '建設工事業', companyNumber: '300-350', contactPerson: '大渡あかね', email: 'akane@sample.com', phoneNumber: '080-1234-5678', salesAmount: '8,990,150'},
        {HTTID: '894235ZBSYIPL', companyName: '株式会社れんと', industry: '園芸サービス業', companyNumber: '400-450', contactPerson: '森琴音', email: 'kotone@sample.com', phoneNumber: '080-1234-5678', salesAmount: '7,580,450'},
        {HTTID: '785647HSELCVI', companyName: 'Ohsako証券株式会社', industry: '証券業', companyNumber: '500-550', contactPerson: '榛原庄司', email: 'shoji@sample.com', phoneNumber: '080-1234-5678', salesAmount: '6,770,410'},
        {HTTID: '785269IOSDRBN', companyName: '洋服の小山株式会社', industry: '婦人・子供服小売業', companyNumber: '300-350', contactPerson: '山田海斗', email: 'kaito@sample.com', phoneNumber: '080-1234-5678', salesAmount: '5,630,350'},
        {HTTID: '458765USSWVSD', companyName: 'R・F株式会社', industry: '印刷サービス業', companyNumber: '100-150', contactPerson: '平良岳弥', email: 'takeya@sample.com', phoneNumber: '080-1234-5678', salesAmount: '5,510,220'},
        {HTTID: '547894OSFENCS', companyName: '株式会社菊池不動産', industry: '生命保険業', companyNumber: '300-350', contactPerson: '水無川八雲', email: 'yakumo@sample.com', phoneNumber: '080-1234-5678', salesAmount: '5,180,660'},
        {HTTID: '785164NHYSOIS', companyName: '庄司理髪店有限会社', industry: '食堂・レストラン', companyNumber: '50-100', contactPerson: '工藤力也', email: 'rikiya@sample.com', phoneNumber: '080-1234-5678', salesAmount: '4,440,210'},
        {HTTID: '786345VBDUWSI', companyName: '合同会社パナップ', industry: '酒類製造業', companyNumber: '200-250', contactPerson: '藤堂源治', email: 'genji@sample.com', phoneNumber: '080-1234-5678', salesAmount: '4,980,950'},
        {HTTID: '789561HSDOLSJ', companyName: '青色グループ株式会社', industry: '建設工事業', companyNumber: '300-350', contactPerson: '大渡あかね', email: 'akane@sample.com', phoneNumber: '080-1234-5678', salesAmount: '4,510,150'},
        {HTTID: '894235ZBSYIPL', companyName: 'Ko-Ko-Ro 有限会社', industry: '園芸サービス業', companyNumber: '400-450', contactPerson: '森琴音', email: 'kotone@sample.com', phoneNumber: '080-1234-5678', salesAmount: '4,770,700'},
        {HTTID: '785647HSELCVI', companyName: '船橋ガス有限会社', industry: '証券業', companyNumber: '500-550', contactPerson: '榛原庄司', email: 'shoji@sample.com', phoneNumber: '080-1234-5678', salesAmount: '3,380,350'},
        {HTTID: '785269IOSDRBN', companyName: '名須川銀行株式会社', industry: '婦人・子供服小売業', companyNumber: '300-350', contactPerson: '山田海斗', email: 'kaito@sample.com', phoneNumber: '080-1234-5678', salesAmount: '3,530,350'},
       
      ]
    }
  }

  render() {
    return (
      <div className="bg-mainbg">
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-gray-200 ">
          <div id="widget-body" className="h-50 w-full bg-white overflow-hidden">
            <table className="stripe-table-row w-full h-auto text-center table-px-2">
              <thead className="text-primary-200 h-3 font-bold tracking-tight">
                <tr className="h-12 w-12">
                  <td className="">HTT-ID</td>
                  <td className="">会社名</td>
                  <td className="">前月売上高</td>
                </tr>
              </thead>
              <tbody className="transform even:bg-gray-500">
                {
                  this.state.billingList.map((item, index) => {
                    return (
                      <tr className="stripe-table-row-odd h-10 text-gray-900 text-xs" key={index}>                        
                        <td className="">{item.HTTID}</td>
                        <td className="">{item.companyName}</td>
                        <td className="">{item.salesAmount}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
            <div id="widget-footer" className="w-full h-14 p-3.5">
              <div id="widget-footer-control" className="float-right">
                <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter cursor-pointer" >さらに表示</button>                
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanyListWidget
