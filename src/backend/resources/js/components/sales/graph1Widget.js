import React from 'react'
import graph1Icon from '../../../img/graph1-icon.png'
import graph1 from '../../../svg/graph1-sales.svg'

const Graph1 =() =>{

  return(
    <div className="w-full h-full relative group ">
      <div className="w-full h-full overflow-hidden relative bg-white rounded-lg border-2 border-gray-200 ">
        <div id="widget-header" className="max-w-full h-6 bg-white box-border align-middle p-3 relative">
          <img src={graph1Icon} className="w-6 h-6 ml-4 bg-cover bg-no-repeat float-left"/>
          <div id="widget-name" className="text-primary-200 font-sans font-bold ml-4 float-left">契約サービス状況</div>
         
        </div>
        <div className="w-full flex flex-wrap p-5 font-meiryo">
          <div className="w-1/2 mx-auto justify-center px-3">
            <div className="w-3 h-3 rounded-lg bg-primary-200 inline-block mb-1 mr-4"/>
            <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800 font-meiryo">
                        1,000
            </div>
            <p className="text-sm text-gray-600 font-bold mb-1 pl-8">企業数</p>
            <div className="w-full rounded-lg bg-primary-100 h-2 mb-3 "/>
            <div className="w-3 h-3 rounded-lg bg-primary-200 inline-block mr-2"/>
            <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800 pl-2">
                            8,500/
            </div>
            <div className="inline-block 2xl:text-lg xl:text-md lg:text-sm font-black text-gray-800 relative">
              <span className="absolute bottom-0">10,000</span>
            </div>
            <p className="text-sm text-gray-600 font-bold mb-3 pl-8 ">ID数</p>
            <div className="w-full rounded-lg bg-cyan h-2"/>
          </div> 
          <div className="w-1/2 content-evenly">
            <img className="mx-auto h-36" src={graph1}/>
          </div> 
        </div>
      </div>
    </div>

  )

}

export default Graph1
