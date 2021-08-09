import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import { Pie } from 'react-chartjs-2'

const CompanyDashboardPieChart = (props) => {
  const [state, setState] = useState({
    record1: {
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ['rgba(0, 177, 106, 1)', 'rgba(218, 223, 225, 1)'],
          borderWidth: 1
        }
      ],
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function () {}
          }
        }
      },
      percent: 0
    },
    record2: {
      datasets: [
        {
          data: [0, 0],
          backgroundColor: ['rgba(0, 177, 106, 1)', 'rgba(218, 223, 225, 1)'],
          borderWidth: 1
        }
      ],
      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function () {}
          }
        }
      },
      percent: 0
    },
    isLoaded: false
  })

  useEffect(() => {
    setState((prevState) => {
      let percentOfNoSubscribedLogin = 0
      let percentOfNoEmployeesLogin = 0

      if (props.data.numberOfActiveKOTUsers && props.data.numberOfEmployees) {
        percentOfNoSubscribedLogin = parseInt(
          (props.data.numberOfActiveKOTUsers / props.data.numberOfEmployees) *
            100
        )
      }

      if (props.data.numberOfEmployees && props.data.numberOfSubscribers) {
        percentOfNoEmployeesLogin = parseInt(
          (props.data.numberOfEmployees / props.data.numberOfSubscribers) * 100
        )
      }

      prevState.record1.percent = percentOfNoSubscribedLogin
      prevState.record1.datasets[0].data = [
        percentOfNoSubscribedLogin,
        Math.max(0, 100 - percentOfNoSubscribedLogin)
      ]

      prevState.record2.percent = percentOfNoEmployeesLogin
      prevState.record2.datasets[0].data = [
        percentOfNoEmployeesLogin,
        Math.max(0, 100 - percentOfNoEmployeesLogin)
      ]

      return {
        ...prevState
      }
    })
  }, [props.data])

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
                <Pie data={state.record1} width={100} height={100} />
              </div>
              <div>
                <h3 className="text-gray-700 text-md mb-2">勤怠記録</h3>
                <p className="text-gray-500 text-xs mb-2">
                  {props.data.numberOfEmployees}人のKOTユーザーID保有者のうちの
                  <br />
                  {props.data.numberOfActiveKOTUsers}人が打刻済み
                </p>
                <p className="orange text-3xl font-bold">
                  {state.record1.percent}%
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-row">
              <div>
                <Pie data={state.record2} width={100} height={100} />
              </div>
              <div>
                <h3 className="text-gray-700 text-md mb-2">展開率</h3>
                <p className="text-gray-500 text-xs mb-2">
                  {props.data.numberOfSubscribers}人の従業員のうちの
                  <br />
                  {props.data.numberOfEmployees}人がKOTアクティブユーザー
                </p>
                <p className="orange text-3xl font-bold">
                  {state.record2.percent}%
                </p>
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

export default CompanyDashboardPieChart

if (document.getElementById('companyDashboard-graph')) {
  ReactDOM.render(
    <CompanyDashboardPieChart />,
    document.getElementById('companyDashboard-graph')
  )
}
