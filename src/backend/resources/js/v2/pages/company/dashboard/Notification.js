import React, { useEffect, useState } from 'react'
import Ellipsis from '../../../../../img/ellipsis.png'
import spinner from '../../../../../img/spinner.gif'
import axios from 'axios'
import { NewsPaperIcon, CampaignIcon } from '../../../../../icons'
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
    let isMounted = true
    async function getNotification() {
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
        if (isMounted) {
          setState({ loading: false, notificationItems: notifs })
        }
      })
    }
    getNotification()

    return () => {
      isMounted = false
    }
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
      <div className="dashboard-widget-list w-full h-full relative bg-white rounded-20px pt-3 pb-8 px-3 border border-whiteTint-500">
        <div id="widget-header" className="bg-white relative box-border">
          <div>
            <div className="w-full pb-2">
              <span className="text-hex-065F46 text-28px font-bold opacity-100 tracking-1.4px">
                お知らせ
              </span>
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
                item.status !== '既読'
                  ? 'text-hex-079591 font-medium'
                  : 'text-secondary-500 font-light'
              return (
                <div
                  id="widget-content-item"
                  className={
                    py +
                    ' bg-white w-full align-middle px-2 py-3 border rounded-lg border-hex-17A8A414 relative mb-1 opacity-100'
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
                      '  font-sans text-xs tracking-tighter ml-9 w-4/5 '
                    }
                  >
                    {/* <span className="text-secondary-600">{item.header} </span> */}
                    <span
                      className={
                        fontColor + ' opacity-100 text-base tracking-normal'
                      }
                    >
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
                        className="text-hex-9E9E9E text-14px opacity-100 tracking-normal"
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
          <div id="widget-footer" className="w-full h-10 p-4 mb-7">
            <div id="widget-footer-control" className="float-right">
              <a href="/company/shop">
                <button className="dashboard-widget-button bg-hex-007B53 text-white">
                  さらに表示
                </button>
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
