import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import AdminsList from './AdminsList'
import NewAccount from './NewAccount'
import MessageDialog from './MessageDialog'
import DeleteConfirmation from './DeleteConfirmation'
import ProfileEdit from './AccountProfile'
import Pagination from './Pagination'
import _ from 'lodash'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import queryString from 'query-string'

const AccountsList = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })

  const [state, setState] = useState({
    showPopupNewAccount: false,
    name: null,
    permission: null,
    email: null,
    selectedAdmin: {},
    foundAccount: {},
    addedAccount: null,
    deletedAccount: null,
    accountToDelete: {},
    accountToDeleteIndex: null,
    accountToUpdateIndex: null,
    accountToEdit: null,
    accountToResend: null,
    showPopupMessageDialog: false,
    showPopupDelete: false,
    isLoading: false,
    isLoadingResendEmail: false,
    searchResult: '',
    redirectAfterSuccess: false,
    showList: true,
    showEdit: false,
    mode: 'edit',
    dialogMessage: '',
    pageCount: 1,
    lastPage: 1,
    pageNumbers: '',
    currentPage: 1,
    adminList: [],
    redirectToList: false,
    redirectToProfile: false,
    emptyUser: true,
    userData: JSON.parse(document.getElementById('userData').textContent),
    loggedUser: {
      id: JSON.parse(document.getElementById('userData').textContent).userId,
      userTypeId: JSON.parse(document.getElementById('userData').textContent)
        .userTypeId
    },
    isLoadingOfAddingContact: false,
    params: queryString.parse(location.search)
  })

  const handleFilter = (e) => {
    setPagingConditions({ ...pagingConditions, keyword: e.target.value })
  }

  function handlePageClick(n) {
    setCurrentPage(n)
  }

  const handleNavigation = (change) => {
    setPagingConditions({
      ...pagingConditions,
      ...{ page: pagingConditions.page + change }
    })
  }

  const setCurrentPage = (curpage) => {
    setPagingConditions({ ...pagingConditions, ...{ page: curpage } })
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

  useEffect(() => {
    if (!_.isEmpty(state.params.id)) {
      setState((prevState) => {
        return {
          ...prevState,
          showList: false,
          showEdit: true,
          accountToEdit: null,
          mode: 'edit',
          redirectToProfile: true
        }
      })
    }
  }, [state.params])

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
              currentPage: response.data.currentPage
            }
          })
        }
      })
  }, [pagingConditions])

  const searchAdminByEmail = (email) => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        showList: true,
        searchResult: ''
      }
    })

    axios
      .get(`/company/findInSFByEmail?email=${email}`)
      .then((response) => {
        setState((prevState) => {
          return {
            ...prevState,
            showList: true,
            showPopupNewAccount: true,
            isLoading: false,
            foundAccount:
              // response.data.data.source === 'salesforce'
              response.data.data,
            // : '',
            searchResult:
              response.data.data.source === 'salesforce'
                ? 'セールスフォースに存在するユーザーです。 招待状を送信してもよろしいですか？'
                : '既に追加されているユーザーです。アカウント一覧をご確認ください',
            email: email
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          // const admin = state.foundAccount
          setState((prevState) => {
            return {
              ...prevState,
              // name: admin.name,
              // email: admin.email,
              showList: true,
              isLoading: false,
              foundAccount: '',
              searchResult:
                '未登録のユーザーです。名前を入力して招待を送信してください。'
            }
          })
        }
      })
  }

  const handleDisplayAddedAdmin = (user) => {
    if (user.source != 'salesforce') {
      const fullName = user.fullName
      let arr = []
      arr = fullName.split(' ')
      user.firstname = arr[1] ? arr[1] : ''
      user.lastname = arr[0] ? arr[0] : ''
      user.firstname = user.firstname ? user.firstname : '-'
      user.isPartial = 1
    } else {
      user.isPartial = 0
    }

    setState((prevState) => {
      return {
        ...prevState,
        isLoadingOfAddingContact: true
      }
    })

    axios
      .post('/company/addCompanyAdmin', user, {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.status == 200) {
          state.adminList.unshift(response.data.data)

          setState((prevState) => {
            return {
              ...prevState,
              showPopupNewAccount: false,
              isLoadingOfAddingContact: false,
              showPopupMessageDialog: true,
              dialogMessage:
                '管理者が追加されました。 \n 追加された管理者に招待メールが送信されます。'
            }
          })
        }
      })
      .catch(function (error) {
        if (error.response) {
          setState((prevState) => {
            return {
              ...prevState,
              isLoadingOfAddingContact: false,
              showPopupNewAccount: false,
              showPopupMessageDialog: true,
              dialogMessage: '正しいメールアドレスを入力してください。'
            }
          })
        }
      })
  }

  const handleDeleteConfirmation = (admin) => {
    axios
      .delete('/company/deleteAdmin?admin=', {
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
      .delete('/company/deleteSFAdmin?admin=', {
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

  const handleDisplayUpdate = (account, index) => {
    setState((prevState) => {
      return {
        ...prevState,
        showList: false,
        showEdit: true,
        accountToEdit: account,
        mode: 'edit',
        redirectToProfile: true,
        redirectToList: false,
        accountToUpdateIndex: index
      }
    })
  }

  const handleDisplayView = (account) => {
    setState((prevState) => {
      return {
        ...prevState,
        showList: false,
        showEdit: true,
        accountToEdit: account,
        mode: 'edit',
        redirectToProfile: true,
        redirectToList: false
      }
    })
  }

  const handleDisplayList = (user, index) => {
    if (index === null) {
      const found = state.adminList.find((element) => element.id == user.id)
      const i = state.adminList.indexOf(found)
      state.adminList[i] = user
    } else if (user && index !== null) {
      state.adminList[index] = user
    }

    setState((prevState) => {
      return {
        ...prevState,
        showList: true,
        showEdit: false,
        redirectToProfile: false,
        redirectToList: true
      }
    })
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

  const handleCloseDeleteConfirmation = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupDelete: false
      }
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

  return (
    <div className="relative px-10 py-5 bg-mainbg ">
      <Router>
        {state.redirectToProfile ? (
          <Redirect
            to={
              '/company/accountslist/profile?id=' +
              (!_.isEmpty(state.accountToEdit)
                ? state.accountToEdit.id
                : state.params.id)
            }
          />
        ) : (
          ''
        )}
        {state.redirectToList ? <Redirect to="/company/accountslist" /> : ''}

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
                  state.showList
                    ? `'h-50 w-full bg-white overflow-hidden '`
                    : ''
                }
              >
                <Switch>
                  <Route path="/company/accountslist/profile">
                    {state.showEdit ? (
                      <ProfileEdit
                        mode={state.mode}
                        account={state.accountToEdit}
                        isLoading={state.isLoading}
                        handleDisplayUpdate={handleDisplayUpdate}
                        handleDisplayList={handleDisplayList}
                        loggedUser={state.loggedUser}
                        accountToUpdateIndex={state.accountToUpdateIndex}
                      />
                    ) : null}
                  </Route>

                  <Route path="/company/accountslist">
                    {state.showList ? (
                      <AdminsList
                        admins={{
                          adminList: state.adminList,
                          loggedUser: state.loggedUser
                        }}
                        handleDisplayDelete={handleDisplayDelete}
                        handleDisplayUpdate={handleDisplayUpdate}
                        handleDisplayView={handleDisplayView}
                        handleResendEmailInvite={handleResendEmailInvite}
                      />
                    ) : null}
                  </Route>
                </Switch>
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

        {state.showPopupNewAccount ? (
          <NewAccount
            closePopup={togglePopupNewAccount}
            email={state.email}
            name={state.name}
            searchAdminByEmail={searchAdminByEmail}
            isLoading={state.isLoading}
            isLoadingOfAddingContact={state.isLoadingOfAddingContact}
            searchResult={state.searchResult}
            foundAccount={state.foundAccount}
            handleDisplayAddedAdmin={handleDisplayAddedAdmin}
          />
        ) : null}

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
      </Router>
    </div>
  )
}

export default AccountsList
if (document.getElementById('company-accounts-list')) {
  ReactDom.render(
    <AccountsList />,
    document.getElementById('company-accounts-list')
  )
}
