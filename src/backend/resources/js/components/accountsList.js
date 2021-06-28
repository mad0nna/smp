import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import AccountsIcon from '../../img/company/accounts-list.png'
import Settings from './dashboardSettings'
import AdminsList from './adminsList'
import Welcome from './welcome'
import NewAccount from './newAccount'
import MessageDialog from './messageDialog'
import DeleteConfirmation from './deleteConfirmation'
import ProfileEdit from './accountProfile'
import Pagination from './pagination'
import _ from 'lodash'

const AccountsList = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 15,
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
    mode: '',
    dialogMessage: '',
    pageCount: 1,
    lastPage: 1,
    pageNumbers: '',
    currentPage: 1,
    adminList: [],
    emptyUser: true,
    loggedUser: {
      id: '',
      userTypeId: ''
    }
  })

  const handleFilter = (e) => {
    setPagingConditions({ ...pagingConditions, keyword: e.target.value })
  }

  function handlePageClick(n) {
    console.log('handlePaging' + n)
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
    axios
      .get(
        `/company/getCompanyAdmins?page=${pagingConditions.page}&limit=${pagingConditions.limit}&keyword=${pagingConditions.keyword}`
      )
      .then((response) => {
        console.log('get record result:  ')
        console.log(response)
        console.log(response.data.pageCount)

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
          // console.log(pageNumbers)
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
          console.log('renderPageNumbers')
          console.log(renderPageNumbers)

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

  const getUserProfile = () => {
    axios
      .get('/company/getLoggedUserInfo')
      .then((response) => {
        console.log('user info from backend')
        console.log(response.data.data)
        const user = response.data.data
        let logged = { ...state.loggedUser }

        logged.id = user['id']
        logged.userTypeId = user['userTypeId']
        console.log(logged)
        setState((prevState) => {
          return {
            ...prevState,
            emptyUser: false,
            loggedUser: logged
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
          setState((prevState) => {
            return {
              ...prevState,
              loggedUser: ''
            }
          })
        }
      })
  }
  {
    state.emptyUser ? getUserProfile() : null
  }
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
      .get(`/salesforce/getCompanyAdminDetailsbyEmail?email=${email}`)
      .then((response) => {
        const admin = response.data
        setState((prevState) => {
          return {
            ...prevState,
            name: admin.name,
            email: admin.email,
            showList: true,
            isLoading: false,
            foundAccount: response.data,
            searchResult: '検索する'
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
          setState((prevState) => {
            return {
              ...prevState,
              showList: true,
              showPopupNewAccount: true,
              isLoading: false,
              searchResult: 'アカウントが見つかりません'
            }
          })
        }
      })
  }

  const handleDisplayAddedAdmin = (admin) => {
    setState((prevState) => {
      return {
        ...prevState,
        addedAccount: admin,
        showPopupNewAccount: false,
        showPopupMessageDialog: true,
        dialogMessage:
          '管理者が追加されました。\n 追加された管理者に招待メールが送信されます。'
      }
    })

    axios
      .post('/company/addCompanyAdmin', admin, {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        const admin = response.data
        setState({
          addedAccount: admin,
          showList: true
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
          setState({
            addedAccount: null
          })
        }
      })
  }

  const handleDeleteConfirmation = (admin) => {
    setState((prevState) => {
      return {
        ...prevState,
        deletedAccount: admin,
        showPopupMessageDialog: false,
        showList: true,
        dialogMessage:
          admin['username'] +
          'を削除することに成功いたしました。\n 以降、韋駄天を使用することができなくなります。'
      }
    })

    axios
      .delete('/salesforce/deleteSFAdmin?admin=', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          admin
        }
      })
      // .then((response) => {
      //   const acct = response.data
      // })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
          setState({
            deletedAccount: null
          })
        }
      })

    setState({
      deletedAccount: admin
    })

    axios
      .delete('/company/deleteAdmin?admin=', {
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          admin
        }
      })
      .then((response) => {
        const admin = response.data
        setState((prevState) => {
          return {
            ...prevState,
            deletedAccount: admin,
            showPopupMessageDialog: false,
            showList: true

            // redirectAfterSuccess: true
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
          setState({
            deletedAccount: null
          })
        }
      })
  }

  const handleDisplayDelete = (account) => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupDelete: true,
        accountToDelete: account
      }
    })
  }

  const handleDisplayUpdate = (account) => {
    console.log(account)
    setState((prevState) => {
      return {
        ...prevState,
        showList: false,
        showEdit: true,
        accountToEdit: account,
        mode: 'edit'
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
        mode: 'view'
      }
    })
  }

  const handleResendEmailInvite = (account) => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingResendEmail: true,
        showPopupMessageDialog: true,
        dialogMessage: 'Email Invitation sent to ' + account['username']
      }
    })

    axios
      .post('/company/resendEmailInvite', account, {
        'Content-Type': 'application/json'
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
        }
      })
  }

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        addedAccount: null,
        accountToEdit: null,
        accountToDelete: null,
        showPopupMessageDialog: false,
        showEdit: false,
        showPopupDelete: false,
        showList: true
      }
    })
  }

  return (
    <div className="relative px-10 py-5 bg-mainbg ">
      <div className="w-full h-full overflow-hidden relative min-h-table-height">
        <div
          id="widget-header"
          className="max-w-full h-52 box-border align-middle p-4 relative mb-5 flex flex-row"
        >
          <div className="flex flex-cols flex-wrap justify-self-start w-2/4">
            <div className="float-left">
              <img src={AccountsIcon} className="w-auto h-7 float-left ml-4" />
              <div
                id="widget-name"
                className="text-primary-200 text-xl font-sans font-bold ml-4 float-left"
              >
                ユーザーアカウント一覧
              </div>
            </div>
            <div className="w-full">
              <Welcome />
            </div>
            <button
              onClick={togglePopupNewAccount}
              className="rounded-full bg-white w-2/5 h-10 py-2 font-bold text-center border-1 shadow-md border-primary-200 text-primary-200"
            >
              新規ユーザーを追加 +
            </button>
          </div>

          <div
            id="widget-name"
            className="mr-12 w-1/4 object-right-bottom relative"
          >
            <div className="table-cell h-24">
              <div id="search-bar" className="bg-mainbg h-12">
                <input
                  type="text"
                  id="billingSearch"
                  className="bg-white h-12 rounded-3xl w-80 mx-0 my-auto p-l-4"
                  placeholder="検索"
                  onChange={handleFilter}
                />
                <svg
                  className="text-gray-500  fill-current w-auto h-11 float-left mt-0.5 p-3"
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
              </div>
            </div>
          </div>
          <div className=" w-1/5 h-48 float-right">
            <Settings />
          </div>
        </div>
        <div
          id="widget-body"
          className="h-50 w-full bg-white overflow-hidden rounded-lg border-2 border-gray-200 "
        >
          {/* {state.redirectToAccountList ? (
            <Redirect to="/company/accountslist" />
          ) : (
            ''
          )} */}
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
          {state.showEdit ? (
            <ProfileEdit
              mode={state.mode}
              account={state.accountToEdit}
              isLoading={state.isLoading}
              handleDisplayUpdate={handleDisplayUpdate}
              handleCloseMessageDialog={handleCloseMessageDialog}
              loggedUser={state.loggedUser}
            />
          ) : null}
        </div>
      </div>
      {state.showList ? (
        <div
          id="pagination"
          className="w-full h-12 p-3 text-center space-x-2 mt-4"
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
          handleCloseMessageDialog={handleCloseMessageDialog}
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

export default AccountsList
if (document.getElementById('company-accounts-list')) {
  ReactDom.render(
    <AccountsList />,
    document.getElementById('company-accounts-list')
  )
}
