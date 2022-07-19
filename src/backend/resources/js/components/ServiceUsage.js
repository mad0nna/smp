import React, { useEffect, useState } from 'react'
import Ellipsis from '../../img/ellipsis.png'
import axios from 'axios'
import spinner from '../../img/spinner.gif'

const ServiceUsage = () => {
  const [state, setState] = useState({
    serviceUsageDate: '',
    daysStarted: 0,
    loading: true
  })

  useEffect(() => {
    axios.get(`/company/getServiceUsageDate`).then((response) => {
      if (response.data) {
        let lastUsedDate = new Date(response.data)
        let currentDate = new Date()
        let differenceInTime = currentDate.getTime() - lastUsedDate.getTime()
        setState((prevState) => {
          return {
            ...prevState,
            serviceUsageDate: response.data,
            daysStarted: (differenceInTime / (1000 * 3600 * 24)).toFixed(0),
            loading: false
          }
        })
      } else {
        setState((prevState) => {
          return {
            ...prevState,
            serviceUsageDate: '---',
            loading: false
          }
        })
      }
    })
  }, [])

  return (
    <div className="h-full w-full relative group">
      <div className="dashboard-widget-list w-full h-full overflow-hidden relative bg-white rounded-lg shadow-xl">
        <div
          id="widget-header"
          className="bg-white box-border p-3 pb-6 relative"
        >
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                サービス利用日
              </h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-3 text-gray-500 text-xs">
          {state.loading === true ? (
            <div className="w-full relative h-12 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center md:text-sm">
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            <div>
              <div className="pb-6">
                <p>
                  サービス利用日 : <span>{state.serviceUsageDate}</span>
                </p>
              </div>
              <div className="inline-block pb-3">
                {state.daysStarted ? (
                  <p className="rounded-full bg-green-100 py-1 px-2">
                    サービス利用開始から
                    <span>{state.daysStarted}日経過 </span>
                  </p>
                ) : (
                  <p>---</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceUsage
