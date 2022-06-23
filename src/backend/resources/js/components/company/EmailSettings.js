import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import SettingSideNav from '../SettingSideNav'
import waitingIcon from '../../../img/loading-spinner.gif'
import axios from 'axios'
const EmailSettings = () => {
  var minheight = { 'min-height': '700px' }
  const [errorMessages, setErrorMessages] = useState({
    newEmail: '',
    newEmail2: '',
    hasError: false
  })
  const [state, setState] = useState({
    newEmail: '',
    newEmail2: '',
    status: '',
    message: '',
    validationFields: ['newEmail', 'newEmail2'],
    isLoading: false
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
          }
          break
        case 'newEmail2':
          if (state.newEmail2 === '') {
            errorMessage = '必須フィールド'
            hasError = true
          } else if (state.newEmail2 !== state.newEmail) {
            errorMessage = 'パスワードが一致しません'
            hasError = true
            _errorMessages['newEmail'] = errorMessage
          } else if (!emailRegex.test(state.newEmail2)) {
            errorMessage = '有効なメールアドレスを入力してください'
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

    let urlParams = new URLSearchParams(location.search)
    let data = {
      _token: document.querySelector('meta[name="csrf-token"]').content,
      id: urlParams.get('id'),
      newEmail: state.newEmail
    }
    axios
      .put(window.location, data, {
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
            newEmail: '',
            newEmail2: '',
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
            <div className="align-top inline-block h-auto bg-white my-4 ml-5 mr-5 py-5 px-6">
              <div className="mx-auto">
                <div className="flex flex-wrap gap-0 w-full justify-start">
                  <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                    <div className="mb-1 md:mb-0 md:w-1/4 text-left">
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
                    <div className="mb-1 md:mb-0 md:w-1/4">
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
                    ' text-green-700 mb-3 text-lg w-full px-3 leading-8 font-medium'
                  }
                >
                  {state.message}
                </h1>
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
export default EmailSettings
if (document.getElementById('company-settings-email')) {
  ReactDOM.render(
    <EmailSettings />,
    document.getElementById('company-settings-email')
  )
}
