import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'

class Notification extends React.Component {
  constructor(props) {
    super(props)
    this.iconTypes = {
      invoice: 'bg-notification-invoice',
      contract: 'bg-notification-active',
      hnt: 'bg-notification-normal'
    }
    this.notifWithLink = ['請求', 'お知らせ']
    this.state = {
      notificationItems : [
        {header:'請求', type:'invoice', message: '5月度の請求書があります。', link: '#', status: '未読'},
        {header:'契約リマインダー ', type: 'contract', icon: '', message: 'KOT - セキュアログインが30日後に失効します*', link: '#', status: '未読'},
        {header:'お知らせ', type: 'hnt', message: 'H&T 新規サービス', link: '#', status: '読む'},
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
                let fontColor = item.type === 'hnt' ? 'text-gray-500' : ''
                return(
                  <div id="widget-content-item" className="bg-white w-full h-20 box-border align-middle p-3 relative" key={index}>
                    <div id="item-icon" className={this.iconTypes[item.type] + ' bg-cover bg-no-repeat w-6 h-6 float-left'}/> :
                    <p id="item-content" className={fontColor + ' font-black font-sans text-xs ml-4 tracking-tighter float-left w-widgetBody'}>
                      {item.header} <br/>
                      {item.message} <br/>
                      {(this.notifWithLink.includes(item.header)) ? ' こちらをクリックして確認してください' : ''}
                    </p>
                    <p id="item-status" className="absolute right-8 float-right font-sans text-primary-200 text-sm tracking-tighter text-center bottom-3">{item.status}</p>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">さらに表示</button>
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
