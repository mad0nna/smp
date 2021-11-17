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
import _ from 'lodash'
const PaymentMethod = () => {
  const [state, setState] = useState({
    modalDisplay: false,
    loading: true,
    method: '',
    lastDigits: '',
    cardBrand: '',
    cardLogo: '',
    message: ''
  })

  useEffect(() => {
    axios
      .post('/payment/getPaymentMethod', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.status == 200) {
          let cardLogo = ''
          switch (response.data.card_brand) {
            case 'VISA':
              cardLogo = visa
              break
            case 'MasterCard':
              cardLogo = MasterCard
              break
            case 'JCB':
              cardLogo = JCB
              break
            case 'Amex':
              cardLogo = amex
              break
            case 'Diners':
              cardLogo = Diners
              break
            default:
          }

          let message = ''
          switch (response.data.payment_method) {
            case '口座振替':
              message = 'Bank Transfer'
              break
            case 'クレジット':
              message = !_.isEmpty(response.data.last_four_digit)
                ? 'Credit Card Ending in '
                : 'Please update your Credit Card details'
              break
            case '':
              message = 'No Payment Method selected yet'
              break
            default:
          }

          if (response.data) {
            setState((prevState) => {
              return {
                ...prevState,
                loading: false,
                cardBrand: response.data.card_brand,
                lastDigits: response.data.last_four_digit,
                method: response.data.payment_method,
                cardLogo: cardLogo,
                message: message
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
                'text-2xl font-black pl-20 text-primary-200'
                // + (!_.isEmpty(state.lastDigits || state.method === '口座振替')
                //   ? 'text-primary-200'
                //   : 'text-secondary-200')
              }
            >
              {state.message}
              <span
                id="lastdigits"
                className={
                  state.method == '口座振替' || state.method == ''
                    ? 'hidden'
                    : 'inline-block'
                }
              >
                {state.lastDigits}
              </span>
            </div>
            <div className="pl-20">
              {state.method === 'クレジット' && !_.isEmpty(state.lastDigits) ? (
                <img
                  className="w-10 h-10 inline-block"
                  src={state.cardLogo}
                ></img>
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
