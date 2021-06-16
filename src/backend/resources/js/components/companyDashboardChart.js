import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import chart1 from '../../img/company/chart1.png'
import chart2 from '../../img/company/chart2.png'

const CompanyDashboardChart = () => {
  return (
    <div className="w-full h-full relative group">
      <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">
        Move
      </div>
      <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200">
        <div
          id="widget-header"
          className="max-w-full h-12 bg-white box-border align-middle py-3 relative"
        >
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>

        <div
          id="widget-body"
          className="h-widgetBody-sm w-full bg-white px-6 py-2 text-center flex flex-col items-center gap-3"
        >
          <div className="font-sans text-primary-200 text-md pb-10 font-bold">
            <p>サービス利用状況</p>
          </div>
          <div className="w-48 h-68 inline-block">
            <p className="font-sans text-primary-200 text-xs">勤怠記録</p>
            <p className="font-sans text-red-700 font-bold text-xs pb-2">
              KOTユーザーID保有者500人のうち 350人が打刻済み
            </p>
            <img src={chart1} className="mx-auto" />
            <p className="text-red-700 text-md font-bold pb-16">70%</p>
            <div className="mx-auto w-44 rounded-lg ">
              <p className="text-primary-200 font-sans text-sm tracking-tighter">
                展開率
              </p>
              <p className="text-red-700 text-xs font-bold">
                750人の従業員のうち
                <br /> の500人がKOTアクティブユーザー
              </p>
            </div>
          </div>
          <div className="w-48 h-64">
            <img src={chart2} className="mx-auto" />
            <p className="text-red-700 text-md font-bold">67%</p>
          </div>
        </div>

        <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
          <div id="widget-footer-control" className="float-right"></div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardChart

if (document.getElementById('companyDashboard-graph')) {
  ReactDOM.render(
    <CompanyDashboardChart />,
    document.getElementById('companyDashboard-graph')
  )
}
