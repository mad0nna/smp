import React, { useEffect, useState } from 'react'
import Ellipsis from '../../img/ellipsis.png'
import spinner from '../../img/spinner.gif'
import axios from 'axios'
import { NewsPaperIcon, CampaignIcon } from '../../icons'
const Notification = (props) => {
  let iconTypes = {
    payment: <NewsPaperIcon />,
    contract: <CampaignIcon />,
    article: <CampaignIcon />
  }
  let notifWithLink = ['請求', 'お知らせ']
  const [state, setState] = useState({
    loading: true,
    GeneralNotifs: [],
    notificationItems: []
  })

  useEffect(() => {
    axios.get(`/company/getNotification`).then((data) => {
      let notifs = []
      let response = data.data
      for (let i = 0; i < Object.keys(response).length; i++) {
        if (i > 8) {
          continue
        }
        if (response[i].notification_type === 'payment') {
          notifs.push({
            header: 'お知らせ',
            type: response[i].notification_type,
            message:
              response[i].notification_type === 'payment'
                ? response[i].message
                : response[i].title,
            link:
              response[i].notification_type === 'payment'
                ? '/company/setting/payment/method'
                : response[i].html_url,
            newTab: true,
            status: response[i].seen ? '既読' : '未読',
            notif_id: response[i].notif_id
          })
        }
        if (response[i].notification_type === 'article') {
          notifs.push({
            header: 'お知らせ',
            type: response[i].notification_type,
            message: response[i].title,
            link: response[i].html_url,
            newTab: true,
            status: response[i].seen ? '既読' : '未読',
            id: response[i].id
          })
        }
      }
      setState({ loading: false, notificationItems: notifs })
    })
  }, [])

  const seenNotif = (stateIndex, id, type, link) => {
    fetch('/company/seenNotification', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN':
          document.getElementsByTagName('meta')['csrf-token'].content
      },
      body: JSON.stringify({ id: id, type: type })
    })
      .then((response) => response.json())
      .then(() => {
        let notificationItems = state.notificationItems
        notificationItems[stateIndex].status = '既読'
        setState({
          notificationItems: notificationItems
        })
      })
    window.open(link, '_blank')
    window.focus()
  }

  let py = ''
  props.displayType !== 'undefined' && props.displayType === 'small'
    ? (py = 'xl:py-3 lg:py-1 h-18 pl-3 ')
    : 'py-3 h-20 p-3 px-3'
  return (
    <div className="w-full h-full relative group ">
      <div className="dashboard-widget-list w-full h-full relative bg-white rounded-lg shadow-xl pt-3 pb-8 px-3">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="w-full pb-2">
              <h2 className="text-green-800 text-lg font-bold">お知らせ</h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>

        <div
          id="widget-body"
          className={
            'w-full py-1 space-y-1 ' + (state.loading === true)
              ? ''
              : 'bg-primaryBg'
          }
        >
          {state.loading === true ? (
            <div className="w-full relative mt-24 h-24 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center">
                お知らせを読み込み中です
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            state.notificationItems.map((item, index) => {
              let fontColor =
                item.status !== '既読' ? 'text-gray-900' : 'text-gray-400'
              return (
                <div
                  id="widget-content-item"
                  className={
                    py +
                    ' bg-white w-full box-border align-middle px-1 py-4 hover:bg-gray-50 border-b border-gray-100 relative'
                  }
                  key={index}
                >
                  <div
                    id="item-icon"
                    className={' bg-cover bg-no-repeat w-5 h-5 mt-1 float-left'}
                  >
                    {iconTypes[item.type]}
                  </div>
                  <p
                    id="item-content"
                    className={
                      fontColor +
                      '  font-sans text-xs tracking-tighter ml-9 w-4/5 '
                    }
                  >
                    {/* <span className="text-secondary-600">{item.header} </span> */}
                    <span className="text-secondary-600 opacity-100">
                      {item.message}
                    </span>
                    <br />
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        item.type === 'article'
                          ? seenNotif(index, item.id, 'article', item.link)
                          : seenNotif(
                              index,
                              item.notif_id,
                              'payment',
                              item.link
                            )
                      }}
                      rel="noreferrer"
                      className="cursor-pointer"
                    >
                      <span
                        className="text-customGrayColor-customGrayText100 text-xs opacity-100"
                        dataid={item.id}
                        datatype={item.type}
                      >
                        {notifWithLink.includes(item.header)
                          ? ' こちらをクリックして確認してください'
                          : ''}
                      </span>
                    </a>
                  </p>
                  {/* <p
                    id="item-status"
                    className="absolute right-1 float-right font-sans text-gray-400 text-sm tracking-tighter text-center bottom-3 lg:absolute lg:bottom-0"
                  >
                    {item.status}
                  </p> */}
                </div>
              )
            })
          )}
        </div>
        {!state.loading ? (
          <div id="widget-footer" className="w-full h-10 p-3.5">
            <div id="widget-footer-control" className="float-right">
              <a href="/company/shop">
                <button className="dashboard-widget-button">さらに表示</button>
              </a>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default Notification
