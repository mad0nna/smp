import React, { useState } from 'react'
import _, { isEmpty } from 'lodash'
import waitingIcon from '../../img/loading-spinner.gif'
import axios from 'axios'

const NewAccount = (props) => {
  const [state, setState] = useState({
    addingAccount: '',
    email: '',
    fullName: '',
    firstName: '',
    lastName: '',
    isLoading: false,
    isLoadingOfAddingContact: false,
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
  const handleNameChange = (e) => {
    let regex = new RegExp('^[a-zA-Z]+ [a-zA-Z]+[ ]*?$')

    if (e.shiftKey || e.ctrlKey || e.altKey) {
      e.preventDefault()
    } else {
      var key = e.keyCode

      if (
        !(
          key == 8 ||
          key == 32 ||
          key == 46 ||
          (key >= 35 && key <= 40) ||
          (key >= 65 && key <= 90)
        )
      ) {
        e.preventDefault()
      }
    }

    if (isEmpty(e.target.value) || !regex.test(e.target.value)) {
      return setState((prevState) => {
        return {
          ...prevState,
          disableSendButton: true,
          fullName: e.target.value
        }
      })
    }
    if (
      !isEmpty(state.foundAccount) &&
      !isEmpty(state.email) &&
      regex.test(e.target.value)
    ) {
      setState((prevState) => {
        return {
          ...prevState,
          fullName: e.target.value,
          disableSendButton: false
        }
      })
    }
    if (
      !isEmpty(state.email) &&
      state.source === 'smp' &&
      regex.test(e.target.value)
    ) {
      setState((prevState) => {
        return {
          ...prevState,
          fullName: e.target.value,
          disableSendButton: false
        }
      })
    }
    setState((prevState) => {
      return {
        ...prevState,
        fullName: e.target.value
      }
    })
  }
  const handleEmailChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        email: e.target.value,
        foundAccount: {},
        fullName: '',
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
            let foundAccount = response.data.data
            if (foundAccount === false) {
              return {
                ...prevState,
                isLoading: false,
                source: 'smp',
                searchResult:
                  '未登録のユーザーです。名前を入力して招待を送信してください。',
                email: email
              }
            } else {
              return {
                ...prevState,
                isLoading: false,
                foundAccount: foundAccount,
                source: 'salesforce',
                // searchResult:
                //   foundAccount.source === 'salesforce'
                //     ? 'セールスフォースに存在するユーザーです。 招待状を送信してもよろしいですか？'
                //     : '既に追加されているユーザーです。アカウント一覧をご確認ください',
                searchResult: foundAccount.message,
                email: email,
                fullName: foundAccount.fullName,
                firstName: foundAccount.first_name,
                lastName: foundAccount.last_name,
                contact_num: foundAccount.contact_num,
                title: foundAccount.title,
                account_code: foundAccount.account_code,
                user_type_id: foundAccount.user_type_id,
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
        const fullName = user.fullName.trim()
        let arr = []
        arr = fullName.split(' ')
        user.firstname = arr[1] ? arr[1] : ''
        user.lastname = arr[0] ? arr[0] : ''
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
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 h-80 top-48 m-auto bg-primary-200 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-center mt-8">
        <div className="w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5 grid grid-cols-2 justify-start 2xl:pl-14 xl:pl-8 lg:pl-6">
          <div className="justify-center">
            <label className="text-sm text-white 2xl:w-42 xl:w-42 lg:w-26 h-8 leading-8 col-span-1">
              メールアドレス:
            </label>
            <input
              className="text-sm 2xl:w-60 xl:w-58 lg:w-36 col-span-1 h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3 ml-2"
              defaultValue={state.email}
              type="text"
              onChange={handleEmailChange}
            />
            <button
              disabled={state.isLoading}
              onClick={() => searchAdminByEmail(state.email)}
              className="w-24 xl:w-24 lg:w-24 cursor-pointer col-span-1 text-bold   text-primary-200   bg-white rounded p-1 text-sm"
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
          <div className=" w-96 mt-5">
            <label className="ml-10 text-sm text-white w-48 h-8 pr-3 leading-8 text-left col-span-1">
              権限 :
            </label>
            <label className="col-span-1 text-white w-1/2 my-2">副管理者</label>
          </div>
          <div className="w-full">
            <label className="ml-10 text-sm text-white w-48  h-8 pr-3 leading-8 text-left col-span-1 ">
              名前 :
            </label>
            <input
              className=" text-sm col-span-1 2xl:w-56 xl:w-56 lg:w-34 h-8 px-3 py-2 my-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3"
              onKeyDownCapture={handleNameChange}
              defaultValue={state.fullName}
              type="text"
            />
          </div>
          <p className="text-sm inline-block text-white w-full h-8 leading-8 text-left pl-10">
            {!_.isEmpty(state.searchResult) ? state.searchResult : ''}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center ">
          <p className="text-center w-full text-white"></p>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-4">
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
              : 'text-primary-200 cursor-pointer') +
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
        <button
          onClick={props.closePopup}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-primary-200  tracking-tighter bg-white mr-4"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default NewAccount
