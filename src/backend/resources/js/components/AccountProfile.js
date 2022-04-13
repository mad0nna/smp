import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import MessageDialog from './MessageDialog'
import waitingIcon from '../../img/loading-spinner.gif'
// import queryString from 'query-string'
const AccountProfileEdit = () => {
  const [state, setState] = useState({
    mode: 'view',
    account: {
      username: '',
      name: '',
      lastname: '',
      firstname: '',
      position: '',
      phone: '',
      email: '',
      userTypeId: '',
      changeRole: false,
      admin__c: ''
    },
    showPopupMessageDialog: false,
    dialogMessage: '',
    userTypes: [
      { name: '管理者', value: 3 },
      { name: '副管理者', value: 4 }
    ],
    isLoading: false,
    isEditingProfile: false,
    authorityTransfer: false,
    updatedAccount: {},
    validationFields: ['lastname', 'firstname', 'phone', 'position'],
    loggedInUser: {}
  })
  const [errorMessages, setErrorMessages] = useState({
    LastName: '',
    FirstName: '',
    MobilePhone: '',
    Title: '',
    hasError: false
  })

  function handleNumberChange(evt) {
    evt = evt ? evt : window.event
    var charCode = evt.which ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45) {
      evt.preventDefault()
      return false
    }
    return true
  }

  const clearErrors = () => {
    setErrorMessages((prevState) => {
      return {
        ...prevState,
        LastName: '',
        FirstName: '',
        MobilePhone: '',
        Title: '',
        hasError: false
      }
    })
  }

  const handleTextChange = (key, val) => {
    val = val.trim()
    let hasError = false
    let errorMessage = ''

    let account = { ...state.account }
    account[key] = val
    setState((prevState) => {
      return {
        ...prevState,
        account: account
      }
    })
    switch (key) {
      case 'firstname':
        key = 'FirstName'
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      case 'lastname':
        key = 'LastName'
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      case 'phone':
        key = 'MobilePhone'
        if ((val.length == 10 || val.length == 11) && !isNaN(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
          hasError = true
        }
        break
      case 'position':
        key = 'Title'
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      default:
        key = ''
    }

    let _errorMessages = errorMessages
    _errorMessages[key] = errorMessage
    _errorMessages['hasError'] = hasError
    setErrorMessages(() => {
      return {
        ..._errorMessages
      }
    })
  }

  const userTypesChange = (event) => {
    let value = event.target.value
    let changeRole = state.account.userTypeId != value
    setState((prevState) => {
      return {
        ...prevState,
        account: {
          ...prevState.account,
          changeRole: changeRole,
          admin__c: value
        }
      }
    })
  }

  const handleUpdateSave = () => {
    clearErrors()
    let hasError = false
    let errorMessage = ''
    let _errorMessages = errorMessages
    let val = ''

    if (confirm('本当にこのデータを更新してもよろしいですか？')) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: true
        }
      })
      state.validationFields.map((field) => {
        val = ''
        let key = ''
        errorMessage = ''

        switch (field) {
          case 'lastname':
            key = 'LastName'
            val = state.account.lastname
            if (val == null || val.trim() === '') {
              errorMessage = '必須フィールド'
              hasError = true
            }
            break

          case 'firstname':
            key = 'FirstName'
            val = state.account.firstname
            if (val == null || val.trim() === '') {
              errorMessage = '必須フィールド'
              hasError = true
            }
            break

          case 'position':
            key = 'Title'
            val = state.account.position
            if (val === '' || val == null) {
              errorMessage = '必須フィールド'
              hasError = true
            }
            break

          case 'phone':
            key = 'MobilePhone'
            val = state.account.phone
            if (val == null || val == '') {
              errorMessage =
                'ハイフンなしの10桁～11桁の電話番号を入力してください'
              hasError = true
              break
            } else if ((val.length == 10 || val.length == 11) && !isNaN(val)) {
              errorMessage = ''
            } else {
              errorMessage =
                'ハイフンなしの10桁～11桁の電話番号を入力してください'
              hasError = true
            }
            break
        }

        _errorMessages[key] = errorMessage
        _errorMessages['hasError'] = hasError
      })

      setErrorMessages(() => {
        return {
          ..._errorMessages
        }
      })

      if (hasError === true && state.isEditingProfile) {
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false
          }
        })
        return
      }

      const _accountSFValues = {
        Email: state.account.email,
        FirstName: state.account.firstname,
        Fullname: state.account.firstname + ' ' + state.account.lastname,
        LastName: state.account.lastname,
        MobilePhone: state.account.phone,
        Title: state.account.position,
        admin__c: state.account.admin__c,
        username: state.account.email,
        Id: state.account.account_code,
        changeRole: state.account.changeRole
      }
      axios
        .put('/company/updateAdminByEmail', _accountSFValues, {
          'Content-Type': 'application/json'
        })
        .then((response) => {
          if (
            !response['data']['status'] ||
            response['data']['status'] === undefined
          ) {
            setState((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                showPopupMessageDialog: true,
                dialogMessage: 'Customer company information failed to update!'
              }
            })
            return
          }
          setState((prevState) => {
            return {
              ...prevState,
              isLoading: false,
              updatedAccount: response.data.data,
              showPopupMessageDialog: true,
              dialogMessage: '顧客企業情報の更新に成功しました！'
            }
          })
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.status)
          }
        })
    }
  }

  const handleClose = () => {
    location.replace('/company/accountslist')
  }

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: false
      }
    })
    location.replace('/company/accountslist')
  }

  useEffect(() => {
    let urlParams = new URLSearchParams(location.search)
    let id = urlParams.get('id')
    let digitOnly = /^\d+$/
    if (!digitOnly.test(id)) {
      alert('記録が見当たりませんでした')
      location.replace('/company/accountslist')
    }
    axios
      .post(`/company/getContactDetails`, { id: id })
      .then((response) => {
        let data = response.data.data
        setState((prevState) => {
          return {
            ...prevState,
            account: {
              username: data.email,
              name: data.FullName,
              firstname: data.first_name,
              lastname: data.last_name,
              position: data.title,
              phone: data.contact_num,
              email: data.email,
              userTypeId: data.user_type_id,
              account_code: data.account_code,
              changeRole: false
            },
            dataEmpty: false,
            isEditingProfile: data.canEdit,
            mode: data.canEdit ? 'edit' : 'view',
            authorityTransfer: data.authorityTransfer
          }
        })
      })
      .catch(function () {
        alert('記録が見当たりませんでした')
      })

    axios.get(`/getLoggedinUser`).then((response) => {
      if (response.status === 200) {
        setState((prevState) => {
          return {
            ...prevState,
            loggedInUser: response.data
          }
        })
        window.document.getElementById('companyDropwdownTitle').innerHTML =
          response.data['companyName']
      }
    })
  }, [])

  return (
    <div className="relative px-10 py-5 bg-mainbg ">
      <div className="bg-mainbg grid grid-cols-3 font-meiryo gap-6">
        <div className="col-span-3 w-full rounded-lg shadow-xl bg-white mb-10 border-primary-100">
          <div className="px-3 pt-3 pb-10">
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                ユーザープロフィール
              </h2>
            </div>
          </div>
          <div className="px-3">
            <div className="w-full">
              <div className="align-top inline-block w-6/12 rounded-xl border-gray-200 border h-auto bg-white my-4 ml-5 mr-5 py-5 px-6">
                <div className="mx-10 mt-11 mb-2">
                  <div className="flex flex-wrap gap-0 w-full justify-center mt-4 text-primary-200 text-xl">
                    プロフィールを編集
                  </div>
                  <div className="flex flex-wrap gap-0 w-full justify-start">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">
                          氏名（姓）<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="md:w-2/3 flex-grow">
                        <label
                          className={
                            (state.isEditingProfile ? 'hidden' : '') +
                            ' text-sm text-black w-full h-8 px-3 leading-8'
                          }
                        >
                          {state.account.lastname}
                        </label>
                        <input
                          className={
                            (state.isEditingProfile ? '' : 'hidden') +
                            ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                          }
                          defaultValue={state.account.lastname}
                          type="text"
                          name="LastName"
                          placeholder="ラストネーム"
                          onKeyUp={(e) =>
                            handleTextChange('lastname', e.target.value)
                          }
                        />
                        <label
                          className={
                            (errorMessages.LastName ? '' : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {errorMessages.LastName}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">
                          氏名（名）<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="md:w-2/3 flex-grow">
                        <label
                          className={
                            (state.isEditingProfile ? 'hidden' : '') +
                            ' text-sm text-black w-full h-8 px-3 leading-8'
                          }
                        >
                          {state.account.firstname}
                        </label>
                        <input
                          className={
                            (state.isEditingProfile ? '' : 'hidden') +
                            ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                          }
                          defaultValue={state.account.firstname}
                          type="text"
                          name="FirstName"
                          placeholder="ファーストネーム​"
                          onKeyUp={(e) =>
                            handleTextChange('firstname', e.target.value)
                          }
                        />

                        <label
                          className={
                            (errorMessages.FirstName ? '' : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {errorMessages.FirstName}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-0 w-full justify-start">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">
                          役職 : <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="md:w-2/3 md:flex-grow">
                        <label
                          className={
                            (state.isEditingProfile ? 'hidden' : '') +
                            ' text-sm text-black w-full h-8 px-3 leading-8'
                          }
                        >
                          {state.account.position}
                        </label>
                        <input
                          className={
                            (state.isEditingProfile ? '' : 'hidden') +
                            ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                          }
                          type="text"
                          name="position"
                          defaultValue={state.account.position}
                          placeholder="役職"
                          onKeyUp={(e) =>
                            handleTextChange('position', e.target.value)
                          }
                        />
                        <label
                          className={
                            (errorMessages.Title ? '' : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {errorMessages.Title}
                        </label>
                      </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">
                          電話番号 :<span className="text-red-500">*</span>
                        </label>
                      </div>
                      <div className="md:w-2/3 md:flex-grow">
                        <label
                          className={
                            (state.isEditingProfile ? 'hidden' : '') +
                            ' text-sm text-black w-full h-8 px-3 leading-8'
                          }
                        >
                          {state.account.phone}
                        </label>
                        <input
                          className={
                            (state.isEditingProfile ? '' : 'hidden') +
                            ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                          }
                          type="text"
                          name="phone"
                          defaultValue={state.account.phone}
                          placeholder="電話番号"
                          maxLength={11}
                          onKeyUp={(e) =>
                            handleTextChange('phone', e.target.value)
                          }
                          onKeyPress={(e) => {
                            return handleNumberChange(e)
                          }}
                        />
                        <label
                          className={
                            (errorMessages.MobilePhone ? '' : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {errorMessages.MobilePhone}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-top inline-block w-5/12  h-80">
                <div className="align-top inline-block w-full rounded-xl border-gray-200 border h-48 bg-white my-4 py-5 ml-10">
                  <div className="mx-10 mb-2">
                    <div className="flex flex-wrap gap-0 w-full justify-center text-primary-200 text-xl">
                      ログイン情報
                    </div>
                    <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
                      <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center">
                        <div className="mb-1 md:mb-0 md:w-1/3">
                          <label className="text-sm text-gray-400">
                            メールアドレス:{' '}
                          </label>
                        </div>
                        <div className="md:w-2/3 flex-grow">
                          <label
                            className={
                              // (state.isEditingProfile ? 'hidden' : '') +
                              ' text-sm text-black w-full h-8 px-3 leading-8'
                            }
                          >
                            {state.account.email}
                          </label>

                          {/* <input
                            className={
                              (state.isEditingProfile ? '' : 'hidden') +
                              ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                            }
                            defaultValue={state.account.email}
                            type="text"
                            name="email"
                            placeholder="会社名"
                            onChange={handleTextChange}
                            disabled
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-0 w-full justify-start">
                      <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-4">
                        <div className="mb-1 md:mb-0 md:w-1/3">
                          <label className="text-sm text-gray-400">
                            パスワード:{' '}
                          </label>
                        </div>
                        <div className="md:w-2/3 md:flex-grow">
                          <label className="text-sm text-black w-full h-8 px-3 leading-8">
                            ***********
                          </label>
                          {/* <input
                            className={
                              (state.isEditingProfile ? '' : 'hidden') +
                              ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                            }
                            type="password"
                            name="pw"
                            defaultValue=""
                            placeholder="パスワード"
                            onChange={handleTextChange}
                            disabled
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div
                      className={
                        state.account.account_code ==
                        state.loggedInUser.contactPersonId
                          ? ''
                          : 'hidden ' +
                            'flex flex-wrap gap-0 w-full justify-start'
                      }
                    >
                      <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center">
                        <div className="mb-1 md:mb-0 md:w-1/3"></div>
                        <div className="md:w-2/3 md:flex-grow">
                          <a href="/company/setting/password">
                            <h1 className="text-sm text-black w-full h-8 px-3 leading-8 underline">
                              パスワード変更
                            </h1>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="align-top inline-block w-full rounded-xl border-gray-200 border h-40 bg-white mr-5 py-5 px-6 mt-4 ml-10">
                  <div className="mx-10  mb-2">
                    <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
                      <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                        <div className="mb-1 md:mb-0 md:w-1/3">
                          <label className="text-sm text-gray-400">
                            権限 :
                          </label>
                        </div>
                        <div className="md:w-2/3 flex-grow">
                          <label
                            style={{
                              display: state.isEditingProfile
                                ? state.authorityTransfer
                                  ? 'none'
                                  : 'block'
                                : 'block'
                            }}
                            className={
                              'text-sm text-black w-full h-8 px-3 leading-8'
                            }
                          >
                            {state.account.userTypeId == 3
                              ? '管理者'
                              : '副管理者'}
                          </label>
                          {
                            <select
                              style={{
                                display: state.isEditingProfile
                                  ? state.authorityTransfer
                                    ? 'block'
                                    : 'none'
                                  : 'none'
                              }}
                              name="authoritySelect"
                              onChange={(event) => userTypesChange(event)}
                            >
                              {state.userTypes.map(function (t) {
                                return (
                                  <option
                                    key={t.value}
                                    value={t.value}
                                    selected={
                                      state.account.userTypeId == t.value
                                    }
                                  >
                                    {t.name}
                                  </option>
                                )
                              })}
                            </select>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-4 ml-6 mr-32 py-5 px-6 mt-0 pt-3 pl-0 text-center">
                <button
                  onClick={handleUpdateSave}
                  className={
                    (errorMessages.hasError
                      ? 'bg-primary-100 pointer-events-none'
                      : 'bg-primary-200') +
                    ' bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm mr-5 space-x-2'
                  }
                  style={{
                    display: state.isEditingProfile ? '' : 'none'
                  }}
                  disabled={errorMessages.hasError || state.isLoading}
                >
                  {state.isEditingProfile ? '編集する' : '変更を保存'}&nbsp;
                  <img
                    src={waitingIcon}
                    className={
                      (state.isLoading ? ' ' : ' hidden ') + ' w-8 inline '
                    }
                  />
                </button>

                <button
                  onClick={handleClose}
                  style={{
                    display: state.isEditingProfile ? '' : 'none'
                  }}
                  className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
                >
                  <img className="inline mr-2" />
                  キャンセル
                </button>
              </div>
              {state.showPopupMessageDialog ? (
                <MessageDialog
                  handleCloseMessageDialog={handleCloseMessageDialog}
                  message={state.dialogMessage}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountProfileEdit
if (document.getElementById('company-accounts-profile')) {
  ReactDom.render(
    <AccountProfileEdit />,
    document.getElementById('company-accounts-profile')
  )
}
