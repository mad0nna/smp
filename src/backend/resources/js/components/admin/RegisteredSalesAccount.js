import React from 'react'
import SalesIcon from '../../../img/admin/sales.png'
import Ellipsis from '../../../img/ellipsis.png'

const RegisteredSalesAgency = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = props.interActivePages.includes(location.pathname)
      ? 'group-hover:block'
      : ''
  }
  return (
    <div className="w-full h-full relative group">
      <div
        className={
          'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' +
          showMoveButton
        }
      >
        Move
      </div>
      <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 bg-white">
        <img
          className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
          src={Ellipsis}
        />
        <div className="table absolute top-0 left-0 h-full w-full px-10">
          <div className="table-cell align-middle">
            <div className="mx-0 my-auto relative flex">
              <div className="w-48">
                <img src={SalesIcon} />
                <div className="absolute bottom-8 left-2 text-white text-xs">
                  <p>登録済み販売代理店</p>
                </div>
              </div>
              <div className="block w-full">
                <div className="text-center mt-4">
                  <p className="2xl:text-5xl lg:text-4xl lg:mt-6 text-cyan font-black">
                    200
                  </p>
                </div>
                <div className="text-center">
                  <p className="2xl:text-2xl lg:text-1xl text-primary-200 font-bold">
                    5 月度
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisteredSalesAgency
