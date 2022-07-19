import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import spinner from '../../../img/loading-spinner.gif'
import { findMissingWidget } from '../../utilities/constants'
import SettingSideNav from '../SettingSideNav'
const WidgetSettings = () => {
  var minheight = { 'min-height': '700px' }

  Storage.prototype.getObj = function (key) {
    return JSON.parse(this.getItem(key))
  }

  Storage.prototype.setObj = function (key, obj) {
    return this.setItem(key, JSON.stringify(obj))
  }

  let coordinates = localStorage.getObj('pendingWidgetCoordinates')
  if (coordinates === null || coordinates === undefined) {
    coordinates = localStorage.getObj('widgetCoordinates')
  }
  const [widgetState, setWidgetState] = useState(coordinates)
  const [status, setStatus] = useState(false)

  const onChangeHandler = (e, index) => {
    let widgets = [...widgetState]
    widgets[index].state = e.target.checked
    setWidgetState(widgets)
  }

  const toggleWidgetLock = (e, index) => {
    let widgets = [...widgetState]
    widgets[index].static = e.target.checked
    setWidgetState(widgets)
  }

  const onSave = (event) => {
    event.preventDefault()
    setStatus(true)
    let newCoordinates = widgetState
    if (newCoordinates === null || newCoordinates === undefined) {
      newCoordinates = localStorage.getObj('widgetCoordinates')
    }
    let LSwidgetCoordinates = localStorage.getObj('widgetCoordinates')
    for (let index = 0; index < newCoordinates.length; index++) {
      if (newCoordinates[index] !== undefined) {
        continue
      }
      let indexMissing = findMissingWidget(
        LSwidgetCoordinates,
        'label',
        widgetState[index]['label']
      )
      newCoordinates[indexMissing] = widgetState[indexMissing]
    }
    setWidgetState(newCoordinates)
    fetch('/company/saveCoordinates', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          document.getElementsByTagName('meta')['csrf-token'].content
      },
      body: JSON.stringify(widgetState)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          localStorage.removeItem('widgetCoordinates')
          localStorage.removeItem('pendingWidgetCoordinates')
          setStatus(false)
          alert(data.message)
          location.replace('/company/dashboard')
          return
        }
        setStatus(false)
        alert(data.message)
      })
  }

  const resetCoordinates = (e) => {
    e.preventDefault()
    setStatus(true)
    fetch('/company/resetCoordinates', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          document.getElementsByTagName('meta')['csrf-token'].content
      }
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem('widgetCoordinates')
        localStorage.removeItem('pendingWidgetCoordinates')
        setStatus(false)
        alert(data.message)
        location.replace('/company/dashboard')
        return
      })
  }

  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <SettingSideNav />
      <div className="bg-white rounded-lg my-10 w-8/12 mx-auto col-span-5">
        <div className="p-3 pb-6">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">
              ウィジェット設定
            </h2>
          </div>
        </div>

        <div className="px-3">
          <form>
            <table className="table-auto w-full mb-6">
              <thead className="bg-gray-50 border-b border-t border-gray-200">
                <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                  <th className="text-left pl-3">ウィジェット名</th>
                  <th>表示</th>
                  <th>ロック</th>
                </tr>
              </thead>

              <tbody>
                {widgetState.map((widget, index) => {
                  let hidden =
                    widget.label === '' ||
                    widget.label === null ||
                    widget.label === 'ようこそ！'
                      ? 'hidden'
                      : ''
                  return (
                    <tr
                      key={index}
                      className={
                        'table-row text-sm text-gray-400 h-14 hover:bg-gray-50 border-b border-gray-100 text-center ' +
                        hidden
                      }
                    >
                      <td className={'pl-3 text-left' + hidden}>
                        {' '}
                        {widget.label}{' '}
                      </td>
                      <td className={'' + hidden}>
                        {' '}
                        <input
                          type="checkbox"
                          className="w-6 h-6"
                          onChange={(e) => onChangeHandler(e, index)}
                          value={index}
                          defaultChecked={widget.state}
                        />
                      </td>
                      <td className={'' + hidden}>
                        {' '}
                        <input
                          type="checkbox"
                          className="w-6 h-6"
                          onChange={(e) => toggleWidgetLock(e, index)}
                          value={index}
                          defaultChecked={widget.static}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </form>
        </div>

        <div className="flex justify-around pt-4 pb-16">
          <form>
            {status ? (
              <img src={spinner} className="w-20 h-auto inline" />
            ) : (
              <div>
                <button className="std-primary" onClick={onSave}>
                  保存する
                </button>
                <button className="std-cancel" onClick={resetCoordinates}>
                  リセット
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default WidgetSettings
if (document.getElementById('company-settings-widget')) {
  ReactDOM.render(
    <WidgetSettings />,
    document.getElementById('company-settings-widget')
  )
}
