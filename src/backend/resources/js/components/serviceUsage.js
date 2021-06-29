import React from 'react'
import Ellipsis from '../../img/ellipsis.png'

const ServiceUsage = () => {
  const dateUsage = '2021年5月25日'
  const numdays = '2'

  return (
    <div className={'h-full' + ' w-full relative group'}>
      <div className="dashboard-widget-list w-full h-full relative rounded-lg border-2 border-gray-200 bg-white">
        <div
          id="widget-header"
          className="max-w-full h-6 bg-white box-border align-middle p-3 relative"
        >
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div
          id="widget-body"
          className=" bg-white 2xl:px-6 xl:px-5 lg:px-3 sm:px-2 space-y-0 text-sm ml-8 font-meiryo"
        >
          <p className="text-primary-200 font-bold">
            サービス利用日 ::{' '}
            <span className="font-normal text-gray-600">{dateUsage}</span>
          </p>

          <p className="text-primary-200 pt-7">
            サービス利用開始から
            <span className="font-bold">{numdays}日経過 </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ServiceUsage