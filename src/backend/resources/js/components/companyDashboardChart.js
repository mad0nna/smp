import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import KotLogo from '../../svg/kot-logo.svg'
import chart1 from '../../img/chart1.png'
import chart2 from '../../img/chart2.png'
import chart3 from '../../img/chart3.png'
class CompanyDashboardChart extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200">
          <div id="widget-header" className="max-w-full h-16 bg-white box-border align-middle py-3 relative">
            <div className="absolute  top-1 left-10 relative">
              <img id="widget-name" className="absolute z-10 h-7 top-0 -left-6" src={KotLogo}/>
              <div id="widget-icon" className="absolute w-48 h-12 -top-2 bg-gray-200 transform skew-x-rectangle-skew"> </div>
            </div>
            <div className="float-right w-64 h-12 text-center pt-2">
              <div className="w-16 h-6 leading-3 bg-secondaryBg p-1 align-middle inline-block border-secondaryBg border-l-2 border-b-2 border-t-2 cursor-pointer">
                <p className="text-white text-xxs text-center">Pie Chart</p>
              </div>
              <div className="w-16 h-6 leading-3 bg-white p-1 align-middle inline-block border-secondaryBg border-l-2 border-r-2 border-b-2 border-t-2 cursor-pointer">
                <p className="text-greenOld text-xxs text-center">Column</p>
              </div>
              <div className="w-16 h-6 leading-3 bg-white p-1  align-middle inline-block border-secondaryBg border-r-2 border-b-2 border-t-2 cursor-pointer">
                <p className="text-greenOld text-xxs text-center">Bar</p>
              </div>
            </div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className= 'h-widgetBody-sm w-full bg-white px-6 py-2 space-x-12 overflow-hidden text-center'>
            <div className="w-44 h-60 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">定期購読契約</p>
              <img src={chart1} className="mx-auto"/>
              <div className="mx-auto w-36 p-1 rounded-lg bg-cyan">
                <p className="text-white font-sans text-sm  tracking-tighter">他の契約を確認</p>
              </div>
            </div>
            <div className="w-44 h-60 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">サービス利用</p>
              <img src={chart2} className="mx-auto" />
              <div className="mx-auto w-36 p-1 rounded-lg bg-orange">
                <p className="text-white font-sans text-sm tracking-tighter">他のサービスを確認</p>
              </div>
            </div>
            <div className="w-44 h-60 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">アンロック済み機能</p>
              <img src={chart3} className="mx-auto" />
              <div className="mx-auto w-36 p-1 rounded-lg bg-lightGreen">
                <p className="text-white font-sans text-sm font-semibold tracking-tighter">機能をアンロック</p>
              </div>
            </div>
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
            <div id="widget-footer-control" className="float-right">
            </div>
          </div>
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">もっと見る</button>
    )
  }
}
export default CompanyDashboardChart
if(document.getElementById('companyDashboard-graph')) {
  ReactDOM.render(
    <CompanyDashboardChart />
    , document.getElementById('companyDashboard-graph'))
}
