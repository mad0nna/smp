import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import birdIcon from '../../img/freee_small.png'
import smartHRIcon from '../../img/smartHR_small.png'
class LinkageServices extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      linkageServices: [
        {serviceName: 'Freee', serviceLink: '#', icon: birdIcon},
        {serviceName: 'SmartHR', serviceLink: '#', icon: smartHRIcon},
        {serviceName: 'SalesForce', serviceLink: '#', icon: ''}
      ]
    }
  }

  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = (this.props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
    }
    return(
      <div className={'h-full' + ' w-full relative group'}>
        <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-pointer hidden ' + showMoveButton}>Move</div>
        <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200 bg-white">
          <div id="widget-header" className="max-w-full h-12 bg-white box-border align-middle p-3 relative">
            <div id="widget-icon" className="2xl:w-2 w-1 h-6 bg-primary-200 float-left 2xl:ml-4"> </div>
            <div id="widget-name" className="text-primary-200 font-sans font-bold 2xl:ml-8 lg:ml-4">サービス連携</div>
            <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
          </div>
          <div id="widget-body" className= 'h-widgetBody-sm w-full bg-white 2xl:px-6 xl:px-5 lg:px-3 sm:px-2 space-y-0 overflow-hidden bg-white '>
            {
              this.state.linkageServices.map((item, index) => {
                let stripe = (!(index % 2)) ? 'bg-mainbg' : 'bg-white'
                return(
                  <div id="widget-content-item" className={stripe +' w-auto h-auto align-middle relative rounded-3xl pl-3'} key={index}>
                    <img src={item.icon} className="inline"/>
                    <p id="item-content" className="font-sans 2xl:text-xs  sm:text-xxs inline-block w-1/2 2xl:pl-2 xl:pl-2 lg:pl-4 2xl:py-2 2xl:py-3 2xl:py-3 sm:py-3 leading-loose">{item.serviceName}</p>
                    <div id="item-content" className="font-sans text-gray-400 font-black lg:text-xs m:text-xxs absolute top-0 right-0 left-0 bottom-0">
                      <div className="inline-block align-middle h-full w-1/2"/>
                      <div className="inline-block align-middle">
                        <a href={item.serviceLink}>
                          <p className="bg-primary-200 2xl:w-20 xl:w-16 lg:w-16 h-6 rounded-lg py-1 text-white font-sans text-xs text-center"> 適用 </p>
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          {/*this.addFooter()*/}
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <div id="widget-footer" className="w-full h-10 pr-4 ">
        <div id="widget-footer-control" className="float-right">
          <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter hidden">もっと見る</button>
        </div>
      </div>

    )
  }
}
export default LinkageServices
if(document.getElementById('linkage-services')) {
  ReactDOM.render(
    <LinkageServices />
    , document.getElementById('linkage-services'))
}
