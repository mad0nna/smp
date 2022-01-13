import React from 'react'

function Checkout(props) {
  // const [state, setState] = useState({
  //   optionValue: ''
  // })

  // const onOptionChange = (event) => {
  //   setState((prevState) => {
  //     return {
  //       ...prevState,
  //       optionValue: event.target.value
  //     }
  //   })
  // }
  return (
    <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="rounded-lg border-2 border-gray-200 absolute inset-1/3 top-48  h-96 m-auto bg-white opacity-85 p-3">
        <div className="flex flex-wrap gap-0 w-full justify-start mt-1">
          <div className="flex w-full flex-wrap gap-0 text-gray-700 items-center mt-3 ">
            <div className="text-center w-full text-secondary-200 font-black mb-6 font-semibold">
              Billing Address
            </div>
            <div className="w-full space-y-5">
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0 w-full">
                  <label
                    className="block mb-2 font-bold text-sm text-black-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                  />
                </div>
                <div className="md:ml-2 w-full">
                  <label
                    className="block mb-2 font-bold text-sm text-black-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="mb-4 md:flex">
                <div className="mb-4 md:mr-2 md:mb-0 w-full">
                  <label
                    className="block mb-2 font-bold text-sm text-black-700"
                    htmlFor="firstName"
                  >
                    Address
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded appearance-none focus:outline-none"
                    id="firstName"
                    type="text"
                    placeholder="Address"
                  />
                </div>
              </div>
              <div className="space-x-5">
                <button
                  className="bg-gray-400 h-12 w-2/6 rounded-3xl text-black font-semibold"
                  onClick={() => props.handleCloseModal()}
                >
                  キャンセル
                </button>
                <button className="bg-primary-200 text-white h-12 w-2/6 rounded-3xl font-semibold">
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
export default Checkout
