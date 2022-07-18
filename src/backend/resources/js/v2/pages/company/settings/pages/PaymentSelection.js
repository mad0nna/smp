import React from 'react'
import { XIcon } from '../../../../../../icons'

const PaymentSelection = ({ setModalOn }) => {
  const handleConfirm = () => {
    setModalOn(false)
  }

  const handleClose = () => {
    setModalOn(false)
  }

  return (
    <div className="bg-black fixed bg-opacity-88 inset-0">
      <div className="flex h-screen justify-center items-center">
        <div className="flex-col w-432px justify-center bg-white rounded-10px opacity-100">
          <div className="flex justify-between border-b border-hex-D8D8D8 py-25px">
            <h1 className="text-20px font-medium ml-5">お支払い方法の変更</h1>
            <button onClick={handleClose} className="mr-5">
              <XIcon className="w-21px h-21px" />
            </button>
          </div>
          <div className="text-base text-center font-normal text-hex-2D2D2D my-10">
            <p>お支払い方法を変更します。</p>
            <p>よろしいですか？</p>
          </div>
          <div className="text-center mb-37px">
            <button
              onClick={handleClose}
              className="rounded-9px px-4 py-2 w-165px h-58px font-medium text-white bg-hex-A8A8A8 mr-25px"
            >
              キャンセル
            </button>
            <button
              onClick={handleConfirm}
              className="rounded-9px px-4 py-2 w-165px h-58px font-medium text-white bg-hex-67D5D1"
            >
              はい
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSelection
