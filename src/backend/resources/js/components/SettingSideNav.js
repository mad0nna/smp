import React from 'react'
const SettingSideNav = () => {
  let mainNav = []
  const adminNavigation = [
    {
      label: 'Invoice Template List',
      link: '/admin/settings'
    },
    {
      label: 'Invoice Template Details',
      link: '/admin/settings/invoice/detail'
    }
    // {
    //   label: 'Widget',
    //   link: '#'
    // },
    // {
    //   label: 'Account',
    //   link: '#'
    // }
  ]
  const companyNavigation = [
    {
      label: 'ウィジェット',
      link: '/company/setting/widget'
    },
    {
      label: 'お支払い方法',
      link: '/company/setting/payment/method'
    },
    {
      label: 'パスワード',
      link: '/company/setting/password'
    },
    {
      label: 'メールアドレス',
      link: '/company/setting/email'
    }
  ]
  let aPathName = location.pathname.split('/')
  if (typeof aPathName[1] != 'undefined') {
    switch (aPathName[1]) {
      case 'company':
        mainNav = companyNavigation
        break
      case 'admin':
        mainNav = adminNavigation
        break
      default:
        mainNav = companyNavigation
        break
    }
  }
  return (
    <div className="col-span-1 py-8 px-4 space-x-2">
      <h1 className="pl-8 text-lg font-black">設定</h1>
      <div className="space-y-2">
        {mainNav.map((nav, index) => {
          let active = nav.link == location.pathname
          let activeStyle = 'bg-green-500 text-white'
          return (
            <div
              id="settings-navigation-item"
              className="group cursor-pointer"
              key={index}
            >
              <a href={nav.link}>
                <div
                  className={
                    (active ? activeStyle : '') +
                    ' pl-8 py-4 group-hover:bg-green-500 group-hover:text-white'
                  }
                >
                  {nav.label}
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default SettingSideNav
