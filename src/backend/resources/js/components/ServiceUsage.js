import React, { useEffect, useState } from 'react'
import Ellipsis from '../../img/ellipsis.png'

const ServiceUsage = (props) => {
  const serviceUsageDate = props.serviceUsageDate
    ? props.serviceUsageDate
    : '---'
  const [numDays, setNumDays] = useState('')

  useEffect(() => {
    if (serviceUsageDate !== '---') {
      const lastUsedDate = new Date(serviceUsageDate)
      const currentDate = new Date()
      const differenceInTime = currentDate.getTime() - lastUsedDate.getTime()

      setNumDays((differenceInTime / (1000 * 3600 * 24)).toFixed(0))
    }
  }, [serviceUsageDate])

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
          <div className="pb-6">
            <p>
              サービス利用日 :: <span>{serviceUsageDate}</span>
            </p>
          </div>
          <div className="inline-block pb-3">
            {numDays ? (
              <p className="rounded-full bg-green-100 py-1 px-2">
                サービス利用開始から
                <span>{numDays}日経過 </span>
              </p>
            ) : (
              <p>---</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceUsage
