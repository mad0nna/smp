import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import spinner from '../../img/spinner.gif'

const NotificationPage = () => {
  // let iconTypes = {
  //   invoice: 'bg-notification-invoice',
  //   contract: 'bg-notification-active',
  //   zendesk: 'bg-notification-normal'
  // }
  // let notifWithLink = ['請求', 'お知らせ']
  const [state, setState] = useState({
    loading: true,
    GeneralNotifs: [],
    notificationItems: []
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
          notifs.push({
            header: 'お知らせ',
            type: 'zendesk',
            message: zendeskNotifs[i].title,
            link: zendeskNotifs[i].html_url,
            newTab: true,
            status: zendeskNotifs[i].seen ? '既読' : '未読',
            id: zendeskNotifs[i].id,
            category_name:
              zendeskNotifs[i].category_name !== undefined
                ? zendeskNotifs[i].category_name
                : ''
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
              Notifications
            </div>
          </div>
          <div
            id="widget-body"
            className="h-50 w-full bg-white overflow-hidden"
          >
            <table className="w-full h-auto text-center">
              <thead className="bg-table-header-Gray-100 text-gray-500 h-3 font-bold text-lg tracking-tight">
                <tr className="h-12 w-12">
                  <td className="">Type</td>
                  <td className="">Title</td>
                  <td className="">Category Name</td>
                </tr>
              </thead>
              <tbody className="transform even:bg-gray-500">
                {state.notificationItems.map((item, index) => {
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
                    >
                      <td className="w-36">{item.header}</td>
                      <td className="w-1/2">{item.message}</td>
                      <td className="w-10">{item.category_name}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {state.loading === true ? (
              <div className="w-full relative mt-24">
                <div className="mx-auto absolute bottom-1 w-full text-center">
                  Loading notifications
                  <img className="mx-auto h-12 mt-5" src={spinner}></img>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {/* <div
        id="pagination"
        className="w-full h-12 p-3 text-center space-x-2 mt-4"
      >
        <div>
          <img
            src="/images/pagination-prev.png?1ac337e7f7bfaacab64ea9a2369b5930"
            className=" inline-block  w-8 h-auto mr-1"
          />
          <div className="inline-block text-primary-200">
            <ul id="page-numbers">
              <li id="1" className="">
                <span className="text-white bg-primary-200 rounded-2xl px-3 py-1">
                  1
                </span>
              </li>
            </ul>
          </div>
          <img
            src="/images/pagination-next.png?831991390ac360b1b03a00cdcd915ec5"
            className=" inline-block  w-8 h-auto ml-1"
          />
        </div>
      </div> */}
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
