import React from 'react'
import Ellipsis from '../../img/ellipsis.png'
import notificationIcon from '../../svg/notification-icon.svg'

class Announcements extends React.Component {
  constructor(props) {
    super(props)
    this.iconTypes = {
      invoice: 'bg-notification-invoice',
      contract: 'bg-notification-active',
      hnt: 'bg-notification-normal'
    }
    this.notifWithLink = ['請求', 'お知らせ']
    this.state = {
      notificationItems: [
        {
          message:
            'システムメンテナンス \n 6月にシステムメンテナンスがあります \n 必要なデータを必ず保存するように \n してください'
        }
      ]
    }
  }
  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = this.props.interActivePages.includes(location.pathname)
        ? 'group-hover:block'
        : ''
    }
    return (
      <div className="w-full h-full relative group">
        <div
          className={
            'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' +
            showMoveButton
          }
        >
          Move
        </div>
        <div className="dashboard-widget-list w-full h-full relative  rounded-lg border-2 border-gray-200 bg-white">
          <div
            id="widget-header"
            className="max-w-full h-12  box-border align-middle p-3 relative"
          >
            <div
              id="widget-name"
              className="text-primary-200 font-sans font-bold"
            >
              {' '}
              <img className="h-5 inline" src={notificationIcon} /> お知らせ
            </div>
            <img
              className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
              src={Ellipsis}
            />
          </div>
          <div id="widget-body" className="w-full">
            {this.state.notificationItems.map((item, index) => {
              let fontColor = item.type === 'hnt' ? 'text-gray-500' : ''
              return (
                <div
                  id="widget-content-item"
                  className=" w-full h-20 box-border align-middle p-3 relative"
                  key={index}
                >
                  <p
                    id="item-content"
                    className={
                      fontColor +
                      ' font-sans text-xs ml-2 tracking-tighter float-left'
                    }
                  >
                    {index + 1}. {item.message}
                  </p>
                  <p
                    id="item-status"
                    className="absolute right-8 float-right font-sans text-primary-200 text-sm tracking-tighter text-center bottom-3"
                  >
                    {item.status}
                  </p>
                </div>
              )
            })}
          </div>
          <div id="widget-footer" className="w-full h-14 p-2.5">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">
                さらに表示
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Announcements
