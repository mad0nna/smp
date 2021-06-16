import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import profileIcon from '../../img/customer-company-profile.png'
import contactIcon from '../../img/support-profile-icon.png'
import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'

// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

class CompanyProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyDetails: {
        companyName: '',
        contactNumber: '',
        website: '',
        industry: '',
        postalCode: '',
        street: '',
        city: '',
        state: '',
        country: ''
      },
      KotDetails: {
        negotiationID: '',
        type: '',
        amount: '',
        stagename: ''
      },
      ZenDetails: {
        orgName: '',
        opportunityOwner: '',
        opportunityId: ''
      },
      isEditingProfile: false,
      companyEditValues: {
        companyName: null,
        contactNumber: null,
        website: null,
        industry: null,
        postalCode: null
      },
      adminDetailsEditValues: {
        Department: '',
        Firstname: '',
        Lastname: '',
        Email: '',
        MobilePhone: ''
      },
      isEditingContact: false,
      isAbleToEdit: false,
      adminDetails: {
        Department: '',
        FirstName: '',
        LastName: '',
        Email: '',
        MobilePhone: ''
      }
    }

    this.validateForm = (errors) => {
      let valid = true
      Object.values(errors).forEach((val) => val.length > 0 && (valid = false))
      return valid
    }
    this.handleChangeProfile = this.handleChangeProfile.bind(this)
    this.handleChangeContact = this.handleChangeContact.bind(this)
    this.requestCompanyDetail = this.requestCompanyDetail.bind(this)
    this.requestContactDetail = this.requestContactDetail.bind(this)
    this.requestKOTdetails = this.requestKOTdetails.bind(this)
    this.handleFormChanges = this.handleFormChanges.bind(this)
    this.saveProfile = this.saveProfile.bind(this)
    this.requestCompanyDetail()
    this.requestContactDetail()
    this.requestKOTdetails()
  }

  requestKOTdetails() {
    fetch('/salesforce/getOpportunityDetails', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== undefined && !data.status) {
          return this.setState({
            hasRequestError: true
          })
        }
        let KotDetails = { ...this.state.KotDetails }
        KotDetails.negotiationID = data.ID__c
        KotDetails.type = data.Type
        KotDetails.amount = data.Amount
        KotDetails.stagename = data.StageName
        this.setState({ KotDetails })

        let ZenDetails = { ...this.state.ZenDetails }
        ZenDetails.opportunityId = data.Id
        ZenDetails.opportunityOwner = data.Zen__c
        this.setState({ ZenDetails })
      })
  }

  requestCompanyDetail() {
    fetch('/salesforce/getCompanyDetails', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== undefined && !data.status) {
          return this.setState({
            hasRequestError: true
          })
        }
        let companyDetails = { ...this.state.companyDetails }
        ;(companyDetails.companyName = data.Name),
          (companyDetails.contactNumber = data.Phone),
          (companyDetails.street = data.BillingStreet),
          (companyDetails.city = data.BillingCity),
          (companyDetails.state = data.BillingState),
          ((companyDetails.country = data.BillingCountry),
          (companyDetails.postalCode = data.BillingPostalCode),
          (companyDetails.website = data.Website)),
          (companyDetails.industry = data.Industry)
        this.setState({ companyDetails })

        let ZenDetails = { ...this.state.ZenDetails }
        ZenDetails.orgName = data.Zendeskaccount__c
        this.setState({ ZenDetails })
      })
  }

  requestContactDetail() {
    fetch('/salesforce/getCompanyAdminDetails', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status !== undefined && !data.status) {
          this.setState({
            hasRequestError: true
          })
        } else {
          this.setState({
            adminDetails: data,
            isAbleToEdit: data.ableToEdit
          })
        }
      })
  }

  handleChangeProfile(event) {
    event.preventDefault()

    // const { name, value } = event.target
    // let errors = this.state.errors

    // this.setState({errors, [name]: value}, ()=> {
    //   console.log(errors)
    // })
    // let companyEditValues = this.state.companyDetails
    let companyEditValues = { ...this.state.companyDetails }
    let adminDetailsEditValues = { ...this.state.adminDetails }
    this.setState(() => {
      return {
        isEditingProfile: !this.state.isEditingProfile,
        companyEditValues,
        adminDetailsEditValues
      }
    })
  }

  handleChangeContact(event) {
    event.preventDefault()

    // const { name, value } = event.target
    // let errors = this.state.errors

    // this.setState({errors, [name]: value}, ()=> {
    //   console.log(errors)
    // })
    this.setState({
      isEditingContact: !this.state.isEditingContact
    })
  }

  handleFormChanges(cat, key, val) {
    if (cat === 'company') {
      let companyEditValues = { ...this.state.companyEditValues }
      companyEditValues[key] = val
      this.setState({
        companyEditValues
      })
      return
    }
    let adminDetailsEditValues = { ...this.state.adminDetailsEditValues }
    adminDetailsEditValues[key] = val
    this.setState({
      adminDetailsEditValues
    })
  }

  saveProfile(event) {
    event.preventDefault()
    this.setState(() => {
      return {
        isEditingProfile: !this.state.isEditingProfile
      }
    })
    if (confirm('Are you sure do you want to update this data?')) {
      fetch('/salesforce/updateCompanyDetails', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyDetails: this.state.companyEditValues,
          adminDetails: this.state.adminDetailsEditValues
        })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            location.reload()
          }
        })
    }
  }

  errorClass() {
    //(error)
    // return(error.length === 0 ? '' : 'has-error')
  }

  displayEditButton() {
    return (
      <div className="flex flex-wrap gap-0 w-full justify-end mt-6 ">
        <button
          onClick={
            this.state.isEditingProfile
              ? this.saveProfile
              : this.handleChangeProfile
          }
          className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
        >
          <img
            className="inline mr-2"
            src={this.state.isEditingProfile ? saveIcon : editIcon}
          />
          {this.state.isEditingProfile ? '変更を保存' : '編集する'}
        </button>
        {this.state.isEditingProfile ? (
          <button
            onClick={() => this.setState({ isEditingProfile: false })}
            className="bg-white text-gray-500 rounded-lg p-2 text-sm mr-1"
          >
            キャンセル
          </button>
        ) : (
          ''
        )}
      </div>
    )
  }

  render() {
    return (
      <div
        className="flex w-full h-full bg-gray-100"
        style={{ height: '800px' }}
      >
        <div className="align-top inline-block w-3/5 rounded-xl border-gray-200 border h-full bg-white my-4 ml-14 mr-5 py-5 px-6">
          <div className="component-header relative w-full">
            <img className="inline align-top" src={profileIcon} />
            <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">
              顧客企業プロフィール
            </span>
          </div>
          <div className="mx-10 mt-11 mb-2">
            <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">会社名</label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.companyDetails.companyName}
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue={this.state.companyEditValues.companyName}
                    type="text"
                    placeholder="会社名"
                    onChange={(e) =>
                      this.handleFormChanges(
                        'company',
                        'companyName',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">所在地</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.companyDetails.street + ' '}
                    {this.state.companyDetails.city + ' '}
                    {this.state.companyDetails.state + ' '}
                    {this.state.companyDetails.country + ' '}
                    {this.state.companyDetails.postalCode}
                  </label>
                  <div className="space-y-1">
                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.companyEditValues.street}
                      type="text"
                      placeholder="street"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'company',
                          'street',
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.companyEditValues.city}
                      type="text"
                      placeholder="市"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'company',
                          'city',
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.companyEditValues.state}
                      type="text"
                      placeholder="県"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'company',
                          'state',
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.companyEditValues.postalCode}
                      type="text"
                      placeholder="郵便番号"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'company',
                          'postalCode',
                          e.target.value
                        )
                      }
                    />

                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.companyEditValues.country}
                      type="text"
                      placeholder="country"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'company',
                          'country',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">電話番号</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.companyDetails.contactNumber}
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue={this.state.companyEditValues.contactNumber}
                    placeholder="電話番号"
                    onChange={(e) =>
                      this.handleFormChanges(
                        'company',
                        'contactNumber',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">ウェブサイト</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.companyDetails.website}
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue={this.state.companyEditValues.website}
                    placeholder="ウェブサイト"
                    onChange={(e) =>
                      this.handleFormChanges(
                        'company',
                        'website',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">業種</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.companyDetails.industry}
                  </label>
                  <input
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    type="textarea"
                    defaultValue={this.state.companyEditValues.industry}
                    placeholder="業種"
                    onChange={(e) =>
                      this.handleFormChanges(
                        'company',
                        'industry',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    連絡サポート担当者名
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.adminDetails.LastName +
                      ' ' +
                      this.state.adminDetails.FirstName}
                  </label>
                  <div className="space-y-1">
                    <input
                      type="text"
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.adminDetailsEditValues.LastName}
                      placeholder="性"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'admin',
                          'LastName',
                          e.target.value
                        )
                      }
                    />

                    <input
                      type="text"
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                      }
                      defaultValue={this.state.adminDetailsEditValues.FirstName}
                      placeholder="名"
                      onChange={(e) =>
                        this.handleFormChanges(
                          'admin',
                          'FirstName',
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    連絡サポート担当者メールアドレス
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.adminDetails.Email}
                  </label>
                  <input
                    type="input"
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue={this.state.adminDetailsEditValues.Email}
                    placeholder="メールアドレス"
                    onChange={(e) =>
                      this.handleFormChanges('admin', 'Email', e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    連絡サポート担当者電話番号
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (this.state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {this.state.adminDetails.MobilePhone}
                  </label>
                  <input
                    type="text"
                    className={
                      (this.state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    defaultValue={this.state.adminDetailsEditValues.MobilePhone}
                    placeholder="電話番号"
                    onChange={(e) =>
                      this.handleFormChanges(
                        'admin',
                        'MobilePhone',
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            </div>
            {this.state.isAbleToEdit ? this.displayEditButton() : ''}
          </div>
        </div>
        <div className="w-6/12 my-4 ml-5 mr-14">
          <div className="rounded-xl border-gray-200 border bg-white py-5 px-6 pb-16 mb-10">
            <div className="component-header relative w-full">
              <img className="inline align-top" src={contactIcon} />
              <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-md">
                KOT インフォメーション
              </span>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-16 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">
                  KOT販売代理店番号:
                </label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.KotDetails.negotiationID ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-5 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 利用料 :</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.KotDetails.amount ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-5 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 物販:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.KotDetails.type ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-5 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 契約番:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.KotDetails.stagename ?? 'N/A'}
              </div>
            </div>
          </div>

          <div className="rounded-xl border-gray-200 border bg-white py-5 px-6 pb-14">
            <div className="component-header relative w-full">
              <img className="inline align-top" src={contactIcon} />
              <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-md">
                Zendesk インフォメーション
              </span>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-16 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">Zendesk 組織名:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.ZenDetails.orgName}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-5 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">アカウントID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.ZenDetails.opportunityOwner}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-5 mb-2 mx-10">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">商談ID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full h-8 px-3 leading-8">
                {this.state.ZenDetails.opportunityId}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanyProfile
if (document.getElementById('companyProfile')) {
  ReactDOM.render(<CompanyProfile />, document.getElementById('companyProfile'))
}
