import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import kotLogo from '../../svg/kot-logo.svg'
import Bargraph from '../../svg/bar.svg'
import Columngraph from '../../svg/column.svg'
import chart1 from '../../img/company/chart1.png'
import chart2 from '../../img/company/chart2.png'
import chart3 from '../../img/company/chart3.png'

const CompanyDashboardChart = () => {
  const [chartState, setChartState] = useState('pie')
  const [barBackground, setBarBackground] = useState('bg-white')
  const [pieBackground, setPieBackground] = useState('bg-greenOld')
  const [columnBackground, setColumnBackground] = useState('bg-white')
  const handleChartSelect = (chart) => {
    setChartState(chart)
    switch (chart) {
      case 'pie':
        setPieBackground('bg-greenOld')
        setBarBackground('bg-white')
        setColumnBackground('bg-white')
        break
      case 'column':
        setColumnBackground('bg-greenOld')
        setBarBackground('bg-white')
        setPieBackground('bg-white')
        break
      case 'bar':
        setBarBackground('bg-greenOld')
        setPieBackground('bg-white')
        setColumnBackground('bg-white')
        break
      default:
        break
    }
  }

  return (
    <div className="w-full h-full relative group">
      <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">
        Move
      </div>
      <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200">
        <div
          id="widget-header"
          className="max-w-full h-16 bg-white box-border align-middle py-3 relative"
        >
          <div className="absolute  top-1 left-10 relative">
            <img
              id="widget-name"
              className="absolute z-10 xl:h-6 2xl:h-7 top-0 -left-6"
              src={kotLogo}
            />
            <div
              id="widget-icon"
              className="absolute sm:w-32 md:w-32 lg:w-32 xl:w-32 2xl:w-48 h-12 -top-2 bg-gray-200 transform skew-x-rectangle-skew"
            >
              {' '}
            </div>
          </div>
          <div className="float-right w-64 h-12 text-center pt-2">
            <div
              className={
                pieBackground +
                ' w-16 h-6 leading-3 hover:bg-greenOld p-1 align-middle inline-block border-secondaryBg border-l-2 border-b-2 border-t-2 cursor-pointer'
              }
            >
              <p
                onClick={() => handleChartSelect('pie')}
                className=" text-black font-sans font-bold  hover:text-white text-xxs text-center"
              >
                円グラフ
              </p>
            </div>
            <div
              className={
                columnBackground +
                ' w-16 h-6 leading-3 hover:bg-greenOld p-1 align-middle inline-block border-secondaryBg border-l-2 border-r-2 border-b-2 border-t-2 cursor-pointer'
              }
            >
              <p
                onClick={() => handleChartSelect('column')}
                className="text-black font-sans  hover:text-white font-bold text-xxs text-center"
              >
                カラム
              </p>
            </div>
            <div
              className={
                barBackground +
                ' w-16 h-6 leading-3 hover:bg-greenOld p-1  align-middle inline-block border-secondaryBg border-r-2 border-b-2 border-t-2 cursor-pointer'
              }
            >
              <p
                onClick={() => handleChartSelect('bar')}
                className="text-black font-sans hover:text-white font-bold text-xxs text-center"
              >
                棒グラフ
              </p>
            </div>
          </div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        {chartState === 'pie' ? (
          <div
            id="widget-body"
            className="h-widgetBody-sm w-full bg-white px-6 py-6 space-x-12 overflow-hidden text-center"
          >
            <div className="w-44 h-64 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">
                定期購読契約
              </p>
              <img src={chart1} className="mx-auto" />
              <div className="mx-auto w-36 p-1 rounded-lg bg-cyan">
                <p className="text-white font-sans text-sm  tracking-tighter">
                  他の契約を確認
                </p>
              </div>
            </div>
            <div className="w-44 h-60 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">
                サービス利用
              </p>
              <img src={chart2} className="mx-auto" />
              <div className="mx-auto w-36 p-1 rounded-lg bg-blue-400">
                <p className="text-white font-sans text-sm tracking-tighter">
                  他のサービスを確認
                </p>
              </div>
            </div>
            <div className="w-44 h-60 inline-block">
              <p className="font-sans font-black text-xs text-gray-500">
                アンロック済み機能
              </p>
              <img src={chart3} className="mx-auto" />
              <div className="mx-auto w-36 p-1 rounded-lg bg-lightGreen">
                <p className="text-white font-sans text-sm font-semibold tracking-tighter">
                  機能をアンロック
                </p>
              </div>
            </div>
          </div>
        ) : chartState === 'bar' ? (
          <div className="bg-white w-full pt-6 px-3">
            <img src={Bargraph} className="mx-auto" />
          </div>
        ) : chartState === 'column' ? (
          <div className="bg-white w-full pt-6 px-3">
            <img src={Columngraph} className="mx-auto" />
          </div>
        ) : null}
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
