import React, { useState } from 'react'
import ReactDom from 'react-dom'
import BreadCrumb from '../../../img/breadcrumb-icon.png'
import ProfileIcon from '../../../img/support-profile-icon.png'
import PersonIcon from '../../../img/contact-person-gray.png'
import EmailIcon from '../../../img/mail-gray.png'
import TelephoneIcon from '../../../img/telephone-gray.png'
import BusinessIcon from '../../../img/case-gray.png'
import IndustryIcon from '../../../img/case2-gray.png'
import LocationIcon from '../../../img/home-gray.png'
import CompanyIcon from '../../../img/company-icon.png'
import HistoryIcon from '../../../img/history-icon.png'
import PrevButton from '../../../img/pagination-prev.png'
import NextButton from '../../../img/pagination-next.png'
const SalesDetail = () => {
  const [state] = useState({
    companyList: [
      {
        httId: '0000-0001',
        companyName: '今井運送株式会社',
        numOfEmp: '100-150',
        contact: '竜崎すばる',
        email: 'subaru@sample.com',
        telephone: '080-1234-5678'
      },
      {
        httId: '0000-0002',
        companyName: 'Ocean生命株式会社',
        numOfEmp: '200-250',
        contact: '如月蛍',
        email: 'hotaru@sample.com',
        telephone: '080-1234-5678'
      },
      {
        httId: '0000-0003',
        companyName: '株式会社ロメロ',
        numOfEmp: '300-350',
        contact: '水無川八雲',
        email: 'yakumo@sample.com',
        telephone: '080-1234-5678'
      },
      {
        httId: '0000-0004',
        companyName: '大沼酒造有限会社',
        numOfEmp: '50-100',
        contact: '工藤力也',
        email: 'rikiya@sample.com',
        telephone: '080-1234-5678'
      },
      {
        httId: '0000-0005',
        companyName: '大友建設合同会社',
        numOfEmp: '200-250',
        contact: '藤堂源治',
        email: 'genji@sample.com',
        telephone: '080-1234-5678'
      },
      {
        httId: '0000-0006',
        companyName: '青森園芸株式会社',
        numOfEmp: '300-350',
        contact: '大渡あかね',
        email: 'akane@sample.com',
        telephone: '080-1234-5678'
      }
    ],
    billingHistoryList: [
      {
        invDate: '2021年4月1日',
        dueDate: '2021年4月30日',
        quantity: '¥57,800,300',
        status: '未払い'
      },
      {
        invDate: '2021年3月1日',
        dueDate: '2021年3月31日',
        quantity: '¥6,450,520',
        status: '支払い済み'
      },
      {
        invDate: '2021年2月1日',
        dueDate: '2021年2月28日',
        quantity: '¥548,330',
        status: '未払い'
      },
      {
        invDate: '2021年1月1日',
        dueDate: '2021年1月31日',
        quantity: '¥228, 180',
        status: '支払い済み'
      },
      {
        invDate: '2020年12月1日',
        dueDate: '2020年12月31日',
        quantity: '¥1,650,330',
        status: '支払い済み'
      },
      {
        invDate: '2020年11月1日',
        dueDate: '2020年11月5日',
        quantity: '¥1,650,330',
        status: '未払い'
      }
    ]
  })
  return (
    <div className="relative px-10 pt-5 pb-0 bg-mainbg font-sans">
      <div
        id="breadcrumb"
        className="w-full relative table-cell align-middle w-60 space-x-4"
      >
        <p className="inline font-sm font-bold text-gray-400">
          <a href="/admin/accounts">アカウント一覧</a>
        </p>
        <img src={BreadCrumb} className="inline" />
        <p className="inline font-sm font-bold text-gray-400">販売代理店詳細</p>
      </div>

      <div
        id="contact-persons"
        className="w-full relative rounded-lg border-2 border-gray-200 h-48 mt-5 bg-white mb-10 flex"
      >
        <div
          id="contact-person-item"
          className="w-1/2 h-full inline-block px-4 py-2 border-r-2 border-gray-200"
        >
          <div id="contact-logo-container" className="h-10 flex mb-2 pl-20">
            <img src={ProfileIcon} alt="" className="h-8 w-8 pt-1" />
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
              代理店業務詳細
            </p>
          </div>
          <div id="contact-content" className="h-auto w-full">
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={BusinessIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">管厓者名</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    サンプル業務名
                  </p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={IndustryIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">業種</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    商社
                  </p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={LocationIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">所在地</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    サンプル住所
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="contact-person-item"
          className="w-1/2 h-full inline-block px-4 py-2"
        >
          <div id="contact-logo-container" className="h-10 flex mb-2 pl-20">
            <img src={ProfileIcon} alt="" className="h-8 w-8 pt-1" />
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2">
              人事部
            </p>
          </div>
          <div id="contact-content" className="h-auto w-full">
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={PersonIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">
                    連絡担当者名
                  </p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    鈴木一郎
                  </p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={EmailIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">
                    メ一ルアドレス
                  </p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    contactadmin@sprobe.com
                  </p>
                </div>
              </div>
            </div>
            <div id="content-row">
              <div
                id="content-col-header"
                className="h-8 w-1/2 inline-block pl-20"
              >
                <div id="logo-container" className="inline-block pl-10 mr-4">
                  <img src={TelephoneIcon} alt="" />
                </div>
                <div id="header-name" className="inline-block">
                  <p className="text-sm text-gray-400 font-sans">電話番号</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    +639088962533
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="companies&billing"
        className="w-full h-detail-height flex mb-3 mt-8 space-x-12"
      >
        <div
          id="companyList"
          className="w-1/2 h-full border-2 border-gray-200 bg-white"
        >
          <div
            id="contact-logo-container"
            className="h-16 flex mb-2 px-4 pb-2 pt-5 "
          >
            <img src={CompanyIcon} alt="" className="h-8 w-8 pt-1" />
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
              企業一覧
            </p>
          </div>
          <div className="relative">
            <table className="w-full h-auto text-center font-bold text-sm text-gray-600">
              <thead className="bg-table-header-Gray-100 text-table-header-Gray-400">
                <tr className="h-14 font-bold font-sans text-lg">
                  <td>HTT-ID</td>
                  <td>会社名</td>
                  <td>従業員数</td>
                  <td>連絡担当者</td>
                  <td>メールアドレス</td>
                  <td>電話番号</td>
                </tr>
              </thead>
              <tbody>
                {state.companyList.map((item, index) => {
                  return (
                    <tr
                      className="h-14 stripe-table-row font-light 2xl:text-sm lg:text-xs"
                      key={index}
                    >
                      <td>{item.httId}</td>
                      <td>{item.companyName}</td>
                      <td>{item.numOfEmp}</td>
                      <td>{item.contact}</td>
                      <td>{item.email}</td>
                      <td>{item.telephone}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
              <div id="widget-footer-control">
                <div
                  id="billing-pagination"
                  className="w-full h-11 p-2 text-center space-x-2"
                >
                  <img
                    src={PrevButton}
                    className="inline-block w-7 h-auto  cursor-default mb-1"
                  />
                  <div className="inline-block text-primary-200">
                    <span className="text-white rounded-2xl bg-primary-200 px-3 py-2  cursor-default">
                      1
                    </span>
                    <span className="px-3 py-2  cursor-default">2</span>
                    <span className="px-3 py-2 rounded-2xl  cursor-default">
                      3
                    </span>
                  </div>
                  <img
                    src={NextButton}
                    className="inline-block  w-7 h-auto  cursor-default mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="admin-sales-billing"
          className="w-1/2 h-full border-2 border-gray-200 bg-white rounded-lg"
        >
          <div
            id="contact-logo-container"
            className="h-16 flex mb-2  px-4 pb-2 pt-5 "
          >
            <img src={HistoryIcon} alt="" className="h-6 w-6 pt-1 mt-1" />
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
              請求履歴
            </p>
          </div>
          <div className="relative">
            <table className="w-full h-auto text-center font-bold text-sm text-gray-600">
              <thead className="bg-table-header-Gray-100 text-table-header-Gray-400">
                <tr className="h-14 font-bold font-sans text-lg">
                  <td>請求日</td>
                  <td>支払い期限</td>
                  <td>請求額</td>
                  <td>状態</td>
                </tr>
              </thead>
              <tbody>
                {state.billingHistoryList.map((item, index) => {
                  let status = item.status === '未払い' ? '-' : item.status
                  return (
                    <tr
                      className="h-14 stripe-table-row font-light  2xl:text-sm lg:text-xs"
                      key={index}
                    >
                      <td>{item.invDate}</td>
                      <td>{item.dueDate}</td>
                      <td>{item.quantity}</td>
                      <td>{status}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            <div id="widget-footer" className="w-full h-14 bg-white p-3.5">
              <div id="widget-footer-control">
                <div
                  id="billing-pagination"
                  className="w-full h-11 p-2 text-center space-x-2"
                >
                  <img
                    src={PrevButton}
                    className="inline-block w-7 h-auto  cursor-default mb-1"
                  />
                  <div className="inline-block text-primary-200">
                    <span className="text-white rounded-2xl bg-primary-200 px-3 py-2  cursor-default">
                      1
                    </span>
                    <span className="px-3 py-2  cursor-default">2</span>
                    <span className="px-3 py-2 rounded-2xl  cursor-default">
                      3
                    </span>
                  </div>
                  <img
                    src={NextButton}
                    className="inline-block  w-7 h-auto  cursor-default mb-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesDetail
if (document.getElementById('admin-sales-account-detail')) {
  ReactDom.render(
    <SalesDetail />,
    document.getElementById('admin-sales-account-detail')
  )
}
