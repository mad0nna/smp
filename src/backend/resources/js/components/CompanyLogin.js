import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import logo from '../../img/kot-admin-panel.png'

const CompanyLogin = () => {
  const [loginState] = useState({
    email: null,
    password: null,
    errors: {
      email: '',
      password: ''
    },
    formError: ''
  })

  const handleSubmit = () => {}

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
                className={
                  'w-full px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-b-none border-b-0'
                }
              />
              <input
                type="password"
                name="password"
                placeholder="パスワード"
                className={
                  'w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-t-none'
                }
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-center mt-2 mb-6">
            <button
              onClick={handleSubmit}
              className="bg-tertiary-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
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
