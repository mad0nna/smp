import React from 'react'

const DeleteConfirmation = (props) => {
  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-80 m-auto bg-tertiary-500 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-10">
          <div className="text-center w-full inline-block text-white px-3 leading-8">
            {props.accountToDelete['email']} を本当に削除してもよろしいですか？
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5"></div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-4">
        <button
          onClick={() => props.handleDeleteConfirmation(props.accountToDelete)}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-tertiary-500 tracking-tighter bg-white mr-4"
        >
          はい
        </button>

        <button
          onClick={() => props.handleCloseMessageDialog()}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-tertiary-500 tracking-tighter bg-white mr-4"
        >
          いいえ
        </button>
      </div>
    </div>
  )
}

export default DeleteConfirmation
