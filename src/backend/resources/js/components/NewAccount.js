import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import waitingIcon from '../../img/loading-spinner.gif'

const NewAccount = (props) => {
  const [state, setState] = useState({
    addingAccount: '',
    email: '',
    fullName: '',
    firstName: '',
    lastName: ''
  })
  const handleNameChange = (e) => {
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
        email: e.target.value
      }
    })
  }

  useEffect(() => {
    if (!_.isEmpty(props.foundAccount)) {
      setState((prevState) => {
        return {
          ...prevState,
          email: props.foundAccount.email,
          fullName: props.foundAccount.fullName,
          addingAccount: props.foundAccount
        }
      })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          // email: '',
          fullName: '',
          addingAccount: ''
        }
      })
    }
  }, [props.foundAccount])

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
              disabled={props.isLoading}
              onClick={() => props.searchAdminByEmail(state.email)}
              className="w-24 xl:w-24 lg:w-24 cursor-pointer col-span-1 text-bold   text-primary-200   bg-white rounded p-1 text-sm"
            >
              検索する
              <img
                src={waitingIcon}
                className={
                  (props.isLoading ? ' ' : ' hidden ') + ' w-7 inline '
                }
              />
            </button>
          </div>
          <div className=" w-96 mt-5">
            <label className="ml-10 text-sm text-white w-48 h-8 pr-3 leading-8 text-left col-span-1">
              権限 :
            </label>
            <label className="col-span-1 text-white w-1/2 my-2">管理者</label>
          </div>
          <div className="w-full">
            <label className="ml-10 text-sm text-white w-48  h-8 pr-3 leading-8 text-left col-span-1 ">
              名前 :
            </label>
            <input
              className=" text-sm col-span-1 2xl:w-56 xl:w-56 lg:w-34 h-8 px-3 py-2 my-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3"
              onChange={handleNameChange}
              value={
                !_.isEmpty(props.foundAccount)
                  ? props.foundAccount.first_name +
                    ' ' +
                    props.foundAccount.last_name
                  : state.fullName
              }
              type="text"
            />
          </div>
          <p className="text-sm inline-block text-white w-full h-8 leading-8 text-left pl-10">
            {!_.isEmpty(props.searchResult) ? props.searchResult : ''}
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
          disabled={
            (!_.isEmpty(props.foundAccount) &&
              props.foundAccount.source === 'database') ||
            state.email.length === 0 ||
            state.fullName.length === 0
              ? 'disabled'
              : ''
          }
          onClick={() =>
            props.handleDisplayAddedAdmin(
              // {
              // email: state.email,
              // fullName: state.fullName
              // }

              state.addingAccount
                ? state.addingAccount
                : { email: state.email, fullName: state.fullName }
            )
          }
          className="rounded-xl cursor-pointer  font-extrabold w-40 py-2 px-3 mr-4 text-primary-200  tracking-tighter bg-white"
        >
          招待を送信 &nbsp;
          <img
            src={waitingIcon}
            className={
              (props.isLoadingOfAddingContact ? ' ' : ' hidden ') +
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
