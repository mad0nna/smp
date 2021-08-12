import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { interactivePages } from '../../utilities/constants'
import resize from '../../../img/resize.png'
import AdminKotServiceUsage from './AdminKotServiceUsage'
import AdminFreeeServiceUsage from './AdminFreeeServiceUsage'
import AdminSmartHRServiceUsage from './AdminSmartHRServiceUsage'
import RegisteredCompanyAccount from './RegisteredCompanyAccount'
import RegisteredSalesAccount from './RegisteredSalesAccount'
import AdminServiceUsageChart from './AdminServiceUsageChart'
import MonthlyAccountRegistration from './MonthlyAccountRegistration'

const AdminDashboard = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive)
  let customizableStatus = interactivePages.includes(location.pathname)
  const widgets = [
    {
      component: <AdminKotServiceUsage interActivePages={interactivePages} />,
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 0,
      y: 0,
      w: 4,
      h: 1,
      isResizable: customizableStatus
    },
    {
      component: <AdminFreeeServiceUsage interActivePages={interactivePages} />,
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 4,
      y: 0,
      w: 4,
      h: 1,
      isResizable: customizableStatus
    },
    {
      component: (
        <AdminSmartHRServiceUsage interActivePages={interactivePages} />
      ),
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 8,
      y: 0,
      w: 4,
      h: 1,
      isResizable: customizableStatus
    },
    {
      component: (
        <RegisteredCompanyAccount interActivePages={interactivePages} />
      ),
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 0,
      y: 1,
      w: 4,
      h: 1,
      isResizable: customizableStatus
    },
    {
      component: <RegisteredSalesAccount interActivePages={interactivePages} />,
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 4,
      y: 1,
      w: 4,
      h: 1,
      isResizable: customizableStatus
    },
    {
      component: <AdminServiceUsageChart interActivePages={interactivePages} />,
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 0,
      y: 2,
      w: 8,
      h: 2.5,
      isResizable: customizableStatus
    },
    {
      component: (
        <MonthlyAccountRegistration interActivePages={interactivePages} />
      ),
      label: 'ようこそ！',
      static: !customizableStatus,
      style: 'staticWidgets',
      className: 'relative',
      state: true,
      x: 8,
      y: 1,
      w: 4,
      h: 3.5,
      isResizable: customizableStatus
    }
  ]

  const [widgetState] = useState(widgets)

  return (
    <div className="px-10">
      <ResponsiveGridLayout
        className="dashboardGrid"
        layouts={{ lg: widgets, md: widgets }}
        breakpoints={{ lg: 1200, md: 768, sm: 640, xs: 480 }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 1 }}
        draggableCancel=".staticWidgets"
        margin={[40, 40]}
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

export default AdminDashboard

if (document.getElementById('admin-dashboard')) {
  ReactDOM.render(
    <AdminDashboard />,
    document.getElementById('admin-dashboard')
  )
}
