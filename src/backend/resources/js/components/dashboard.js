import React from 'react'
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
//import Settings from './settings'
//import ServiceUsage from './serviceUsage
import CompanyDashboardChart from './companyDashboardChart'


const ResponsiveGridLayout = WidthProvider(Responsive)

const widgets =[
  {component: <Welcome/>, static: true,style:'staticWidgets', className: '', state: 'shown', x: 0, y: 0, w: 4, h: .25},
  {component:<CompanyDashboardChart/>, static: false, className: '', state: 'shown', x: 0, y: 0, w: 4, h: 2},
  {component: <Services/>, static: false, className:'', state: 'shown', x: 0, y: 0, w: 2, h: 1.25},
  {component: <Linkage/>, static: false,className:'', state: 'shown', x: 2, y:3 , w: 2, h: 1.25},
  {component: '<ServiceUsage/>',static: false, className: '', state: 'shown', x: 0, y: 4, w: 4, h: 1.25},
  {component: <BillingHistory/>, static: false, className: '', state: 'shown', x: 4, y: 0, w: 3, h: 2.50},
  {component: <Notification/>,static: false, className: '', state: 'shown', x: 4, y:2, w: 3, h: 2.25},
  {component: '<Settings/>', static: false, className: '', state: 'shown', x: 7, y: 0, w: 3, h: 2.50},
  {component: <Purchase/>,static: false, className: '', state: 'shown', x: 7, y: 4, w: 3, h: 2.25}
]

const Dashboard =()=> {
  return (
    <div className="px-10">
      <ResponsiveGridLayout className="dashboardGrid" layouts={{widgets}}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 10, md: 7, sm: 5, xs: 4}}
        draggableCancel = '.staticWidgets' margin={[35,30]} containerPadding={[10,20]}
        isBounded={true}>
        {
          widgets.map((item, index) => {
            return (<div key={index} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h,static:item.static}} >{item.component}</div>)
          })
        }
      </ResponsiveGridLayout>
    </div>
  )
}

export default Dashboard

if (document.getElementById('dashboard')){
  ReactDOM.render(<Dashboard/>,document.getElementById('dashboard'))
}
