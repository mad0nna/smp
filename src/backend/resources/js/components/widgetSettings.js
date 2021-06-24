import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import settings from '../../img/settings-icon.png'
import spinner from '../../img/spinner.gif'
import { findMissingWidget } from '../utilities/constants'

const WidgetSettings = () => {
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
    <div className="bg-white rounded-lg border-gray-200 mt-10 w-8/12 mx-auto">
      <div className="flex">
        <img className="p-8" src={settings} />
        <span className="text-primary-200 font-sans font-bold ml-8 py-6 pt-8">
          ウィジェット設定
        </span>
      </div>
      <div className="bg-gray-300 flex content-center justify-around font-bold text-center w-full">
        <span className="">ウィジェット名</span>
        <span>表示</span>
        <span>ロック</span>
      </div>

      <div>
        <form>
          {widgetState.map((widget, index) => {
            let hidden =
              widget.label === '' ||
              widget.label === null ||
              widget.label === 'ようこそ！'
                ? 'hidden'
                : ''
            return (
              <div
                key={index}
                className={
                  'h-10 w-full py-6 text-gray-500 font-sans text-md mb-2 mt-2 pl-2 flex content-center justify-around font-bold text-center ' +
                  hidden
                }
              >
                <span className={'col-span-1 w-6/12 pl-4 mx-auto' + hidden}>
                  {' '}
                  {widget.label}{' '}
                </span>
                <span className={'col-span-1 w-6/12 mx-auto pl-2' + hidden}>
                  {' '}
                  <input
                    type="checkbox"
                    className="bg-primary-200 border-primary-200 w-6 h-6"
                    onChange={(e) => onChangeHandler(e, index)}
                    value={index}
                    defaultChecked={widget.state}
                  />
                </span>
                <span className={'col-span-1 w-6/12 mx-auto' + hidden}>
                  {' '}
                  <input
                    type="checkbox"
                    className="bg-primary-200 border-primary-200 w-6 h-6"
                    onChange={(e) => toggleWidgetLock(e, index)}
                    value={index}
                    defaultChecked={widget.static}
                  />
                </span>
              </div>
            )
          })}
        </form>
      </div>
      <div className="flex justify-around py-16 ">
        <form>
          {status ? (
            <img
              src={spinner}
              className="rounded-xl h-12 px-3 py-3 bg-primary-200 border-gray-300 content-center"
            />
          ) : (
            <div>
              <button
                className="rounded-xl text-white px-3 py-3 bg-primary-200 border-gray-300 content-center "
                onClick={onSave}
              >
                保存する
              </button>
              <button
                className="rounded-xl text-white px-3 py-3 border-primary-200 bg-gray-500 ml-4 "
                onClick={resetCoordinates}
              >
                リセット
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
export default WidgetSettings

if (document.getElementById('widgetSettings')) {
  ReactDOM.render(<WidgetSettings />, document.getElementById('widgetSettings'))
}
