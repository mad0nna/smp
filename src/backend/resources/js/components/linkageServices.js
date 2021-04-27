import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
class LinkageServices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      linkageServices: [
        {serviceName: 'Freee', serviceLink: '#'},
        {serviceName: 'SmartHR', serviceLink: '#'},
        {serviceName: 'SalesForce', serviceLink: '#'}
      ]
    }
  }
  render() {
    let servicesCounter = this.state.linkageServices.length
    return(
      <div className="w-full h-full relative group">
        <div className="absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-pointer hidden group-hover:block">Move</div>
        <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200 ">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="w-2 h-6 bg-primary-200 float-left ml-4"> </div>
            <div id="widget-name" className="text-primary-200 font-sans font-bold ml-8">サービス連携</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className= 'h-widgetBody-sm w-full bg-white px-6 space-y-0 overflow-hidden'>
            {
              this.state.linkageServices.map((item, index) => {
                let stripe = (!(index % 2)) ? 'bg-mainbg' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe +' w-auto h-auto align-middle relative rounded-3xl'} key={index}>
                    <p id="item-content" className="font-sans text-sm inline-block w-1/2 pl-6 py-1 leading-loose break-words">{item.serviceName}</p>
                    <div id="item-content" className="font-sans text-gray-400 font-black text-sm absolute top-0 right-0 left-0 bottom-0">
                      <div className="inline-block align-middle h-full w-1/2"/>
                      <div className="inline-block align-middle">
                        <a href={item.serviceLink}>
                          <p className="bg-primary-200 w-20 h-6 rounded-lg py-1 text-white font-sans text-xs text-center"> 適用 </p>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div id="widget-footer" className="w-full h-14 bg-white p-3.5 hidden">
            <div id="widget-footer-control" className="float-right">
              {servicesCounter >= 2 ? this.addFooter() : ''}
            </div>
          </div>
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">もっと見る</button>
    )
  }
}
export default LinkageServices
if(document.getElementById('linkage-services')) {
  ReactDOM.render(
    <LinkageServices />
    , document.getElementById('linkage-services'))
}
