import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import spinner from '../../img/spinner.gif'

const NotificationPage = () => {
  const [state, setState] = useState({
    loading: true,
    currentPage: 1,
    notificationItems: []
  })
  useEffect(() => {
    fetch('/company/getNotification', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        let zendeskNotifs = data
        let notifs = []
        let maxId = Math.ceil(state.currentPage * 10)
        let minId = maxId - 10
        for (let i = 0; i < zendeskNotifs.length; i++) {
          if (zendeskNotifs[i].notification_type === 'payment') {
            notifs.push({
              header: 'お知らせ',
              type: zendeskNotifs[i].notification_type,
              message:
                zendeskNotifs[i].notification_type === 'payment'
                  ? zendeskNotifs[i].message
                  : zendeskNotifs[i].title,
              link:
                zendeskNotifs[i].notification_type === 'payment'
                  ? './company/methodofpayment/'
                  : zendeskNotifs[i].html_url,
              newTab: true,
              status: zendeskNotifs[i].seen ? '既読' : '未読',
              notif_id: zendeskNotifs[i].notif_id
            })
          }
          if (zendeskNotifs[i].notification_type === 'article') {
            notifs.push({
              header: 'お知らせ',
              type: zendeskNotifs[i].notification_type,
              message: zendeskNotifs[i].title,
              link: zendeskNotifs[i].html_url,
              newTab: true,
              status: zendeskNotifs[i].seen ? '既読' : '未読',
              id: zendeskNotifs[i].id
            })
          }
        }
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            currentPage: prevState.currentPage,
            notificationItems: notifs,
            numberOfPages: Math.ceil(notifs.length / 10),
            maxId: maxId,
            minId: minId
          }
        })
      })
  }, [state.currentPage])
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
        setState((prevState) => {
          return {
            ...prevState,
            notificationItems: notificationItems
          }
        })
      })
    if (newTab) {
      window.open(link, '_blank')
      window.focus()
    }
  }
  let numberOFPages = Math.ceil(state.notificationItems.length / 10)
  let pageNumbers = []
  pageNumbers.push(
    <img
      src="/images/pagination-prev.png?1ac337e7f7bfaacab64ea9a2369b5930"
      className=" inline-block w-8 h-auto mr-1 cursor-pointer"
      onClick={() => {
        if (state.currentPage <= 1) {
          return
        }
        setState((prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage - 1
          }
        })
      }}
    />
  )
  for (let index = 1; index <= numberOFPages; index++) {
    let activeStyle =
      index === state.currentPage
        ? 'text-white bg-primary-200 '
        : 'text-primary-200 '
    pageNumbers.push(
      <li
        key={index}
        className=""
        onClick={() => {
          setState((prevState) => {
            return { ...prevState, currentPage: index }
          })
        }}
      >
        <span className={activeStyle + 'rounded-3xl px-3 py-1'}>{index}</span>
      </li>
    )
  }
  pageNumbers.push(
    <img
      src="/images/pagination-next.png?831991390ac360b1b03a00cdcd915ec5"
      className=" inline-block  w-8 h-auto ml-1 cursor-pointer"
      onClick={() => {
        if (state.currentPage === state.numberOfPages) {
          return
        }
        setState((prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage + 1
          }
        })
      }}
    />
  )
  return (
    <div>
      <div className="relative px-10 py-5 bg-mainbg">
        <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
          <div
            id="widget-header"
            className="max-w-full h-24 bg-white box-border align-middle p-4 relative"
          >
            <div
              id="widget-icon"
              className="bg-notification-icon w-6 h-6 bg-cover bg-no-repeat float-left"
            />
            <div
              id="widget-name"
              className="text-primary-200 text-xl font-sans font-bold ml-4 float-left"
            >
              お知らせ
            </div>
          </div>
          <div
            id="widget-body"
            className="h-50 w-full bg-white overflow-hidden"
          >
            <table className="w-full h-auto text-center">
              <thead className="bg-table-header-Gray-100 text-gray-500 h-3 font-bold text-lg tracking-tight">
                <tr className="h-12 w-12">
                  <td className="w-1/5">種類</td>
                  <td className="w-3/5">タイトル</td>
                  <td className="w-1/5">分類</td>
                </tr>
              </thead>
              <tbody className="transform even:bg-gray-500">
                {state.notificationItems.map((item, index) => {
                  if (index >= state.minId && index <= state.maxId) {
                    let fontColor =
                      item.status !== '既読' ? 'text-gray-900' : 'text-gray-500'
                    return (
                      <tr
                        className={
                          fontColor +
                          ' stripe-table-row h-16 2xl:text-base lg:text-sm cursor-pointer'
                        }
                        key={index}
                        onClick={(e) => {
                          e.preventDefault()
                          seenNotif(
                            index,
                            item.id,
                            item.notification_type,
                            item.link,
                            item.newTab
                          )
                        }}
                      >
                        <td className="w-2">{item.header}</td>
                        <td className="w-8">{item.message}</td>
                        <td className="w-2">{item.type}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
            {state.loading === true ? (
              <div className="w-full relative mt-24">
                <div className="mx-auto absolute bottom-1 w-full text-center">
                  お知らせを読み込み中です
                  <img className="mx-auto h-12 mt-5" src={spinner}></img>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <div
        id="pagination"
        className="w-full h-12 p-3 text-center space-x-2 mt-4"
      >
        <div>
          {/* <img
            src="/images/pagination-prev.png?1ac337e7f7bfaacab64ea9a2369b5930"
            className=" inline-block  w-8 h-auto mr-1"
          /> */}
          <div className="inline-block text-primary-200">
            <ul id="page-numbers">{pageNumbers}</ul>
          </div>
          {/* <img
            src="/images/pagination-next.png?831991390ac360b1b03a00cdcd915ec5"
            className=" inline-block  w-8 h-auto ml-1"
          /> */}
        </div>
      </div>
    </div>
  )
}
export default NotificationPage
if (document.getElementById('company-notifications')) {
  ReactDom.render(
    <NotificationPage />,
    document.getElementById('company-notifications')
  )
}
