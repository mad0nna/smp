import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import AccountProfile from './AccountProfile'
import AccountList from './AccountList'
import axios from 'axios'
import MessageDialog from './MessageDialog'
import emailSent from '../../../../img/email/email-sent.png' /* eslint-disable-line */
import emailStamp from '../../../../img/email/email-stamp.png' /* eslint-disable-line */
import emailLogo from '../../../../img/email/email-logo.png' /* eslint-disable-line */
import kotFabIcon from '../../../../img/kotFabIcon.png' /* eslint-disable-line */

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

const App = () => {
  const [state, setState] = useState({
    addedCompany: {},
    redirectToProfile: false,
    redirectToAccountList: false,
    formState: 'edit form',
    isEditingProfile: true,
    accountList: [],
    pageCount: 1,
    lastPage: 1,
    showPopupMessageDialog: false,
    isLoadingPullSf: false,
    token: document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')
  })

  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: ''
  })

  const handleDisplayAddedCompany = (company) => {
    setState((prevState) => {
      return {
        ...prevState,
        addedCompany: company,
        isEditingProfile: false,
        formState: 'add form',
        redirectToProfile: true,
        redirectToAccountList: false
      }
    })
  }

  const handleDisplaySelectedCompany = (index) => {
    const selectedItem = state.accountList[index]
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingPullSf: true
      }
    })

    axios
      .post(
        `/admin/company/searchCompanyId`,
        {
          code: selectedItem.companyCode,
          company_id: selectedItem.id,
          _token: state.token
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
              addedCompany: data.data.data,
              isEditingProfile: true,
              formState: 'edit form',
              redirectToProfile: true,
              redirectToAccountList: false,
              isLoadingPullSf: false
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              isLoadingPullSf: false,
              dialogMessage:
                '申し訳ありませんが、データの取得中にエラーが発生しました',
              showPopupMessageDialog: true
            }
          })
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

  const handleUpdateList = () => {
    axios.get(`/admin/company`).then((data) => {
      if (data.data.success !== undefined && data.data.success === true) {
        setState((prevState) => {
          return {
            ...prevState,
            accountList: data.data.data,
            redirectToAccountList: true,
            redirectToProfile: false
          }
        })
      }
    })
  }

  const handleCloseProfile = () => {
    setState((prevState) => {
      return {
        ...prevState,
        redirectToAccountList: true,
        redirectToProfile: false
      }
    })
  }

  const handlePageClick = (n) => {
    setCurrentPage(n)
  }

  const handleFilter = (keyword) => {
    setPagingConditions({ ...pagingConditions, keyword: keyword })
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

  useEffect(() => {
    axios
      .get(
        `/admin/company?page=${pagingConditions.page}&limit=${pagingConditions.limit}&keyword=${pagingConditions.keyword}`
      )
      .then((response) => {
        setState((prevState) => {
          return {
            ...prevState,
            accountList: response.data.data,
            pageCount: response.data.pageCount,
            lastPage: response.data.lastPage
          }
        })
      })
  }, [pagingConditions])

  return (
    <div className="relative px-10 py-5 bg-mainbg fixed">
      <Router>
        {state.redirectToProfile && state.isEditingProfile === true ? (
          <Redirect
            to={'/admin/accounts/profile?id=' + state.addedCompany.id}
          />
        ) : (
          ''
        )}

        {state.redirectToProfile && state.isEditingProfile === false ? (
          <Redirect
            to={
              '/admin/accounts/profile?code=' + state.addedCompany.companyCode
            }
          />
        ) : (
          ''
        )}

        {state.showPopupMessageDialog ? (
          <MessageDialog
            handleCloseMessageDialog={handleCloseMessageDialog}
            message={state.dialogMessage}
          />
        ) : null}

        {state.redirectToAccountList ? <Redirect to="/admin/accounts" /> : ''}

        <Switch>
          <Route path="/admin/accounts/profile">
            <AccountProfile
              token={state.token}
              company={state.addedCompany}
              isEditingProfile={state.isEditingProfile}
              formState={state.formState}
              handleUpdateList={handleUpdateList}
              handleCloseProfile={handleCloseProfile}
            />
          </Route>
          <Route path="/admin/accounts">
            <AccountList
              token={state.token}
              data={{
                accountList: state.accountList,
                currentPage: pagingConditions.page,
                pageLimit: pagingConditions.limit,
                pageCount: state.pageCount,
                lastPage: state.lastPage,
                handlePageClick: handlePageClick
              }}
              handleDisplayAddedCompany={handleDisplayAddedCompany}
              handleDisplaySelectedCompany={handleDisplaySelectedCompany}
              handleFilter={handleFilter}
              handleNavigation={handleNavigation}
              setCurrentPage={setCurrentPage}
              isLoadingPullSf={state.isLoadingPullSf}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App

if (document.getElementById('admin-account-list')) {
  ReactDOM.render(<App />, document.getElementById('admin-account-list'))
}
