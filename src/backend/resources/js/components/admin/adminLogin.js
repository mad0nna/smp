import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import logo from '../../../img/kot-admin-panel.png'
import lockIcon from '../../../svg/lock-icon.svg'
import mailIcon from '../../../svg/mail-icon.svg'
import BackgroundImage from '../../../img/admin-login-background.png'
import SettingIcon from '../../../img/setting-gray.png'
// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const AdminLogin = () => {
  const [state, setState] = useState({
    email: null,
    password: null,
    errors: {
      email: '',
      password: ''
    },
    formError: ''
  })

  const handleChange = (event) => {
    event.preventDefault()

    const { name, value } = event.target
    let errors = state.errors
    switch (name) {
      case 'email':
        errors.email = validEmailRegex.test(value)
          ? ''
          : 'メールアドレスが有効ではありません'
        break
      case 'password':
        errors.password =
          value.length > 7 && value.length < 21
            ? ''
            : 'パスワードは8－20文字以内で入力してください'
        break
      default:
        break
    }

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
        formError: ''
      }
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    window.location.href = '/admin/dashboard'
    return
    // if(validateForm(state.errors) && state.name !== null && state.password !== null) {
    //   console.info('Valid Form')
    //   window.location.href = '/dashboard'
    // }else{
    //   console.error('Invalid Form')
    //   setState({formError: '無効な入力です'})

    // }

    // const validateForm = (errors) => {
    //   let valid = true
    //   Object.values(errors).forEach(
    //     (val) => val.length > 0 && (valid = false)
    //   )

    //   return valid
    // }
  }

  return (
    <div>
      <img
        src={BackgroundImage}
        className="absolute 2xl:w-9/12 xl:w-full"
        style={{
          position: 'absolute',
          left: '0px',
          bottom: '0px',
          overflow: 'visible'
        }}
      />
      <div className="relative">
        <div className="z-10" style={{ width: '445px' }}>
          <div className="rounded-xl h-82 bg-white shadow-sm mt-32">
            <div className="flex flex-wrap justify-around gap-4">
              <img
                className="p-0  mt-14"
                src={logo}
                style={{ height: '42px' }}
              />
            </div>
            <div
              className="text-center font-bold my-6"
              style={{ color: '#5B5B5B' }}
            >
              韋駄天にログイン
            </div>
            <div
              className="bg-gray-100 rounded-b-xl"
              style={{
                filter: 'drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161))',
                minHeight: '314px',
                overflow: 'auto'
              }}
            >
              <div
                className="text-lg text-2xl text-center font-bold my-6 "
                style={{ color: '#5B5B5B' }}
              >
                <img className="inline" src={SettingIcon} />
                <span>管理者</span>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-center">
                <div className="flex flex-wrap gap-0 w-3/4 relative">
                  <img
                    className="absolute z-10"
                    src={mailIcon}
                    style={{ height: '12px', top: '14px', left: '15px' }}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="メールアドレス"
                    style={{ padding: '8px 8px 8px 38px' }}
                    className={
                      'w-full px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none pl-9'
                    }
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-wrap gap-0 w-3/4 relative my-4">
                  <img
                    className="absolute z-10"
                    src={lockIcon}
                    style={{ height: '12px', top: '14px', left: '19px' }}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    style={{ padding: '8px 8px 8px 38px' }}
                    className={
                      'w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white rounded text-sm border border-gray-300 outline-none pl-9'
                    }
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-center mt-2 mb-3">
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-1/3"
                >
                  サインイン
                </button>
              </div>

              {state.errors.email.length > 0 && (
                <div className="flex flex-wrap items-center justify-center  text-sm login-error ">
                  {state.errors.email}
                  <br />
                </div>
              )}
              {state.errors.password.length > 0 && (
                <div className="flex flex-wrap items-center justify-center  text-sm login-error login-error ">
                  {state.errors.password}
                </div>
              )}
              {state.formError.length > 0 && (
                <div className="flex flex-wrap items-center justify-center  text-sm login-error login-error ">
                  {state.formError}
                </div>
              )}

              <div className="text-xs text-center static bottom-10 my-3 text-gray-600 font-bold">
                <a href="#">パスワードをお忘れですか？</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
if (document.getElementById('adminLogin')) {
  ReactDOM.render(<AdminLogin />, document.getElementById('adminLogin'))
}
