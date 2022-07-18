import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import IBPTechIcon from '../../img/idp_logo.png'
import KotLogo from '../../img/KOT-menu-logo.png'
import KotIcon from '../../img/admin/king-of-time-logo.png'
import {
  AccountIcon,
  QuestionIcon,
  GearIcon,
  BellIcon,
  LogoutIcon,
  BurgerIcon
} from '../../icons'

const domElementPresent = (element) => {
  return !!document.getElementById(element)
}

const Navigation = () => {
  const refMenu = useRef()
  const navMenu = document.querySelector('#menu')
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    company: ''
  })
  const userType = location.pathname.split('/')[1]
  const [showDropdown, setShowDropdown] = useState(false)
  const [unpaidBillingInfo, setUnpaidBillingInfo] = useState(null)
  const [active, setActive] = useState(location.pathname.split('/')[2])

  const navigation = {
    admin: {
      logo: KotLogo,
      action: [
        {
          id: 'setting-widget',
          label: 'ウィジェット設定',
          url: '/admin/settings',
          icon: null,
          function: null
        },
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
          id: 'admin-dashboard',
          label: 'ダッシュボード',
          url: '/admin/dashboard',
          icon: null,
          function: null
        },
        {
          id: 'admin-account',
          label: 'アカウント',
          url: '/admin/accounts',
          icon: null,
          function: null
        },
        {
          id: 'admin-shop',
          label: 'ショップ',
          url: '/admin/shop/jqadm/search/product?locale=ja',
          icon: null,
          function: null
        },
        {
          id: 'settings',
          label: null,
          url: '#',
          icon: <GearIcon className="w-5 h-5 inline" />,
          function: null
        }
      ]
    },
    company: {
      logo: KotLogo,
      action: [
        {
          id: 'company-profile',
          label: '企業プロフィール',
          url: '/company/companyProfile',
          icon: null,
          function: null
        },
        {
          id: 'sso-zendesk',
          label: 'お問合せ',
          url: '#',
          icon: null,
          function: (e) => {
            e.preventDefault()
            window.open('/sso/zendesk', '_blank')
          }
        },
        {
          id: 'setting-widget',
          label: 'ウィジェット設定',
          url: '/company/setting/widget',
          icon: null,
          function: null
        },
        {
          id: 'logout',
          label: 'ログアウト',
          url: '/logout',
          icon: <LogoutIcon className="w-4 h-4 ml-8" />,
          function: resetCoordinates
        }
      ],
      menu: [
        {
          id: 'dashboard',
          label: 'ダッシュボード',
          url: '/company/dashboard',
          icon: null,
          function: null
        },
        {
          id: 'contract',
          label: '契約',
          url: '/company/contracts',
          icon: null,
          function: null
        },
        {
          id: 'billing',
          label: '請求',
          url: '/company/billing',
          icon: null,
          function: null
        },
        {
          id: 'account-list',
          label: 'アカウント',
          url: '/company/accountslist',
          icon: null,
          function: null
        },
        {
          id: 'shop',
          label: 'ショップ',
          url: '/company/shop',
          icon: null,
          function: null
        },
        {
          id: 'settings',
          label: null,
          url: '#',
          icon: <GearIcon className="w-5 h-5 inline" />,
          function: null
        }
      ]
    },
    sales: {
      logo: IBPTechIcon,
      action: [
        {
          id: 'action-1',
          label: 'アカウント プロファイル',
          url: '#',
          icon: null,
          function: null
        },
        {
          id: 'action-2',
          label: 'お問合せ',
          url: '#',
          icon: null,
          function: null
        },
        {
          id: 'action-3',
          label: 'アカウント設定',
          url: '#',
          icon: null,
          function: null
        },
        {
          id: 'setting-widget',
          label: 'ウィジェット設定',
          url: '#',
          icon: null,
          function: null
        },
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
          id: 'dashboard',
          label: 'ダッシュボード',
          url: '/sales/dashboard',
          icon: null,
          function: null
        },
        {
          id: 'company',
          label: '契約',
          url: '/sales/companies',
          icon: null,
          function: null
        },
        {
          id: 'billing',
          label: '請求',
          url: '/sales/billing',
          icon: null,
          function: null
        },
        {
          id: 'settings',
          label: null,
          url: '#',
          icon: <GearIcon className="w-5 h-5 inline" />,
          function: null
        }
      ]
    },
    employee: {
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
      menu: []
    },
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
          url: '/logistics/product-list',
          icon: null,
          function: null
        },
        {
          id: 'order-list',
          label: '注文',
          url: '/logistics/order-list',
          icon: null,
          function: null
        },
        {
          id: 'email-template',
          label: 'メールテンプレート',
          url: '/logistics/email-template',
          icon: null,
          function: null
        }
      ]
    }
  }

  const renderNavMenu = () => {
    const content = []
    const menu = navigation[userType].menu

    menu.map((nav, i) => {
      content.push(
        <li
          key={i}
          className={`sm:ml-0 md:ml-20 md:my-auto hover:text-tertiary-400 min-h-3.5 ${
            active === nav.id ? 'text-tertiary-400' : 'text-body-400'
          }`}
          onClick={() => setActive(nav.id)}
        >
          <a className="block xs:text-right" href={nav.url}>
            {nav.label ? nav.label : nav.icon}
            {nav.url === '/company/billing' &&
              unpaidBillingInfo &&
              unpaidBillingInfo.is_bank_transfer === true &&
              unpaidBillingInfo.total_billed_amount != null && (
                <BellIcon
                  fill="#EF4444"
                  className="h-5 w-5 inline relative bottom-2 -left-1 opacity-80"
                />
              )}
          </a>
        </li>
      )
    })

    return <ul className="sm:flex-row md:flex">{content}</ul>
  }

  const renderActionMenu = (action) => {
    const content = []

    action.map((nav, i) => {
      content.push(
        <li key={i} className="rounded-md hover:bg-whiteTint-600 my-2">
          <a
            href={nav.url}
            onClick={nav.function}
            className={`${
              !nav.icon ? 'ml-8' : ''
            } flex items-center py-2 space-x-4 tracking-tighter`}
          >
            {nav.icon} <span className="text-tertiary-500">{nav.label}</span>
          </a>
        </li>
      )
    })

    return <ul>{content}</ul>
  }

  const resetCoordinates = () => {
    localStorage.removeItem('widgetCoordinates')
    localStorage.removeItem('pendingWidgetCoordinates')
  }

  useEffect(() => {
    axios
      .get(location.origin + '/company/getUnpaidBillingInformation')
      .then((results) => {
        setUnpaidBillingInfo(results.data.data)
      })

    axios.get(location.origin + '/getLoggedinUser').then((response) => {
      if (response.status === 200) {
        setInfo((prevState) => {
          return {
            ...prevState,
            firstName: response.data['contactFirstName'],
            lastName: response.data['contactLastName'],
            company: response.data['companyName']
          }
        })
      }
    })
  }, [])

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
    <div className="border-b border-hex-D5DBE0">
      <div className="flex justify-between px-11 py-1 bg-header min-h-10">
        <div>
          <div className="mx-auto">
            <h3 className="text-xs text-body-600">
              {`様 ${info.firstName} ${info.lastName}`}
            </h3>
            <h3 className="text-xs text-body-600">{`${info.company} （閲覧用）`}</h3>
          </div>
        </div>
        <div className="h-26px my-auto" ref={refMenu}>
          <p className="inline text-xs text-tertiary-500 w-20 py-1 px-2 mr-8 rounded-3xl hover:bg-gray-100">
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
            <AccountIcon fill="#1E9E47" />
          </button>
          {showDropdown && (
            <div
              id="nav-dropdown-content"
              className="border border-gray-100 bg-gradient-to-b from-white to-whiteTint-900 via-whiteTint-800 px-2 z-20 w-64 absolute top-8 right-4 cursor-pointer rounded-md shadow-lg"
            >
              {(() => {
                switch (userType) {
                  case 'company':
                    return renderActionMenu(navigation.company.action)
                  case 'admin':
                    return renderActionMenu(navigation.admin.action)
                  case 'sales':
                    return renderActionMenu(navigation.sales.menu)
                  case 'logistics':
                    return renderActionMenu(navigation.logistics.action)
                  case 'employee':
                    return renderActionMenu(navigation.employee.action)
                  default:
                    return renderActionMenu([])
                }
              })()}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-4 bg-white px-11 min-h-14 min-h-14">
        <div className="col-span-1 flex flex-col justify-center xs:my-2">
          <img
            alt="Kot Logo - SM"
            className="sm:block xs:hidden h-auto w-min"
            src={navigation.logistics.logo}
          />
          <img
            alt="Kot Logo - XS"
            className="sm:hidden xs:block h-auto w-9"
            src={KotIcon}
          />
        </div>
        <div className="col-span-3 flex md:hidden justify-end">
          <button
            type="button"
            onClick={() => {
              if (navMenu.classList.contains('hidden')) {
                navMenu.classList.remove('hidden')
              } else {
                navMenu.classList.add('hidden')
              }
            }}
          >
            <BurgerIcon className="h-6 w-6" />
          </button>
        </div>
        <div
          id="menu"
          className="xs:col-span-4 md:col-span-3 hidden md:flex justify-end"
        >
          {renderNavMenu()}
        </div>
      </div>
    </div>
  )
}

export default Navigation

if (domElementPresent('navigation')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation'))
}
