import React from 'react'
import ReactDOM from 'react-dom'
import KotLogo from '../../img/KOT-menu-logo.png'
import ArrowDownIcon from '../../img/arrowdown.png'
import logout from '../../img/signout.png'
import AdminIcon from '../../img/admin-icon.png'
import idpIcon from '../../img/idp_logo.png'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navShow: false,
    }
    this.companyNavigation = {
      logo: KotLogo,
      navItem: [
        {label: 'ダッシュボード', url: '/company/dashboard', iconNormal: 'bg-dashboard-icon', iconHover: 'group-hover:bg-dashboard-icon-hover', iconActive: 'bg-dashboard-icon-hover', iconSize: 'h-8 w-9', isActive: false, extraStyle: ''},
        {label: '契約', url: '/company/contracts', iconNormal: 'bg-contract-icon', iconHover: 'group-hover:bg-contract-icon-hover', iconActive: 'bg-contract-icon-hover', iconSize: 'h-7 w-9', isActive: false, extraStyle: ''},
        {label: '請求', url: '/company/billing', iconNormal: 'bg-billing-icon', iconHover: 'group-hover:bg-billing-icon-hover', iconActive: 'bg-billing-icon-hover', iconSize: 'h-8 w-8', isActive: false, extraStyle: ''},
      ],
      dropDownNav:
            {
              title: '株式会社町田',
              logo: '',
              items: [
                {label: 'アカウント プロファイル', url: '/company/companyProfile', iconNormal: 'bg-profile-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                {label: 'お問合せ', url: '#', iconNormal: 'bg-call-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                {label: 'アカウント設定', url: '#', iconNormal: 'bg-settings-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                {label: 'アカウント切り替え', url: '#', iconNormal: 'bg-switch-account-icon-white', iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''},
                {label: 'ログアウト', url: '/', iconNormal: 'bg-signout-icon', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''}
              ]
            },
    }

    this.salesNavigation = {
      logo: idpIcon,
      navItem: [
        {label: 'ダッシュボード', url: '/sales/dashboard', iconNormal: 'bg-dashboard-icon', iconHover: 'group-hover:bg-dashboard-icon-hover', iconActive: 'bg-dashboard-icon-hover', iconSize: 'h-8 w-9', isActive: false, extraStyle: ''},
        {label: '契約', url: '/sales/contracts', iconNormal: 'bg-contract-icon', iconHover: 'group-hover:bg-contract-icon-hover', iconActive: 'bg-contract-icon-hover', iconSize: 'h-7 w-9', isActive: false, extraStyle: ''},
        {label: '請求', url: '/sales/billing', iconNormal: 'bg-billing-icon', iconHover: 'group-hover:bg-billing-icon-hover', iconActive: 'bg-billing-icon-hover', iconSize: 'h-8 w-8', isActive: false, extraStyle: ''},
      ],
      dropDownNav:
              {
                title: 'IBPテクノロジー株式会社',
                logo: '',
                items: [
                  {label: 'アカウント プロファイル', url: '#', iconNormal: 'bg-profile-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                  {label: 'お問合せ', url: '#', iconNormal: 'bg-call-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                  {label: 'アカウント設定', url: '#', iconNormal: 'bg-settings-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
                  {label: 'アカウント切り替え', url: '#', iconNormal: 'bg-switch-account-icon-white', iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''},
                  {label: 'ログアウト', url: '/', iconNormal: logout, iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''}
                ]
              },
    }

    this.adminNavigation = {
      logo: KotLogo,
      navItem: [
        {label: 'ダッシュボード', url: '#', iconNormal: 'bg-dashboard-icon', iconHover: 'group-hover:bg-dashboard-icon-hover', iconActive: 'bg-dashboard-icon-hover', iconSize: 'h-8 w-9', isActive: false, extraStyle: ''},
        {label: 'アカウント', url: '/admin/accounts', iconNormal: 'bg-account-list-icon', iconHover: 'group-hover:bg-account-list-icon-hover', iconActive: 'bg-account-list-icon-hover', iconSize: 'h-8 w-9', isActive: false, extraStyle: ''},
        {label: 'ドキュメント', url: '#', iconNormal: 'bg-document-icon', iconHover: 'group-hover:bg-document-icon-hover', iconActive: 'bg-document-icon-hover', iconSize: 'h-8 w-9', isActive: false, extraStyle: ''},
      ],
      dropDownNav: {
        title: '管理者',
        logo: AdminIcon,
        items: [
          {label: 'アカウント プロファイル', url: '#', iconNormal: 'bg-profile-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
          {label: 'お問合せ', url: '#', iconNormal: 'bg-call-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
          {label: 'アカウント設定', url: '#', iconNormal: 'bg-settings-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
          {label: 'アカウント切り替え', url: '#', iconNormal: 'bg-switch-account-icon-white', iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''},
          {label: 'ログアウト', url: '/', iconNormal: logout, iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''}
        ]
      }
    }

    this.mainNav = []
    this.handleDropDown = this.handleDropDown.bind(this)
    this.setActiveNavItem = this.setActiveNavItem.bind(this)
    this.getNavigation = this.getNavigation.bind(this)
    this.getNavigation()
    this.setActiveNavItem()
  }

  componentDidMount() {
  }

  render() {
    return(
      <div className="bg-white px-5 py-5 text-center h-24">
        <div id="logo-container" className="h-full w-48 float-left relative">
          <img className="align-content-center absolute h-auto top-3 ml-3" src={this.mainNav.logo} />
        </div>
        <div className="inline-block -m-5">
          <ul className="flex flex-row space-x-24 h-24">
            {
              this.mainNav.navItem.map((item, index) => {
                let activeTextColor= item.isActive ? 'text-white' : ''
                let activeIcon = item.isActive ? item.iconActive : item.iconNormal
                let activeBackground = item.isActive ? 'bg-primary-200' : ''
                return (
                  <li className={'group text-center py-5 w-36 hover:bg-primary-200 hover:text-white ' + activeBackground + ' ' + activeTextColor} key={index}>
                    <a href={item.url}>
                      <div>
                        <div className={item.iconSize + ' mx-auto bg-cover bg-no-repeat group-hover:bg-no-repeat group-hover:bg-cover ' + activeIcon + ' ' + item.iconHover + ' ' +  + activeBackground}/>
                      </div>
                      <div>
                        <p className="font-sans text-lg font-semibold mt-1">{item.label}</p>
                      </div>
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div id="nav-dropdown" name="nav-dropdown" className="float-right relative w-56 flex h-full space-x-2 cursor-pointer z-20" onClick={this.handleDropDown}>
          <div className="my-auto">
            {(this.mainNav.dropDownNav.logo !== '') ? <img alt="setting icon" src={this.mainNav.dropDownNav.logo} /> : ''}
          </div>
          <p className="my-auto font-sans text-base text-primary-200 font-bold">{this.mainNav.dropDownNav.title}</p>
          <div className="my-auto">
            <img alt="setting icon" src={ArrowDownIcon} />
          </div>
          <div id="nav-dropdown-content" className="bg-greenOld w-64 absolute top-12 right-16 py-6 px-6 cursor-pointer rounded-l-xl rounded-b-xl shadow-md hidden">
            {
              this.mainNav.dropDownNav.items.map((item, index)=>{
                return(
                  <a href={item.url} key={index}>
                    <div className="flex items-center py-2 space-x-4">
                      <div className={item.iconNormal + ' ' + item.iconSize + ' bg-cover bg-no-repeat'}/>
                      <div className="text-sm text-white tracking-tighter">{item.label}</div>
                    </div>
                  </a>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
  handleDropDown() {
    let dropdown = document.getElementById('nav-dropdown-content')
    if (this.state.navShow) {
      dropdown.classList.replace('block', 'hidden')
      this.setState({
        navShow: false
      })
    } else {
      this.setState({
        navShow: true
      })
      dropdown.classList.replace('hidden', 'block')
    }
  }

  setActiveNavItem() {
    let childPages = ['/admin/account/company', '/admin/account/sales']
    this.mainNav.navItem.map((item) => {
      item.isActive = (item.url === location.pathname || childPages.includes())
    })
  }

  getNavigation() {
    let aPathName = location.pathname.split('/')
    if (typeof aPathName[1] != 'undefined') {
      switch (aPathName[1]) {
      case 'company':
        this.mainNav = this.companyNavigation
        break
      case 'admin':
        this.mainNav = this.adminNavigation
        break
      case 'sales':
        this.mainNav = this.salesNavigation
        break
      case 'employee':
        break
      default:
        this.mainNav = this.companyNavigation
        break
      }
    }
  }
}
export default Navigation


if(document.getElementById('navigation')) {
  ReactDOM.render(
    <Navigation />
    , document.getElementById('navigation'))
}
if(document.getElementById('navigation-admin')) {
  ReactDOM.render(
    <Navigation />
    , document.getElementById('navigation-admin'))
}
if(document.getElementById('navigation-sales')) {
  ReactDOM.render(
    <Navigation />
    , document.getElementById('navigation-sales'))
}
