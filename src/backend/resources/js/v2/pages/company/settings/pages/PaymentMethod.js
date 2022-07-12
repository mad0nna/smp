import React from 'react'
import { BankIcon, CardIcon } from '../../../../../../icons'

const PaymentMethod = () => {
  return (
    <>
      <h3 className="mt-22px ml-22px font-medium text-23px text-primary-600">
        お支払い方法
      </h3>
      <div>
        <div className="flex flex-col h-fit justify-center lg:min-h-500px lg:mt-95px">
          {/* region > Payment option */}
          <div className="flex justify-center">
            <div className="w-251px h-282px flex flex-col justify-center text-center rounded-3xl bg-hex-D8F3EA mr-3 lg:mr-88px">
              <BankIcon className="block w-130px h-130px bg-red mx-auto" />
              <p className="text-23px text-primary-600 mt-4">銀行振込</p>
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
            <div className="w-251px h-282px flex flex-col justify-center text-center rounded-3xl bg-hex-D8F3EA">
              <CardIcon className="block w-130px h-130px mx-auto" />
              <p className="text-23px text-primary-600 mt-4">銀行振込</p>
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
            <div className="w-590px bg-hex-F1F1F1 rounded-xl mt-62px">
              <h3 className="font-medium text-22px pl-20px pt-11px border-b border-hex-D8D8D8">
                クレジットカード
              </h3>
              <div className="table mt-42px">
                <p className="table-row border border-red-500">
                  <label
                    htmlFor="card_type"
                    className="table-cell text-hex-3A3A3A pl-55px pr-4"
                  >
                    クレジットカード種別
                  </label>
                  <input
                    type="text"
                    id="card_type"
                    className="w-318px h-48px outline-none table-cell rounded-xs mb-4"
                  />
                </p>
                <p className="table-row">
                  <label
                    htmlFor="card_number"
                    className="table-cell text-hex-3A3A3A pl-55px"
                  >
                    クレジットカード
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    className="w-318px h-48px outline-none table-cell rounded-xs mb-4"
                  />
                </p>
                <p className="table-row">
                  <label
                    htmlFor="card_expiration"
                    className="table-cell text-hex-3A3A3A pl-55px"
                  >
                    有効期限日
                  </label>
                  <input
                    type="text"
                    id="card_expiration"
                    className="w-318px h-48px outline-none table-cell rounded-xs mb-4"
                  />
                </p>
              </div>
            </div>
          </div>
          {/* endregion */}
        </div>
      </div>
    </>
  )
}

export default PaymentMethod
