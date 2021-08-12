import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import profileIcon from '../../../img/customer-company-profile.png'
import businessLogo from '../../../img/business-logo.png'
import iconCompany from '../../../img/company-gray.png'
import iconStreet from '../../../img/street-address-gray.png'
import iconPhone from '../../../img/phone-number-gray.png'
import iconCustomerCompany from '../../../img/customer-company-gray.png'
import iconEmployees from '../../../img/multi-employee-gray.png'

class SalesProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: null,
      contactNumber: null,
      description: null,
      isEditingProfile: false,
      isEditingContact: false
    }

    this.validateForm = (errors) => {
      let valid = true
      Object.values(errors).forEach((val) => val.length > 0 && (valid = false))
      return valid
    }
    this.handleChangeProfile = this.handleChangeProfile.bind(this)
  }

  handleChangeProfile(event) {
    event.preventDefault()
    this.setState({ isEditingProfile: !this.state.isEditingProfile })
  }

  errorClass() {
    //(error)
    // return(error.length === 0 ? '' : 'has-error')
  }

  render() {
    return (
      <div className="flex justify-center bg-gray-100">
        <div className="align-top inline-block w-full rounded-xl border-gray-200 border  bg-white mb-4 ml-8 mr-5 py-5 px-6">
          <div className="component-header relative w-full">
            <img className="inline align-top" src={profileIcon} />
            <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">
              顧客企業プロフィール
            </span>
          </div>
          <div className="mx-10 mt-11 mb-5">
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <img className="inline" src={businessLogo} />
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6">
                  <img className="inline mr-4" src={iconCompany} />
                  <label className="text-sm text-gray-400">会社名</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    さんよう
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue="さんよう"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6">
                  <img className="inline mr-4" src={iconStreet} />
                  <label className="text-sm text-gray-400">住所</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    東京都江東区荒池1-5-2
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue="東京都江東区荒池1-5-2"
                    type="text"
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6">
                  <img className="inline mr-4" src={iconPhone} />
                  <label className="text-sm text-gray-400">電話番号</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    03-1234-5678
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue="03-1234-5678"
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6">
                  <img className="inline mr-4" src={iconCustomerCompany} />
                  <label className="text-sm text-gray-400">顧客企業 ID</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    9999ABCDEFG
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue="9999ABCDEFG"
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6">
                  <img className="inline mr-4" src={iconEmployees} />
                  <label className="text-sm text-gray-400">従業員数</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    300人 - 500人
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue="300人 - 500人"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SalesProfile
if (document.getElementById('sales-profile')) {
  ReactDOM.render(<SalesProfile />, document.getElementById('sales-profile'))
}
