import React, { useState } from 'react'
import axios from 'axios'
const PaymentSelection = (props) => {
  const [state, setState] = useState({
    method: '',
    processed: false,
    message: ''
  })

  const openZeusFormChangeMethod = () => {
    window.open('/payment/setMethodCreditCard/', '_blank').focus()
    setState((prevState) => {
      return {
        ...prevState,
        processed: true,
        message: 'Refresh the page after filling up in Zeus form'
      }
    })
  }

  const setBankTransferMethod = () => {
    setState((prevState) => {
      return {
        ...prevState,
        processed: true,
        message: 'Changing the payment method to bank tranfer...'
      }
    })

    axios
      .post('/payment/setMethodBankTransfer', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.status == 200) {
          if (response.data) {
            setState((prevState) => {
              return {
                ...prevState,
                message: 'The payment method changed to bank transfer.'
              }
            })
            setTimeout(() => {
              location.reload()
            }, 500)
            return
          }
        }
      })
  }

  const selectMethod = (e, method) => {
    e.target.checked = true
    setState((prevState) => {
      return {
        ...prevState,
        method: method
      }
    })
  }

  return (
    <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-96 m-auto bg-white opacity-85 p-10">
      <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
        <div
          className={
            'flex w-full flex-wrap gap-0 text-gray-700 items-center mt-10 ' +
            (state.processed ? 'hidden' : '')
          }
        >
          <div className="text-center w-full text-secondary-200 font-black mb-6">
            Change Payment Method
          </div>
          <div className="text-center w-full space-y-5">
            <div className="w-full space-x-5">
              <input
                type="radio"
                className="text-center text-secondary-200 font-black"
                name="newMethod"
                value="クレジット"
                required
                defaultChecked={props.method === 'クレジット'}
                onClick={(e) => {
                  selectMethod(e, 'クレジット')
                }}
              />
              <label>Credit Card</label>
            </div>
            <div
              className={
                'w-full space-x-5 ' +
                (props.method === '' || props.method === 'クレジット'
                  ? 'hidden'
                  : '')
              }
            >
              <input
                type="radio"
                className={
                  'text-center text-secondary-200 font-black ' +
                    props.method ===
                  ''
                    ? 'hidden'
                    : ''
                }
                name="newMethod"
                value="口座振替"
                required
                defaultChecked={props.method === '口座振替'}
                disabled={state.method === 'クレジット'}
                onClick={(e) => {
                  selectMethod(e, '口座振替')
                }}
              />
              <label>Bank Transfer</label>
            </div>
            <div className="space-x-5">
              <button
                className="bg-gray-400 w-24 h-14 rounded-3xl text-white"
                onClick={() => props.handleCloseModal()}
              >
                Cancel
              </button>
              <button
                className={
                  'bg-primary-200 text-white w-24 h-14 rounded-3xl ' +
                  (state.method === 'クレジット' ? 'inline' : 'hidden')
                }
                onClick={() => openZeusFormChangeMethod()}
                disabled={
                  (state.method === '' && props.method === '') ||
                  props.method !== 'クレジット'
                }
              >
                Proceed
              </button>
              <button
                className={
                  'bg-primary-200 text-white w-24 h-14 rounded-3xl ' +
                  (state.method === '口座振替' || state.method === ''
                    ? 'inline'
                    : 'hidden')
                }
                disabled={state.method === ''}
                onClick={() => {
                  setBankTransferMethod()
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>

        <div
          className={
            'flex w-full flex-wrap gap-0 text-gray-700 items-center mt-10 ' +
            (!state.processed ? 'hidden' : '')
          }
        >
          <div className="text-center w-full font-black mb-6">
            {state.message}
          </div>

          <div className="w-full text-center">
            <button
              className="bg-gray-400 w-24 h-14 rounded-3xl text-white"
              onClick={() => props.handleCloseModal()}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSelection
