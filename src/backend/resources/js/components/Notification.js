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
        {header:'請求', type:'invoice', message: '4月度の請求書があります。', link: '#', status: '未読'},
        {header:'契約リマインダー ', type: 'contract', icon: '', message: 'KOT - セキュアログインが30日後に失効します*', link: '#', status: '未読'},
        {header:'お知らせ', type: 'hnt', message: 'H&T 新規サービス', link: '#', status: '既読'},
      ]
    }
  }
  render() {
    let showMoveButton = ''
    let py = 'py-3 h-20 p-3 px-3'
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = (this.props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
    }
    
    this.props.displayType !== 'undefined' && this.props.displayType === 'small' ? py = 'py-2 h-18 pl-3 ' : 'py-3 h-20 p-3 px-3'

    return(
      <div className="w-full h-full relative group ">
        <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
        <div className="w-full h-full overflow-hidden relative bg-white rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="bg-notification-icon w-6 h-6 bg-cover bg-no-repeat float-left"/>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-8">お知らせ</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className=" w-full bg-mainbg py-1 space-y-1">
            {
              this.state.notificationItems.map((item, index)=>{
                let fontColor = item.type === 'hnt' ? 'text-gray-500' : ''
                return(
                  <div id="widget-content-item" className={py + ' bg-white w-full box-border align-middle px-3 relative'} key={index}>
                    <div id="item-icon" className={this.iconTypes[item.type] + ' bg-cover bg-no-repeat w-5 h-5 mt-1 float-left'}/>
                    <p id="item-content" className={fontColor + '  font-sans text-xs tracking-tighter ml-7 w-4/5  '}>
                      {item.header} <br/>
                      {item.message} <br/>
                      <span className="text-primary-200">{(this.notifWithLink.includes(item.header)) ? ' こちらをクリックして確認してください' : ''}</span>
                    </p>
                    <p id="item-status" className="absolute right-3 float-right font-sans text-primary-200 text-sm tracking-tighter text-center bottom-3">{item.status}</p>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-10 bg-white pt-3 pr-3">
            <div id="widget-footer-control" className="float-right">
              <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">さらに表示</button>
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
