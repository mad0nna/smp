import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MessageDialog from './messageDialog'
import waitingIcon from '../../img/loading-spinner.gif'
import _ from 'lodash'
import queryString from 'query-string'
// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const AccountProfileEdit = (props) => {
  const [state, setState] = useState({
    mode: props.mode,
    dataEmpty: _.isEmpty(props.account) ? true : false,
    loggedUser: props.loggedUser,
    account: initAccount(),
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
    isEditingProfile: props.mode === 'edit' ? true : false,
    userTypes: [
      { name: 'Sub Company Admin', value: 4 },
      { name: 'Company Admin', value: 3 }
    ],
    isLoading: false,
    updatedAccount: {}
  })

  function initAccount() {
    let acct = {}
    if (props.account) {
      acct.username = props.account.username
      acct.name = props.account.Name
      acct.lastname = props.account.last_name
      acct.firstname = props.account.first_name
      acct.position = props.account.title
      acct.phone = props.account.contact_num
      acct.email = props.account.email
      acct.userTypeId = props.account.user_type_id
    } else {
      acct.username = ''
      acct.name = ''
      acct.lastname = ''
      acct.firstname = ''
      acct.position = ''
      acct.phone = ''
      acct.email = ''
      acct.userTypeId = ''
    }

    return acct
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
    console.log('handleUpdateSave')

    if (confirm('Are you sure do you want to update this data?')) {
      console.log(state.account)

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
        username: state.account.email
      }
      console.log(_accountSFValues)
      axios
        .put('/salesforce/updateAdminByEmail', _accountSFValues, {
          'Content-Type': 'application/json'
        })
        .then((response) => {
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
    console.log('handleClose')
    props.handleDisplayList()
  }

  const handleCloseMessageDialog = () => {
    console.log('handleCloseMessageDialog')
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: false
      }
    })
    props.handleDisplayList(state.updatedAccount, props.accountToUpdateIndex)
  }

  useEffect(() => {
    let id = ''
    if (!_.isEmpty(props.account)) {
      id = props.account.id
    } else {
      let params = queryString.parse(location.search)
      id = params.id
    }

    axios
      .get(`/company/searchSFContactByUserId?id=${id}`)
      .then((response) => {
        let data = response.data.data
        console.log('request respond')
        console.log(data)
        let acct = {}
        acct.username = data.email
        acct.name = data.FullName
        acct.firstname = data.first_name
        acct.lastname = data.last_name
        acct.position = data.title
        acct.phone = data.contact_num
        acct.email = data.email
        acct.userTypeId = data.user_type_id

        setState((prevState) => {
          return {
            ...prevState,
            account: acct,
            dataEmpty: false
          }
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status)
        }
      })
  }, [props.account])

  return (
    <div className="w-full">
      <div className="align-top inline-block w-6/12 rounded-xl border-gray-200 border h-96 bg-white my-4 ml-5 mr-5 py-5 px-6">
        <div className="mx-10 mt-11 mb-2">
          <div className="flex flex-wrap gap-0 w-full justify-center mt-4 text-primary-200 text-xl">
            アカウントを更新
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label className="text-sm text-gray-400">
                  ファーストネーム :
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
                  onChange={(e) => handleTextChange('lastname', e.target.value)}
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
                  onChange={(e) => handleTextChange('position', e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/3">
                <label className="text-sm text-gray-400">電話番号 :</label>
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
                  onChange={(e) => handleTextChange('phone', e.target.value)}
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
                  <label className="text-sm text-gray-400">パスワード: </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    ********
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="password"
                    name="pw"
                    defaultValue="********"
                    placeholder="電話番号"
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
                  <label className="text-sm text-gray-400">権限 :</label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.account.userTypeId === 3
                      ? 'Company Admin'
                      : 'Sub Company Admin'}
                  </label>
                  {
                    <select
                      disabled={
                        state.loggedUser.userTypeId === 3 ? `` : `disabled`
                      }
                      style={{
                        display: state.isEditingProfile ? 'block' : 'none'
                      }}
                      value={state.account.userTypeId}
                      name="select"
                      onChange={(event) => userTypesChange(event.target.value)}
                    >
                      {state.userTypes.map(function (t) {
                        return (
                          <option
                            key={t.value}
                            value={t.value}
                            defaultValue={
                              state.account.userTypeId === 3
                                ? 'Company Admin'
                                : 'Sub Company Admin'
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
            className={(state.isLoading ? ' ' : ' hidden ') + ' w-8 inline '}
          />
        </button>

        <button
          onClick={handleClose}
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
  )
}

export default AccountProfileEdit
