import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import logo from '../../img/kot-admin-panel.png'

const CompanyLogin = () => {
  //eslint-disable no-useless-escape
  // let validPasswordRegex = RegExp(
  //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$'
  // )

  // const validateForm = (errors) => {
  //   let valid = true
  //   Object.values(errors).forEach((val) => val.length > 0 && (valid = false))

  //   return valid
  // }

  const [loginState] = useState({
    email: null,
    password: null,
    errors: {
      email: '',
      password: ''
    },
    formError: ''
  })

  const handleChange = () => {
    //event.preventDefault()
    // const { name, value } = event.target
    // switch (name) {
    //   case 'password':
    //     console.log('pass')
    //     setLoginState({ password: value })
    //     break
    //   case 'email':
    //     console.log('email')
    //     setLoginState({ email: value })
    //     break
    // }
    // let name = event.target.name
    // let val = event.target.value
    // switch (name) {
    //   case 'email':
    //     setLoginState({ email: val })
    //     break
    //   case 'password':
    //     setLoginState({ password: event.target.value })
    //     console.log(loginState.password)
    //     break
    //   default:
    //     break
    // }
    // const { name, value } = event.target
    // let errors = loginState.errors
    // console.log('handleChange name:' + name)
    // console.log('handleChange value:' + value)
    // switch (name) {
    //   case 'password':
    //     errors.password = validPasswordRegex.test(value)
    //       ? ''
    //       : 'パスワードは小文字、大文字、数字を組み合わせて8文字以上で入力してください'
    //     break
    //   default:
    //     break
  }

  // setLoginState({ errors, [name]: value, formError: '' }, () => {
  //   console.log(errors)
  // })
  // }

  // const errorClass = (error) => {
  //   return error.length === 0 ? '' : 'field-error'
  // }

  const handleSubmit = () => {
    event.preventDefault()
    // if (
    //   validateForm(loginState.errors) &&
    //   loginState.name !== null &&
    //   loginState.password !== null
    // ) {
    //   console.info('Valid Form')
    // } else {
    //   console.error('Invalid Form')
    //   setLoginState({ formError: '無効な入力です' })
    // }
    // // const { name, value } = event.target
    // const pass = loginState.password
    // let errors = loginState.errors
    // // console.log('handleChange name:' + name)
    // // console.log('handleChange value:' + value)
    // // switch (name) {
    // //   case 'email':
    // errors.email = validEmailRegex.test(loginState.email)
    //   ? ''
    //   : 'メールアドレスが有効ではありません'
    // //   break
    // // case 'password':
    // errors.password =
    //   pass.length > 7 && loginState.password.length < 21
    //     ? ''
    //     : 'パスワードは8文字以内で入力してください'
    // //   break
    // // default:
    // //   break
    // // }
    // setLoginState(
    //   { errors, [loginState.email]: loginState.password, formError: '' },
    //   () => {
    //     console.log(errors)
    //   }
    // )
    // if (
    //   validateForm(loginState.errors) &&
    //   loginState.name !== null &&
    //   loginState.password !== null
    // ) {
    //   console.info('Valid Form')
    //window.location.href = '/company/dashboard'
    // } else {
    //   console.error('Invalid Form')
    //   setLoginState({ formError: '無効な入力です' })
    // }
  }

  return (
    <div className="" style={{ width: '728px' }}>
      <form method="POST" url="/authenticate">
        <div className="h-82 bg-white p-6 shadow-sm mt-32">
          <div className="flex flex-wrap justify-around gap-4">
            <img
              className="p-0 rounded-xl mt-5"
              src={logo}
              style={{ height: '42px' }}
            />
          </div>
          <div
            className="flex flex-wrap justify-around text-lg text-2xl font-bold mt-5 mb-3"
            style={{ color: '#5B5B5B' }}
          ></div>
          <div className="flex flex-wrap gap-0 w-full justify-center">
            <div className="flex flex-wrap gap-0 w-1/2 ">
              <input
                type="text"
                name="email"
                placeholder="メールアドレス"
                onChange={handleChange}
                className={
                  'w-full px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-b-none border-b-0'
                }
              />
              <input
                type="password"
                name="password"
                placeholder="パスワード"
                onChange={handleChange}
                className={
                  'w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-t-none'
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-center mt-2 mb-6">
            <button
              onClick={handleSubmit}
              className="bg-primary-200 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
            >
              サインイン
            </button>
          </div>

          {loginState.errors.email.length > 0 && (
            <div className="flex flex-wrap items-center justify-center  text-sm login-error ">
              {loginState.errors.email}
              <br />
            </div>
          )}
          {loginState.errors.password.length > 0 && (
            <div className="flex flex-wrap items-center justify-center  login-error text-sm login-error ">
              {loginState.errors.password}
            </div>
          )}
          {loginState.formError.length > 0 && (
            <div className="flex flex-wrap items-center justify-center  text-sm login-error login-error ">
              {loginState.formError}
            </div>
          )}

          <div className="text-xs text-center static bottom-10 mt-6 mb-1 text-gray-600">
            <a href="password/forgot">パスワードをお忘れですか？</a>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CompanyLogin
if (document.getElementById('companyLogin')) {
  ReactDOM.render(<CompanyLogin />, document.getElementById('companyLogin'))
}
