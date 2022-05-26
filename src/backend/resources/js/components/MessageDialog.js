import React from 'react'

const MessageDialog = (props) => {
  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-80 m-auto bg-primary-200 opacity-85 ">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-10">
          <div className="text-center w-full inline-block text-white px-3 leading-8 overflow-hidden">
            {props.message}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5"></div>
      </div>

      <div className="flex flex-wrap gap-0 w-full justify-center mt-4">
        <button
          onClick={() => props.handleCloseMessageDialog()}
          className="rounded-xl cursor-pointer border font-extrabold w-40 py-2 px-3  text-primary-200  tracking-tighter bg-white mr-4"
        >
          OK
        </button>
      </div>
    </div>
  )
}

export default MessageDialog
