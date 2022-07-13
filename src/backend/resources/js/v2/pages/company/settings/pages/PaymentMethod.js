import React, { useState } from 'react'
import PaymentSelection from './PaymentSelection'
import { BankIcon, CardIcon, ExclamationIcon } from '../../../../../../icons'

const PaymentMethod = () => {
  const [modalOn, setModalOn] = useState(false)
  const [choice, setChoice] = useState(false)
  console.log('choice: ', choice)

  const handleCloseModal = () => {
    setModalOn((prevState) => !prevState)
  }

  return (
    <>
      <h3 className="mt-22px ml-22px font-medium text-23px text-primary-600">
        お支払い方法
      </h3>
      <div>
        <div className="flex flex-col h-fit justify-center lg:min-h-500px lg:mt-95px">
          {/* region > Payment option */}
          <div className="flex justify-center">
            <div className="w-251px h-282px flex flex-col justify-center text-center rounded-3xl border border-hex-D8D8D8 bg-hex-F1F1F1 mr-3 ml-3 lg:mr-88px lg:ml-0">
              <BankIcon
                className="block w-130px h-130px bg-red mx-auto"
                fill="#333"
              />
              <p className="text-23px font-semibold mt-4 text-hex-333333">
                銀行振込
              </p>
              <label id="radio-check-mark" className="flex justify-end mr-4">
                <input
                  type="radio"
                  name="payment_method"
                  value="bank"
                  className="invisible hidden"
                />
                <span />
              </label>
            </div>
            <div className="w-251px h-282px flex flex-col justify-center text-center rounded-3xl bg-hex-D8F3EA mr-3 lg:mr-0">
              <CardIcon
                className="block w-130px h-130px mx-auto"
                fill="#007B53"
              />
              <p className="text-23px font-semibold text-primary-600 mt-4">
                銀行振込
              </p>
              <label id="radio-check-mark" className="flex justify-end mr-4">
                <input
                  type="radio"
                  name="payment_method"
                  value="card"
                  className="invisible hidden"
                />
                <span />
              </label>
            </div>
          </div>
          {/* endregion */}
          {/* region > Payment form */}
          <div className="flex justify-center">
            <div className="w-full bg-hex-F1F1F1 rounded-xl mt-62px mb-25px mx-3 lg:w-590px lg:mx-0">
              <h3 className="font-medium text-22px pl-20px py-11px border-b border-hex-D8D8D8">
                クレジットカード
              </h3>
              <div className="flex flex-col lg:table mt-42px">
                <p className="table-row">
                  <label
                    htmlFor="card_type"
                    className="pr-13px table-cell text-hex-3A3A3A lg:pl-55px"
                  >
                    クレジットカード種別
                  </label>
                  <input
                    type="text"
                    id="card_type"
                    className="w-4/5 lg:w-318px lg:mr-0 h-48px outline-none table-cell rounded-xs mb-4 bg-hex-E8E8E8"
                  />
                </p>
                <p className="table-row">
                  <label
                    htmlFor="card_number"
                    className="table-cell text-hex-3A3A3A lg:pl-55px"
                  >
                    クレジットカード
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    className="w-4/5 lg:w-318px lg:mr-0 h-48px outline-none table-cell rounded-xs mb-4 bg-hex-E8E8E8"
                  />
                </p>
                <p className="table-row">
                  <label
                    htmlFor="card_expiration"
                    className="table-cell text-hex-3A3A3A lg:pl-55px"
                  >
                    有効期限日
                  </label>
                  <input
                    type="text"
                    id="card_expiration"
                    className="w-143px h-48px outline-none table-cell rounded-xs mb-4 bg-hex-E8E8E8"
                  />
                  <p className="border border-hex-FF9898 mb-9px w-143px h-28px text-11px text-hex-FF0000 bg-hex-FEE5E5 leading-7 rounded-3px">
                    <ExclamationIcon
                      className="w-4 h-4 ml-7px mr-2.5 inline"
                      fill="#FF0000"
                    />
                    Card has expired!
                  </p>
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-72px">
            <div className="w-590px text-right">
              <button
                onClick={handleCloseModal}
                className="bg-hex-0ABBB5 w-202px h-51px text-white text-20px rounded-8px mr-3 lg:mr-0"
              >
                保存する
              </button>
            </div>
          </div>
          {/* endregion */}
        </div>
        {modalOn ? (
          <PaymentSelection setModalOn={setModalOn} setChoice={setChoice} />
        ) : null}
      </div>
    </>
  )
}

export default PaymentMethod
