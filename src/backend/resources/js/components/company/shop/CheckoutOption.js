import React, { useState } from 'react'

const CheckoutOption = (props) => {
  const [state, setState] = useState({
    optionValue: ''
  })

  const onOptionChange = (event) => {
    setState((prevState) => {
      return {
        ...prevState,
        optionValue: event.target.value
      }
    })
  }
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-96 m-auto bg-white opacity-85 p-10">
        <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
          <div className="flex w-full flex-wrap gap-0 text-gray-700 items-center mt-10 ">
            <div className="text-center w-full text-secondary-200 font-black mb-6 font-semibold">
              お会計方法を選択してください
            </div>
            <div className="text-center w-full space-y-5">
              <div className="flex flex-col text-left space-y-5">
                <div className="w-full space-x-5 text-center">
                  <label className="space-x-5">
                    <input
                      type="radio"
                      className="text-center text-secondary-200 font-black"
                      name="checkout_option"
                      onChange={onOptionChange}
                      value={1}
                      required
                    />
                    <span>クレジットカード決済</span>
                  </label>
                </div>
                <div className="w-full text-center pr-8 pb-5">
                  <label className="space-x-5">
                    <input
                      type="radio"
                      className="text-center text-secondary-200 font-black"
                      name="checkout_option"
                      onChange={onOptionChange}
                      value={2}
                      required
                    />
                    <span>請求書を発行</span>
                  </label>
                </div>
              </div>
              <div className="space-x-5">
                <button
                  className="bg-gray-400 h-12 w-2/6 rounded-3xl text-black font-semibold"
                  onClick={() => props.handleCloseModal()}
                >
                  キャンセル
                </button>
                <button
                  className="bg-primary-200 text-white h-12 w-2/6 rounded-3xl font-semibold"
                  onClick={() => props.handleSubmitCheckout(state.optionValue)}
                >
                  確定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CheckoutOption
