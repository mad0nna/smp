import React, { useState } from 'react'
import _ from 'lodash'
import waitingIcon from '../../../../img/loading-spinner.gif'

const NewAccount = (props) => {
  const [state, setState] = useState({
    code: ''
  })

  const handleInputCodeChange = (e) => {
    setState({ code: e.target.value })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      props.searchCompanyCode(state.code)
    }
  }

  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 h-80 top-48 m-auto bg-tertiary-500 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5 justify-center">
          <label className=" text-sm w-full block text-white w-48  h-8 px-3 leading-8 text-center">
            KoT企業コードを入力してください
          </label>
          <input
            className=" text-sm   h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-3"
            defaultValue=""
            type="text"
            onChange={handleInputCodeChange}
            onKeyDown={handleKeyDown}
          />
          <button
            disabled={props.isLoading}
            onClick={() => props.searchCompanyCode(state.code)}
            className="w-24 cursor-pointer  text-bold   text-tertiary-500   bg-white rounded p-1 text-sm"
          >
            &nbsp; 検索
            <img
              src={waitingIcon}
              className={(props.isLoading ? ' ' : ' hidden ') + ' w-7 inline '}
            />
          </button>
        </div>
        <p className="block w-full text-sm inline-block text-white w-60  h-8 px-3 leading-8 text-center mt-3">
          {!_.isEmpty(props.searchResult) ? props.searchResult : ''}
        </p>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start mt-2">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center ">
          <p className="text-center w-full text-white">
            {_.isEmpty(props.foundCompany)
              ? ''
              : '検索結果:  ' + props.foundCompany.name}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-10">
        <button
          disabled={
            props.foundCompany && props.foundCompany.name ? '' : 'disabled'
          }
          onClick={() => props.handleDisplayAddedCompany(props.foundCompany)}
          className={
            (props.foundCompany && props.foundCompany.name
              ? 'block'
              : 'hidden') +
            ' rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3 tracking-tighter bg-white mr-4 text-tertiary-500'
          }
        >
          確定
        </button>
        <button
          onClick={props.closePopup}
          className="rounded-xl cursor-pointer  font-extrabold w-40 py-2 px-3  text-tertiary-500  tracking-tighter bg-white"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default NewAccount
