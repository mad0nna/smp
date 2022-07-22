import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Ellipsis from '../../../../../img/ellipsis.png'
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
    let isMounted = true

    async function getServiceUsage() {
      axios
        .get(`/company/getServiceUsage`)
        .then((response) => {
          let usageData = response.data
          if (isMounted) {
            setState((prevState) => {
              let percentOfNoSubscribedLogin = 0
              let percentOfNoEmployeesLogin = 0

              if (
                usageData.numberOfEmployees &&
                usageData.numberOfActiveKOTUsers
              ) {
                percentOfNoSubscribedLogin = Math.round(
                  parseInt(
                    (usageData.numberOfActiveKOTUsers /
                      usageData.numberOfEmployees) *
                      100
                  )
                )
              }

              if (
                usageData.numberOfEmployees &&
                usageData.numberOfSubscribers
              ) {
                percentOfNoEmployeesLogin = Math.round(
                  parseInt(
                    (usageData.numberOfSubscribers /
                      usageData.numberOfEmployees) *
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
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status)
          }
        })
    }
    getServiceUsage()

    return () => {
      // 👇️ when component unmounts, set isMounted to false
      isMounted = false
    }
  }, [])
  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-20px border border-whiteTint-500">
        <div
          id="widget-header"
          className="bg-white relative box-border p-3 pb-6"
        >
          <div>
            <div className="w-full pb-2">
              <span className="text-hex-065F46 font-bold text-28px opacity-100 tracking-1.4px">
                サービス利用状況
              </span>
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
          <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-y-8 gap-x-5">
            <div className="company-dashboard-chart-container opacity-100 rounded-15px bg-hex-F5F5F5">
              <div className="grid place-items-center">
                <Doughnut
                  data={state.record1}
                  height={270}
                  width={270}
                  options={{
                    responsive: false,
                    cutout: 100
                  }}
                  plugins={state.record1.plugins}
                />
              </div>
              <div className="company-dashboard-chart-table-title tracking-tighter opacity-100 font-semibold text-25px text-hex-007B53">
                登録済従業員
              </div>

              <div className="m-auto w-11/12 max-w-sm  w-349px">
                <div className="pt-5 opacity-100 text-19px font-semibold tracking-tighter text-hex-1E1E1E bg-transparent pb-1">
                  勤怠記録
                </div>
                <div className="bg-white">
                  <div className="rounded-t-md border-t border-l border-r border-hex-C4C4C4 px-2.5 py-1.5">
                    <span className="font-bold text-3xl">
                      {state.numberOfEmployees}
                    </span>
                    <span className="text-hex-676565 tracking-tighter opacity-100 text-lg pl-2 ">
                      人のうち
                    </span>
                  </div>
                  <div className="rounded-b-md border-b  border-t border-l border-r border-hex-C4C4C4 px-2.5 py-1.5">
                    <span className="font-bold text-3xl">
                      {state.numberOfActiveKOTUsers}
                    </span>
                    <span className="text-hex-676565 tracking-tighter opacity-100 text-lg pl-2">
                      人が打刻済み
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="company-dashboard-chart-container opacity-100 rounded-15px bg-hex-F5F5F5">
              <div className="grid place-items-center">
                <Doughnut
                  data={state.record2}
                  height={270}
                  width={270}
                  options={{
                    responsive: false,
                    cutout: 100
                  }}
                  plugins={state.record2.plugins}
                />
              </div>
              <div className="company-dashboard-chart-table-title tracking-tighter opacity-100 font-semibold text-25px text-hex-007B53">
                展開率
              </div>
              <div className="m-auto w-11/12 max-w-sm w-349px">
                <div className="pt-5 opacity-100 text-19px font-semibold tracking-tighter text-hex-1E1E1E pb-1">
                  システムご利用予定人数
                </div>
                <div className="bg-white">
                  <div className="rounded-t-md border-t border-l border-r border-hex-C4C4C4 px-2.5 py-1.5">
                    <span className="font-bold text-3xl">
                      {state.numberOfEmployees}
                    </span>
                    <span className="text-hex-676565 tracking-tighter opacity-100 text-lg pl-2">
                      人のうち
                    </span>
                  </div>
                  <div className="rounded-b-md border-b  border-t border-l border-r border-hex-C4C4C4 px-2.5 py-1.5">
                    <span className="font-bold text-3xl">
                      {state.numberOfSubscribers}
                    </span>
                    <span className="text-hex-676565 tracking-tighter opacity-100 text-lg pl-2">
                      人が打刻済み
                    </span>
                  </div>
                </div>
              </div>
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