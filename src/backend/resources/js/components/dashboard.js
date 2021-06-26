import React, { useEffect, useState } from 'react'
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
import resize from '../../img/resize.png'
import { findMissingWidget } from '../utilities/constants'
import spinner from '../../img/spinner.gif'

const Dashboard = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive)
  const [isGettingCoordinates, setStatus] = useState(false)
  useEffect(() => {
    setStatus(true)
    // DO NOT CHANGE THE ARRANGEMENT OF THESE COMPONENT LIST
    const companyCoreWidgets = [
      { component: '' },
      { component: <Welcome /> },
      { component: <CompanyDashboardChart /> },
      { component: <ServiceUsage /> },
      { component: <Products /> },
      { component: <BillingHistory /> },
      { component: <Notification /> },
      { component: <Settings /> },
      { component: <Purchase /> }
    ]
    getCoordinates()
    function getCoordinates() {
      let coordinatesFromLS = localStorage.getObj('pendingWidgetCoordinates')
      if (coordinatesFromLS === null || coordinatesFromLS === undefined) {
        coordinatesFromLS = localStorage.getObj('widgetCoordinates')
      }
      if (coordinatesFromLS !== null) {
        for (let index = 0; index < coordinatesFromLS.length; index++) {
          coordinatesFromLS[index].component =
            companyCoreWidgets[index].component
        }
        setWidgetCoordinates(coordinatesFromLS)
        setStatus(false)
        return
      }
      fetch('/company/getCoordinates', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setObj('widgetCoordinates', data.coordinates)
          for (let index = 0; index < data.coordinates.length; index++) {
            data.coordinates[index].component =
              companyCoreWidgets[index].component
          }
          setWidgetCoordinates(data.coordinates)
          setStatus(false)
        })
    }
  }, [widgetState])

  //uncomment this if there is a need to reset widget's state in the local storage
  //localStorage.removeItem('widget')
  Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
  }

  Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }

  const savePendingCoordinatesInLS = (pendingCoordinates) => {
    let fromLS = localStorage.getObj('widgetCoordinates')
    for (let index = 0; index < pendingCoordinates.length; index++) {
      pendingCoordinates[index].state = fromLS[index].state
      pendingCoordinates[index].label = fromLS[index].label
    }
    localStorage.setObj('pendingWidgetCoordinates', pendingCoordinates)
  }

  function clearPendingCoordinatesInLS() {
    localStorage.removeItem('pendingWidgetCoordinates')
  }

  const [widgetState, setWidgetCoordinates] = useState([])
  const compareCoordinates = (cdnt1, cdnt2) => {
    let widgetList = localStorage.getObj('widgetCoordinates')
    if (cdnt2.length < widgetList.length) {
      for (let index = 0; index < widgetList.length; index++) {
        if (cdnt2[index] !== undefined) {
          continue
        }
        let indexMissing = findMissingWidget(
          widgetList,
          'label',
          widgetList[index]['label']
        )
        cdnt2[index] = widgetList[indexMissing]
      }
    }

    let noDifference = true
    for (let i = 0; i < cdnt2.length; i++) {
      if (noDifference === false) {
        continue
      }
      if (cdnt2[i] === undefined) {
        continue
      }
      let coor1 = JSON.stringify({
        h: cdnt1[i].h,
        w: cdnt1[i].w,
        x: cdnt1[i].x,
        y: cdnt1[i].y
      })
      let coor2 = JSON.stringify({
        h: cdnt2[i].h,
        w: cdnt2[i].w,
        x: cdnt2[i].x,
        y: cdnt2[i].y
      })
      noDifference = coor1 === coor2
    }
    return noDifference
  }

  return (
    <div className="px-10">
      {isGettingCoordinates ? (
        <div className="w-full h-96 relative mt-12">
          <div className="mx-auto absolute bottom-1 w-full text-center">
            ウィジェット設定をデータベースから読み込みました。
            <img className="mx-auto h-12 mt-5" src={spinner}></img>
          </div>
        </div>
      ) : (
        <ResponsiveGridLayout
          onLayoutChange={(layout) => {
            !compareCoordinates(widgetState, layout)
              ? savePendingCoordinatesInLS(layout)
              : clearPendingCoordinatesInLS()
          }}
          className="dashboardGrid"
          layouts={{
            lg: widgetState,
            md: widgetState
          }}
          breakpoints={{ lg: 1200, md: 768, sm: 640, xs: 480 }}
          cols={{ lg: 10, md: 10, sm: 10, xs: 10 }}
          draggableCancel=".staticWidgets"
          margin={[25, 30]}
          rowHeight={30}
          compactType={'horizontal'}
          containerPadding={[10, 20]}
          isBounded={true}
          useCSSTransforms={true}
        >
          {widgetState
            .filter((widget) => widget.state !== false)
            .map((item, index) => {
              return (
                <div
                  id={item.id}
                  data-id={index}
                  className={
                    item.className +
                    ' widgetComponent group ' +
                    (!item.isResizable || item.static
                      ? 'react-resizable-hide'
                      : '')
                  }
                  key={index}
                  data-grid={{
                    x: item.x,
                    y: item.y,
                    w: item.w,
                    h: item.h,
                    static: item.static,
                    isResizable: item.static ? false : item.isResizable,
                    minW: item.minW,
                    minH: item.minH
                  }}
                >
                  {item.component}{' '}
                  {item.isResizable && !item.static ? (
                    <img
                      src={resize}
                      className="absolute bottom-1 right-1 z-10 h-4 w-4"
                    />
                  ) : null}
                  {!item.static ? (
                    <div
                      className={
                        'absolute test w-12 h-4 -top-3.5 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-tl-md rounded-tr-md border-gray-200 border-2 cursor-move hidden group-hover:block'
                      }
                    >
                      Move
                    </div>
                  ) : null}
                </div>
              )
            })}
        </ResponsiveGridLayout>
      )}
    </div>
  )
}

Dashboard.displayName = 'Company Dashboard'
export default Dashboard

if (document.getElementById('dashboard')) {
  ReactDOM.render(<Dashboard />, document.getElementById('dashboard'))
}
