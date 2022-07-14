import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ellipsis from '../../img/ellipsis.png'
import { Doughnut } from 'react-chartjs-2'
// import spinner from '../../img/spinner.gif'

const CompanyDashboardPieChart = () => {
  const [state, setState] = useState({
    record1: {
      datasets: [
        {
          data: [0, 100],
          backgroundColor: ['rgba(195,0,71,1)', 'rgba(129, 131, 134, 1)'],
          borderWidth: 1
        }
      ],
      options: {
        legend: {
          display: false
        },
        hover: { mode: null },
        tooltips: {
          enabled: false,
          callbacks: {
            label: function () {}
          }
        }
      },
      plugins: [
        {
          beforeDraw: function (chart) {
            const width = chart.width,
              height = chart.height,
              ctx = chart.ctx
            ctx.restore()
            const fontSize = (height / 75).toFixed(2)
            ctx.font = fontSize + 'em sans-serif'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(195,0,71,1)'
            const text = '0%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
          }
        }
      ],
      percent: 0
    },
    record2: {
      datasets: [
        {
          data: [0, 100],
          backgroundColor: ['rgba(14,66,150,1)', 'rgba(129, 131, 134, 1)'],
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
      plugins: [
        {
          beforeDraw: function (chart) {
            const width = chart.width,
              height = chart.height,
              ctx = chart.ctx
            ctx.restore()
            const fontSize = (height / 75).toFixed(2)
            ctx.font = fontSize + 'em sans-serif'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(14,66,150,1)'
            const text = '0%',
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2
            ctx.fillText(text, textX, textY)
            ctx.save()
          }
        }
      ],
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
            percentOfNoSubscribedLogin = Math.round(
              parseInt(
                (usageData.numberOfActiveKOTUsers /
                  usageData.numberOfEmployees) *
                  100
              )
            )
          }

          if (usageData.numberOfEmployees && usageData.numberOfSubscribers) {
            percentOfNoEmployeesLogin = Math.round(
              parseInt(
                (usageData.numberOfSubscribers / usageData.numberOfEmployees) *
                  100
              )
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
                    'rgba(195,0,71,1)',
                    'rgba(129, 131, 134, 1)'
                  ],
                  borderWidth: 1
                }
              ],
              options: {
                legend: {
                  display: false
                },
                plugins: [
                  {
                    beforeDraw: function (chart) {
                      const width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx
                      ctx.restore()
                      const fontSize = (height / 75).toFixed(2)
                      ctx.font = fontSize + 'em sans-serif'
                      ctx.textBaseline = 'middle'
                      ctx.fillStyle = 'rgba(195,0,71,1)'
                      const text = `${percentOfNoEmployeesLogin}$`,
                        textX = Math.round(
                          (width - ctx.measureText(text).width) / 2
                        ),
                        textY = height / 2
                      ctx.fillText(text, textX, textY)
                      ctx.save()
                    }
                  }
                ],
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
                    'rgba(14,66,150,1)',
                    'rgba(129, 131, 134, 1)'
                  ],
                  borderWidth: 1
                }
              ],
              options: {
                legend: {
                  display: false
                },
                plugins: [
                  {
                    beforeDraw: function (chart) {
                      const width = chart.width,
                        height = chart.height,
                        ctx = chart.ctx
                      ctx.restore()
                      const fontSize = (height / 75).toFixed(2)
                      ctx.font = fontSize + 'em sans-serif'
                      ctx.textBaseline = 'middle'
                      ctx.fillStyle = 'rgba(14,66,150,1)'
                      const text = `${percentOfNoEmployeesLogin}$`,
                        textX = Math.round(
                          (width - ctx.measureText(text).width) / 2
                        ),
                        textY = height / 2
                      ctx.fillText(text, textX, textY)
                      ctx.save()
                    }
                  }
                ],
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
            <div className="w-full pb-2">
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
          <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-8">
            <div className="company-dashboard-chart-container">
              <div className="grid place-items-center">
                <Doughnut
                  data={state.record1}
                  height={300}
                  width={300}
                  options={{
                    responsive: false,
                    cutout: 100
                  }}
                  plugins={state.record1.plugins}
                />
              </div>
              <div className="company-dashboard-chart-table-title">
                登録済従業員
              </div>
              <div className="company-dashboard-chart-table-sub-title">
                勤怠記録
              </div>
              <table className="table-fixed border-collapse border border-slate-400 m-auto company-dashboard-chart-table ">
                <tbody>
                  <tr>
                    <td className="border border-slate-300">
                      <span className="font-bold">
                        {state.numberOfEmployees}
                      </span>{' '}
                      人のうち
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <span className="font-bold">
                        {state.numberOfActiveKOTUsers}
                      </span>{' '}
                      人が打刻済み
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="company-dashboard-chart-container">
              <div className="grid place-items-center">
                <Doughnut
                  data={state.record2}
                  height={300}
                  width={300}
                  options={{
                    responsive: false,
                    cutout: 100
                  }}
                  plugins={state.record2.plugins}
                />
              </div>
              <div className="company-dashboard-chart-table-title">展開率</div>
              <div className="company-dashboard-chart-table-sub-title">
                システムご利用予定人数
              </div>
              <table className="table-fixed border-collapse border border-slate-400 m-auto company-dashboard-chart-table ">
                <tbody>
                  <tr>
                    <td className="border border-slate-300">
                      <span className="font-bold">
                        {state.numberOfEmployees}
                      </span>{' '}
                      人のうち
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <span className="font-bold">
                        {state.numberOfSubscribers}
                      </span>{' '}
                      人が打刻済み
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          id="widget-body"
          className="h-widgetBody-sm w-full bg-white px-3 flex flex-col gap-3"
        >
          {/* {state.isLoaded === false ? (
            <div className="w-full relative mt-24 h-24 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center md:text-sm">
                Loading service usage...
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : ( */}
          {/* <div>
            <div className="flex flex-col mb-2">
              <div className="flex flex-row">
                <div>
                  <Doughnut
                    data={state.record1}
                    height={100}
                    width={100}
                    options={{
                      maintainAspectRatio: false
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-gray-700 text-md mb-2">勤怠記録</h3>
                  <p className="text-gray-500 text-xs mb-2">
                    登録済従業員
                    <span className="text-lg">
                      {state.numberOfActiveKOTUsers}
                    </span>
                    人のうち
                    <br />
                    <span className="text-lg">{state.numberOfEmployees}</span>
                    人が打刻済み
                  </p>
                  <p className="orange text-3xl font-bold">
                    {state.record1.percent}%
                  </p>
                </div>
              </div>
            </div> */}
          {/* <div className="flex flex-col">
              <div className="flex flex-row">
                <div>
                  <Doughnut
                    data={state.record2}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-gray-700 text-md mb-2">展開率</h3>
                  <p className="text-gray-500 text-xs mb-2">
                    システムご利用予定人数
                    <span className="text-lg">{state.numberOfSubscribers}</span>
                    人のうち
                    <span className="text-lg">{state.numberOfEmployees}</span>
                    人が打刻済み
                  </p>
                  <p className="orange text-3xl font-bold">
                    {state.record2.percent}%
                  </p>
                </div>
              </div>
            </div> */}
          {/* </div> */}
          {/* )} */}
        </div>

        <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
          <div id="widget-footer-control" className="float-right"></div>
        </div>
      </div>
    </div>
  )
}

export default CompanyDashboardPieChart
