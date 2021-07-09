import React, { useEffect, useState } from 'react'
import Ellipsis from '../../img/ellipsis.png'
import spinner from '../../img/spinner.gif'

const Notification = (props) => {
  let iconTypes = {
    invoice: 'bg-notification-invoice',
    contract: 'bg-notification-active',
    zendesk: 'bg-notification-normal'
  }
  let notifWithLink = ['請求', 'お知らせ']
  const [state, setState] = useState({
    loading: true,
    GeneralNotifs: [],
    notificationItems: [
      {
        header: '請求',
        type: 'invoice',
        message: '5月度の請求書があります。',
        link: '#',
        newTab: false,
        status: '未読'
      },
      {
        header: '契約リマインダー ',
        type: 'contract',
        icon: '',
        message: 'KOT - セキュアログインが30日後に失効します*',
        link: '#',
        newTab: false,
        status: '未読'
      },
      {
        header: 'お知らせ',
        type: 'zendesk',
        message: 'H&T 新規サービス',
        link: '#',
        newTab: false,
        status: '既読'
      }
    ]
  })

  useEffect(() => {
    fetch('/company/getNotification', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        let zendeskNotifs = data.zendesk
        let notifs = []
        for (let i = 0; i < zendeskNotifs.length; i++) {
          if (i > 9) {
            continue
          }
          notifs.push({
            header: 'お知らせ',
            type: 'zendesk',
            message: zendeskNotifs[i].title,
            link: zendeskNotifs[i].html_url,
            newTab: true,
            status: zendeskNotifs[i].seen ? '既読' : '未読',
            id: zendeskNotifs[i].id
          })
        }
        setState({ loading: false, notificationItems: notifs })
      })
  }, [])

  const seenNotif = (stateIndex, id, type, link, newTab = true) => {
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
    if (newTab) {
      window.open(link, '_blank')
      window.focus()
    }
  }

  let py = ''
  props.displayType !== 'undefined' && props.displayType === 'small'
    ? (py = 'xl:py-3 lg:py-1 h-18 pl-3 ')
    : 'py-3 h-20 p-3 px-3'
  return (
    <div className="w-full h-full relative group ">
      <div className="dashboard-widget-list w-full h-full relative bg-white rounded-lg border-2 border-gray-200 ">
        <div
          id="widget-header"
          className="max-w-full h-12 bg-white box-border align-middle p-3 relative"
        >
          <div
            id="widget-icon"
            className="bg-notification-icon w-6 h-6 bg-cover bg-no-repeat float-left"
          />
          <div
            id="widget-name"
            className="text-primary-200 font-sans font-bold ml-8"
          >
            お知らせ
          </div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div
          id="widget-body"
          className={
            ' w-full py-1 space-y-1 ' + (state.loading === true)
              ? ''
              : 'bg-mainbg'
          }
        >
          {state.loading === true ? (
            <div className="w-full relative mt-24">
              <div className="mx-auto absolute bottom-1 w-full text-center">
                Loading notifications
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            state.notificationItems.map((item, index) => {
              let fontColor =
                item.status !== '既読' ? 'text-gray-900' : 'text-gray-500'
              return (
                <div
                  id="widget-content-item"
                  className={
                    py +
                    ' bg-white w-full box-border align-middle px-3 relative my-1'
                  }
                  key={index}
                >
                  <div
                    id="item-icon"
                    className={
                      iconTypes[item.type] +
                      ' bg-cover bg-no-repeat w-5 h-5 mt-1 float-left'
                    }
                  />
                  <p
                    id="item-content"
                    className={
                      fontColor +
                      '  font-sans text-xs tracking-tighter ml-7 w-4/5  '
                    }
                  >
                    {item.header} <br />
                    {item.message} <br />
                    <a
                      onClick={(e) => {
                        e.preventDefault()
                        item.type === 'zendesk'
                          ? seenNotif(
                              index,
                              item.id,
                              'zendesk',
                              item.link,
                              item.newTab
                            )
                          : ''
                      }}
                      rel="noreferrer"
                      className="cursor-pointer"
                    >
                      <span
                        className="text-primary-200"
                        dataid={item.id}
                        datatype={item.type}
                      >
                        {notifWithLink.includes(item.header)
                          ? ' こちらをクリックして確認してください'
                          : ''}
                      </span>
                    </a>
                  </p>
                  <p
                    id="item-status"
                    className="absolute right-3 float-right font-sans text-primary-200 text-sm tracking-tighter text-center bottom-3 lg:absolute lg:bottom-0"
                  >
                    {item.status}
                  </p>
                </div>
              )
            })
          )}
        </div>
        <div id="widget-footer" className="w-full h-10 bg-white pt-3 pr-3">
          {state.loading === true ? (
            ''
          ) : (
            <div id="widget-footer-control" className="float-right">
              <a href="./notifications">
                <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter pointer-events-none">
                  さらに表示
                </button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Notification
