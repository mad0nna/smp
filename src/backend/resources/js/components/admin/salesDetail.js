import React from 'react'
import ReactDom from 'react-dom'
import BreadCrumb from '../../../img/breadcrumb-icon.png'
import ProfileIcon from '../../../img/support-profile-icon.png'
import PersonIcon from '../../../img/contact-person-gray.png'
import EmailIcon from '../../../img/mail-gray.png'
import TelephoneIcon from '../../../img/telephone-gray.png'
const SalesDetail = () => {
  return (
    <div className="relative px-10 pt-10 pb-5 bg-mainbg font-sans">
      <div id="breadcrumb" className="w-full relative table-cell align-middle w-60 space-x-4">
        <p className="inline font-sm font-bold text-gray-400">アカウント一覧</p>
        <img src={BreadCrumb} className="inline"/>
        <p className="inline font-sm font-bold text-gray-400">顧客企業一覧</p>
      </div>
      <div id="contact-persons" className="w-full relative rounded-lg border-2 border-gray-200 h-48 mt-8 bg-white">
        <div id="contact-person-item" className="w-1/2 h-full inline-block px-4 py-2 border-r-2 border-gray-200">
          <div id="contact-logo-container" className="h-10 flex mb-2 pl-20">
            <img src={ProfileIcon} alt="" className="h-8 w-8 pt-1"/>
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
                管理部
            </p>
          </div>
          <div id="contact-content" className="h-auto w-full">
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={PersonIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">管厓者名</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">大谷运ュ</p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={EmailIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">メ一ルアドレス</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">contactadmin@sprobe.com</p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={TelephoneIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">電話番号</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">0912345678</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact-person-item" className="w-1/2 h-full inline-block px-4 py-2">
          <div id="contact-logo-container" className="h-10 flex mb-2 pl-20">
            <img src={ProfileIcon} alt="" className="h-8 w-8 pt-1"/>
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2">
                人事部
            </p>
          </div>
          <div id="contact-content" className="h-auto w-full">
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={PersonIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">連絡担当者名</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">鈴木一郎</p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={EmailIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">メ一ルアドレス</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">contactadmin@sprobe.com</p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div id="content-col-header" className="h-8 w-1/2 inline-block pl-20">
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={TelephoneIcon} alt=""/>
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">電話番号</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">+639088962533</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        // 顧客企業プロフィール
      }
      <div id=""></div>
    </div>
  )
}

if (document.getElementById('admin-sales-account-detail')) {
  ReactDom.render(
    <SalesDetail/>,
    document.getElementById('admin-sales-account-detail')
  )
}
