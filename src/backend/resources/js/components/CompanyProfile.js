import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'
import spinner from '../../img/spinner.gif'

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
      isGettingData: false,
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
    this.populateTheCompanyDetails = this.populateTheCompanyDetails.bind(this)
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
        this.populateTheCompanyDetails(data)
        let ZenDetails = { ...this.state.ZenDetails }
        ZenDetails.orgName = data.Zendeskaccount__c
        this.setState({ ZenDetails })
      })
  }

  populateTheCompanyDetails(data) {
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
        }
        this.setState({
          adminDetails: data,
          isAbleToEdit: data.ableToEdit
        })
        return true
      })
  }

  handleChangeProfile() {
    this.setState({ isGettingData: true })
    fetch('/salesforce/getUpdatedDataForEditCompanyDetails', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        this.populateTheCompanyDetails(data.company)
        this.setState({ adminDetails: data.admin })
        let companyEditValues = { ...this.state.companyDetails }
        let adminDetailsEditValues = { ...this.state.adminDetails }
        this.setState(() => {
          return {
            isEditingProfile: !this.state.isEditingProfile,
            isGettingData: false,
            companyEditValues,
            adminDetailsEditValues
          }
        })
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
    if (confirm('本当にこのデータを更新してもよろしいですか？')) {
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
    let currentIcon = this.state.isEditingProfile
      ? saveIcon
      : this.state.isGettingData
      ? spinner
      : editIcon
    return (
      <div>
        <div className="flex flex-wrap gap-0 w-full justify-end mt-6 ">
          <button
            onClick={
              this.state.isEditingProfile
                ? this.saveProfile
                : this.handleChangeProfile
            }
            className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
          >
            <img className="inline mr-2 w-4" src={currentIcon} />
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
        <div className="text-right h-8 px-3 leading-8 text-sm">
          {this.state.isGettingData
            ? '更新されたデータをSalesforceから取得'
            : ''}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="grid grid-cols-5 w-full gap-6 mx-10">
        <div className="col-span-3 bg-white rounded-lg shadow-xl px-3">
          <div className="pt-3 pb-6">
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                顧客企業プロフィール
              </h2>
            </div>
          </div>
          <div className="mb-6">
            <div className="">
              <div className="flex flex-wrap gap-0 w-full justify-start items-center">
                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden'
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
                    <label className="text-sm text-gray-400">会社名</label>
                  </div>
                  <div className="md:w-2/3 flex-grow">
                    <label
                      className={
                        (this.state.isEditingProfile ? 'hidden' : '') +
                        ' text-sm text-black w-full px-3 leading-8'
                      }
                    >
                      {this.state.companyDetails.companyName}
                    </label>
                    <input
                      className={
                        (this.state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
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
                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
                    <label className="text-sm text-gray-400">所在地</label>
                  </div>
                  <div className="md:w-2/3 md:flex-grow">
                    <label
                      className={
                        (this.state.isEditingProfile ? 'hidden' : '') +
                        ' text-sm text-black w-full h-8 px-3 leading-8'
                      }
                    >
                      {this.state.companyDetails.country ?? '' + ' '}
                      {this.state.companyDetails.state ?? '' + ' '}
                      {this.state.companyDetails.city ?? '' + ' '}
                      {this.state.companyDetails.street ?? '' + ' '}
                      {this.state.companyDetails.postalCode ?? ''}
                    </label>
                    <div className="space-y-1">
                      <input
                        className={
                          (this.state.isEditingProfile ? '' : 'hidden') +
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={this.state.companyEditValues.country}
                        type="text"
                        placeholder="国"
                        onChange={(e) =>
                          this.handleFormChanges(
                            'company',
                            'country',
                            e.target.value
                          )
                        }
                      />

                      <input
                        className={
                          (this.state.isEditingProfile ? '' : 'hidden') +
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={this.state.companyEditValues.state}
                        type="text"
                        placeholder="都道府県"
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
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={this.state.companyEditValues.city}
                        type="text"
                        placeholder="市区町村"
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
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={this.state.companyEditValues.street}
                        type="text"
                        placeholder="地名番地、建物名等"
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
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
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
                    </div>
                  </div>
                </div>

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
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
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
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

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
                    <label className="text-sm text-gray-400">
                      ウェブサイト
                    </label>
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
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
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

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
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
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
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

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
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
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={
                          this.state.adminDetailsEditValues.LastName
                        }
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
                          ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                        }
                        defaultValue={
                          this.state.adminDetailsEditValues.FirstName
                        }
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

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
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
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={this.state.adminDetailsEditValues.Email}
                      placeholder="メールアドレス"
                      onChange={(e) =>
                        this.handleFormChanges('admin', 'Email', e.target.value)
                      }
                      disabled
                    />
                  </div>
                </div>

                <div
                  className={
                    (this.state.isEditingProfile
                      ? 'hidden space-y-1 '
                      : 'py-1 hover:bg-gray-50 ') +
                    'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                  }
                >
                  <div className="md:mb-0 md:w-1/3">
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
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={
                        this.state.adminDetailsEditValues.MobilePhone
                      }
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
        </div>
        <div className="col-span-2 gap-6 flex flex-col justify-between">
          <div className="bg-white rounded-lg shadow-xl px-3">
            <div className="pt-3 pb-6">
              <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
                <h2 className="text-green-800 text-lg font-bold">
                  KOT インフォメーション
                </h2>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">
                    KOT販売代理店番号:
                  </label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                  {this.state.KotDetails.negotiationID ?? 'N/A'}
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">KOT 利用料 :</label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                  {this.state.KotDetails.amount ?? 'N/A'}
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">KOT 物販:</label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                  {this.state.KotDetails.type ?? 'N/A'}
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">KOT 契約番:</label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                  {this.state.KotDetails.stagename ?? 'N/A'}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl px-3 flex-grow">
            <div className="pt-3 pb-6">
              <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
                <h2 className="text-green-800 text-lg font-bold">
                  Zendesk インフォメーション
                </h2>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="md:w-1/2">
                  <label className="text-sm text-gray-400">
                    Zendesk 組織名:
                  </label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                  {this.state.ZenDetails.orgName ?? 'N/A'}
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">アカウントID:</label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                  {this.state.ZenDetails.opportunityOwner ?? 'N/A'}
                </div>
              </div>
              <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <label className="text-sm text-gray-400">商談ID:</label>
                </div>
                <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                  {this.state.ZenDetails.opportunityId ?? 'N/A'}
                </div>
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
