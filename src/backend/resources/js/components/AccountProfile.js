import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import axios from 'axios'
import _, { isEmpty } from 'lodash'
import MessageDialog from './MessageDialog'
import ConfirmTransferAuthority from './admin/company/ConfirmDialog'

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
    popUpConfirmMessage: '',
    showPopupConfirmTransferAuthority: false,
    dialogMessage: '',
    userTypes: [
      { name: '管理者', value: 3 },
      { name: '副管理者', value: 4 }
    ],
    isLoading: false,
    isEditingProfile: false,
    authorityTransfer: false,
    updatedAccount: {},
    loggedInUser: {},
    reload: true,
    errors: [],
    errorMessages: {},
    currentUserId: ''
  })

  const validate = (fields) => {
    const numbersOnly = /^[0-9０-９]+$/g
    let keys = Object.keys(fields)
    keys.forEach((key) => {
      if (key === 'firstname' || key === 'lastname') {
        if (isEmpty(fields[key])) {
          addError(key, '必須フィールド')
          return
        }
        removeError(key)
      }
      if (key === 'phone') {
        if (isEmpty(fields[key])) {
          removeError(key)
          return
        }
        if (fields[key].length < 10 || fields[key].length > 11) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        if (isEmpty(fields[key].match(numbersOnly))) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        removeError(key)
      }
    })
  }

  const handleTextChange = (event) => {
    let key = event.target.name
    let val = event.target.value.trim()
    setState((prevState) => {
      return {
        ...prevState,
        account: {
          ...prevState.account,
          [key]: val
        }
      }
    })
    validate({ [key]: val })
  }

  const addError = (key, message) => {
    if (_.includes(state.errors, key)) {
      setState((prevState) => {
        return {
          ...prevState,
          errorMessages: {
            ...prevState.errorMessages,
            [key]: message
          }
        }
      })
      return
    }
    let newError = state.errors
    newError.push(key)
    setState((prevState) => {
      return {
        ...prevState,
        errors: newError,
        errorMessages: {
          ...prevState.errorMessages,
          [key]: message
        }
      }
    })
  }

  const removeError = (key) => {
    if (!_.includes(state.errors, key)) {
      return
    }
    setState((prevState) => {
      let newError = prevState.errors
      let keyIndex = newError.indexOf(key)
      delete newError[keyIndex]
      newError = newError.filter(function (e) {
        return e != null
      })
      return {
        ...prevState,
        errors: newError
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
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })
    submitData()
  }

  const submitData = () => {
    axios
      .put(
        '/company/updateAdminByEmail',
        {
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
        },
        {
          'Content-Type': 'application/json'
        }
      )
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
              dialogMessage: '企業情報の更新に失敗しました'
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
            dialogMessage: response['data']['message']
          }
        })
        closeConfirmDialog()
      })
      .catch(function (error) {
        closeConfirmDialog()
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            showPopupMessageDialog: true,
            dialogMessage: error.response.data.error
          }
        })
      })
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
    state.reload ? location.replace('/company/accountslist') : ''
  }

  const openConfirmDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupConfirmTransferAuthority: true
      }
    })
    if (state.account.changeRole) {
      setState((prevState) => {
        return {
          ...prevState,
          popUpConfirmMessage:
            '権限をこのユーザーに譲渡しようとしています。このまま移行してもよろしいですか？'
        }
      })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          popUpConfirmMessage: '本当にこのデータを更新してもよろしいですか？'
        }
      })
    }
  }

  const closeConfirmDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupConfirmTransferAuthority: false
      }
    })
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
            authorityTransfer: data.authorityTransfer,
            currentUserId: id
          }
        })
      })
      .catch(function () {
        alert('記録が見当たりませんでした')
      })

    axios.get(location.origin + '/getLoggedinUser').then((response) => {
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
    <div className="relative">
      <div className="bg-primaryBg grid grid-cols-3 font-meiryo gap-6">
        <div className="col-span-3 w-full rounded-lg bg-white border-lightGreen">
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
                  <div className="flex flex-wrap gap-0 w-full justify-center mt-4 text-tertiary-500 text-xl">
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
                          value={state.account.lastname}
                          type="text"
                          name="lastname"
                          placeholder="ラストネーム"
                          onChange={(e) => handleTextChange(e)}
                        />
                        <label
                          className={
                            (_.includes(state.errors, 'lastname')
                              ? ''
                              : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {state.errorMessages['lastname']}
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
                          value={state.account.firstname}
                          type="text"
                          name="firstname"
                          placeholder="ファーストネーム​"
                          onChange={(e) => handleTextChange(e)}
                        />

                        <label
                          className={
                            (_.includes(state.errors, 'firstname')
                              ? ''
                              : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {state.errorMessages['firstname']}
                        </label>
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
                          value={state.account.position}
                          placeholder="役職"
                          onChange={(e) => handleTextChange(e)}
                        />
                        <label
                          className={
                            (_.includes(state.errors, 'position')
                              ? ''
                              : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {state.errorMessages['position']}
                        </label>
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
                          value={state.account.phone}
                          maxLength={11}
                          placeholder="電話番号"
                          onChange={(e) => handleTextChange(e)}
                        />
                        <label
                          className={
                            (_.includes(state.errors, 'phone')
                              ? ''
                              : 'hidden') +
                            ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                          }
                        >
                          {state.errorMessages['phone']}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="align-top inline-block w-5/12  h-80">
                <div className="align-top inline-block w-full rounded-xl border-gray-200 border h-48 bg-white my-4 py-5 ml-10">
                  <div className="mx-10 mb-2">
                    <div className="flex flex-wrap gap-0 w-full justify-center text-tertiary-500 text-xl">
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
                              ' text-sm text-black h-8 px-3 leading-8'
                            }
                          >
                            {state.account.email}
                          </label>
                          <a
                            href={`/company/setting/email`}
                            className={
                              state.account.userTypeId === 4 ? `` : `hidden`
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              className="inline-block"
                              style={{ height: '1.2rem' }}
                            >
                              <path d="M0 0h24v24H0z" fill="none" />
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                            </svg>
                          </a>
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
                              display: state.authorityTransfer
                                ? 'none'
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
                                display: state.authorityTransfer
                                  ? 'block'
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
                  onClick={openConfirmDialog}
                  className={
                    (state.errors.length > 0
                      ? 'bg-lightGreen pointer-events-none'
                      : 'bg-tertiary-500') +
                    ' bg-tertiary-500 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm mr-5 space-x-2'
                  }
                  style={{
                    display: state.isEditingProfile ? '' : 'none'
                  }}
                  disabled={state.errors.length > 0 || state.isLoading}
                >
                  {state.isEditingProfile ? '編集する' : '変更を保存'}
                </button>

                <button
                  onClick={handleClose}
                  style={{
                    display: state.isEditingProfile ? '' : 'none'
                  }}
                  className="bg-tertiary-500 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
                >
                  <img alt="" className="inline mr-2" />
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

      {state.showPopupConfirmTransferAuthority ? (
        <ConfirmTransferAuthority
          closeDialog={closeConfirmDialog}
          handleOkey={handleUpdateSave}
          message={state.popUpConfirmMessage}
          isLoading={state.isLoading}
        />
      ) : null}
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
