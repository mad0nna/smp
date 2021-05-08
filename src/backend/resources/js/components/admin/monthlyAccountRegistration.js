import React from 'react'
import GraphIcon from '../../../img/admin/graph-icon.png'
import Ellipsis from '../../../img/ellipsis.png'
import CustomerRegisteredGraph from '../../../img/admin/customer-registered-graph.png'
import SalesRegisteredGraph from '../../../img/admin/sales-registered-graph.png'
const MonthlyAccountRegistration = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = (props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
  }
  return (
    <div className="w-full h-full relative group">
      <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
      <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 bg-white">
        <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
        <div id="contact-logo-container" className="h-16 flex mb-2 px-4 pb-2 pt-5 ">
          <img src={GraphIcon} alt="" className="h-8 w-8 pt-1"/>
          <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
                    月次アカウント登録
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0 w-64 h-12 text-center">
            <div className="w-16 h-6 leading-3 bg-greenOld p-1 align-middle inline-block border-greenOld border-l-2 border-b-2 border-t-2 cursor-pointer">
              <p className="text-white text-xxs text-center">円グラフ</p>
            </div>
            <div className="w-16 h-6 leading-3 bg-gray-200 p-1 align-middle inline-block border-greenOld border-l-2 border-r-2 border-b-2 border-t-2 cursor-pointer">
              <p className="text-gray-700 text-xxs text-center">カラム</p>
            </div>
            <div className="w-16 h-6 leading-3 bg-gray-200 p-1  align-middle inline-block border-greenOld border-r-2 border-b-2 border-t-2 cursor-pointer">
              <p className="text-gray-700 text-xxs text-center">棒グラフ</p>
            </div>
          </div>
          <div className="pt-10 px-4">
            <div id="graphItem" className="w-full my-8 relative flex text-center">
              <div className="w-1/2 my-auto">
                <div className="w-3 h-3 rounded-lg bg-primary-200 inline-block mb-1 mr-4"/>
                <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800">
                      500 / 1000
                </div>
                <p className="text-sm text-gray-600 font-bold mb-1">顧客企業数</p>
                <div className="w-full rounded-lg bg-primary-100 h-1"/>
              </div>
              <div className="my-auto w-1/2">
                <img src={CustomerRegisteredGraph} className="w-auto mx-auto"/>
              </div>
            </div>
            <div id="graphItem" className="w-full relative flex text-center">
              <div className="my-auto w-1/2">
                <img src={SalesRegisteredGraph} className=" w-auto mx-auto"/>
              </div>
              <div className="w-1/2 my-auto">
                <div className="w-3 h-3 rounded-lg bg-cyan inline-block mb-1 mr-4"/>
                <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800">
                      200 / 1000
                </div>
                <p className="text-sm text-gray-600 font-bold mb-1 h-4"/>
                <div className="w-full rounded-lg bg-cyan h-1"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default MonthlyAccountRegistration
