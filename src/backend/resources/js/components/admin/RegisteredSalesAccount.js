import React from 'react'
// import SalesIcon from '../../../img/admin/sales.png'
import Ellipsis from '../../../img/ellipsis.png'
import facesRegisteredCustomers from '../../../img/admin/registered-customers-faces.jpg'
import iconRegisteredSalesAccounts from '../../../img/admin/icon-registered-sales-accounts.png'

// const RegisteredSalesAgency = (props) => {
const RegisteredSalesAgency = () => {
  //   let showMoveButton = ''
  //   if (typeof props.interActivePages != 'undefined') {
  //     showMoveButton = props.interActivePages.includes(location.pathname)
  //       ? 'group-hover:block'
  //       : ''
  //   }
  return (
    <div className="w-full h-full relative group">
      <div
        className="w-full h-full overflow-hidden relative  rounded-lg bg-white shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to right, #fff,#ececec)'
        }}
      >
        <div id="widget-header" className="box-border p-3 pb-6 relative">
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                登録済み販売代理店
              </h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-3 text-gray-500">
          <div className="flex pl-1">
            <div className="flex-none content-center">
              <img src={iconRegisteredSalesAccounts} />
            </div>
            <div className="flex-grow text-gray-400 ml-2">
              <div>
                <h1 className="font-semibold 2xl:text-3xl xl:3xl lg:text-xl md:text-xs sm:text-xs text-gray-500 font-sans leading-2 tracking-tighter">
                  500
                  <span className="font-normal 2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans tracking-normal">
                    {' '}
                    / 5 月度
                  </span>
                </h1>{' '}
              </div>
              <div className="2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans">
                Registered Customers
              </div>
            </div>
            <div className="flex-col">
              <img src={facesRegisteredCustomers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisteredSalesAgency
