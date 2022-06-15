import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import KotLogo from '../../img/KOT-menu-logo.png'
import KotIcon from '../../img/admin/kot-icon.png'
import { AccountIcon, QuestionIcon, LogoutIcon } from '../../icons'

const domElementPresent = (element) => {
  return !!document.getElementById(element)
}

const Navigation = () => {
  const refMenu = useRef()
  const [active, setActive] = useState('product-list')
  const [showDropdown, setShowDropdown] = useState(false)
  const navigation = {
    admin: {},
    company: {},
    sales: {},
    logistics: {
      logo: KotLogo,
      action: [
        {
          id: 'logout',
          label: 'ログアウト',
          url: '/logout',
          icon: <LogoutIcon className="w-4 h-4 ml-8" />,
          function: null
        }
      ],
      menu: [
        {
          id: 'product-list',
          label: '商品一覧',
          url: null,
          icon: null,
          function: null
        },
        {
          id: 'order-list',
          label: '注文',
          url: null,
          icon: null,
          function: null
        },
        {
          id: 'email-template',
          label: 'メールテンプレート',
          url: null,
          icon: null,
          function: null
        }
      ]
    }
  }

  useEffect(() => {
    const backDrop = (e) => {
      if (
        showDropdown &&
        refMenu.current &&
        !refMenu.current.contains(e.target)
      ) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', backDrop)
    return () => {
      document.removeEventListener('mousedown', backDrop)
    }
  }, [showDropdown])

  return (
    <div className="grid grid-rows-2 grid-cols-4 bg-white shadow-lg px-11 py-1 mb-8">
      <div className="col-span-2">
        <div className="mx-auto">
          <h3 className="text-xs text-body-600">Admin Sprobe 様</h3>
          <h3 className="text-xs text-body-600">htx KING OF TIME（閲覧用）</h3>
        </div>
      </div>
      <div ref={refMenu} className="col-span-2 text-right">
        <p className="inline text-xs text-tertiary-600 w-20 w-20 py-1 px-2 mr-8 rounded-3xl hover:bg-gray-100">
          <QuestionIcon className="w-5 h-5 mr-2 inline text-primaryBg" />
          <span className="text-tertiary-400">ヘルプ</span>
        </p>
        <button
          type="button"
          className="inline w-5 h-5 align-middle"
          onClick={() => {
            setShowDropdown((prevState) => !prevState)
          }}
        >
          <AccountIcon />
        </button>
        {showDropdown && (
          <div
            id="nav-dropdown-content"
            className="border border-gray-100 bg-white px-2 z-20 w-64 absolute top-8 right-4 cursor-pointer rounded-md shadow-lg"
          >
            <ul>
              {navigation.logistics.action.map((action, i) => {
                return (
                  <li key={i} className="rounded-md hover:bg-gray-100 my-2">
                    <a
                      href={action.url}
                      className="flex items-center py-2 space-x-4 text-base text-white tracking-tighter"
                    >
                      {action.icon}{' '}
                      <span className="text-tertiary-500">{action.label}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-2 py-1">
        <img
          alt="Kot Logo - SM"
          className="xs:hidden md:block"
          src={navigation.logistics.logo}
        />
        <img
          alt="Kot Logo - XS"
          className="xs:w-3/4 xs:block md:hidden"
          src={KotIcon}
        />
      </div>
      <div className="col-span-2 py-1 flex justify-end items-center">
        <ul className="sm:flex-row md:flex align-right">
          {navigation.logistics.menu.map((nav, i) => {
            return (
              <li
                key={i}
                className={`sm:ml-0 md:ml-24 hover:text-tertiary-400 ${
                  active === nav.id ? 'text-tertiary-400' : 'text-body-400'
                }`}
                onClick={() => setActive(nav.id)}
              >
                <a className="block flex" href="#">
                  {nav.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Navigation

if (domElementPresent('navigation')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation'))
}

if (domElementPresent('navigation-admin')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation-admin'))
}

if (domElementPresent('navigation-sales')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation-sales'))
}

if (domElementPresent('navigation-logistics')) {
  ReactDOM.render(
    <Navigation />,
    document.getElementById('navigation-logistics')
  )
}
