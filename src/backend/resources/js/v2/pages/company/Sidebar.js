import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { GearIcon } from '../../../../icons'

const Sidebar = () => {
  const userType = location.pathname.split('/')[1]
  const [active, setActive] = useState(location.pathname.split('/')[3])

  const navigation = {
    admin: {
      heading: {
        icon: null,
        text: null
      },
      menu: [
        {
          id: 'settings',
          icon: null,
          label: 'Invoice Template List',
          url: '/admin/settings'
        },
        {
          id: 'detail',
          icon: null,
          label: 'Invoice Template Details',
          url: '/admin/settings/invoice/detail'
        }
      ]
    },
    company: {
      heading: {
        icon: (
          <GearIcon fill="#007B53" className="w-26px h-26px ml-22px my-auto" />
        ),
        text: '設定'
      },
      menu: [
        {
          id: 'widget',
          icon: null,
          label: 'ウィジェット',
          url: '/company/setting/widget'
        },
        {
          id: 'payment-method',
          icon: null,
          label: 'お支払い方法',
          url: '/company/setting/payment-method'
        },
        {
          id: 'password',
          icon: null,
          label: 'パスワード',
          url: '/company/setting/password'
        }
      ]
    }
  }

  const renderSideNav = () => {
    const content = []
    const menu = navigation[userType].menu

    menu.map((nav, i) => {
      content.push(
        <li
          key={i}
          className={`h-43px w-full flex flex-col justify-center hover:bg-hex-F5F5F5 ${
            active === nav.id
              ? 'bg-hex-F5F5F5 border-r-4 border-hex-007B53'
              : ''
          }`}
          onClick={() => setActive(nav.id)}
        >
          <a href={nav.url} className="block ml-78px text-hex-474747">
            {nav.label}
          </a>
        </li>
      )
    })

    return <ul>{content}</ul>
  }

  return (
    <div className="mt-6 rounded-xl bg-white shadow-5x h-fit xs:mx-4 lg:mt-50px lg:w-322px lg:min-h-402px">
      <h3 className="mt-29px mb-3 flex">
        {navigation[userType].heading.icon}
        <span className="ml-2 font-medium text-23px text-hex-007B53">
          {navigation[userType].heading.text}
        </span>
      </h3>
      {renderSideNav()}
    </div>
  )
}
export default Sidebar

if (document.getElementById('sidebar-company-settings')) {
  ReactDOM.render(
    <Sidebar />,
    document.getElementById('sidebar-company-settings')
  )
}
