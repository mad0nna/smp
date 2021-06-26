import React, { useState } from 'react'
import _ from 'lodash'

const AddAccountToken = (props) => {
  const [state, setState] = useState({
    token: ''
  })

  const handleInputTokenChange = (e) => {
    setState({ token: e.target.value })
  }

  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-80 m-auto bg-primary-200 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
          <div className="text-center  ">
            <p className=" inline-block text-white w-full px-3 leading-8 ">
              韋駄天に追加するために、&nbsp;
            </p>
            <p className=" inline-block text-white w-full px-3 leading-8 ">
              {_.isEmpty(props.company) ? '' : props.company.name} &nbsp;
              Tokenを入力してください
            </p>

            <input
              className="mt-4   h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8 mr-2"
              defaultValue=""
              type="text"
              onChange={handleInputTokenChange}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5"></div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-8">
        <button
          disabled={
            !_.isEmpty(props.company) && !_.isEmpty(state.token)
              ? ''
              : 'disabled'
          }
          onClick={() => props.handleOkey(state.token)}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-primary-200  tracking-tighter bg-white mr-4"
        >
          追加
        </button>
        <button
          onClick={props.closeDialog}
          className="rounded-xl cursor-pointer  font-extrabold w-40 py-2 px-3  text-primary-200  tracking-tighter bg-white"
        >
          キャンセル
        </button>
      </div>
    </div>
  )
}

export default AddAccountToken
