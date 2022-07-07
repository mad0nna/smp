import React from 'react'

const CheckoutContent = (props) => {
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-96 m-auto bg-white opacity-85 p-10">
        <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
          <div className="flex w-full flex-wrap gap-0 text-gray-700 items-center mt-10 ">
            <div
              className="text-center w-full text-red-600 font-black mb-6 font-semibold"
              dangerouslySetInnerHTML={props.htmlContent}
            ></div>
            <div className="text-center w-full space-y-5">
              <div className="space-x-5">
                <button
                  className="bg-gray-400 h-12 w-2/6 rounded-3xl text-black font-semibold"
                  onClick={() => props.handleCloseModal()}
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutContent
