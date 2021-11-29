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
      userTypeId: ''
    },
    accountSFValues: {
      Firstname: '',
      Lastname: '',
      Fullname: '',
      Email: '',
      MobilePhone: '',
      section_c: '',
      Title: ''
    },
    showPopupMessageDialog: false,
    dialogMessage: '',
    userTypes: [
      { name: 'Sub Company Admin', value: 4 },
      { name: 'Company Admin', value: 3 }
    ],
    isLoading: false,
    isEditingProfile: false,
    authorityTransfer: false,
    updatedAccount: {}
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

  const handleTextChange = (key, val) => {
    let account = { ...state.account }
    account[key] = val
    setState((prevState) => {
      return {
        ...prevState,
        account: account
      }
    })

    switch (key) {
      case 'name':
        key = 'Fullname'
        break
      case 'firstname':
        key = 'Firstname'
        break
      case 'lastname':
        key = 'Lastname'
        break
      case 'email':
        key = 'Email'
        break
      case 'phone':
        key = 'MobilePhone'
        break
      case 'userTypeId':
        key = 'section_c'
        break
      case 'position':
        key = 'Title'
        break
      default:
        key = ''
    }

    let accountSFValues = { ...state.accountSFValues }
    accountSFValues[key] = val
    setState((prevState) => {
      return {
        ...prevState,
        accountSFValues: accountSFValues
      }
    })
  }

  const userTypesChange = (value) => {
    const val = value === 3 ? true : false
    setState((prevState) => {
      return {
        ...prevState,
        account: { ...prevState.account, userTypeId: value },
        accountSFValues: { ...prevState.accountSFValues, section_c: val }
      }
    })
  }

  const handleUpdateSave = () => {
    if (confirm('本当にこのデータを更新してもよろしいですか？')) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: true
        }
      })

      const _accountSFValues = {
        Email: state.account.email,
        FirstName: state.account.firstname,
        Fullname: state.account.firstname + ' ' + state.account.lastname,
        LastName: state.account.lastname,
        MobilePhone: state.account.phone,
        Title: state.account.position,
        admin__c: state.account.userTypeId,
        username: state.account.email,
        Id: state.account.account_code
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
        console.log(response.data.data)
        let data = response.data.data
        let acct = {}
        acct.username = data.email
        acct.name = data.FullName
        acct.firstname = data.first_name
        acct.lastname = data.last_name
        acct.position = data.title
        acct.phone = data.contact_num
        acct.email = data.email
        acct.userTypeId = data.user_type_id
        acct.account_code = data.account_code
        setState((prevState) => {
          return {
            ...prevState,
            account: acct,
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
              <div className="align-top inline-block w-6/12 rounded-xl border-gray-200 border h-96 bg-white my-4 ml-5 mr-5 py-5 px-6">
                <div className="mx-10 mt-11 mb-2">
                  <div className="flex flex-wrap gap-0 w-full justify-center mt-4 text-primary-200 text-xl">
                    アカウントを更新
                  </div>
                  <div className="flex flex-wrap gap-0 w-full justify-start">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">苗字 :</label>
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
                          placeholder="苗字"
                          onChange={(e) =>
                            handleTextChange('lastname', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">名前 :</label>
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
                          placeholder="ファーストネーム"
                          onChange={(e) =>
                            handleTextChange('firstname', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-0 w-full justify-start">
                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">役職 :</label>
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
                          onChange={(e) =>
                            handleTextChange('position', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                      <div className="mb-1 md:mb-0 md:w-1/3">
                        <label className="text-sm text-gray-400">
                          電話番号 :
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
                          onChange={(e) =>
                            handleTextChange('phone', e.target.value)
                          }
                          onKeyPress={(e) => {
                            return handleNumberChange(e)
                          }}
                        />
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
                              (state.isEditingProfile ? 'hidden' : '') +
                              ' text-sm text-black w-full h-8 px-3 leading-8'
                            }
                          >
                            {state.account.email}
                          </label>
                          <input
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
                          />
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
                          <label
                            className={
                              (state.isEditingProfile ? 'hidden' : '') +
                              ' text-sm text-black w-full h-8 px-3 leading-8'
                            }
                          ></label>
                          <input
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
                          />
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
                            {state.account.userTypeId === 3
                              ? 'スーパー管理者​'
                              : '管理者​'}
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
                              value={state.account.userTypeId}
                              name="select"
                              onChange={(event) =>
                                userTypesChange(event.target.value)
                              }
                            >
                              {state.userTypes.map(function (t) {
                                return (
                                  <option
                                    key={t.value}
                                    value={t.value}
                                    defaultValue={
                                      state.account.userTypeId === 3
                                        ? 'スーパー管理者​'
                                        : '副管理者'
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
                  className="
              bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm mr-5 space-x-2"
                  style={{
                    display: state.isEditingProfile ? '' : 'none'
                  }}
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
