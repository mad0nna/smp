import React, { useState } from 'react'
import _, { isEmpty } from 'lodash'
import waitingIcon from '../../img/loading-spinner.gif'
import axios from 'axios'

// accepts english, hiragana, kanji and half and full-width katakana
const regex = new RegExp('^[ ]*[a-zA-Zぁ-ゞァ-ヾＡ-ｚｧ-ﾝﾞﾟｦ-ﾟ一-龯]+[ ]*?$')

const NewAccount = (props) => {
  const [state, setState] = useState({
    addingAccount: '',
    email: '',
    fullName: '',
    firstName: '',
    lastName: '',
    isLoading: false,
    isLoadingOfAddingContact: false,
    isSearched: false,
    disableSendButton: true,
    source: '',
    foundAccount: {
      first_name: '',
      last_name: '',
      contact_num: '',
      title: '',
      account_code: '',
      user_type_id: ''
    }
  })

  const handleLastNameChange = (e) => {
    let value = e.target.value.replace(/\d+|\s+|[０-９]+/g, '')
    if (isEmpty(value) || !regex.test(value)) {
      return setState((prevState) => {
        return {
          ...prevState,
          disableSendButton: true,
          lastName: value
        }
      })
    }

    if (
      !isEmpty(state.foundAccount) &&
      !isEmpty(state.email) &&
      regex.test(value) &&
      regex.test(state.firstName)
    ) {
      return setState((prevState) => {
        return {
          ...prevState,
          disableSendButton: false,
          lastName: value
        }
      })
    }

    if (
      !isEmpty(state.email) &&
      state.source === 'smp' &&
      regex.test(value) &&
      regex.test(state.firstName)
    ) {
      return setState((prevState) => {
        return {
          ...prevState,
          lastName: value,
          disableSendButton: false
        }
      })
    }

    return setState((prevState) => {
      return {
        ...prevState,
        lastName: value
      }
    })
  }

  const handleFirstNameChange = (e) => {
    let value = e.target.value.replace(/\d+|\s+/g, '')
    if (isEmpty(value) || !regex.test(value)) {
      return setState((prevState) => {
        return {
          ...prevState,
          disableSendButton: true,
          firstName: value
        }
      })
    }

    if (
      !isEmpty(state.foundAccount) &&
      !isEmpty(state.email) &&
      regex.test(value) &&
      regex.test(state.lastName)
    ) {
      return setState((prevState) => {
        return {
          ...prevState,
          disableSendButton: false,
          firstName: value
        }
      })
    }

    if (
      !isEmpty(state.email) &&
      state.source === 'smp' &&
      regex.test(value) &&
      regex.test(state.lastName)
    ) {
      return setState((prevState) => {
        return {
          ...prevState,
          firstName: value,
          disableSendButton: false
        }
      })
    }

    return setState((prevState) => {
      return {
        ...prevState,
        firstName: value
      }
    })
  }

  const handleEmailChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
        foundAccount: {},
        firstName: '',
        lastName: '',
        fullName: '',
        searchResult: '',
        isSearched: false,
        disableSendButton: true
      }
    })
  }
  const searchAdminByEmail = (email) => {
    if (validateEmail(email)) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: true,
          searchResult: ''
        }
      })

      axios
        .get(`/company/findInSFByEmail?email=${email}`)
        .then((response) => {
          setState((prevState) => {
            let data = response.data.data
            if (data.existsInDB) {
              return {
                disableSendButton: true,
                searchResult: data.message,
                firstName: data.first_name,
                lastName: data.last_name,
                email: email
              }
            }
            if (data === false) {
              return {
                ...prevState,
                isLoading: false,
                isSearched: true,
                source: 'smp',
                searchResult:
                  '未登録のユーザーです。名前を入力して招待を送信してください。',
                email: email,
                firstName: '',
                lastName: ''
              }
            } else {
              return {
                ...prevState,
                isLoading: false,
                isSearched: true,
                foundAccount: data,
                source: 'salesforce',
                // searchResult:
                //   foundAccount.source === 'salesforce'
                //     ? 'セールスフォースに存在するユーザーです。 招待状を送信してもよろしいですか？'
                //     : '既に追加されているユーザーです。アカウント一覧をご確認ください',
                searchResult: data.message,
                email: email,
                fullName: data.fullName,
                firstName: data.first_name,
                lastName: data.last_name,
                contact_num: data.contact_num,
                title: data.title,
                account_code: data.account_code,
                user_type_id: data.user_type_id,
                disableSendButton: false
              }
            }
          })
        })
        .catch(function (error) {
          if (error.response) {
            // const admin = state.foundAccount
            setState((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                isSearched: true,
                foundAccount: '',
                searchResult:
                  '未登録のユーザーです。名前を入力して招待を送信してください。'
              }
            })
          }
        })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          searchResult: '有効なメールアドレスを入力してください'
        }
      })
    }
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  const handleDisplayAddedAdmin = (user) => {
    if (validateEmail(user.email)) {
      if (user.source != 'salesforce') {
        user.isPartial = 1
      } else {
        user.isPartial = 0
      }

      setState((prevState) => {
        return {
          ...prevState,
          isLoadingOfAddingContact: true,
          searchResult: ''
        }
      })

      axios
        .post('/company/addCompanyAdmin', user, {
          'Content-Type': 'application/json'
        })
        .then((response) => {
          if (response.status == 200) {
            setState((prevState) => {
              return {
                ...prevState,
                showPopupNewAccount: false,
                isLoadingOfAddingContact: false,
                showPopupMessageDialog: true,
                dialogMessage:
                  '管理者が追加されました。 \n 追加された管理者に招待メールが送信されます。',
                disableSendButton: true
              }
            })
          }
          location.reload()
        })
        .catch(function (error) {
          if (error.response.status == 409) {
            setState((prevState) => {
              return {
                ...prevState,
                searchResult: error.response.data.message,
                isLoadingOfAddingContact: false,
                disableSendButton: true
              }
            })
            return
          }
          if (error.response) {
            setState((prevState) => {
              return {
                ...prevState,
                isLoadingOfAddingContact: false,
                showPopupNewAccount: false,
                showPopupMessageDialog: true,
                dialogMessage: '正しいメールアドレスを入力してください。',
                disableSendButton: true
              }
            })
          }
        })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          searchResult: '有効なメールアドレスを入力してください'
        }
      })
    }
  }

  return (
    <div
      className={
        (state.isSearched ? ' h-96 ' : ' h-64 ') +
        ' rounded-lg border-2 border-gray-200 absolute md:inset-1/3 top-50 m-auto bg-tertiary-500 opacity-85'
      }
    >
      <div className="flex flex-wrap gap-0 w-full justify-center mt-8">
        <div className="w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5 grid grid-cols-2 md:ml-1 lg:ml-1 xl-ml-2 justify-start 2xl:pl-16 xl:pl-4 lg:pl-3">
          <div className="justify-center">
            <label className="text-sm text-white 2xl:w-42 xl:w-42 lg:w-26 h-8 leading-8 col-span-1 pr-1">
              メールアドレス :
            </label>
            <input
              className="text-sm 2xl:w-60 xl:w-48 lg:w-28 col-span-1 h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3 ml-1"
              defaultValue={state.email}
              type="text"
              onChange={handleEmailChange}
            />
            <button
              disabled={state.isLoading}
              onClick={() => searchAdminByEmail(state.email)}
              className="w-24 xl:w-24 lg:w-24 cursor-pointer col-span-1 text-bold text-tertiary-500 bg-white rounded p-1 text-sm"
            >
              検索する
              <img
                src={waitingIcon}
                className={
                  (state.isLoading ? ' ' : ' hidden ') + ' w-7 inline '
                }
              />
            </button>
          </div>
          <div className={state.isSearched ? '' : 'hidden'}>
            <div className=" w-96 mt-5">
              <label className="ml-10 text-sm text-white w-48 h-8 pr-1 leading-8 text-left col-span-1">
                権限 :
              </label>
              <label className="ml-2 col-span-1 text-white w-1/2 my-2">
                {state.user_type_id == 3 ? '管理者' : '副管理者'}
              </label>
            </div>
            <div className="w-full">
              <label className="text-sm text-white w-48 h-8 pr-1 leading-8 text-left col-span-1">
                氏名（姓）:
              </label>
              <input
                className="ml-2 text-sm col-span-1 2xl:w-56 xl:w-56 lg:w-34 h-8 px-3 py-2 my-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3"
                onChange={handleLastNameChange}
                value={state.lastName}
                type="text"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-white w-48 h-8 pr-1 leading-8 text-left col-span-1 ">
                氏名（名）:
              </label>
              <input
                className="ml-2 text-sm col-span-1 2xl:w-56 xl:w-56 lg:w-34 h-8 px-3 py-2 my-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3"
                onChange={handleFirstNameChange}
                value={state.firstName}
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
      <p className="text-sm inline-block text-white w-full h-10 leading-8 text-left text-center pt-3">
        {!_.isEmpty(state.searchResult) ? state.searchResult : ''}
      </p>
      <div className="flex flex-wrap gap-0 w-full justify-start">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center ">
          <p className="text-center w-full text-white"></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-10">
        <div className={state.isSearched ? '' : 'hidden'}>
          <button
            onClick={() => {
              handleDisplayAddedAdmin({
                source: state.source,
                email: state.email,
                first_name: state.firstName,
                last_name: state.lastName,
                fullName: state.fullName,
                contact_num: state.foundAccount.contact_num,
                title: state.foundAccount.title,
                account_code: state.foundAccount.account_code,
                user_type_id: state.foundAccount.user_type_id
              })
            }}
            className={
              (state.disableSendButton
                ? 'text-gray-500 cursor-default'
                : 'text-tertiary-500 cursor-pointer') +
              ' rounded-xl font-extrabold w-40 py-2 px-3 mr-4 tracking-tighter bg-white'
            }
            disabled={state.disableSendButton}
          >
            招待を送信 &nbsp;
            <img
              src={waitingIcon}
              className={
                (state.isLoadingOfAddingContact ? ' ' : ' hidden ') +
                ' w-7 inline '
              }
            />
          </button>
        </div>
        <button
          onClick={props.closePopup}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3 text-tertiary-500 tracking-tighter bg-white mr-4"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default NewAccount
