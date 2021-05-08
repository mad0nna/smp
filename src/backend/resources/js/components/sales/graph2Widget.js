import React from 'react'
import graph2 from '../../../svg/sales-graph2.svg'
import ArrowDownSm from '../../../img/arrowdownsmall.png'
import graph2Icon from '../../../img/graph2.png'

const Graph2 =() =>{

  return(
    <div className="w-full h-full relative group ">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-lg border-2 border-gray-200 ">
        <div id="widget-header" className="max-w-full h-6 bg-white box-border align-middle p-3 relative">
          <img src={graph2Icon} className="w-6 h-6 ml-4 bg-cover bg-no-repeat float-left"/>
          <div id="widget-name" className="text-primary-200 font-sans font-bold ml-4 float-left">各サービスの売上高</div>
          <div id="widget-name" className="float-right mr-4">
            <div className="table-cell h-4 w-full align-middle relative group">
              <div id="search-bar" className="border-2 border-primary-200 h-5 rounded-xs w-44 mx-0 my-auto bg-white table-cell relative cursor-pointer">
                <p className="mx-0 my-auto w-48 inline ml-8 text-gray-500 text-sm font-bold">顧客企業数</p>
                <img src={ArrowDownSm} className="absolute top-3 right-3"/>
              </div>
              <div className="w-full h-24 bg-gray-200 absolute -bottom-18 z-10 py-1 px-8 hidden group-hover:block">
                <div className="w-full h-12">
                  <a href="#" className=" space-x-2 ">
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div className="inline-block text-xs my-auto mx-0 text-gray-800 text-center">顧客企業数</div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="w-full h-12">
                  <a href="#" className="space-x-2">
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div className="inline-block text-xs text-gray-800 my-auto mx-0  text-center">各サービスの売上高</div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-0"><img className="mx-auto" src={graph2}/></div>
        
      </div>
    </div>

  )

}

export default Graph2
