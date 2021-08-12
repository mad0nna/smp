import React from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import KotBadge from '../../../img/admin/kot-icon.png'
import KotBanner from '../../../img/KOT-menu-logo.png'

const AdminKotServiceUsage = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = props.interActivePages.includes(location.pathname)
      ? 'group-hover:block'
      : ''
  }
  return (
    <div className="w-full h-full relative group font-meiryo">
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
        <div className="table absolute top-0 left-0 h-full w-full px-10 overflow-hidden">
          <div className="table-cell align-middle">
            <div className="mx-0 my-auto relative flex">
              <div className="w-44 my-auto">
                <img src={KotBadge} className="h-24 my-auto" />
              </div>
              <div className="block w-full">
                <div className="text-center mx-auto">
                  <img src={KotBanner} className="w-24 h-auto inline " />
                  <p className="text-xs text-primary-200 font-bold inline ml-1">
                    システム利用
                  </p>
                </div>
                <div className="text-center mt-2">
                  <p className="2xl:text-4xl lg:text-2xl text-cyan font-black font-meiryo">
                    10,000 / 20,000
                  </p>
                </div>
                <div className="text-center border-2 border-primary-200 rounded-2xl h-8 w-24 mx-auto mt-1">
                  <p className="text-sm text-primary-200 font-bold mt-1">
                    詳細を確認
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
export default AdminKotServiceUsage
