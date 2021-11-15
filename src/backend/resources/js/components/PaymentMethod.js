import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import Welcome from './Welcome'
import PaymentSelection from './PaymentSelection'
import axios from 'axios'
import waitingIcon from '../../img/loading-spinner.gif'
import visa from '../../img/visa.png'
import MasterCard from '../../img/mastercard.png'
import JCB from '../../img/jcb.png'
import amex from '../../img/amex.png'
import Diners from '../../img/diners.png'
const PaymentMethod = () => {
  const [state, setState] = useState({
    modalDisplay: false,
    loading: true,
    method: '',
    lastDigits: '',
    cardBrand: '',
    cardLogo: ''
  })

  useEffect(() => {
    console.log(visa, MasterCard, JCB, amex, Diners)
    axios
      .post('/payment/getPaymentMethod', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data)
          if (response.data) {
            setState((prevState) => {
              return {
                ...prevState,
                loading: false,
                cardBrand: response.data.card_brand,
                lastDigits: response.data.last_four_digit,
                method: response.data.PaymentMethod__c,
                cardLogo: 'bg-card-' + response.data.card_brand + '-icon'
              }
            })
            return
          }
        }
      })
  }, [])
  const openModal = () => {
    setState((prevState) => {
      return {
        ...prevState,
        modalDisplay: !prevState.modalDisplay
      }
    })
  }
  const handleCloseModal = () => {
    setState((prevState) => {
      return {
        ...prevState,
        modalDisplay: false
      }
    })
  }
  return (
    <div className="relative px-10 py-5 bg-mainbg ">
      <Welcome />
      <div className="bg-white font-meiryo px-24 py-12 mx-40 mt-12 justify-items-center items-center">
        <div className="relative">
          <div className="text-xl mb-10 font-semibold text-customGray">
            Payment Method
          </div>
          <div>
            <img
              src={waitingIcon}
              className={(state.loading ? ' ' : ' hidden ') + ' w-20 inline '}
            />
          </div>
          <div className={state.loading ? ' hidden ' : '  '}>
            <div
              className={
                'text-2xl ' +
                (state.lastDigits != null
                  ? 'text-primary-200'
                  : 'text-secondary-200') +
                ' font-black pl-20'
              }
            >
              {state.method === '1：振込' || state.method === ''
                ? 'Bank Transfer'
                : state.lastDigits != null
                ? 'Credit Card Ending in '
                : 'Please update your Credit Card details'}
              <span
                id="lastdigits"
                className={
                  state.method == '1：振込' || state.method == ''
                    ? 'hidden'
                    : 'inline-block'
                }
              >
                {state.lastDigits}
              </span>
            </div>
            <div className="pl-20">
              {state.method === '90：クレジット' ? (
                <div
                  className={
                    state.cardLogo +
                    ' bg-cover bg-no-repeat h-8 w-9 inline-block'
                  }
                ></div>
              ) : (
                ''
              )}
              <div
                className="text-md text-secondary-200 font-black inline-block cursor-pointer pl-4"
                onClick={() => openModal()}
              >
                (Change)
              </div>
            </div>
          </div>

          <div className="space-x-4 mt-24">
            <div className="inline-block py-3 w-54 text-center align-middle text-primary-200 text-sm underline">
              Privacy Policy
            </div>
            <div className="inline-block py-3 w-54 text-center align-middle text-primary-200 text-sm underline">
              Terms and Conditions
            </div>
            <div className="inline-block py-3 w-54 text-center align-middle text-primary-200 text-sm underline">
              View Billing History
            </div>
          </div>
        </div>
      </div>
      {state.modalDisplay ? (
        <PaymentSelection
          handleCloseModal={handleCloseModal}
          method={state.method}
        />
      ) : null}
    </div>
  )
}

export default PaymentMethod

if (document.getElementById('methodOfPayment')) {
  ReactDOM.render(<PaymentMethod />, document.getElementById('methodOfPayment'))
}
