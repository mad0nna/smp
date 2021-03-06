import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import BillingIcon from '../../../../svg/billing-icon.svg'
import Ellipsis from '../../../../img/ellipsis.png'
import NewAccount from './NewAccount'
import MessageDialog from './MessageDialog'
import Pagination from '../../Pagination'
import waitingIcon from '../../../../img/loading-spinner.gif'
import _ from 'lodash'
import axios from 'axios'

const AccountList = (props) => {
  const [state, setState] = useState({
    filter: 'All',
    asc: true,
    activeSort: '',
    showPopupNewAccount: false,
    companyCode: null,
    foundCompany: {},
    addedCompany: null,
    redirectToProfile: false,
    showPopupMessageDialog: false,
    dialogMessage: '',
    isLoadingPullSf: false,
    isLoadingResendEmail: false,
    searchResult: '',
    sortedAccountList: [],
    pageCount: 1,
    renderPageNumbers: '',
    currentPage: 1,
    lastPage: 1,
    pageNumbers: ''
  })

  const togglePopupNewAccount = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupNewAccount: !prevState.showPopupNewAccount,
        companyCode: '',
        foundCompany: null,
        isLoading: false,
        orderAsc: false,
        searchResult: ''
      }
    })
  }

  const handleKeywordChange = (e) => {
    props.handleFilter(e.target.value)
  }

  const searchCompanyCode = (code) => {
    code = code.trim()
    if (code === '') {
      return
    }
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        searchResult: '',
        foundCompany: {}
      }
    })

    axios
      .post(
        `/admin/company/searchCompanyCode`,
        {
          code: code,
          _token: props.token
        },
        {
          'Content-Type': 'application/json'
        }
      )
      .then((data) => {
        let result = data.data
        if (result.exists && result.success) {
          setState((prevState) => {
            return {
              ...prevState,
              companyCode: code,
              isLoading: false,
              searchResult: result.data
            }
          })
        } else if (result.success && !result.exists) {
          setState((prevState) => {
            return {
              ...prevState,
              companyCode: code,
              foundCompany: result.data,
              isLoading: false,
              searchResult: ''
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              companyCode: code,
              isLoading: false,
              searchResult: result.data
            }
          })
        }
      })
  }

  function handleResendEmailInvite(userId) {
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingResendEmail: true
      }
    })

    document.getElementById('spin_' + userId).classList.remove('hidden')
    axios
      .post(
        `/admin/company/resendEmailInvite`,
        {
          user_id: userId,
          _token: props.token
        },
        {
          'Content-Type': 'application/json'
        }
      )
      .then((data) => {
        if (data.data.success !== undefined && data.data.success === true) {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              dialogMessage: '????????????????????????',
              isLoadingResendEmail: false
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              dialogMessage: '???????????????',
              isLoadingResendEmail: false
            }
          })
        }
        document.getElementById('spin_' + userId).classList.add('hidden')
      })
  }

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: !prevState.showPopupMessageDialog,
        searchResult: ''
      }
    })
  }

  const sortArray = (type) => {
    const types = {
      name: 'name',
      companyCode: 'companyCode'
    }
    const sortProperty = types[type]

    const sorted = props.data.accountList.sort((a, b) => {
      if (state.orderAsc) {
        return b[sortProperty].toLowerCase() > a[sortProperty].toLowerCase()
          ? 1
          : -1
      } else {
        return b[sortProperty].toLowerCase() > a[sortProperty].toLowerCase()
          ? -1
          : 1
      }
    })

    setState((prevState) => {
      return {
        ...prevState,
        sortedAccountList: sorted,
        orderAsc: !prevState.orderAsc
      }
    })
  }

  useEffect(() => {
    if (!_.isEmpty(props.data)) {
      // Logic for displaying page numbers
      const pageNumbers = []
      for (
        let i = 1;
        i <= Math.ceil(props.data.pageCount / props.data.pageLimit);
        i++
      ) {
        pageNumbers.push(i)
      }

      const renderPageNumbers = pageNumbers.map((number) => {
        return (
          <li
            key={number}
            id={number}
            onClick={() => props.data.handlePageClick(number)}
            className=""
          >
            <span
              className={
                props.data.currentPage == number
                  ? `text-white bg-primary-200 rounded-2xl px-3 py-1`
                  : `text-primary-200 px-3 py-1`
              }
            >
              {number}
            </span>
          </li>
        )
      })

      const list = <ul id="page-numbers">{renderPageNumbers}</ul>
      setState((prevState) => {
        return {
          ...prevState,
          sortedAccountList: props.data.accountList,
          pageNumbers: list,
          currentPage: props.data.currentPage,
          lastPage: props.data.lastPage
        }
      })
    }
  }, [props.data])

  useEffect(() => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingPullSf: props.isLoadingPullSf
      }
    })
  }, [props.isLoadingPullSf])

  return (
    <div className="relative px-10 py-5 bg-mainbg">
      <input type="hidden" name="_token" value={state.token}></input>
      <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 ">
        <div
          id="widget-header"
          className="max-w-full h-40 bg-white box-border align-middle p-4 relative"
        >
          <div className="px-3 pt-3 pb-10">
            <img src={BillingIcon} className="w-auto h-7 float-left ml-4" />
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">??????????????????</h2>
            </div>
            <div id="widget-name" className="float-right mr-12">
              <div className="table-cell relative h-20 w-full align-middle">
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
                    placeholder="??????"
                    onChange={handleKeywordChange}
                  />
                </div>
              </div>
            </div>
            <div id="widget-name" className="float-right mr-12 ">
              <div className="table-cell relative h-20 mr-3 align-middle">
                <button
                  onClick={togglePopupNewAccount}
                  className="cursor-pointer border-primary-200 text-bold w-52 py-2 px-3 border-2 text-primary-200 rounded-3xl tracking-tighter"
                >
                  ???????????????????????????
                </button>
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
          <table className="table-auto w-full mb-6">
            <thead className="bg-gray-50 border-b border-t border-gray-200">
              <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                <th
                  className="text-left pl-4 w-72 cursor-pointer"
                  onClick={() => sortArray('name')}
                >
                  ??????????????????&nbsp;
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                    }
                  />
                </th>
                <th
                  className="text-left pl-4 w-48"
                  onClick={() => sortArray('companyCode')}
                >
                  ???????????????&nbsp;
                  <div
                    className={
                      'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                    }
                  />
                </th>
                <th className="text-left pl-4">?????????????????????</th>
                <th className="text-left pl-4 w-44">?????????????????????</th>
                <th className="text-left pl-4">????????????</th>
                <th className="text-left pl-4">??????</th>
                <th className="text-left">??????</th>
              </tr>
            </thead>
            <tbody className="transform even:bg-gray-500">
              {state.sortedAccountList.map((item, index) => {
                let txtcolor =
                  item.status === 'Pending' ? 'text-red-500' : 'text-gray-900'
                let actionButton =
                  item.admin.length &&
                  item.admin[0].emailVerifiedAt === null ? (
                    <div>
                      <a
                        className="cursor-pointer mr-2"
                        onClick={() =>
                          props.handleDisplaySelectedCompany(index)
                        }
                      >
                        ??????
                      </a>
                      <a
                        className="cursor-pointer mr-2"
                        onClick={() => {
                          state.isLoadingResendEmail
                            ? null
                            : handleResendEmailInvite(item.admin[0].id)
                        }}
                      >
                        ???????????????
                        <img
                          id={`spin_` + item.admin[0].id}
                          src={waitingIcon}
                          className={'hidden w-8 inline'}
                        />
                      </a>
                    </div>
                  ) : (
                    <a
                      className="cursor-pointer mr-2"
                      onClick={() => props.handleDisplaySelectedCompany(index)}
                    >
                      ??????
                    </a>
                  )

                let status = item.status === 'active' ? '??????' : item.status

                return (
                  <tr
                    className="stripe-table-row h-16 2xl:text-base lg:text-sm text-gray-900"
                    key={index}
                  >
                    <td className="text-left pl-4 ">{item.name}</td>
                    <td className="text-left pl-4">{item.companyCode}</td>
                    <td className="text-left pl-4">{item.industry}</td>
                    <td className="text-left pl-4">
                      {!_.isEmpty(item.admin[0]) ? item.admin[0].email : ''}
                    </td>
                    <td className="text-left pl-4">{item.contactNum}</td>
                    <td className={txtcolor + ' text-left pl-4'}>{status}</td>
                    <td className="text-left text-primary-200">
                      {actionButton}
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
        className="w-full h-12 p-3 text-center space-x-2 mt-3"
      >
        <Pagination
          listNumbers={state.pageNumbers}
          currentPage={state.currentPage}
          lastPage={state.lastPage}
          handleNavigation={props.handleNavigation}
        />
      </div>

      {state.showPopupNewAccount ? (
        <NewAccount
          closePopup={togglePopupNewAccount}
          companyCode={state.companyCode}
          searchCompanyCode={searchCompanyCode}
          isLoading={state.isLoading}
          searchResult={state.searchResult}
          foundCompany={state.foundCompany}
          handleDisplayAddedCompany={props.handleDisplayAddedCompany}
        />
      ) : null}

      {state.showPopupMessageDialog ? (
        <MessageDialog
          handleCloseMessageDialog={handleCloseMessageDialog}
          message={state.dialogMessage}
        />
      ) : null}
    </div>
  )
}

export default AccountList

if (document.getElementById('admin-account-list')) {
  ReactDOM.render(
    <AccountList />,
    document.getElementById('admin-account-list')
  )
}
