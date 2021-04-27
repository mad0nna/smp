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
//import Billing from './billingHistory'
//import Settings from './settings'
//import ServiceUsage from './serviceUsage
//import KotCharts from './kotCharts'


const ResponsiveGridLayout = WidthProvider(Responsive)

const widgets =[
  {component: <Welcome/>, static: true,style:'staticWidgets', className: '', state: 'shown', x: 0, y: 0, w: 4, h: .25},
  {component: '<Kotcharts>', static: false, className:'', state: 'shown', x: 0, y: 1, w: 4, h: 1.5},
  {component: <Services/>, static: false, className:'', state: 'shown', x: 0, y: 3, w: 2, h: 1.5},
  {component: <Linkage/>, static: false,className:'', state: 'shown', x: 2, y:2 , w: 2, h: 1.5},
  {component: '<ServiceUsage/>',static: false, className: '', state: 'shown', x: 0, y: 10, w: 4, h: 1.25},
  {component: '<Billing/>', static: false, className: '', state: 'shown', x: 4, y: 0, w: 3, h: 2},
  {component: <Notification/>,static: false, className: '', state: 'shown', x: 4, y: 7, w: 3, h: 2.5},
  {component: '<Settings/>', static: false, className: '', state: 'shown', x: 8, y: 0, w: 3, h: 2},
  {component: <Purchase/>,static: false, className: '', state: 'shown', x: 8, y: 7, w: 3, h: 2.5}
]

const Dashboard =()=> {
  return (
    <div className="px-10">
      <ResponsiveGridLayout className="dashboardGrid" layouts={{widgets}}
        breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
        cols={{lg: 10, md: 7, sm: 5, xs: 4}}
        draggableCancel = '.staticWidgets' margin={[35,35]} containerPadding={[10,20]}
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
