import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import Pagination from './Pagination'
import _ from 'lodash'
import NewAccount from './NewAccount'
import MessageDialog from './MessageDialog'
import DeleteConfirmation from './DeleteConfirmation'

const AccountList = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })

  const [state, setState] = useState({
    adminList: [],
    sorted: [],
    showList: [],
    isSuperAdmin: false,
    adminID: null,
    accountToDelete: {},
    accountToDeleteIndex: null,
    // Pagination state
    pageCount: 0,
    lastPage: 0,
    pageNumbers: '',
    currentPage: 1,

    // modal states
    showPopupNewAccount: false,
    showPopupDelete: false,
    showPopupMessageDialog: false,
    dialogMessage: '',
    isLoading: false
  })

  useEffect(() => {
    axios
      .get(
        `/company/getCompanyAdmins?page=${pagingConditions.page}&limit=${pagingConditions.limit}&keyword=${pagingConditions.keyword}`
      )
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          // Logic for displaying page numbers
          const pageNumbers = []
          for (
            let i = 1;
            i <= Math.ceil(response.data.pageCount / pagingConditions.limit);
            i++
          ) {
            pageNumbers.push(i)
          }
          const renderPageNumbers = pageNumbers.map((number) => {
            return (
              <li
                key={number}
                id={number}
                onClick={() => pagingConditions.handlePageClick(number)}
                className=""
              >
                <span
                  className={
                    pagingConditions.page == number
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
              adminList: response.data.data,
              pageCount: response.data.pageCount,
              lastPage: response.data.lastPage,
              pageNumbers: list,
              currentPage: response.data.currentPage,
              sorted: response.data.data,
              isSuperAdmin: response.data.isSuperAdmin,
              adminID: response.data.adminID
            }
          })
        }
      })
  }, [pagingConditions])

  function handlePageClick(n) {
    setPagingConditions({ ...pagingConditions, ...{ page: n } })
  }

  const handleFilter = (e) => {
    setPagingConditions({ ...pagingConditions, keyword: e.target.value })
  }

  const handleNavigation = (change) => {
    setPagingConditions({
      ...pagingConditions,
      ...{ page: pagingConditions.page + change }
    })
  }

  const togglePopupNewAccount = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupNewAccount: !prevState.showPopupNewAccount,
        email: '',
        name: '',
        foundAccount: null,
        isLoading: false,
        searchResult: ''
      }
    })
  }

  const sortArray = (type) => {
    const types = {
      first_name: 'first_name',
      email: 'email'
    }

    const sortProperty = types[type]
    const sort = state.sorted.sort((a, b) => {
      if (state.orderAsc) {
        return b[sortProperty] > a[sortProperty] ? 1 : -1
      } else {
        return b[sortProperty] > a[sortProperty] ? -1 : 1
      }
    })

    setState((prevState) => {
      return {
        ...prevState,
        sorted: sort,
        orderAsc: !prevState.orderAsc
      }
    })
  }

  const handleDisplayDelete = (account, i) => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupDelete: true,
        accountToDelete: account,
        accountToDeleteIndex: i
      }
    })
  }

  const handleDisplayUpdateOrView = (index) => {
    location.replace('/company/account/profile/?id=' + index)
  }

  const handleResendEmailInvite = (account) => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingResendEmail: true,
        showPopupMessageDialog: true,
        dialogMessage: account['username'] + 'に招待状が再送信されました。'
      }
    })

    axios.post('/company/resendEmailInvite', account, {
      'Content-Type': 'application/json'
    })
  }

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: false
      }
    })
  }

  const handleDeleteConfirmation = (admin) => {
    axios
      .delete('/company/deleteAdmin', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          admin
        }
      })
      .then((data) => {
        state.adminList.splice(state.accountToDeleteIndex, 1)
        if (data.status == 200) {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupDelete: false,
              showList: true
            }
          })
        }
      })
      .catch(function (error) {
        if (error.response) {
          setState({
            deletedAccount: null
          })
        }
      })

    axios
      .delete('/company/deleteSFAdmin', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          admin
        }
      })
      .catch(function (error) {
        if (error.response) {
          setState({
            deletedAccount: null
          })
        }
      })
  }

  const handleCloseDeleteConfirmation = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupDelete: false
      }
    })
  }

  return (
    <div className="relative px-10 py-5 bg-mainbg ">
      <div className="bg-mainbg grid grid-cols-3 font-meiryo gap-6">
        <div className="col-span-3 w-full rounded-lg shadow-xl bg-white mb-10 border-primary-100">
          <div className="px-3 pt-3 pb-10">
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                ユーザーアカウント一覧
              </h2>
            </div>
          </div>
          <div className="px-3">
            <div className="flex justify-between items-center">
              <div className="">
                <div
                  className={
                    (state.showList ? ' ' : 'hidden ') +
                    'text-sm border cursor-pointer add-new-user'
                  }
                  onClick={togglePopupNewAccount}
                >
                  <span className="flex flex-col items-center justify-center text-gray-500 font-medium mx-2 my-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 float-left mr-1 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                      </svg>
                      新規ユーザーを追加
                    </span>
                  </span>
                </div>
              </div>
              <div className="">
                <div
                  id="widget-name"
                  className="mr-26 w-1/4 object-right-bottom relative rounded-lg"
                >
                  <div
                    className={
                      state.showList
                        ? `table-cell h-12 origin-right`
                        : ` hidden `
                    }
                  >
                    <div
                      id="search-bar"
                      className="bg-gray-100 h-10 rounded-lg 2xl:w-96 xl:w-92 lg:w-64 mx-0 my-auto"
                    >
                      <svg
                        className="text-gray-500 fill-current w-auto h-11 float-left p-3 rounded-lg"
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
                        className="h-full 2xl:w-80 xl:w-76 lg:w-44 bg-gray-100 custom-outline-none rounded-lg"
                        placeholder="検索"
                        onChange={handleFilter}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={
                state.showList ? `'h-50 w-full bg-white overflow-hidden '` : ''
              }
            >
              <table className="table-auto w-full mb-6">
                <thead className="bg-gray-50 border-b border-t border-gray-200">
                  <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                    <th>
                      <span
                        id="fullName"
                        onClick={() => sortArray('first_name')}
                      >
                        名前&nbsp;
                        <div
                          className={
                            'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                          }
                        />
                      </span>
                    </th>
                    <th>
                      <span id="httId">役職</span>
                    </th>
                    <th>
                      <span id="name">権限</span>
                    </th>
                    <th>
                      <span id="email" onClick={() => sortArray('email')}>
                        メールアドレス&nbsp;
                        <div
                          className={
                            'inline-block h-4 w-4 bg-cover bg-no-repeat mr-2 bg-sort-icon-inactive group-hover:bg-sort-icon-active '
                          }
                        />
                      </span>
                    </th>
                    <th className="text-right">
                      <span id="contactPerson">電話番号</span>
                    </th>
                    <th>
                      <span id="type">状態</span>
                    </th>
                    <th>
                      <span id="telNum">操作</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="transform px-3">
                  {state.sorted.map((admin, i) => {
                    return (
                      <tr
                        className="table-row font-sans text-sm text-gray-500 p-5 h-16 hover:bg-gray-50 border-b border-gray-100"
                        key={admin.id}
                      >
                        <td className="text-center capitalize">
                          {admin.last_name} {admin.first_name}
                        </td>
                        <td className="text-center">{admin.title}</td>
                        <td className="text-center">
                          {admin.user_type_id === 3
                            ? 'スーパー管理者'
                            : '副管理者'}
                        </td>
                        <td className="text-center">{admin.email}</td>
                        <td className="text-right">{admin.contact_num}</td>
                        <td className="text-center">
                          {admin.user_status_id === 1 ? 'アクティブ' : '保留中'}
                        </td>
                        <td className=" grid-flow-row text-center">
                          <a className="grid-flow-row inline text-primary-200">
                            {admin.user_status_id === 1 ? (
                              <span
                                className="cursor-pointer"
                                onClick={() =>
                                  handleDisplayUpdateOrView(admin.id)
                                }
                                // update
                              >
                                更新 &nbsp;
                              </span>
                            ) : null}

                            {admin.user_status_id === 5 ? (
                              <span
                                className="cursor-pointer"
                                onClick={() => handleResendEmailInvite(admin)}
                                // resend email
                              >
                                招待状再送信 &nbsp;
                              </span>
                            ) : null}

                            {state.isSuperAdmin === true &&
                            state.adminID !== admin.id ? (
                              <span
                                className="cursor-pointer"
                                onClick={() => handleDisplayDelete(admin, i)}
                                // delete
                              >
                                削除 &nbsp;
                              </span>
                            ) : null}
                          </a>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {state.showList ? (
        <div
          id="pagination"
          className="w-full h-12 p-3 text-center space-x-2 mt-4 mb-10"
        >
          <Pagination
            listNumbers={state.pageNumbers}
            currentPage={pagingConditions.page}
            lastPage={state.lastPage}
            handleNavigation={handleNavigation}
          />
        </div>
      ) : null}
      {state.showPopupNewAccount ? <NewAccount /> : null}
      {state.showPopupDelete ? (
        <DeleteConfirmation
          accountToDelete={state.accountToDelete}
          isLoading={state.isLoading}
          handleDeleteConfirmation={handleDeleteConfirmation}
          handleCloseMessageDialog={handleCloseDeleteConfirmation}
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

if (document.getElementById('company-accounts-list')) {
  ReactDom.render(
    <AccountList />,
    document.getElementById('company-accounts-list')
  )
}
