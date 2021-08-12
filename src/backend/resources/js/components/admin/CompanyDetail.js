import React from 'react'
import ReactDom from 'react-dom'
import BreadCrumb from '../../../img/breadcrumb-icon.png'
import ProfileIcon from '../../../img/support-profile-icon.png'
import PersonIcon from '../../../img/contact-person-gray.png'
import EmailIcon from '../../../img/mail-gray.png'
import TelephoneIcon from '../../../img/telephone-gray.png'
import CompanyIcon from '../../../img/company-icon.png'
import CompanyLogo from '../../../img/company/logo2.png'
import CompanyAccountIcon from '../../../img/company-gray.png'
import CompanyAddressIcon from '../../../img/company-address-gray.png'
import CompanyAccountIconGray from '../../../img/company-account-gray.png'
import EmployeesIcon from '../../../img/employees-gray.png'
import TelephoneNumberIcon from '../../../img/telephoneNumber-gray.png'
import ContractedServices from '../ContractedServices'
import LinkageServices from '../LinkageServices'
import HistoryIcon from '../../../img/history-icon.png'
import PrevButton from '../../../img/pagination-prev.png'
import NextButton from '../../../img/pagination-next.png'

const CompanyDetail = (props) => {
  let hasBreadcrumb = false
  if (typeof props.breadCrumb !== undefined) {
    hasBreadcrumb = props.breadCrumb
  }
  const breadCrumb = () => {
    return (
      <div
        id="breadcrumb"
        className="w-full relative table-cell align-middle w-60 space-x-4"
      >
        <p className="inline font-sm font-bold text-gray-400">
          <a href="/admin/accounts">アカウント一覧</a>
        </p>
        <img src={BreadCrumb} className="inline" />
        <p className="inline font-sm font-bold text-gray-400">企業詳細</p>
      </div>
    )
  }
  return (
    <div className="relative px-10 pt-5 pb-5 bg-mainbg font-sans">
      {hasBreadcrumb ? breadCrumb() : ''}
      <div
        id="contact-persons"
        className="w-full relative rounded-lg border-2 border-gray-200 h-48 mt-5 bg-white mb-10"
      >
        <div
          id="contact-person-item"
          className="w-1/2 h-full inline-block px-4 py-2 border-r-2 border-gray-200"
        >
          <div id="contact-logo-container" className="h-10 flex mb-2 pl-20">
            <img src={ProfileIcon} alt="" className="h-8 w-8 pt-1" />
            <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
              管理部
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
                  <p className="text-sm text-gray-400 font-sans">管厓者名</p>
                </div>
              </div>
              <div id="content-col-value" className="h-8 w-1/2 inline-block">
                <div id="content-value">
                  <p className="text-sm text-gray-600 font-bold font-sans">
                    大谷运ュ
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
                    0912345678
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
      <div className="flex space-x-6">
        <div className="w-1/2 h-detail-height inline-block px-4 py-2 border-2 border-gray-200 bg-white rounded-lg">
          <div id="companyDetail" className=" pl-20 mt-5">
            <div id="contact-logo-container" className="h-10 flex mb-2">
              <img src={CompanyIcon} alt="" className="h-8 w-8 pt-1" />
              <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
                顧客 企業 プロフィール
              </p>
            </div>
            <div className="w-full h-96 pl-10 py-5">
              <div id="companyLogo" className="mb-10">
                <img src={CompanyLogo} className="h-16 w-auto" />
              </div>
              <div id="contact-content" className="h-auto w-full space-y-3">
                <div id="content-row">
                  <div
                    id="content-col-header"
                    className="h-8 w-2/6 inline-block"
                  >
                    <div id="logo-container" className="inline-block mr-4">
                      <img src={CompanyAccountIcon} alt="" className="mt-2" />
                    </div>
                    <div id="header-name" className="inline-block">
                      <p className="text-sm text-gray-400 font-sans">会社名</p>
                    </div>
                  </div>
                  <div
                    id="content-col-value"
                    className="h-8 w-1/2 inline-block"
                  >
                    <div id="content-value">
                      <p className="text-sm text-gray-600 font-bold font-sans">
                        株式会社町田
                      </p>
                    </div>
                  </div>
                </div>
                <div id="content-row">
                  <div
                    id="content-col-header"
                    className="h-8 w-2/6 inline-block"
                  >
                    <div id="logo-container" className="inline-block mr-4">
                      <img src={CompanyAddressIcon} alt="" className="mt-2" />
                    </div>
                    <div id="header-name" className="inline-block">
                      <p className="text-sm text-gray-400 font-sans">住所</p>
                    </div>
                  </div>
                  <div
                    id="content-col-value"
                    className="h-8 w-1/2 inline-block"
                  >
                    <div id="content-value">
                      <p className="text-sm text-gray-600 font-bold font-sans">
                        東京都江東区荒池1-5-2
                      </p>
                    </div>
                  </div>
                </div>
                <div id="content-row">
                  <div
                    id="content-col-header"
                    className="h-8 w-2/6 inline-block"
                  >
                    <div id="logo-container" className="inline-block mr-4">
                      <img src={TelephoneNumberIcon} alt="" className="mt-2" />
                    </div>
                    <div id="header-name" className="inline-block">
                      <p className="text-sm text-gray-400 font-sans">
                        電話番号
                      </p>
                    </div>
                  </div>
                  <div
                    id="content-col-value"
                    className="h-8 w-1/2 inline-block"
                  >
                    <div id="content-value">
                      <p className="text-sm text-gray-600 font-bold font-sans">
                        03-1234-5678{' '}
                      </p>
                    </div>
                  </div>
                </div>
                <div id="content-row">
                  <div
                    id="content-col-header"
                    className="h-8 w-2/6 inline-block"
                  >
                    <div id="logo-container" className="inline-block mr-4">
                      <img
                        src={CompanyAccountIconGray}
                        alt=""
                        className="mt-2"
                      />
                    </div>
                    <div id="header-name" className="inline-block">
                      <p className="text-sm text-gray-400 font-sans">
                        顧客企業 ID
                      </p>
                    </div>
                  </div>
                  <div
                    id="content-col-value"
                    className="h-8 w-1/2 inline-block"
                  >
                    <div id="content-value">
                      <p className="text-sm text-gray-600 font-bold font-sans">
                        9999ABCDEFG
                      </p>
                    </div>
                  </div>
                </div>
                <div id="content-row">
                  <div
                    id="content-col-header"
                    className="h-8 w-2/6 inline-block"
                  >
                    <div id="logo-container" className="inline-block mr-4">
                      <img src={EmployeesIcon} alt="" className="mt-2" />
                    </div>
                    <div id="header-name" className="inline-block">
                      <p className="text-sm text-gray-400 font-sans">
                        従業員数
                      </p>
                    </div>
                  </div>
                  <div
                    id="content-col-value"
                    className="h-8 w-1/2 inline-block"
                  >
                    <div id="content-value">
                      <p className="text-sm text-gray-600 font-bold font-sans">
                        300人 - 500人
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-detail-height inline-block px-4 py-2 space-y-8">
          <div className="w-full flex space-x-8">
            <div className="w-1/2 h-48">
              <ContractedServices />
            </div>
            <div className="w-1/2 h-48">
              <LinkageServices />
            </div>
          </div>

          <div className="w-full h-3/5 px-4 py-2 border-2 border-gray-200 bg-white rounded-lg">
            <div id="contact-logo-container" className="h-10 flex mb-2">
              <img src={HistoryIcon} alt="" className="h-5 w-5 pt-1 mt-1" />
              <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
                請求履歴
              </p>
            </div>
            <div className="relative">
              <table className="w-full h-auto text-center font-bold text-sm text-gray-600">
                <tbody className="text-left">
                  <tr className="h-12">
                    <td className="text-">2021年5月1日</td>
                    <td>KOT-TM定期購読</td>
                    <td>¥ 10, 890</td>
                    <td>支払日 : -</td>
                  </tr>
                  <tr className="h-12">
                    <td>2021年4月1日</td>
                    <td>KOT-SL 定期購読</td>
                    <td>¥ 11, 220</td>
                    <td>支払日 : 2021年4月30日</td>
                  </tr>
                  <tr className="h-12">
                    <td>2021年3月1日</td>
                    <td>KOT-TM 定期購読</td>
                    <td>¥ 10, 890</td>
                    <td>支払日 : 2021年4月30日</td>
                  </tr>
                  <tr className="h-12">
                    <td>2021年3月1日</td>
                    <td>KOT-XC 定期購読</td>
                    <td>¥ 1, 542, 000</td>
                    <td>支払日 : -</td>
                  </tr>
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
                      className="inline-block w-7 h-auto cursor-default mb-1"
                    />
                    <div className="inline-block text-primary-200">
                      <span className="text-white rounded-2xl bg-primary-200 px-3 py-2 cursor-default">
                        1
                      </span>
                      <span className="px-3 py-2 cursor-default">2</span>
                      <span className="px-3 py-2 rounded-2xl cursor-default">
                        3
                      </span>
                    </div>
                    <img
                      src={NextButton}
                      className="inline-block  w-7 h-auto cursor-default mb-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CompanyDetail
if (document.getElementById('admin-company-account-detail')) {
  ReactDom.render(
    <CompanyDetail />,
    document.getElementById('admin-company-account-detail')
  )
}

if (document.getElementById('sales-account')) {
  ReactDom.render(
    <CompanyDetail breadCrumb={false} />,
    document.getElementById('sales-account')
  )
}
