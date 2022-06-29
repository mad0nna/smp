import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'
import spinner from '../../img/spinner.gif'
import MessageDialog from './MessageDialog'
import _, { isEmpty } from 'lodash'
import axios from 'axios'

const CompanyProfile = () => {
  const [state, setState] = useState({
    companyDetails: {
      Name: '',
      Phone: '',
      Website: '',
      Industry: '',
      BillingPostalCode: '',
      BillingCity: '',
      BillingState: '',
      BillingCountry: '',
      BillingStreet: '',
      Id: ''
    },
    KotDetails: {
      ID__c: '',
      Type: '',
      Amount: '',
      StageName: ''
    },
    ZenDetails: {
      Zendeskaccount__c: '',
      Zen__c: '',
      Id: ''
    },
    isEditingProfile: false,
    companyEditValues: {
      Name: '',
      Phone: '',
      Website: '',
      Industry: '',
      BillingPostalCode: '',
      BillingStreet: '',
      BillingCity: '',
      BillingState: '',
      BillingCountry: ''
    },
    adminDetailsEditValues: {
      Id: '',
      FirstName: '',
      LastName: '',
      Email: '',
      MobilePhone: '',
      Title: ''
    },
    isEditingContact: false,
    isAbleToEdit: false,
    isGettingData: false,
    adminDetails: {
      Id: '',
      FirstName: '',
      LastName: '',
      Email: '',
      MobilePhone: '',
      Title: '',
      section__c: ''
    },
    validationFields: [
      'companyName',
      'country',
      'state',
      'city',
      'street',
      'postalCode',
      'LastName',
      'FirstName',
      'contactNumber',
      'MobilePhone',
      'email'
    ],
    isLoading: false,
    currentAdminInSF: false,
    errors: [],
    errorMessages: {}
  })

  useEffect(() => {
    axios
      .post('/company/getCompanyDetails', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        if (response.status == 200) {
          let data = response.data
          if (data.status !== undefined && !data.status) {
            setState((prevState) => {
              return {
                ...prevState,
                hasRequestError: true
              }
            })
          }
          setState((prevState) => {
            return {
              ...prevState,
              companyDetails: data,
              companyEditValues: data,
              ZenDetails: {
                ...prevState.ZenDetails,
                Zendeskaccount__c: data.Zendeskaccount__c
              }
            }
          })
        }
      })

    axios
      .post('/company/getCompanyAdminDetails', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        let data = response.data
        if (data.status !== undefined && !data.status) {
          return setState((prevState) => {
            return {
              ...prevState,
              hasRequestError: true
            }
          })
        }

        setState((prevState) => {
          return {
            ...prevState,
            adminDetails: data,
            adminDetailsEditValues: data,
            isAbleToEdit: data.ableToEdit
          }
        })

        if (!data.ableToEdit) {
          setState((prevState) => {
            return {
              ...prevState,
              isEditingContact: false,
              isAbleToEdit: false,
              isGettingData: false,
              isEditingProfile: false
            }
          })
        }

        return true
      })

    axios
      .post('/company/getOpportunityDetails', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        let data = response.data
        if (data.status !== undefined && !data.status) {
          return setState((prevState) => {
            return {
              ...prevState,
              hasRequestError: true
            }
          })
        }
        setState((prevState) => {
          return {
            ...prevState,
            KotDetails: {
              ID__c: data.ID__c,
              Type: data.Type,
              Amount: data.Amount,
              StageName: data.StageName
            },
            ZenDetails: {
              ...prevState.ZenDetails,
              Id: data.Id,
              Zen__c: data.Zen__c
            }
          }
        })
      })
  }, [])

  const handleChangeProfile = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isGettingData: true
      }
    })

    window.document.getElementById('iconContainer').src = spinner
    axios
      .post('/company/getUpdatedDataForEditCompanyDetails', [], {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        let data = response.data
        setState((prevState) => {
          return {
            ...prevState,
            isEditingProfile: !prevState.isEditingProfile,
            isGettingData: false,
            isLoading: false,
            companyEditValues: {
              Name: data.company.Name ?? '',
              Phone: data.company.Phone ?? '',
              Website: data.company.Website ?? '',
              Industry: data.company.Industry ?? '',
              BillingPostalCode: data.company.BillingPostalCode ?? '',
              BillingStreet: data.company.BillingStreet ?? '',
              BillingCity: data.company.BillingCity ?? '',
              BillingState: data.company.BillingState ?? '',
              BillingCountry: data.company.BillingCountry ?? ''
            },
            adminDetailsEditValues: {
              ...data.admin
            }
          }
        })
        window.document.getElementById('iconContainer').src = saveIcon
        let combineState = Object.assign({}, data.company, data.admin)
        validate(combineState)
      })
  }

  const handleCompanyChanges = (e) => {
    let key = e.target.name
    let val = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        companyEditValues: {
          ...prevState.companyEditValues,
          [key]: val
        }
      }
    })
    validate({ [key]: val })
  }

  const handleAdminChanges = (e) => {
    let key = e.target.name
    let val = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        adminDetailsEditValues: {
          ...prevState.adminDetailsEditValues,
          [key]: val
        }
      }
    })
    validate({ [key]: val })
  }

  const validate = (fields) => {
    const numbersOnly = /^[0-9０-９]+$/g
    let keys = Object.keys(fields)
    keys.forEach((key) => {
      if (key === 'Name') {
        let companyCodeLength = state.companyDetails.Id.length + 2
        let companyNameMaxLength = 100 - companyCodeLength
        if (isEmpty(fields[key])) {
          addError(key, '必須フィールド')
          return
        }
        if (fields[key].length > companyNameMaxLength) {
          addError(key, '最大文字数は 100 文字です。')
          return
        }
        removeError(key)
      }
      if (key === 'Phone') {
        if (isEmpty(fields[key])) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        if (fields[key].length < 10 || fields[key].length > 11) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        if (isEmpty(fields[key].match(numbersOnly))) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        removeError(key)
      }
      if (key === 'BillingPostalCode') {
        if (!(numbersOnly.test(fields[key]) && fields[key].length == 7)) {
          addError(key, 'ハイフンなしの７桁の郵便番号を入力してください')
          return
        }
        removeError(key)
      }
      if (
        key === 'BillingCity' ||
        key === 'BillingState' ||
        key === 'BillingCountry' ||
        key === 'BillingStreet' ||
        key === 'FirstName' ||
        key === 'LastName'
      ) {
        if (isEmpty(fields[key])) {
          addError(key, '必須フィールド')
          return
        }
        removeError(key)
      }
      if (key === 'MobilePhone') {
        if (isEmpty(fields[key])) {
          removeError(key)
          return
        }
        if (fields[key].length < 10 || fields[key].length > 11) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        if (isEmpty(fields[key].match(numbersOnly))) {
          addError(key, 'ハイフンなしの10桁～11桁の電話番号を入力してください')
          return
        }
        removeError(key)
      }
    })
  }

  const addError = (key, message) => {
    if (_.includes(state.errors, key)) {
      setState((prevState) => {
        return {
          ...prevState,
          errorMessages: {
            ...prevState.errorMessages,
            [key]: message
          }
        }
      })
      return
    }
    let newError = state.errors
    newError.push(key)
    setState((prevState) => {
      return {
        ...prevState,
        errors: newError,
        errorMessages: {
          ...prevState.errorMessages,
          [key]: message
        }
      }
    })
  }

  const removeError = (key) => {
    if (!_.includes(state.errors, key)) {
      return
    }
    setState((prevState) => {
      let newError = prevState.errors
      let keyIndex = newError.indexOf(key)
      delete newError[keyIndex]
      newError = newError.filter(function (e) {
        return e != null
      })
      return {
        ...prevState,
        errors: newError
      }
    })
  }

  const submitData = () => {
    let combineState = Object.assign(
      {},
      state.companyEditValues,
      state.adminDetailsEditValues
    )
    validate(combineState)
    if (state.errors.length > 0) {
      return
    }
    window.document.getElementById('iconContainer').src = spinner
    axios
      .post(
        '/company/updateCompanyDetails',
        {
          companyDetails: state.companyEditValues,
          adminDetails: state.adminDetailsEditValues,
          currentAdminInSF: state.currentAdminInSF
        },
        {
          'Content-Type': 'application/json'
        }
      )
      .then((response) => {
        let data = response
        if (data.status) {
          setState((prevState) => {
            return {
              ...prevState,
              isEditingProfile: !state.isEditingProfile,
              isLoading: false
            }
          })
        }
        alert('入力内容を更新しました.')
        location.reload()
      })
      .catch(function () {
        window.document.getElementById('iconContainer').src = saveIcon
        setState((prevState) => {
          return {
            ...prevState,
            isLoading: true,
            isEditingProfile: true,
            showPopupMessageDialog: true,
            dialogMessage:
              'データが異なります。ご確認のうえもう一度試みてください。'
          }
        })
      })
  }

  const displayEditButton = () => {
    let currentIcon = state.isEditingProfile
      ? saveIcon
      : state.isGettingData
      ? spinner
      : editIcon
    return (
      <div>
        <div className="flex flex-wrap gap-0 w-full justify-end mt-6 ">
          <button
            onClick={state.isEditingProfile ? submitData : handleChangeProfile}
            className={
              (state.errors.length > 0
                ? 'bg-lightGreen pointer-events-none'
                : 'bg-tertiary-500') +
              (state.isLoading ? ' bg-lightGreen pointer-events-none ' : '') +
              `  hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1 `
            }
            disabled={state.errors.length > 0 || state.isLoading}
          >
            <img
              id="iconContainer"
              className="inline mr-2 w-4"
              src={currentIcon}
            />
            {state.isEditingProfile ? '変更を保存' : '編集する'}
          </button>

          {state.isEditingProfile ? (
            <button
              onClick={() => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    isEditingProfile: false,
                    errors: [],
                    errorMessages: {}
                  }
                })
              }}
              className="bg-white text-gray-500 rounded-lg p-2 text-sm mr-1"
            >
              キャンセル
            </button>
          ) : (
            ''
          )}
        </div>
        <div className="text-right h-8 px-3 leading-8 text-sm">
          {state.isGettingData ? '更新されたデータをSalesforceから取得' : ''}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-5 w-full gap-6 mx-10">
      <div className="col-span-3 bg-white rounded-lg shadow-xl px-3">
        <div className="pt-3 pb-6">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">
              企業プロフィール
            </h2>
          </div>
        </div>
        <div className="mb-6">
          <div className="">
            <div className="flex flex-wrap gap-0 w-full justify-start items-center">
              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden'
                    : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    会社名
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <p
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full px-3 leading-8'
                    }
                  >
                    {state.companyDetails.Name}
                  </p>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    value={state.companyEditValues.Name}
                    name="Name"
                    type="text"
                    placeholder="会社名"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'Name') ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['Name']}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden space-y-1 '
                    : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    所在地<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    <div className="px-3 flex flex-wrap">
                      {state.companyDetails.BillingCountry ?? '' + ' '}
                      {state.companyDetails.BillingState ?? '' + ' '}
                      {state.companyDetails.BillingCity ?? '' + ' '}
                      {state.companyDetails.BillingStreet ?? '' + ' '}
                      {state.companyDetails.BillingPostalCode ?? ''}
                    </div>
                  </label>
                  <div className="space-y-1">
                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.BillingCountry}
                      name="BillingCountry"
                      type="text"
                      placeholder="国名を入力してください"
                      onChange={(e) => handleCompanyChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'BillingCountry')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['BillingCountry']}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.BillingState}
                      name="BillingState"
                      type="text"
                      placeholder="都道府県を入力してください"
                      onChange={(e) => handleCompanyChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'BillingState')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['BillingState']}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.BillingCity}
                      name="BillingCity"
                      type="text"
                      placeholder="市区町村を入力してください"
                      onChange={(e) => handleCompanyChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'BillingCity')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['BillingCity']}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.BillingStreet}
                      name="BillingStreet"
                      type="text"
                      placeholder="地名番地、建物名等"
                      onChange={(e) => handleCompanyChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'BillingStreet')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['BillingStreet']}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      maxLength={7}
                      value={state.companyEditValues.BillingPostalCode}
                      name="BillingPostalCode"
                      type="text"
                      placeholder="郵便番号"
                      onChange={(e) => handleCompanyChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'BillingPostalCode')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['BillingPostalCode']}
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden space-y-1 '
                    : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    電話番号<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.companyDetails.Phone}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    maxLength={11}
                    value={state.companyEditValues.Phone}
                    name="Phone"
                    placeholder="電話番号"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'Phone') ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['Phone']}
                  </label>
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden space-y-1 '
                    : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">ウェブサイト</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.companyDetails.Website}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    value={state.companyEditValues.Website}
                    name="Website"
                    placeholder="ウェブサイト"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
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
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.companyDetails.Industry}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    value={state.companyEditValues.Industry}
                    name="Industry"
                    placeholder="業種"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden space-y-1 '
                    : 'border-b border-gray-100 py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    連絡サポート担当者名<span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.adminDetails.LastName +
                      ' ' +
                      state.adminDetails.FirstName}
                  </label>
                  <div className="space-y-1">
                    <input
                      type="text"
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.adminDetailsEditValues.LastName}
                      name="LastName"
                      placeholder="姓"
                      onChange={(e) => handleAdminChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'LastName') ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['LastName']}
                    </label>

                    <input
                      type="text"
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.adminDetailsEditValues.FirstName}
                      name="FirstName"
                      placeholder="名"
                      onChange={(e) => handleAdminChanges(e)}
                    />
                    <label
                      className={
                        (_.includes(state.errors, 'FirstName')
                          ? ''
                          : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages['FirstName']}
                    </label>
                  </div>
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
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
                    className={'text-sm text-black w-full h-8 px-3 leading-8'}
                  >
                    {state.adminDetails.Email}
                  </label>
                </div>
              </div>

              <div
                className={
                  (state.isEditingProfile
                    ? 'hidden space-y-1 '
                    : 'py-1 hover:bg-gray-50 ') +
                  'flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center'
                }
              >
                <div className="md:mb-0 md:w-1/3">
                  <label className="text-sm text-gray-400">
                    連絡サポート担当者電話番号
                    {/* <span className="text-red-500">*</span> */}
                  </label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.adminDetails.MobilePhone}
                  </label>
                  <input
                    type="text"
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    maxLength={11}
                    value={state.adminDetailsEditValues.MobilePhone}
                    name="MobilePhone"
                    placeholder="電話番号"
                    onChange={(e) => handleAdminChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'MobilePhone')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['MobilePhone']}
                  </label>
                </div>
              </div>
            </div>
            {state.isAbleToEdit ? displayEditButton() : ''}
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
                {state.KotDetails.ID__c ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 利用料 :</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.Amount ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 物販:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.Type ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 契約番:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.StageName ?? 'N/A'}
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
                <label className="text-sm text-gray-400">Zendesk 組織名:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                {state.ZenDetails.Zendeskaccount__c ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">アカウントID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                {state.ZenDetails.Zen__c ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">商談ID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                {state.ZenDetails.Id ?? 'N/A'}
              </div>
            </div>

            {state.showPopupMessageDialog ? (
              <MessageDialog
                handleCloseMessageDialog={() => {
                  setState((prevState) => {
                    return {
                      ...prevState,
                      showPopupMessageDialog: false,
                      isLoading: false
                    }
                  })
                }}
                message={state.dialogMessage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CompanyProfile
if (document.getElementById('companyProfile')) {
  ReactDOM.render(<CompanyProfile />, document.getElementById('companyProfile'))
}
