import React from 'react'
import Ellipsis from '../../../img/ellipsis.png'
// import FreeeIcon from '../../../img/admin/freee-icon.png'
import widgetBackground from '../../../img/admin/widget-bg.png'
import Freeelogo from '../../../img/admin/freee-logo.png'

// const AdminFreeeServiceUsage = (props) => {
const AdminFreeeServiceUsage = () => {
  //   let showMoveButton = ''
  //   if (typeof props.interActivePages != 'undefined') {
  //     showMoveButton = props.interActivePages.includes(location.pathname)
  //       ? 'group-hover:block'
  //       : ''
  //   }
  return (
    <div className="w-full h-full relative group">
      <div
        className="w-full h-full overflow-hidden rounded-lg bg-white shadow-xl"
        style={{
          backgroundImage: `url(${widgetBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'top right'
        }}
      >
        <div id="widget-header" className="box-border p-3 pb-6">
          <div>
            <div className="w-full pb-2">
              <h2 className="text-green-800 text-lg font-bold">システム利用</h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-3 text-gray-500 ">
          <div className="flex pl-1">
            <div className="flex-grow text-gray-400">
              <div>
                <h1 className="font-semibold 2xl:text-3xl xl:3xl lg:text-xl md:text-xs sm:text-xs text-gray-500 font-sans leading-2 tracking-tighter">
                  5,000
                  <span className="font-normal 2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans tracking-normal">
                    {' '}
                    / 20,000
                  </span>
                </h1>{' '}
              </div>
              <div className="2xl:text-xs xl:text-xs lg:text-xs  xs:text-xxs text-gray-400 font-sans">
                Freee システム利用
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="border-tertiary-500 text-bold w-24 border-2 text-tertiary-500 rounded-3xl tracking-tighter px-2"
                >
                  詳細を確認
                </a>
              </div>
            </div>
            <div className="flex-none">
              <img src={Freeelogo} className="h-24 my-auto mr-9" />
            </div>
          </div>
        </div>
        <div id="widget-footer" className="w-full px-3 text-gray-500"></div>
      </div>
    </div>
  )
}
export default AdminFreeeServiceUsage
