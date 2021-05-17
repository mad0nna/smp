import React, { useState } from 'react'
import ReactDom from 'react-dom'
import Ellipsis from '../../../img/ellipsis.png'
import ViewIcon from '../../../img/view-icon.png'
import PrevButton from '../../../img/pagination-prev.png'
import NextButton from '../../../img/pagination-next.png'
import ArrowDown from '../../../img/dropdown2-icon.png'
import AccountsIcon from '../../../img/accounts-icon.png'

const AccountList = () => {
  const [state, setState] = useState({
    filter: 'All',
    asc: true,
    activeSort: '',
    masterListOfAccounts: [
      {
        num: 1,
        httId: '1234ABCDEFG',
        name: '英碕株式会社',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '矢崎紘一',
        email: 'eiji@h-t.co.jp',
        telNum: '080-1234-5678'
      },
      {
        num: 2,
        httId: '4567ABCDEFG',
        name: 'ソフトバンク株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '山姥ひるみ',
        email: 'softbank@h-t.co.jp',
        telNum: '080-2234-6778'
      },
      {
        num: 3,
        httId: '8901ABCDEFG',
        name: 'ヤマハ株式会社',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '山崎ミリー',
        email: 'yamaha@h-t.co.jp',
        telNum: '080-1240-9263'
      },
      {
        num: 4,
        httId: '2345ABCDEFG',
        name: '日本電信株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '小林健太',
        email: 'nippontele@h-t.co.jp',
        telNum: '080-1684-2356'
      },
      {
        num: 5,
        httId: '2469ABCDEFG',
        name: 'みずほ銀行株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '愛子ミラ',
        email: 'mizhuo@h-t.co.jp',
        telNum: '080-3579-1248'
      },
      {
        num: 6,
        httId: '1249ABCDEFG',
        name: '株式会社花の力',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '大島希子',
        email: 'flowerpower@h-t.co.jp',
        telNum: '080-2568-9778'
      },
      {
        num: 7,
        httId: '4686ABCDEFG',
        name: '株式会社広美',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '中山智',
        email: 'hiromi@h-t.co.jp',
        telNum: '080-8943-1235'
      }
    ],
    listOfAccounts: [
      {
        num: 1,
        httId: '1234ABCDEFG',
        name: '英碕株式会社',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '矢崎紘一',
        email: 'eiji@h-t.co.jp',
        telNum: '080-1234-5678'
      },
      {
        num: 2,
        httId: '4567ABCDEFG',
        name: 'ソフトバンク株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '山姥ひるみ',
        email: 'softbank@h-t.co.jp',
        telNum: '080-2234-6778'
      },
      {
        num: 3,
        httId: '8901ABCDEFG',
        name: 'ヤマハ株式会社',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '山崎ミリー',
        email: 'yamaha@h-t.co.jp',
        telNum: '080-1240-9263'
      },
      {
        num: 4,
        httId: '2345ABCDEFG',
        name: '日本電信株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '小林健太',
        email: 'nippontele@h-t.co.jp',
        telNum: '080-1684-2356'
      },
      {
        num: 5,
        httId: '2469ABCDEFG',
        name: 'みずほ銀行株式会社',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '愛子ミラ',
        email: 'mizhuo@h-t.co.jp',
        telNum: '080-3579-1248'
      },
      {
        num: 6,
        httId: '1249ABCDEFG',
        name: '株式会社花の力',
        type: '顧客企業',
        typeEng: 'company',
        contactPerson: '大島希子',
        email: 'flowerpower@h-t.co.jp',
        telNum: '080-2568-9778'
      },
      {
        num: 7,
        httId: '4686ABCDEFG',
        name: '株式会社広美',
        type: '販売代理店',
        typeEng: 'sales',
        contactPerson: '中山智',
        email: 'hiromi@h-t.co.jp',
        telNum: '080-8943-1235'
      }
    ]
  })
  const selectFilter = (filter) => {
    setState((prevState) => {
      return {
        ...prevState,
        filter: filter
      }
    })
  }
  const handleSort = (key) => {
    if (key === 'num') {
      let orderAsc = !state.asc
      setState((prevState) => {
        return {
          ...prevState,
          listOfAccounts: prevState.listOfAccounts.sort((a, b) => {
            if (orderAsc) {
              return parseFloat(a.num) - parseFloat(b.num)
            }
            return parseFloat(b.num) - parseFloat(a.num)
          }),
          asc: orderAsc,
          activeSort: key
        }
      })
    } else {
      let orderAsc = !state.asc
      setState((prevState) => {
        return {
          ...prevState,
          listOfAccounts: prevState.listOfAccounts.sort((x, y) => {
            let a = x[key].toUpperCase(),
              b = y[key].toUpperCase()
            if (orderAsc) {
              return a.localeCompare(b, 'ja', { ignorePunctuation: true })
            }
            return b.localeCompare(a, 'ja', { ignorePunctuation: true })
          }),
          asc: orderAsc,
          activeSort: key
        }
      })
    }
  }
  const activeSortingIcon = (key) => {
    if (key === state.activeSort) {
      return 'bg-sort-icon-active'
    }
    return ''
  }

  const searchFor = (text) => {
    let results = []
    if (text === '') {
      setState((prevState) => {
        return {
          ...prevState,
          listOfAccounts: state.masterListOfAccounts
        }
      })
    }
    state.masterListOfAccounts.map((item) => {
      let values = Object.values(item)
      values.filter((value) => {
        if (typeof value === 'string') {
          if (value.indexOf(text) > -1) {
            if (!checkIfExist(item, results)) {
              results.push(item)
            }
          }
        }
      })
    })
    setState((prevState) => {
      return {
        ...prevState,
        listOfAccounts: results
      }
    })
  }
  const checkIfExist = (newItem, source) => {
    let indicator = false
    source.map((item) => {
      if (item.num === newItem.num) {
        indicator = true
      }
    })
    return indicator
  }
  const constDisplayNoResultText = () => {
    if (state.listOfAccounts.length < 1) {
      return (
        <div className="absolute top-80 w-full text-center">
          <p className="font-bold text-lg tracking-tight text-table-header-Gray-400">
            検索結果はありません
          </p>
        </div>
      )
    }
  }
  return (
    <div className="relative px-10 py-5 bg-mainbg">
      <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 min-h-table-height">
        {constDisplayNoResultText()}
        <div
          id="widget-header"
          className="max-w-full h-32 bg-white box-border align-middle p-4 relative"
        >
          <img src={AccountsIcon} className="w-auto h-7 float-left ml-4" />
          <div
            id="widget-name"
            className="text-primary-200 text-xl font-sans font-bold ml-4 float-left"
          >
            アカウント一覧
          </div>
          <div id="widget-name" className="float-right mr-12">
            <div className="table-cell h-24 w-full align-middle relative group">
              <div
                id="search-bar"
                className="border-2 border-primary-200 h-12 rounded-xl w-48 mx-0 my-auto bg-white table-cell align-middle relative cursor-pointer"
              >
                <p className="mx-0 my-auto w-48 inline ml-8 text-gray-400 text-sm font-bold">
                  絞り込み
                </p>
                <img src={ArrowDown} className="absolute top-3 right-3" />
              </div>
              <div className="w-full h-46 bg-greenOld absolute -bottom-18 z-10 py-4 px-8 hidden group-hover:block">
                <div id="sortItem" className="w-full h-12">
                  <a href="#" className=" space-x-2 ">
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div className="bg-no-repeat bg-cover bg-all-accounts-icon-white w-7 h-7 my-auto mx-0" />
                      </div>
                    </div>
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div
                          className="inline-block  my-auto mx-0 text-white text-center"
                          onClick={() => {
                            selectFilter('All')
                          }}
                        >
                          すべて
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div id="sortItem" className="w-full h-12">
                  <a href="#" className=" space-x-2 ">
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div className="bg-no-repeat bg-cover bg-profile-icon-white w-6 h-6 my-auto mx-0" />
                      </div>
                    </div>
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div
                          className="inline-block  my-auto mx-0 text-white text-center"
                          onClick={() => {
                            selectFilter('sales')
                          }}
                        >
                          販売代理店
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div id="sortItem" className="w-full h-12">
                  <a href="#" className="space-x-2">
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div className="bg-no-repeat bg-cover bg-company-icon-white w-6 h-6 my-auto mx-0" />
                      </div>
                    </div>
                    <div className="inline-block">
                      <div className="table-cell align-middle h-12">
                        <div
                          className="inline-block  my-auto mx-0 text-white  text-center"
                          onClick={() => {
                            selectFilter('company')
                          }}
                        >
                          顧客企業
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div id="widget-name" className="float-right mr-12">
            <div className="table-cell relative h-24 w-full align-middle">
              <div
                id="search-bar"
                className="bg-mainbg h-12 rounded-3xl w-96 mx-0 my-auto"
              >
                <svg
                  className="text-gray-500 fill-current w-auto h-11 float-left mt-0.5 p-3"
                  xmlns="http://www.w3.org/2000/svg"
                  x="30px"
                  y="30px"
                  viewBox="0 0 487.95 487.95"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                            c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                            c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                    />
                  </g>
                </svg>
                <input
                  type="text"
                  id="billingSearch"
                  className="h-full w-80 bg-mainbg custom-outline-none"
                  placeholder="検索"
                  onChange={(e) => {
                    searchFor(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          <div></div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div id="widget-body" className="h-50 w-full bg-white overflow-hidden">
          <table className="w-full h-auto text-center">
            <thead className="bg-table-header-Gray-100 text-table-header-Gray-400 h-3 font-bold text-lg tracking-tight">
              <tr className="h-12 w-12">
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('num')
                    }
                  />
                  <span
                    id="num"
                    onClick={() => {
                      handleSort('num')
                    }}
                  >
                    No.
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('httId')
                    }
                  />
                  <span
                    id="httId"
                    onClick={() => {
                      handleSort('httId')
                    }}
                  >
                    HTT-ID
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('name')
                    }
                  />
                  <span
                    id="name"
                    onClick={() => {
                      handleSort('name')
                    }}
                  >
                    アカウント名
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('type')
                    }
                  />
                  <span
                    id="type"
                    onClick={() => {
                      handleSort('type')
                    }}
                  >
                    アカウント種類
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('contactPerson')
                    }
                  />
                  <span
                    id="contactPerson"
                    onClick={() => {
                      handleSort('contactPerson')
                    }}
                  >
                    連絡担当者
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('email')
                    }
                  />
                  <span
                    id="email"
                    onClick={() => {
                      handleSort('email')
                    }}
                  >
                    メールアドレス
                  </span>
                </td>
                <td className="group cursor-pointer">
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active ' +
                      activeSortingIcon('telNum')
                    }
                  />
                  <span
                    id="telNum"
                    onClick={() => {
                      handleSort('telNum')
                    }}
                  >
                    電話番号
                  </span>
                </td>
                <td>
                  <span>操作</span>
                </td>
              </tr>
            </thead>
            <tbody className="transform even:bg-gray-500">
              {state.listOfAccounts.map((item, index) => {
                if (item.typeEng !== state.filter && state.filter !== 'All') {
                  return
                }
                let detailPageLink =
                  item.typeEng === 'sales'
                    ? '/admin/accounts/sales/detail'
                    : '/admin/accounts/company/detail'
                return (
                  <tr
                    className="stripe-table-row h-20 font-meiryo text-sm text-gray-600"
                    key={index}
                  >
                    <td className="w-12">
                      <p className="p-1 w-7 rounded-2xl bg-orange mx-auto text-white">
                        {item.num}
                      </p>
                    </td>
                    <td className="w-12">{item.httId}</td>
                    <td className="w-12">{item.name}</td>
                    <td className="w-12">{item.type}</td>
                    <td className="w-12">{item.contactPerson}</td>
                    <td className="w-12">{item.email}</td>
                    <td className="w-12">{item.telNum}</td>
                    <td className="w-12">
                      <a href={detailPageLink}>
                        <img
                          src={ViewIcon}
                          className="mx-auto w-6 h-auto"
                          alt="view icon"
                        />
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="billing-pagination"
        className="w-full h-12 p-3 text-center space-x-2 mt-4"
      >
        <img
          src={PrevButton}
          className="inline-block w-8 h-auto  cursor-default mb-1"
        />
        <div className="inline-block text-primary-200">
          <span className="text-white rounded-2xl bg-primary-200 px-3 py-2 cursor-default">
            1
          </span>
          <span className="px-3 py-2  cursor-default">2</span>
          <span className="px-3 py-2 rounded-2xl  cursor-default">3</span>
        </div>
        <img
          src={NextButton}
          className="inline-block  w-8 h-auto  cursor-default mb-1"
        />
      </div>
    </div>
  )
}

export default AccountList
if (document.getElementById('admin-account-list')) {
  ReactDom.render(
    <AccountList />,
    document.getElementById('admin-account-list')
  )
}
