import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ellipsis from '../../img/ellipsis.png'
import { Pie } from 'react-chartjs-2'
import spinner from '../../img/spinner.gif'

const CompanyDashboardPieChart = () => {
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
    serviceUsageDate: '',
    numberOfActiveKOTUsers: 0,
    numberOfEmployees: 0,
    numberOfSubscribers: 0,
    isLoaded: true
  })

  useEffect(() => {
    axios
      .get(`/company/getServiceUsage`)
      .then((response) => {
        let usageData = response.data
        setState((prevState) => {
          let percentOfNoSubscribedLogin = 0
          let percentOfNoEmployeesLogin = 0

          if (usageData.numberOfEmployees && usageData.numberOfActiveKOTUsers) {
            percentOfNoSubscribedLogin = parseInt(
              (usageData.numberOfEmployees / usageData.numberOfActiveKOTUsers) *
                100
            )
          }

          if (usageData.numberOfEmployees && usageData.numberOfSubscribers) {
            percentOfNoEmployeesLogin = parseInt(
              (usageData.numberOfEmployees / usageData.numberOfSubscribers) *
                100
            )
          }

          return {
            ...prevState,
            serviceUsageDate: usageData.serviceUsageDate,
            numberOfActiveKOTUsers: usageData.numberOfActiveKOTUsers,
            numberOfEmployees: usageData.numberOfEmployees,
            numberOfSubscribers: usageData.numberOfSubscribers,
            record1: {
              datasets: [
                {
                  data: [
                    percentOfNoSubscribedLogin,
                    Math.max(0, 100 - percentOfNoSubscribedLogin)
                  ],
                  backgroundColor: [
                    'rgba(0, 177, 106, 1)',
                    'rgba(218, 223, 225, 1)'
                  ],
                  borderWidth: 1
                }
              ],
              options: {
                legend: {
                  display: false
                },
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem) {
                      console.log(tooltipItem)
                    }
                  }
                }
              },
              percent: percentOfNoSubscribedLogin
            },
            record2: {
              datasets: [
                {
                  data: [
                    percentOfNoEmployeesLogin,
                    Math.max(0, 100 - percentOfNoEmployeesLogin)
                  ],
                  backgroundColor: [
                    'rgba(0, 177, 106, 1)',
                    'rgba(218, 223, 225, 1)'
                  ],
                  borderWidth: 1
                }
              ],
              options: {
                legend: {
                  display: false
                },
                tooltips: {
                  callbacks: {
                    label: function (tooltipItem) {
                      console.log(tooltipItem)
                    }
                  }
                }
              },
              percent: percentOfNoEmployeesLogin
            },
            isLoaded: false
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
        }
      })
  }, [])

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
          {state.isLoaded === true ? (
            <div className="w-full relative mt-24 h-24 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center md:text-sm">
                Loading service usage...
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex flex-col mb-2">
                <div className="flex flex-row">
                  <div>
                    <Pie data={state.record1} width={100} height={100} />
                  </div>
                  <div>
                    <h3 className="text-gray-700 text-md mb-2">勤怠記録</h3>
                    <p className="text-gray-500 text-xs mb-2">
                      <span className="text-lg">{state.numberOfEmployees}</span>
                      人のKOTユーザーID保有者のうちの
                      <br />
                      <span className="text-lg">
                        {state.numberOfActiveKOTUsers}
                      </span>
                      人が打刻済み
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
                      <span className="text-lg">{state.numberOfEmployees}</span>
                      人の従業員のうちの <br />
                      <span className="text-lg">
                        {state.numberOfSubscribers}
                      </span>
                      人がKOTアクティブユーザー
                    </p>
                    <p className="orange text-3xl font-bold">
                      {state.record2.percent}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
          <div id="widget-footer-control" className="float-right"></div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardPieChart
