import React from 'react'

const CheckoutAddress = (props) => {
  const prefectureData = [
    { value: '北海道', name: '北海道' },
    { value: '青森県', name: '青森県' },
    { value: '岩手県', name: '岩手県' },
    { value: '宮城県', name: '宮城県' },
    { value: '秋田県', name: '秋田県' },
    { value: '山形県', name: '山形県' },
    { value: '福島県', name: '福島県' },
    { value: '茨城県', name: '茨城県' },
    { value: '栃木県', name: '栃木県' },
    { value: '群馬県', name: '群馬県' },
    { value: '埼玉県', name: '埼玉県' },
    { value: '千葉県', name: '千葉県' },
    { value: '東京都', name: '東京都' },
    { value: '神奈川県', name: '神奈川県' },
    { value: '新潟県', name: '新潟県' },
    { value: '富山県', name: '富山県' },
    { value: '石川県', name: '石川県' },
    { value: '福井県', name: '福井県' },
    { value: '山梨県', name: '山梨県' },
    { value: '長野県', name: '長野県' },
    { value: '岐阜県', name: '岐阜県' },
    { value: '静岡県', name: '静岡県' },
    { value: '愛知県', name: '愛知県' },
    { value: '三重県', name: '三重県' },
    { value: '滋賀県', name: '滋賀県' },
    { value: '京都府', name: '京都府' },
    { value: '大阪府', name: '大阪府' },
    { value: '兵庫県', name: '兵庫県' },
    { value: '奈良県', name: '奈良県' },
    { value: '和歌山県', name: '和歌山県' },
    { value: '鳥取県', name: '鳥取県' },
    { value: '島根県', name: '島根県' },
    { value: '岡山県', name: '岡山県' },
    { value: '広島県', name: '広島県' },
    { value: '山口県', name: '山口県' },
    { value: '徳島県', name: '徳島県' },
    { value: '香川県', name: '香川県' },
    { value: '愛媛県', name: '愛媛県' },
    { value: '高知県', name: '高知県' },
    { value: '福岡県', name: '福岡県' },
    { value: '佐賀県', name: '佐賀県' },
    { value: '長崎県', name: '長崎県' },
    { value: '熊本県', name: '熊本県' },
    { value: '大分県', name: '大分県' },
    { value: '宮崎県', name: '宮崎県' },
    { value: '鹿児島県', name: '鹿児島県' },
    { value: '沖縄県', name: '沖縄県' }
  ]
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-5/6 m-auto bg-white opacity-85 p-10">
        <div className="flex flex-wrap gap-0 w-full justify-start">
          <div className="flex w-full flex-wrap gap-0 text-gray-700 items-center mt-5">
            <div className="text-center w-full text-secondary-200 font-black mb-8 font-semibold">
              お会計方法を選択してください
            </div>
            <form className="w-full max-w-lg">
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-company-name"
                  >
                    貴社名
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-company-name"
                    type="text"
                    name="company_name"
                    // value={props.addressData.company_name}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-last-name"
                  >
                    名前（性）
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-last-name"
                    type="text"
                    name="last_name"
                    // value={props.addressData.last_name}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-first-name"
                  >
                    名前（名）
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-first-name"
                    type="text"
                    name="first_name"
                    // value={props.addressData.first_name}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 郵便番号
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="postal_code"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 都道府県
                  </label>
                </div>
                <div className="md:w-2/3">
                  {/* <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="prefecture"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  /> */}
                  <div className="relative inline-block w-full text-gray-700">
                    <select
                      className="form-select appearance-none
                    block
                    w-full
                    px-3
                    py-1.5
                    text-base
                    font-normal
                    text-black-700
                    bg-gray-200 bg-clip-padding bg-no-repeat
                    border border-solid border-gray-300
                    rounded
                    transition
                    ease-in-out
                    m-0
                    focus:text-gray-700 focus:bg-white focus:border-grey-700 focus:outline-none"
                      onChange={props.handleOnChange}
                      name="prefecture"
                    >
                      <option value="">Please Select Prefecture</option>
                      {prefectureData.map((data, key) => (
                        <option key={key} value={data.value}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 市区町村
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="city"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 町域・番地
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="street_address"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 ビル建物名など
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="building_name"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-address-name"
                  >
                    配送先 電話番号
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-address-name"
                    type="text"
                    name="number"
                    // value={props.addressData.address}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-5">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 md:text-left mb-1 md:mb-0 pr-1"
                    htmlFor="inline-mail-name"
                  >
                    担当者 メールアドレス
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white"
                    id="inline-mail-name"
                    type="email"
                    name="email"
                    // value={props.addressData.email}
                    onChange={props.handleOnChange}
                    required
                  />
                </div>
              </div>
            </form>
            <div className="text-center w-full space-y-5">
              <div className="space-x-5">
                <button
                  className="bg-gray-400 h-12 w-2/6 rounded-3xl text-black font-semibold"
                  onClick={props.handleCloseModal}
                >
                  キャンセル
                </button>
                <button
                  className="bg-primary-200 text-white h-12 w-2/6 rounded-3xl font-semibold"
                  onClick={props.handleSubmit}
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
export default CheckoutAddress