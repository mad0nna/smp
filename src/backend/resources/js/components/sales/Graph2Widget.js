import React, { useState } from 'react'
import ServiceSalesGraph from '../../../svg/service-sales-graph.svg'
import ClientCountGraph from '../../../svg/client-count-graph.svg'
import graph2Icon from '../../../img/graph2.png'

const Graph2 = () => {
  const [chartType, setChartType] = useState('7.1')
  const changeChartHandler = (event) => {
    setChartType(event.target.value)
  }

  return (
    <div className="w-full h-full relative group font-meiryo text-gray-700">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-lg border-2 border-gray-200 ">
        <div
          id="widget-header"
          className="max-w-full h-6 bg-white box-border align-middle p-3 relative"
        >
          <img
            src={graph2Icon}
            className="w-6 h-6 ml-4 bg-cover bg-no-repeat float-left"
          />
          <div
            id="widget-name"
            className="text-primary-200 text-md font-meiryo font-bold ml-4 float-left"
          >
            {chartType === '7.1' ? '各サービスの売上高' : '顧客企業数'}
          </div>
          <div className="float-right">
            <div className="w-full h-8 z-10 py-1 px-8 text-xs">
              <select
                className="w-full h-8 bg-white border-2 border-primary-200 px-4 lg:px-2 font-bold text-center"
                onChange={(e) => changeChartHandler(e)}
              >
                <option
                  className="h-12 bg-gray-300 border-2 border-primary-200 px-auto"
                  value="7.1"
                >
                  各サービスの売上高
                </option>
                <option
                  className="h-12 bg-gray-300 px-auto border-2 border-primary-200"
                  value="7.2"
                >
                  顧客企業数
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="pt-0 w-full">
          {
            <img
              className="mx-auto h-full px-2"
              src={chartType === '7.1' ? ServiceSalesGraph : ClientCountGraph}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default Graph2
