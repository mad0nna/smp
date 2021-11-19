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
    expmm: '',
    expyr: '',
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
              message = '銀行振込'
              break
            case 'クレジット':
              message = !_.isEmpty(response.data.last_four_digit)
                ? 'クレジットカード (末尾'
                : 'クレジットカード情報を更新してください'
              break
            case '':
              message = 'お支払い方法が選択されていません'
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
                expmm: response.data.expmm,
                expyr: response.data.expyr,
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
            お支払い方法
          </div>
          <div>
            <img
              src={waitingIcon}
              className={(state.loading ? ' ' : ' hidden ') + ' w-20 inline '}
            />
          </div>
          <div className={state.loading ? ' hidden ' : '  '}>
            <div className={'text-2xl font-black pl-20 text-primary-200 mb-5'}>
              {state.message}
              <span
                id="lastdigits"
                className={
                  state.method == '口座振替' || state.method == ''
                    ? 'hidden'
                    : 'inline-block'
                }
              >
                {state.lastDigits !== '' && state.lastDigits !== null
                  ? state.lastDigits + ')'
                  : ''}
              </span>
            </div>
            <div
              className={
                (state.method === 'クレジット' ? '' : 'hidden') +
                ' text-lg font-black pl-20 text-primary-200 mb-5'
              }
            >
              {state.lastDigits !== '' && state.lastDigits !== null
                ? '有効期限日：' + state.expmm + '/' + state.expyr
                : ''}
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
                変更する
              </div>
            </div>
          </div>

          <div className="space-x-4 mt-24"></div>
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
