import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import chart1 from '../../img/company/chart1.png'
import chart2 from '../../img/company/chart2.png'

const CompanyDashboardChart = () => {
  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-lg shadow-xl">
        <div
          id="widget-header"
          className="bg-white relative box-border p-3 pb-6"
        >
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                サービス利用状況
              </h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>

        <div
          id="widget-body"
          className="h-widgetBody-sm w-full bg-white px-3 flex flex-col gap-3"
        >
          <div className="flex flex-col mb-2">
            <div className="flex flex-row">
              <div>
                <img src={chart1} className="mx-auto" />
              </div>
              <div>
                <h3 className="text-gray-700 text-md mb-2">勤怠記録</h3>
                <p className="text-gray-500 text-xs mb-2">
                  KOTユーザーID保有者500人のうち 350人が打刻済み
                </p>
                <p className="orange text-3xl font-bold">70%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>
                <img src={chart2} className="mx-auto" />
              </div>
              <div>
                <h3 className="text-gray-700 text-md mb-2">展開率</h3>
                <p className="text-gray-500 text-xs mb-2">
                  750人の従業員のうち の500人がKOTアクティブユーザー
                </p>
                <p className="orange text-3xl font-bold">67%</p>
              </div>
            </div>
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
