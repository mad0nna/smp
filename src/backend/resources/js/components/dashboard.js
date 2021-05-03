import React, { useState }  from 'react'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Welcome from './welcome'
import Notification from './Notification'
import Services from './contractedServices'
import Linkage from './linkageServices'
import Purchase from './purchaseHistory'
import BillingHistory from './billingHistory'
import Settings from './dashboardSettings'
import WidgetSettings from './widgetSettings.js'
import ServiceUsage from './dashboardServiceUsage'
import CompanyDashboardChart from './companyDashboardChart'
import {interactivePages} from '../utilities/constants'

const Dashboard = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive)

  const [showWidgetSettings,setWidgetSettings]= useState(false)
  const showWidgetSettingsHandler =() => {
    setWidgetSettings (true)
  }

  const widgets =[
    {component: <Welcome/>, label: 'ようこそ！', static: true,style:'staticWidgets', className: 'w-1/3 flex', state: true, x: 0, y: 0, w: 4, h: .25,isResizable:false},
    {component:<CompanyDashboardChart interActivePages={interactivePages}/>, label: 'ダッシュボードチャート', static: false, className:'w-1/3', state: true, x: 0, y: 0, w: 4, h: 2, minW: 2,isResizable:true},
    {component: <Services interActivePages={interactivePages}/>, label: '契約サービス', static: false, className:'', state: true, x: 0, y: 0, w: 2, h: 1.25, minW: 2,isResizable:false},
    {component: <Linkage interActivePages={interactivePages}/>, label: '連携サービス', static: false,className:'', state: true, x: 2, y:3 , w: 2, h: 1.25, minW: 2, isResizable:false},
    {component: <ServiceUsage interActivePages={interactivePages}/>,label: 'サービス利用状況',static: false, className: 'w-1/3', state: true, x: 0, y: 4, w: 4, h: 1.25, minW: 2, isResizable:true},
    {component: <BillingHistory interActivePages={interactivePages}/>, label: '請求履歴', static: false, className: 'w-1/3', state: true, x: 4, y: 0, w: 3, h: 2.50, minW: 2, isResizable:true},
    {component: <Notification interActivePages={interactivePages}/>,label: 'お知らせ', static: false, className: 'w-1/3', state: true,x: 4, y:2, w: 3, h: 2.25, minW: 1, isResizable:true},
    {component: <Settings showWidgets={showWidgetSettingsHandler} interActivePages={interactivePages}/>, label: '設定', static: false, className: 'w-1/3', state: true, x: 7, y: 0, w: 3, h: 2.50, isResizable:true},
    {component: <Purchase interActivePages={interactivePages}/>,label: '購入履歴', static: false, className: 'w-1/3', state: true, x: 7, y: 4, w: 3, h: 2.25, minW: 2, Resizable:true}
  ]

  const [widgetState,setWidgetState]=useState(widgets)

  const updatedWidgetHandler = (widgetState) =>{
    setWidgetState(widgetState)
    setWidgetSettings (false)
    console.log(widgetState)
  }

  return (
    <div className="px-10">

      { (showWidgetSettings) ?

        <WidgetSettings widgetslist={widgetState} updatedWidgetState={updatedWidgetHandler}/> :
        <ResponsiveGridLayout className="dashboardGrid" layouts={{lg:widgets,md:widgets}}
          breakpoints={{lg: 1200, md: 768, sm: 640, xs: 480}}
          cols={{lg: 10, md: 10, sm: 5, xs:1}}
          draggableCancel = '.staticWidgets' margin={[35,30]} containerPadding={[10,20]}
          isBounded={true} useCSSTransforms={true}>
          {
            widgetState.filter(widget => widget.state !== false).map((item, index) => {
              return (<div className={item.className} key={index} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h,static:item.static, isResizable:item.isResizable}} >{item.component}</div>)
            })
          }
        </ResponsiveGridLayout>
      }
    </div>
  )
}

export default Dashboard

if (document.getElementById('dashboard')){
  ReactDOM.render(<Dashboard/>,document.getElementById('dashboard'))
}
