import React, { useEffect, useState } from 'react'
import Ellipsis from '../../../../../img/ellipsis.png'
import axios from 'axios'
import spinner from '../../../../../img/spinner.gif'

const ServiceUsage = () => {
  const [state, setState] = useState({
    serviceUsageDate: '',
    daysStarted: 0,
    loading: true
  })

  useEffect(() => {
    let isMounted = true

    async function getServiceUsageDate() {
      axios.get(`/company/getServiceUsageDate`).then((response) => {
        if (response.data) {
          let lastUsedDate = new Date(response.data)
          let currentDate = new Date()
          let differenceInTime = currentDate.getTime() - lastUsedDate.getTime()
          if (isMounted) {
            setState((prevState) => {
              return {
                ...prevState,
                serviceUsageDate: response.data,
                daysStarted: (differenceInTime / (1000 * 3600 * 24)).toFixed(0),
                loading: false
              }
            })
          }
        } else {
          if (isMounted) {
            setState((prevState) => {
              return {
                ...prevState,
                serviceUsageDate: '---',
                loading: false
              }
            })
          }
        }
      })
    }

    getServiceUsageDate()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="h-full w-full relative group">
      <div className="dashboard-widget-list w-full h-full overflow-hidden relative bg-white rounded-20px border border-whiteTint-500">
        <div
          id="widget-header"
          className="bg-white box-border p-3 pb-6 relative"
        >
          <div>
            <div className="w-full pb-1">
              <span className="text-hex-065F46 text-23px font-bold opacity-100">
                サービス利用日
              </span>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-2 text-gray-500 text-xs">
          {state.loading === true ? (
            <div className="w-full relative h-12 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center md:text-sm">
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-secondary-500 text-xs border-solid border border-slate-100 rounded-t-lg">
                <p className="p-2 opacity-100 text-base">
                  サービス利用日 : <span>{state.serviceUsageDate}</span>
                </p>
              </div>
              <div className="text-14px border-solid border-b border-l border-r border-slate-100 rounded-b-lg ">
                <p className="p-2 text-14px opacity-100">
                  サービス利用開始から :
                  {state.daysStarted ? (
                    <span>{state.daysStarted}日経過 </span>
                  ) : (
                    '---'
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceUsage
