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

const Dashboard = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive)

  const [showWidgetSettings,setWidgetSettings]= useState(false)
  const showWidgetSettingsHandler =() => {
    setWidgetSettings (true)
  }

  const widgets =[
    {component: <Welcome/>, label: 'Welcome', static: true,style:'staticWidgets', className: '', state: true, x: 0, y: 0, w: 4, h: .25,isResizable:false},
    {component:<CompanyDashboardChart/>, label: 'Dashboard Charts', static: false, className:'', state: true, x: 0, y: 0, w: 4, h: 2, minW: 2,isResizable:true},
    {component: <Services/>, label: 'Contracted Services', static: false, className:'', state: true, x: 0, y: 0, w: 2, h: 1.25, minW: 2,isResizable:false},
    {component: <Linkage/>, label: 'Linkage Services', static: false,className:'', state: true, x: 2, y:3 , w: 2, h: 1.25, minW: 2, isResizable:false},
    {component: <ServiceUsage/>,label: 'Status of Service Usage',static: false, className: '', state: true, x: 0, y: 4, w: 4, h: 1.25, minW: 2, isResizable:true},
    {component: <BillingHistory/>, label: 'Billing History', static: false, className: '', state: true, x: 4, y: 0, w: 3, h: 2.50, minW: 2, isResizable:true},
    {component: <Notification/>,label: 'Notifications', static: false, className: '', state: true,x: 4, y:2, w: 3, h: 2.25, minW: 1, isResizable:true},
    {component: <Settings showWidgets={showWidgetSettingsHandler}/>, label: 'Settings', static: false, className: '', state: true, x: 7, y: 0, w: 3, h: 2.50, isResizable:true},
    {component: <Purchase/>,label: 'Purchase History', static: false, className: '', state: true, x: 7, y: 4, w: 3, h: 2.25, minW: 2, Resizable:true}
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
        <ResponsiveGridLayout className="dashboardGrid" layouts={{widgets}}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480}}
          cols={{lg: 10, md: 10, sm: 5, xs:1}}
          draggableCancel = '.staticWidgets' margin={[35,30]} containerPadding={[10,20]}
          isBounded={true}>
          {
            widgetState.filter(widget => widget.state !== false).map((item, index) => {
              return (<div key={index} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h,static:item.static, isResizable:item.isResizable}} >{item.component}</div>)
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
