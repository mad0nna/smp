import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import AccountProfile from './accountProfile'
import AccountList from './accountList'
import axios from 'axios'
import MessageDialog from './messageDialog'
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
    formState: 'add form',
    isEditingProfile: false,
    accountList: [],
    pageCount: 1,
    lastPage: 1,
    showPopupMessageDialog: false,
    isPullFromSf: false,
    isLoadingPullSf: false,
    token: document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content')
  })

  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 3,
    keyword: ''
  })

  const handleDisplayAddedCompany = (company) => {
    console.log('add company')
    console.log(company)
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
    console.log('handleDisplaySelectedCompany')
    const selectedItem = state.accountList[index]
    // console.log(selectedItem)
    setState((prevState) => {
      return {
        ...prevState,
        isLoadingPullSf: true
      }
    })

    fetch('/admin/company/searchCompanyCode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: selectedItem.companyCode,
        includeCompanyDBRecord: true,
        _token: state.token
      })
    })
      .then((response) => {
        if (response.ok) return response.json()
        return { success: false }
      })
      .then((data) => {
        if (data.success !== undefined && data.success === true) {
          console.log(data)
          setState((prevState) => {
            return {
              ...prevState,
              addedCompany: data.isPullFromSf ? data.data : data.dbData[0],
              isPullFromSf: data.isPullFromSf,
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
    console.log('handleSaveNewAccount')
    fetch('/admin/company', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        if (data.success !== undefined && data.success === true) {
          setState((prevState) => {
            return {
              ...prevState,
              accountList: data.data,
              redirectToAccountList: true,
              redirectToProfile: false
            }
          })
        }
      })
  }

  const handleCloseProfile = () => {
    console.log('handleCloseProfile')
    setState((prevState) => {
      return {
        ...prevState,
        redirectToAccountList: true,
        redirectToProfile: false
      }
    })
  }

  const handlePageClick = (n) => {
    console.log('handlePaging' + n)
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
        console.log('get record result:  ')
        console.log(response)
        console.log(response.data.pageCount)
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
        {state.redirectToProfile ? (
          <Redirect to="/admin/accounts/profile" />
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
              isPullFromSf={state.isPullFromSf}
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
