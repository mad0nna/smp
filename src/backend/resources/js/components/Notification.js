import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.iconTypes = {
      active: 'bg-notification-active',
      inactive: 'bg-notification-inactive'
    }
    this.notifWithLink = ['請求', 'お知らせ']
    this.state = {
      notificationItems : [
        {header:'請求', message: '5月度の請求書があります。', link: '#', status: 'unread'},
        {header:'契約リマインダー ', message: 'KOT - セキュアログインが30日後に失効します*', link: '#', status: 'unread'},
        {header:'お知らせ', message: 'H&T 新規サービス', link: '#', status: 'read'},
      ]
    }
  }
  render() {
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="bg-notification-icon w-6 h-6 bg-cover bg-no-repeat float-left"/>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-8">お知らせ</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className="h-widgetBody w-full bg-mainbg py-2 space-y-2">
            {
              this.state.notificationItems.map((item, index)=>{
                let bIsActive = item.status === 'unread'
                return(
                  <div id="widget-content-item" className="bg-white w-full h-20 box-border align-middle p-3 relative" key={index}>
                    {(bIsActive) ?
                      <div id="item-icon" className={this.iconTypes.active + ' bg-cover bg-no-repeat w-6 h-6 float-left'}/> :
                      <div id="item-icon" className={this.iconTypes.inactive + ' bg-cover bg-no-repeat w-4 h-5 float-left ml-1 mr-1'}/>
                    }
                    <p id="item-content" className="font-sans font-bold font-black text-xs ml-4 tracking-tighter float-left w-widgetBody">
                      {item.header} <br/>
                      {item.message} <br/>
                      {(this.notifWithLink.includes(item.header)) ? ' こちらをクリックして確認してください' : ''}
                    </p>
                    <p id="item-status" className="absolute right-4 float-right font-sans text-primary-200 text-xs tracking-tighter text-center leading-5"/>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">もっと見る</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Notification
if(document.getElementById('notification')) {
  ReactDOM.render(
    <Notification />
    , document.getElementById('notification'))
}
