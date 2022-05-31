import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SettingSideNav from '../SettingSideNav'
import waitingIcon from '../../../img/loading-spinner.gif'
import axios from 'axios'
const PasswordSettings = () => {
  var minheight = { 'min-height': '700px' }
  const [errorMessages, setErrorMessages] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    hasError: false
  })
  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    newPassword2: '',
    status: '',
    message: '',
    validationFields: ['oldPassword', 'newPassword', 'newPassword2'],
    isLoading: false
  })

  const handleChangePassword = () => {
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
      const passwordRegex =
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      errorMessage = ''
      switch (field) {
        case 'oldPassword':
          if (state.oldPassword === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break
        case 'newPassword':
          if (state.newPassword === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (!passwordRegex.test(state.newPassword)) {
            errorMessage =
              'パスワードは以下の内容を有する必要があります。　1文字以上の大文字、1文字以上の特殊記号を含む最低8桁以上の英数字'
            hasError = true
          }
          break
        case 'newPassword2':
          if (state.newPassword2 === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (state.newPassword2 !== state.newPassword) {
            errorMessage = 'パスワードが一致しません'
            hasError = true
            _errorMessages['newPassword'] = errorMessage
          } else if (!passwordRegex.test(state.newPassword2)) {
            errorMessage =
              'パスワードは以下の内容を有する必要があります。　1文字以上の大文字、1文字以上の特殊記号を含む最低8桁以上の英数字'
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
    let data = {
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
      newPassword2: state.newPassword2
    }
    axios
      .post('/password/change', data, {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        response = response.data
        if (!response.status) {
          _errorMessages = errorMessages
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
            message: response.message,
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            status: ''
          }
        })
        var elements = document.getElementsByTagName('input')
        for (let x = 0; x < elements.length; x++) {
          elements[x].value = ''
        }
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
      case 'oldPassword':
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      case 'newPassword':
        if (val === '') {
          errorMessage = '必須フィールド'
          hasError = true
        }
        break
      case 'newPassword2':
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
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        hasError: false
      }
    })
  }
  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <SettingSideNav />
      <div className="bg-white rounded-lg my-10 w-8/12 mx-auto col-span-5">
        <div className="p-3 pb-6">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">パスワード変更</h2>
          </div>
          <div className="text-center">
            <div className="align-top inline-block h-auto bg-white my-4 ml-5 mr-5 py-5 px-6">
              <div className="mx-auto">
                <div className="flex flex-wrap gap-0 w-full justify-start mt-4">
                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/3">
                      <label className="text-sm text-gray-400">
                        現在のパスワードを入力 :{' '}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="password"
                        name="oldPassword"
                        value={state.oldPassword}
                        onChange={(e) => handleTextChange('oldPassword', e)}
                      />
                      <h1
                        className={
                          (errorMessages.oldPassword ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.oldPassword}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-0 w-full justify-start">
                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/3">
                      <label className="text-sm text-gray-400">
                        新しいパスワードを入力 :{' '}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="password"
                        name="newPassword"
                        value={state.newPassword}
                        onChange={(e) => handleTextChange('newPassword', e)}
                      />
                      <h1
                        className={
                          (errorMessages.newPassword ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.newPassword}
                      </h1>
                    </div>
                  </div>

                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/3">
                      <label className="text-sm text-gray-400">
                        新しいパスワード（確認 :{' '}
                        <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <div className="md:w-2/3 md:flex-grow">
                      <input
                        className="text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8"
                        type="password"
                        name="newPassword2"
                        value={state.newPassword2}
                        onChange={(e) => handleTextChange('newPassword2', e)}
                      />
                      <h1
                        className={
                          (errorMessages.newPassword2 ? '' : 'hidden') +
                          ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600 text-left h-auto'
                        }
                      >
                        {errorMessages.newPassword2}
                      </h1>
                    </div>
                  </div>
                  <span
                    className="invalid-feedback text-xs text-center mt-3 w-2/3 mx-auto"
                    role="alert"
                  >
                    <strong>
                      1文字以上の大文字、1文字以上の小文字、1文字以上の特殊記号
                      \ ( ! &quot; # $ % & &apos; ( ) = ~ ^ \ など )
                      を含む最低8桁以上の英数字のパスワードを入力してください
                    </strong>
                  </span>
                </div>
              </div>

              <div className="py-5 mt-0 pl-0 text-center space-x-10">
                <h1
                  className={
                    (state.message !== '' ? '' : 'hidden') +
                    ' text-sm text-black w-full h-8 px-3 leading-8 h-auto'
                  }
                >
                  {state.message}
                </h1>
                <button
                  onClick={handleChangePassword}
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
                <button
                  className=" bg-primary-200 hover:bg-green-700 text-white inline-block rounded-lg p-2 text-sm w-32 h-12"
                  onClick={() => {
                    history.back()
                  }}
                >
                  <img className="inline mr-2" />
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PasswordSettings
if (document.getElementById('company-settings-password')) {
  ReactDOM.render(
    <PasswordSettings />,
    document.getElementById('company-settings-password')
  )
}
