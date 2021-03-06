import React, { useEffect, useState, useRef } from 'react'
import ReactDOM from 'react-dom'
import KotLogo from '../../img/KOT-menu-logo.png'
import ArrowDownIcon from '../../img/arrowdown.png'
import AdminIcon from '../../img/admin-icon.png'
import idpIcon from '../../img/idp_logo.png'
import axios from 'axios'

const Navigation = () => {
  const [state, setState] = useState({
    mainNav: {},
    loading: true,
    contactLastName: '',
    contactFirstName: ''
  })

  const refMenu = useRef()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [unpaidBillingInfo, setUnpaidBillingInfo] = useState(null)

  useEffect(() => {
    fetch('/company/getUnpaidBillingInformation', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((results) => {
        setUnpaidBillingInfo(results.data)
      })
  }, [])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isMenuOpen &&
        refMenu.current &&
        !refMenu.current.contains(e.target)
      ) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside)
    }
  }, [isMenuOpen])

  useEffect(() => {
    let companyNavigation = {
      logo: KotLogo,
      navItem: [
        {
          label: 'ダッシュボード',
          url: '/company/dashboard',
          childUrl: ['/company/notifications'],
          iconNormal: 'bg-dashboard-icon',
          iconHover: 'group-hover:bg-dashboard-icon-hover',
          iconActive: 'bg-dashboard-icon-hover',
          iconSize: 'h-8 w-9',
          isActive: false,
          extraStyle: ''
        },
        {
          label: '契約',
          url: '/company/contracts',
          childUrl: [],
          iconNormal: 'bg-contract-icon',
          iconHover: 'group-hover:bg-contract-icon-hover',
          iconActive: 'bg-contract-icon-hover',
          iconSize: 'h-7 w-9',
          isActive: false,
          extraStyle: ''
        },
        {
          label: '請求',
          url: '/company/billing',
          childUrl: [],
          iconNormal: 'bg-billing-icon',
          iconHover: 'group-hover:bg-billing-icon-hover',
          iconActive: 'bg-billing-icon-hover',
          iconSize: 'h-8 w-8',
          isActive: false,
          extraStyle: ''
        },
        {
          label: 'アカウント',
          url: '/company/accountslist',
          childUrl: ['/company/account/profile/'],
          iconNormal: 'bg-account-list-icon',
          iconHover: 'group-hover:bg-account-list-icon-hover',
          iconActive: 'bg-account-list-icon-hover',
          iconSize: 'h-8 w-8',
          isActive: false,
          extraStyle: ''
        }
      ],
      dropDownNav: {
        title: '',
        logo: '',
        items: [
          {
            label: '企業プロフィール',
            url: '/company/companyProfile',
            iconNormal: 'bg-profile-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'お問合せ',
            url: '#',
            iconNormal: 'bg-call-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: 'cursor-pointer',
            function: (e) => {
              e.preventDefault()
              window.open('/sso/zendesk', '_blank')
            }
          },
          {
            label: 'ト設定',
            url: '/company/setting/widget',
            iconNormal: 'bg-settings-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'ログアウト',
            url: '/logout',
            iconNormal: 'bg-signout-icon',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: '',
            function: clearCoordinates
          }
        ]
      }
    }

    const salesNavigation = {
      logo: idpIcon,
      navItem: [
        {
          label: 'ダッシュボード',
          url: '/sales/dashboard',
          childUrl: [],
          iconNormal: 'bg-dashboard-icon',
          iconHover: 'group-hover:bg-dashboard-icon-hover',
          iconActive: 'bg-dashboard-icon-hover',
          iconSize: 'h-8 w-9',
          isActive: false,
          extraStyle: ''
        },
        {
          label: '契約',
          url: '/sales/companies',
          childUrl: [],
          iconNormal: 'bg-contract-icon',
          iconHover: 'group-hover:bg-contract-icon-hover',
          iconActive: 'bg-contract-icon-hover',
          iconSize: 'h-7 w-9',
          isActive: false,
          extraStyle: ''
        },
        {
          label: '請求',
          url: '/sales/billing',
          childUrl: [],
          iconNormal: 'bg-billing-icon',
          iconHover: 'group-hover:bg-billing-icon-hover',
          iconActive: 'bg-billing-icon-hover',
          iconSize: 'h-8 w-8',
          isActive: false,
          extraStyle: ''
        }
      ],
      dropDownNav: {
        title: 'IBPテクノロジー株式会社',
        logo: '',
        items: [
          {
            label: 'アカウント プロファイル',
            url: '#',
            iconNormal: 'bg-profile-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'お問合せ',
            url: '#',
            iconNormal: 'bg-call-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'アカウント設定',
            url: '#',
            iconNormal: 'bg-settings-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'ウィジェット設定',
            url: '#',
            iconNormal: 'bg-widget-settings-icon',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          },
          {
            label: 'ログアウト',
            url: '/logout',
            iconNormal: 'bg-signout-icon',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          }
        ]
      }
    }

    const adminNavigation = {
      logo: KotLogo,
      navItem: [
        {
          label: 'ダッシュボード',
          url: '/admin/dashboard',
          childUrl: [],
          iconNormal: 'bg-dashboard-icon',
          iconHover: 'group-hover:bg-dashboard-icon-hover',
          iconActive: 'bg-dashboard-icon-hover',
          iconSize: 'h-8 w-9',
          isActive: false,
          extraStyle: ''
        },
        {
          label: 'アカウント',
          url: '/admin/accounts',
          childUrl: [
            '/admin/accounts/company/detail',
            '/admin/accounts/sales/detail'
          ],
          iconNormal: 'bg-account-list-icon',
          iconHover: 'group-hover:bg-account-list-icon-hover',
          iconActive: 'bg-account-list-icon-hover',
          iconSize: 'h-8 w-9',
          isActive: false,
          extraStyle: ''
        }
        // {
        //   label: 'ドキュメント',
        //   url: '#',
        //   childUrl: [],
        //   iconNormal: 'bg-document-icon',
        //   iconHover: 'group-hover:bg-document-icon-hover',
        //   iconActive: 'bg-document-icon-hover',
        //   iconSize: 'h-8 w-9',
        //   isActive: false,
        //   extraStyle: 'cursor-default'
        // },
      ],
      dropDownNav: {
        title: '管理者',
        logo: AdminIcon,
        items: [
          {
            label: 'アカウント プロファイル',
            url: '#',
            iconNormal: 'bg-profile-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: 'cursor-default'
          },
          {
            label: 'お問合せ',
            url: '#',
            iconNormal: 'bg-call-icon-white',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: 'cursor-default'
          },
          // {
          //   label: 'ト設定',
          //   url: '/admin/settings',
          //   iconNormal: 'bg-settings-icon-white',
          //   iconHover: '',
          //   iconSize: 'h-5 w-5',
          //   extraStyle: ''
          // },
          // {
          //   label: 'アカウント設定',
          //   url: '#',
          //   iconNormal: 'bg-settings-icon-white',
          //   iconHover: '',
          //   iconSize: 'h-5 w-5',
          //   extraStyle: 'cursor-default'
          // },
          // {
          //   label: 'ウィジェット設定',
          //   url: '#',
          //   iconNormal: 'bg-widget-settings-icon',
          //   iconHover: '',
          //   iconSize: 'h-5 w-5',
          //   extraStyle: 'cursor-default'
          // },
          {
            label: 'ログアウト',
            url: '/logout',
            iconNormal: 'bg-signout-icon',
            iconHover: '',
            iconSize: 'h-5 w-5',
            extraStyle: ''
          }
        ]
      }
    }

    let aPathName = location.pathname.split('/')
    let mainNav = []
    if (typeof aPathName[1] != 'undefined') {
      switch (aPathName[1]) {
        case 'company':
          mainNav = companyNavigation
          break
        case 'admin':
          mainNav = adminNavigation
          break
        case 'sales':
          mainNav = salesNavigation
          break
        case 'employee':
          break
        default:
          mainNav = companyNavigation
          break
      }
    }
    axios.get(location.origin + '/getLoggedinUser').then((response) => {
      if (response.status === 200) {
        setState((prevState) => {
          return {
            ...prevState,
            contactFirstName: response.data['contactFirstName'],
            contactLastName: response.data['contactLastName']
          }
        })
        window.document.getElementById('companyDropwdownTitle').innerHTML =
          response.data['companyName']
      }
    })

    let childPages = ['/admin/account/company', '/admin/account/sales']
    mainNav.navItem.map((item) => {
      item.isActive = item.url === location.pathname || childPages.includes()
    })

    setState((prevState) => {
      return {
        ...prevState,
        loading: false,
        mainNav
      }
    })
  }, [])

  const clearCoordinates = () => {
    localStorage.removeItem('widgetCoordinates')
    localStorage.removeItem('pendingWidgetCoordinates')
  }

  return (
    <div className="bg-white px-8 h-24 shadow-lg mb-8">
      {state.loading ? (
        ''
      ) : (
        <div className="flex flex-row justify-between items-center">
          <div className="w-48">
            <img
              className="align-content-center h-auto"
              src={state.mainNav.logo}
            />
          </div>
          <div className="flex-grow">
            <ul className="flex flex-row justify-center h-24">
              {state.mainNav.navItem.map((item, index) => {
                let activeTextColor = item.isActive
                  ? 'text-white'
                  : 'text-gray-400'
                let activeIcon = item.isActive
                  ? item.iconActive
                  : item.iconNormal
                let activeBackground = item.isActive ? 'bg-green-500' : ''
                if (
                  !item.isActive &&
                  item.childUrl.indexOf(location.pathname) !== -1
                ) {
                  activeIcon = item.iconActive
                  activeTextColor = 'text-white'
                  activeBackground = 'bg-green-500'
                }
                return (
                  <li
                    className={
                      'group text-center py-5 w-36 hover:bg-green-500 hover:text-white' +
                      ' ' +
                      activeBackground +
                      ' ' +
                      activeTextColor
                    }
                    key={index}
                  >
                    <a href={item.url} className={item.extraStyle}>
                      <div>
                        <div
                          className={
                            item.iconSize +
                            ' relative mx-auto bg-cover bg-no-repeat group-hover:bg-no-repeat group-hover:bg-cover ' +
                            activeIcon +
                            ' ' +
                            item.iconHover +
                            ' ' +
                            +activeBackground
                          }
                        >
                          {item.url === '/company/billing' &&
                            unpaidBillingInfo &&
                            unpaidBillingInfo.is_bank_transfer == true &&
                            unpaidBillingInfo.total_billed_amount != null && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 absolute -top-3 -right-2"
                                viewBox="0 0 24 24"
                                fill="#ef4444"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                              </svg>
                            )}
                        </div>
                      </div>
                      <div>
                        <p className="font-sans mt-1">{item.label}</p>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="justify-center">
            <div
              id="nav-dropdown"
              name="nav-dropdown"
              className="float-right relative flex h-full space-x-2 cursor-pointer z-20"
              onClick={() => setIsMenuOpen((oldState) => !oldState)}
              ref={refMenu}
            >
              <div className="my-auto">
                {state.mainNav.dropDownNav.logo !== '' ? (
                  <img
                    alt="setting icon"
                    src={state.mainNav.dropDownNav.logo}
                  />
                ) : (
                  ''
                )}
              </div>
              <p
                className="my-auto font-sans text-base text-primary-200 font-bold"
                id="companyDropwdownTitle"
              >
                {state.mainNav.dropDownNav.title}
              </p>
              <div className="my-auto">
                <img alt="setting icon" src={ArrowDownIcon} />
              </div>
              {isMenuOpen && (
                <div
                  id="nav-dropdown-content"
                  className="bg-greenOld w-64 absolute top-12 right-16 py-6 px-6 cursor-pointer rounded-l-xl rounded-b-xl shadow-md"
                >
                  {state.mainNav.dropDownNav.items.map((item, index) => {
                    return (
                      <a
                        href={item.url}
                        key={index}
                        className={item.extraStyle}
                        onClick={item.function}
                      >
                        <div className="flex items-center py-2 space-x-4">
                          <div
                            className={
                              item.iconNormal +
                              ' ' +
                              item.iconSize +
                              ' bg-cover bg-no-repeat'
                            }
                          />
                          <div className="text-sm text-white tracking-tighter">
                            {item.label}
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="pl-2">
              <span className="mr-1">{state.contactLastName} </span>
              <span className="mr-1">{state.contactFirstName} </span>
              <span className="mr-1">様</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Navigation

if (document.getElementById('navigation')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation'))
}
if (document.getElementById('navigation-admin')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation-admin'))
}
if (document.getElementById('navigation-sales')) {
  ReactDOM.render(<Navigation />, document.getElementById('navigation-sales'))
}
