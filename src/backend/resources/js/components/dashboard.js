import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive, WidthProvider } from 'react-grid-layout'
import Welcome from './welcome'
import Notification from './Notification'
import ServiceUsage from './serviceUsage'
import Purchase from './purchaseHistory'
import BillingHistory from './billingHistory'
import Settings from './dashboardSettings'
import Products from './products'
import CompanyDashboardChart from './companyDashboardChart'
import { interactivePages } from '../utilities/constants'
import resize from '../../img/resize.png'

const Dashboard = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive)

  const widgets = [
    {
      id: 0,
      component: '',
      label: '',
      static: true,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 0,
      y: 0,
      w: 10,
      h: 0,
      isResizable: false
    },
    {
      id: 1,
      component: <Welcome />,
      label: 'ようこそ！',
      static: true,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 0,
      y: 0,
      w: 2,
      h: 0.25,
      isResizable: false
    },
    {
      id: 2,
      component: <CompanyDashboardChart interActivePages={interactivePages} />,
      label: 'ダッシュボードチャート',
      static: false,
      className: 'relative bg-white',
      state: true,
      x: 0,
      y: 0,
      w: 2,
      h: 4.5,
      minW: 2,
      minH: 2,
      isResizable: true
    },

    {
      id: 4,
      component: <ServiceUsage interActivePages={interactivePages} />,
      label: '連携サービス',
      static: false,
      className: 'relative',
      state: true,
      x: 2,
      y: 0,
      w: 3,
      h: 1,
      minW: 2,
      minH: 1,
      isResizable: true
    },
    {
      id: 5,
      component: <Products interActivePages={interactivePages} />,
      label: 'サービス利用状況',
      static: false,
      className: 'relative',
      state: true,
      x: 5,
      y: 0,
      w: 3,
      h: 2,
      minW: 2,
      minH: 2,
      isResizable: true
    },
    {
      id: 6,
      component: <BillingHistory interActivePages={interactivePages} />,
      label: '請求履歴',
      static: false,
      className: 'relative',
      state: true,
      x: 2,
      y: 2,
      w: 3,
      h: 3.75,
      minW: 2,
      minH: 1,
      isResizable: true
    },
    {
      id: 7,
      component: <Notification interActivePages={interactivePages} />,
      label: 'お知らせ',
      static: false,
      className: 'relative',
      state: true,
      x: 8,
      y: 2,
      w: 2,
      h: 3.75,
      minW: 1,
      minH: 1,
      isResizable: true
    },
    {
      id: 8,
      component: <Settings interActivePages={interactivePages} />,
      label: '設定',
      static: false,
      className: 'relative',
      state: true,
      x: 8,
      y: 0,
      w: 2,
      h: 1,
      minW: 2,
      minH: 1,
      isResizable: true
    },
    {
      id: 9,
      component: <Purchase interActivePages={interactivePages} />,
      label: '購入履歴',
      static: false,
      className: 'relative',
      state: true,
      x: 5,
      y: 2,
      w: 3,
      h: 2.75,
      minW: 2,
      minH: 1,
      isResizable: true
    }
  ]

  if (localStorage.getItem('widget') !== null) {
    //uncomment this if there is a need to reset widget's state in the local storage
    //localStorage.removeItem('widget')
    Storage.prototype.getObj = function (key) {
      return JSON.parse(this.getItem(key))
    }
    var newWidgets = localStorage.getObj('widget')
  } else {
    Storage.prototype.setObj = function (key, obj) {
      return this.setItem(key, JSON.stringify(obj))
    }
    let tempWidgets = []
    widgets.forEach((item, index) => {
      tempWidgets[index] = { label: item.label, state: item.state }
    })
    localStorage.setObj('widget', tempWidgets)
  }

  if (newWidgets !== null) {
    for (let i = 0; i < widgets.length; i++) {
      widgets[i].state = newWidgets[i].state
    }
  }

  const [widgetState] = useState(widgets)

  return (
    <div className="px-10">
      <ResponsiveGridLayout
        className="dashboardGrid"
        layouts={{ lg: widgets, md: widgets }}
        breakpoints={{ lg: 1200, md: 768, sm: 640, xs: 480 }}
        cols={{ lg: 10, md: 10, sm: 5, xs: 1 }}
        draggableCancel=".staticWidgets"
        margin={[35, 30]}
        containerPadding={[10, 20]}
        isBounded={true}
        useCSSTransforms={true}
      >
        {widgetState
          .filter((widget) => widget.state !== false)
          .map((item, index) => {
            return (
              <div
                className={item.className}
                key={index}
                data-grid={{
                  x: item.x,
                  y: item.y,
                  w: item.w,
                  h: item.h,
                  static: item.static,
                  isResizable: item.isResizable,
                  minW: item.minW,
                  minH: item.minH
                }}
              >
                {item.component}{' '}
                {item.isResizable ? (
                  <img
                    src={resize}
                    className="absolute bottom-1 right-1 z-10 h-4 w-4"
                  />
                ) : null}
              </div>
            )
          })}
      </ResponsiveGridLayout>
    </div>
  )
}

export default Dashboard

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'))
}
