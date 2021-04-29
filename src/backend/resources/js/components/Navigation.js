import React from 'react'
import ReactDOM from 'react-dom'
import KotLogo from '../../img/KOT-menu-logo.png'
import ArrowDownIcon from '../../img/arrowdown.png'
class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navShow: false
    }
    this.MainNav = [
      {label: 'ダッシュボード', url: '/dashboard', iconNormal: 'bg-dashboard-icon', iconHover: 'group-hover:bg-dashboard-icon-hover', iconSize: 'h-8 w-9', extraStyle: ''},
      {label: '契約', url: '#', iconNormal: 'bg-contract-icon', iconHover: 'group-hover:bg-contract-icon-hover', iconSize: 'h-7 w-9', extraStyle: ''},
      {label: '請求', url: '/company/billing', iconNormal: 'bg-billing-icon', iconHover: 'group-hover:bg-billing-icon-hover', iconSize: 'h-8 w-8', extraStyle: ''},
    ]
    this.dropdownNav = [
      {label: 'アカウント プロファイル', url: '#', iconNormal: 'bg-profile-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
      {label: 'お問合せ', url: '#', iconNormal: 'bg-call-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
      {label: 'アカウント設定', url: '#', iconNormal: 'bg-settings-icon-white', iconHover: '', iconSize: 'h-5 w-5', extraStyle: ''},
      {label: 'アカウント切り替え', url: '#', iconNormal: 'bg-switch-account-icon-white', iconHover: '', iconSize: 'h-4 w-5', extraStyle: ''}
    ]
    this.handleDropDown = this.handleDropDown.bind(this)
  }

  componentDidMount() {
  }

  render() {
    return(
      <div className="bg-white px-5 py-5 text-center h-24">
        <div id="logo-container" className="h-full w-48 float-left relative">
          <img className="align-content-center absolute w-full h-auto top-3" src={KotLogo} />
        </div>
        <div className="inline-block -m-5">
          <ul className="flex flex-row space-x-24 h-24">
            {
              this.MainNav.map((item, index) => {
                return (
                  <li className="group text-center py-5 w-36 hover:bg-primary-200 hover:text-white" key={index}>
                    <a href={item.url}>
                      <div>
                        <div className={item.iconNormal + ' ' + item.iconHover + ' ' + item.iconSize + ' mx-auto bg-cover bg-no-repeat group-hover:bg-no-repeat group-hover:bg-cover'}/>
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
        <div id="nav-dropdown" name="nav-dropdown" className="float-right relative w-52 flex h-full space-x-2 cursor-pointer z-20" onClick={this.handleDropDown}>
          <p className="my-auto font-sans text-lg text-primary-200 font-bold">株式会社町田</p>
          <div className="my-auto">
            <img alt="setting icon" src={ArrowDownIcon} />
          </div>
          <div id="nav-dropdown-content" className="bg-greenOld w-64 absolute top-12 right-16 py-6 px-6 cursor-pointer rounded-l-xl rounded-b-xl shadow-md hidden">
            {
              this.dropdownNav.map((item, index)=>{
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
}
export default Navigation


if(document.getElementById('navigation')) {
  ReactDOM.render(
    <Navigation />
    , document.getElementById('navigation'))
}
