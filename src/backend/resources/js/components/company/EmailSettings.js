import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SettingSideNav from '../SettingSideNav'
import waitingIcon from '../../../img/loading-spinner.gif'
import axios from 'axios'
const EmailSettings = () => {
  let userData = JSON.parse(document.getElementById('userData').textContent)
  var minheight = { 'min-height': '700px' }
  const [errorMessages, setErrorMessages] = useState({
    newEmail: '',
    newEmail2: '',
    hasError: false
  })
  var url_string = window.location.href
  var url = new URL(url_string)
  var inviteToken = url.searchParams.get('token')
  var tempEmail = url.searchParams.get('temp_email')

  const [state, setState] = useState({
    currentEmail: userData.email,
    enteredCurrentEmail: '',
    newEmail: '',
    newEmail2: '',
    status: '',
    message: '',
    validationFields: ['newEmail', 'newEmail2', 'enteredCurrentEmail'],
    isLoading: false,
    userId: userData.userId,
    isVefication: inviteToken ? true : false,
    inviteToken: inviteToken,
    tempEmail: tempEmail
  })

  const handleChangeEmail = () => {
    let hasError = false
    let errorMessage = ''
    let _errorMessages = errorMessages
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })
    state.validationFields.map((field) => {
      clearErrors()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      errorMessage = ''
      switch (field) {
        case 'newEmail':
          if (state.newEmail === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (!emailRegex.test(state.newEmail)) {
            errorMessage = '有効なメールアドレスを入力してください'
            hasError = true
          } else if (state.enteredCurrentEmail === state.newEmail) {
            errorMessage =
              '新しいメールアドレスは現在のメールアドレスと同じです。'
            hasError = true
          }
          break
        case 'newEmail2':
          if (state.newEmail2 === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (state.newEmail2 !== state.newEmail) {
            errorMessage = 'メールアドレスが一致しません'
            hasError = true
            _errorMessages['newEmail'] = errorMessage
          } else if (!emailRegex.test(state.newEmail2)) {
            errorMessage = '有効なメールアドレスを入力してください'
            hasError = true
          }
          break
        case 'enteredCurrentEmail':
          if (state.enteredCurrentEmail === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (!emailRegex.test(state.enteredCurrentEmail)) {
            errorMessage = '有効なメールアドレスを入力してください'
            hasError = true
          } else if (state.enteredCurrentEmail !== state.currentEmail) {
            errorMessage = '入力した現在のメールアドレスが正しくありません'
            hasError = true
          }
          break
      }

      _errorMessages[field] = errorMessage
      _errorMessages['hasError'] = hasError
    })
    setErrorMessages(() => {
      return {
        ..._errorMessages
      }
    })
    if (errorMessages.hasError) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: false
        }
      })
      return
    }

    // new URLSearchParams(location.search) + '/resendEmailInvite'
    let url = '/email/inviteNewEmail'
    let data = {
      token: document.querySelector('meta[name="csrf-token"]').content,
      id: state.userId,
      enteredCurrentEmail: state.enteredCurrentEmail,
      newEmail: state.newEmail,
      newEmail2: state.newEmail2
    }
    axios
      .post(url, data, {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        response = response.data
        if (!response.status) {
          _errorMessages = errorMessages
          _errorMessages['hasError'] = true
          for (const key in response.errors) {
            _errorMessages[key] = response.errors[key]
            _errorMessages['hasError'] = hasError
          }
          setErrorMessages(() => {
            return {
              ..._errorMessages
            }
          })
          setState((prevState) => {
            return {
              ...prevState,
              isLoading: false,
              message: response.message
            }
          })
          return
        }
        clearErrors()
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            message:
              'お客様のアカウントに認証のためにメールをお送りしました。登録メールアドレスの変更を完了するために、認証を有効にしてください。',
            newEmail: '',
            newEmail2: '',
            status: '',
            enteredCurrentEmail: ''
          }
        })
        var elements = document.getElementsByTagName('input')
        for (let x = 0; x < elements.length; x++) {
          elements[x].value = ''
        }
      })
      .catch(() => {
        setErrorMessages((prevState) => {
          return {
            ...prevState,
            hasError: true
          }
        })
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            message: 'リクエスト中にエラーが発生しました'
          }
        })
      })
  }

  const handleVerifyEmail = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })

    let url = '/email/updateSubAdminByEmail'
    let data = {
      token: document.querySelector('meta[name="csrf-token"]').content,
      inviteToken: state.inviteToken,
      id: state.userId,
      newEmail: state.tempEmail
    }
    axios
      .post(url, data, {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        response = response.data
        if (!response.status) {
          setErrorMessages((prevState) => {
            return {
              ...prevState,
              hasError: true
            }
          })
          setState((prevState) => {
            return {
              ...prevState,
              isLoading: false,
              message: response.message
            }
          })
          return
        }
        window.location.href = '/logout'
      })
      .catch(() => {
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            message:
              '保存中にエラーが発生しました。アカウントが有効かどうかを確認してください。'
          }
        })
        // handleError(err)
      })
  }

  function keyPressed(event) {
    var key = event.keyCode || event.charCode || event.which
    return key
  }

  const handleTextChange = (key, e) => {
    let hasError = false
    let errorMessage = ''
    let val = e.target.value.replace(/\s+/g, '')
    var keycode = keyPressed(e)
    if (keycode == 32) {
      e.preventDefault()
      return false
    }
    switch (key) {
      case 'newEmail':
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      case 'newEmail2':
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
    }

    let _errorMessages = errorMessages
    _errorMessages[key] = errorMessage
    _errorMessages['hasError'] = hasError
    setErrorMessages(() => {
      return {
        ..._errorMessages
      }
    })

    let _state = state
    _state[key] = val
    _state['message'] = ''
    setState(() => {
      return {
        ..._state
      }
    })
  }

  const clearErrors = () => {
    setErrorMessages(() => {
      return {
        newEmail: '',
        newEmail2: '',
        hasError: false
      }
    })
  }
  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <SettingSideNav />
      <div className="bg-white rounded-lg my-10 w-8/12 mx-auto col-span-5 ">
        <div className="p-3 pb-6">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">メールアドレス</h2>
          </div>
          <div className="text-center">
            <div
              className={
                (state.isVefication ? 'hidden ' : '') +
                'align-top inline-block h-auto bg-white my-4 ml-5 mr-5 py-5 px-6'
              }
            >
              <div className="mx-auto">
                <div className="flex flex-wrap gap-0 w-full justify-start">
                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/3 text-left">
                      <label className="text-sm text-gray-400">
                        現在の電子メールアドレス :
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="email"
                        name="enteredCurrentEmail"
                        value={state.enteredCurrentEmail}
                        onChange={(e) =>
                          handleTextChange('enteredCurrentEmail', e)
                        }
                      />
                      <h1
                        className={
                          (errorMessages.enteredCurrentEmail ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.enteredCurrentEmail}
                      </h1>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/3 text-left">
                      <label className="text-sm text-gray-400">
                        メールアドレス :<span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="email"
                        name="newPassword"
                        value={state.newEmail}
                        onChange={(e) => handleTextChange('newEmail', e)}
                      />
                      <h1
                        className={
                          (errorMessages.newEmail ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.newEmail}
                      </h1>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5 text-left">
                    <div className="mb-1 md:mb-0 md:w-1/3">
                      <label className="text-sm text-gray-400">
                        メールアドレス（確認） :
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="email"
                        name="newEmail2"
                        value={state.newEmail2}
                        onChange={(e) => handleTextChange('newEmail2', e)}
                      />
                      <h1
                        className={
                          (errorMessages.newEmail2 ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.newEmail2}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-5 mt-0 pl-0 text-center space-x-10">
                <h1
                  className={
                    (state.message !== '' ? '' : 'hidden') +
                    ' mb-3 text-lg w-full px-3 leading-8 font-medium' +
                    (errorMessages.hasError
                      ? ' text-red-600'
                      : ' text-green-700')
                  }
                >
                  {state.message}
                </h1>
                <button
                  className=" bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm w-32 h-12"
                  onClick={() => {
                    history.back()
                  }}
                >
                  <img className="inline mr-2" />
                  キャンセル
                </button>
                <button
                  onClick={handleChangeEmail}
                  className={
                    (errorMessages.hasError
                      ? 'bg-primary-100 pointer-events-none'
                      : 'bg-primary-200') +
                    ' bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm w-32 h-12'
                  }
                  disabled={errorMessages.hasError || state.isLoading}
                >
                  <img
                    src={waitingIcon}
                    className={
                      (state.isLoading ? ' ' : ' hidden ') + ' w-8 inline '
                    }
                  />
                  変更
                </button>
              </div>
            </div>
            <div
              className={
                (state.isVefication ? '' : 'hidden ') +
                'align-top inline-block h-auto bg-white my-4 ml-5 mr-5 py-5 px-6'
              }
            >
              <div className="mx-auto">
                クリックしてメールアドレス変更を完了してください。
                <h1
                  className={
                    (state.message !== '' ? '' : 'hidden') +
                    ' text-red-600 mb-3 text-lg w-full px-3 leading-8 font-medium'
                  }
                >
                  {state.message}
                </h1>
                <div className="py-5 mt-0 pl-0 text-center space-x-10">
                  <button
                    onClick={handleVerifyEmail}
                    className={
                      ' bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 w-70 h-12'
                    }
                  >
                    <img
                      src={waitingIcon}
                      className={
                        (state.isLoading ? ' ' : ' hidden ') + ' w-8 inline '
                      }
                    />
                    変更を保存してログアウトする
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EmailSettings
if (document.getElementById('company-settings-email')) {
  ReactDOM.render(
    <EmailSettings />,
    document.getElementById('company-settings-email')
  )
}