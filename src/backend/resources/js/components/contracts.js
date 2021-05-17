import React from 'react'
import ReactDOM from 'react-dom'
import topIcon from '../../img/contractsIcon.png'
import back from '../../img/back.png'
import next from '../../img/next.png'
import Settings from './dashboardSettings'
import kot2 from '../../img/kot109.png'
import Purchase from './purchaseHistory'
import kot from '../../img/kotContractLogo.png'
import Freee from '../../img/Freee.png'
import SmartHR from '../../img/smartHR.png'
import { interactivePages } from '../utilities/constants'

const Contracts = () => {
  const data = [
    {
      logo: kot,
      logo2: kot2,
      name: '勤怠管理',
      rowcolor: 'text-gray-800',
      subscribed: '2021年1月5日',
      expired: '2022年1月5日',
      status: '契約中'
    },
    {
      logo: kot,
      logo2: kot2,
      name: 'セキュアログイン',
      rowcolor: 'text-gray-800',
      subscribed: '2020年5月30日',
      expired: '2021年5月30日',
      status: '契約中'
    },
    {
      logo: kot,
      logo2: kot2,
      name: 'データ分析',
      rowcolor: 'text-gray-800',
      subscribed: '2021年3月10日',
      expired: '2022年3月10日',
      status: '契約中'
    },
    {
      logo: kot,
      logo2: kot2,
      name: '人事労務',
      rowcolor: 'text-gray-800',
      subscribed: '2020年6月6日',
      expired: '2021年6月6日',
      status: '契約中'
    },
    {
      logo: kot,
      logo2: kot2,
      name: 'シフト管理',
      rowcolor: 'text-gray-800',
      subscribed: '2021年1月16日',
      expired: '2022年1月16日',
      status: '契約中'
    },
    {
      logo: kot,
      logo2: kot2,
      name: 'ワークフロー',
      rowcolor: 'text-gray-800',
      subscribed: '2021年1月1日',
      expired: '2022年1月1日',
      status: '契約中'
    },
    {
      logo: Freee,
      logo2: '',
      name: '工数管理',
      rowcolor: 'text-gray-400',
      subscribed: '非アクティブ',
      expired: '非アクティ',
      status: '申請する'
    },
    {
      logo: Freee,
      logo2: '',
      name: '人事労務',
      rowcolor: 'text-gray-400',
      subscribed: '非アクティブ',
      expired: '非アクティ',
      status: '申請する'
    },
    {
      logo: SmartHR,
      logo2: '',
      name: 'クラウド管理会',
      rowcolor: 'text-gray-400',
      subscribed: '非アクティブ',
      expired: '非アクティ',
      status: '申請する'
    }
  ]
  const pagination = [
    { url: '#', label: '1', active: true },
    { url: '#', label: '2', active: false },
    { url: '#', label: '3', active: false }
  ]

  return (
    <div className="bg-mainbg grid lg:grid-cols-4 md:grid-cols-2 grid-flow-row lg:grid-rows-3 gap-10 mx-10 mt-5">
      <div className="col-span-3 row-span-2">
        <div className="w-full rounded-lg border border-gray-200 overflow-hidden bg-white mb-10">
          <div className="flex gap-2 w-full bg-white pl-8 p-5 align-middle h-16">
            <span>
              <img src={topIcon} />
            </span>
            <span className="bg-white text-primary-200 font-sans font-bold">
              契約一覧
            </span>
          </div>
          <table className="table w-full bg-white">
            <thead className="bg-gray-200 font-bold font-sans text-gray-500 pt-4 pb-4 text-left">
              <tr>
                <th className="w-1/5">&nbsp;</th>
                <th className="w-1/5 pl-5">契約名</th>
                <th className="w-1/5 pl-5">開始日</th>
                <th className="w-1/5 pl-5">終了日</th>
                <th className="w-1/5">状態</th>
              </tr>
            </thead>
            <tbody>
              {data.map((contract, index) => {
                const stripe = !(index % 2) ? 'bg-gray-50' : 'bg-white'
                const styles =
                  contract.status === '申請する'
                    ? 'text-primary-200'
                    : 'text-black'
                return (
                  <tr
                    className={
                      stripe +
                      ' table-row bg-gray-50 font-sans 2xl:text-base lg:text-sm text-gray-900 p-5 h-20 ' +
                      contract.rowcolor
                    }
                    key={index}
                  >
                    <td className="w-2/12">
                      <img className="pl-24" src={contract.logo} />
                    </td>
                    <td
                      className="w-3/12 text-sm content-center text-left bg-no-repeat pt-4"
                      style={{
                        backgroundImage: `url("${contract.logo2}")`,
                        backgroundPosition: '0% 29%'
                      }}
                    >
                      <span className="text-left">{contract.name}</span>
                    </td>
                    <td className="w-1/5 text-lef text-sm ">
                      {contract.subscribed}
                    </td>
                    <td className="w-1/5 text-left text-sm ">
                      {contract.expired}
                    </td>
                    <td
                      className={styles + ' w-1/5 text-left text-sm font-bold '}
                    >
                      {contract.status}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="col-span-3 row-span-2 w-full text-primary-200 font-bold font-sans text-center flex gap-3 justify-center items-center text-sm align-center h-3">
          <img src={back} />
          {pagination.map((page, index) => {
            return (
              <p
                className={
                  'flex items-center justify-center w-6 h-6 rounded-full ' +
                  (page.active
                    ? 'bg-primary-200 text-white'
                    : 'text-primary-200')
                }
                key={index}
              >
                {page.label}
              </p>
            )
          })}
          <img src={next} />
        </div>
      </div>
      <div className="col-span-1 row-span-1 w-full align-top">
        <Settings interActivePages={interactivePages} />
      </div>
      <div className="col-span-1 row-span-1 w-full mt-0 align-top">
        <Purchase interActivePages={interactivePages} />
      </div>
    </div>
  )
}

export default Contracts

if (document.getElementById('contracts')) {
  ReactDOM.render(<Contracts />, document.getElementById('contracts'))
}
