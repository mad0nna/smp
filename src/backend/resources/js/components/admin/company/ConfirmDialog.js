import React from 'react'
import waitingIcon from '../../../../img/loading-spinner.gif'

function NewlineText(props) {
  const text = props.text
  const newText = text.split('\n').map((str, i) => (
    <p className=" inline-block text-white w-full px-3 leading-8 " key={i}>
      {str}
    </p>
  ))

  return newText
}

const ConfirmDialog = (props) => {
  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-80 m-auto bg-tertiary-500 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
          <div className="text-center w-full  ">
            <NewlineText text={props.message}></NewlineText>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5"></div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-4">
        <button
          disabled={props.isLoading}
          onClick={() => props.handleOkey()}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-tertiary-500 tracking-tighter bg-white mr-4"
        >
          はい &nbsp;
          <img
            src={waitingIcon}
            className={(props.isLoading ? ' ' : ' hidden ') + ' w-8 inline '}
          />
        </button>
        <button
          onClick={() => props.closeDialog(props.name)}
          className="rounded-xl cursor-pointer font-extrabold w-40 py-2 px-3 text-tertiary-500 tracking-tighter bg-white"
        >
          いいえ
        </button>
      </div>
    </div>
  )
}

export default ConfirmDialog
