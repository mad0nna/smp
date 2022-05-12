import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'
import spinner from '../../img/spinner.gif'
import axios from 'axios'

const CompanyProfile = () => {
  const [state, setState] = useState({
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
    adminDetailsEditValues: {
      Id: '',
      Department: '',
      FirstName: '',
      LastName: '',
      Email: '',
      MobilePhone: '',
      Title: '',
      section__c: '',
      admin__c: ''
    },
    isEditingContact: false,
    isAbleToEdit: false,
    isGettingData: false,
    adminDetails: {
      Id: '',
      Department: '',
      FirstName: '',
      LastName: '',
      Email: '',
      MobilePhone: '',
      Title: '',
      section__c: '',
      admin__c: ''
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
    isLoading: false
  })

  let defaultErrorMessage = {
    companyName: '',
    country: '',
    state: '',
    city: '',
    street: '',
    postalCode: '',
    LastName: '',
    FirstName: '',
    contactNumber: '',
    MobilePhone: '',
    email: '',
    hasError: false
  }

  const [errorMessages, setErrorMessages] = useState({
    defaultErrorMessage
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

          let companyDetails = null
          setState((prevState) => {
            companyDetails = { ...data.companyDetails }
            ;(companyDetails.companyName = data.Name ?? ''),
              (companyDetails.contactNumber = data.Phone ?? ''),
              (companyDetails.street = data.BillingStreet ?? ''),
              (companyDetails.city = data.BillingCity ?? ''),
              (companyDetails.state = data.BillingState ?? ''),
              ((companyDetails.country = data.BillingCountry ?? ''),
              (companyDetails.postalCode = data.BillingPostalCode ?? ''),
              (companyDetails.website = data.Website ?? '')),
              (companyDetails.industry = data.Industry ?? '')
            let ZenDetails = { ...prevState.ZenDetails }
            ZenDetails.orgName = data.Zendeskaccount__c
            return {
              ...prevState,
              companyDetails,
              companyEditValues: companyDetails,
              ZenDetails
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
            adminDetails: {
              Id: data.Id ?? '',
              FirstName: data.FirstName ?? '',
              LastName: data.LastName ?? '',
              Email: data.Email ?? '',
              Title: data.Title ?? '',
              MobilePhone: data.MobilePhone ?? '',
              section__c: data.section__c ?? '',
              admin__c: data.admin__c ?? ''
            },
            adminDetailsEditValues: {
              Id: data.Id ?? '',
              FirstName: data.FirstName ?? '',
              LastName: data.LastName ?? '',
              Email: data.Email ?? '',
              Title: data.Title ?? '',
              MobilePhone: data.MobilePhone ?? '',
              section__c: data.section__c ?? '',
              admin__c: data.admin__c ?? ''
            },
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
          let KotDetails = { ...prevState.KotDetails }
          KotDetails.negotiationID = data.ID__c
          KotDetails.type = data.Type
          KotDetails.amount = data.Amount
          KotDetails.stagename = data.StageName

          let ZenDetails = { ...prevState.ZenDetails }
          ZenDetails.opportunityId = data.Id
          ZenDetails.opportunityOwner = data.Zen__c
          return {
            ...prevState,
            KotDetails,
            ZenDetails
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
        if (!data.admin) {
          return setState((prevState) => {
            alert(
              'ログインしたユーザーはセールスフォース内の「アドミン」ではありません'
            )
            return {
              ...prevState,
              isEditingContact: false,
              isAbleToEdit: false,
              isGettingData: false,
              isEditingProfile: false
            }
          })
        }

        setState((prevState) => {
          let companyEditValues = { ...state.companyEditValues }
          ;(companyEditValues.companyName = data.company.Name ?? ''),
            (companyEditValues.contactNumber = data.company.Phone ?? ''),
            (companyEditValues.street = data.company.BillingStreet ?? ''),
            (companyEditValues.city = data.company.BillingCity ?? ''),
            (companyEditValues.state = data.company.BillingState ?? ''),
            ((companyEditValues.country = data.company.BillingCountry ?? ''),
            (companyEditValues.postalCode =
              data.company.BillingPostalCode ?? ''),
            (companyEditValues.website = data.company.Website ?? '')),
            (companyEditValues.industry = data.company.Industry ?? '')

          let adminDetailsEditValues = { ...data.adminDetailsEditValues }
          ;(adminDetailsEditValues.Id = data.admin.Id ?? ''),
            (adminDetailsEditValues.FirstName = data.admin.FirstName ?? ''),
            (adminDetailsEditValues.LastName = data.admin.LastName ?? ''),
            (adminDetailsEditValues.Email = data.admin.Email ?? ''),
            (adminDetailsEditValues.Title = data.admin.Title ?? ''),
            (adminDetailsEditValues.MobilePhone = data.admin.MobilePhone ?? ''),
            (adminDetailsEditValues.section__c = data.admin.section__c ?? ''),
            (adminDetailsEditValues.admin__c = data.admin.admin__c ?? false)

          return {
            ...prevState,
            isEditingProfile: !prevState.isEditingProfile,
            isGettingData: false,
            isLoading: false,
            companyEditValues,
            adminDetailsEditValues
          }
        })
        window.document.getElementById('iconContainer').src = saveIcon
      })
  }

  const handleFormChanges = (cat, key, val) => {
    const re = /^[0-9\b]+$/
    let hasError = false
    let errorMessage = ''

    switch (key) {
      case 'contactNumber':
        key = 'contactNumber'
        if (val !== '' && re.test(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
          hasError = true
        }
        break

      case 'postalCode':
        key = 'postalCode'

        if (val === '' || re.test(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの７桁の郵便番号を入力してください'
          hasError = true
        }
        break

      case 'MobilePhone':
        key = 'MobilePhone'

        if (val === '' || re.test(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
          hasError = true
        }
        break
    }

    let { companyEditValues, adminDetailsEditValues } = state

    let _errorMessages = errorMessages

    if (cat === 'company') {
      companyEditValues[key] = val
    } else if (cat === 'admin') {
      adminDetailsEditValues[key] = val
    }
    _errorMessages[key] = errorMessage
    _errorMessages['hasError'] = hasError

    setErrorMessages(() => {
      return {
        ..._errorMessages
      }
    })
  }

  const validateForm = (event) => {
    event.preventDefault()
    const re = /^[0-9\b]+$/
    let hasError = false
    let errorMessage = ''
    let _errorMessages = errorMessages
    let key = ''
    let val = ''

    state.validationFields.map((field) => {
      val = ''
      errorMessage = ''
      switch (field) {
        case 'companyName':
          key = 'companyName'
          val = state.companyEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break
        case 'country':
          key = 'country'
          val = state.companyEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break

        case 'state':
          key = 'state'
          val = state.companyEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break

        case 'city':
          key = 'city'
          val = state.companyEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break

        case 'contactNumber':
          key = 'contactNumber'
          val = state.companyEditValues[key]

          if (val.trim().length >= 10 && re.test(val)) {
            errorMessage = ''
          } else {
            errorMessage =
              'ハイフンなしの10桁～11桁の電話番号を入力してください'
            hasError = true
          }
          break

        case 'postalCode':
          key = 'postalCode'
          val = state.companyEditValues[key]

          if (val.trim().length == 7 && re.test(val)) {
            errorMessage = ''
          } else {
            errorMessage = 'ハイフンなしの７桁の郵便番号を入力してください'
            hasError = true
          }
          break

        case 'LastName':
          key = 'LastName'
          val = state.adminDetailsEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break

        case 'FirstName':
          key = 'FirstName'
          val = state.adminDetailsEditValues[key]

          if (val.trim() === '') {
            errorMessage = '必須フィールド'
            hasError = true
          }
          break

        case 'MobilePhone':
          key = 'MobilePhone'
          val = state.adminDetailsEditValues[key]

          if (val.trim().length >= 10 && re.test(val)) {
            errorMessage = ''
          } else {
            errorMessage =
              'ハイフンなしの10桁～11桁の電話番号を入力してください'
            hasError = true
          }

          break
      }

      _errorMessages[field] = errorMessage
      _errorMessages['hasError'] = hasError
    })

    setErrorMessages(() => {
      return {
        ..._errorMessages
      }
    })

    if (hasError === false && state.isEditingProfile) {
      setState((prevState) => {
        return {
          ...prevState,
          isLoading: true
        }
      })

      window.document.getElementById('iconContainer').src = spinner
      axios
        .post(
          '/company/updateCompanyDetails',
          {
            companyDetails: state.companyEditValues,
            adminDetails: state.adminDetailsEditValues
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

          window.document.getElementById('iconContainer').src = saveIcon
          window.document.getElementById('iconContainer').disabled = false
          window.document
            .getElementById('nav-dropdown')
            .nextSibling.getElementsByTagName('span')[0].innerHTML =
            state.adminDetailsEditValues.LastName
          window.document
            .getElementById('nav-dropdown')
            .nextSibling.getElementsByTagName('span')[1].innerHTML =
            state.adminDetailsEditValues.FirstName
          window.document.getElementById('companyDropwdownTitle').innerHTML =
            state.companyEditValues.companyName
          alert('入力内容を更新しました.')
        })
    }
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
            onClick={
              state.isEditingProfile ? validateForm : handleChangeProfile
            }
            className={
              (errorMessages.hasError
                ? 'bg-primary-100 pointer-events-none'
                : 'bg-primary-200') +
              (state.isLoading ? ' bg-primary-100 pointer-events-none ' : '') +
              `  hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1 `
            }
            disabled={errorMessages.hasError || state.isLoading}
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
                  return { ...prevState, isEditingProfile: false }
                })
                setErrorMessages(() => {
                  return {
                    ...defaultErrorMessage
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
                    会社名を入力してください
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full px-3 leading-8'
                    }
                  >
                    {state.companyDetails.companyName}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    value={state.companyEditValues.companyName}
                    type="text"
                    placeholder="会社名"
                    onChange={(e) =>
                      handleFormChanges(
                        'company',
                        'companyName',
                        e.target.value
                      )
                    }
                  />
                  <label
                    className={
                      (errorMessages.companyName ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {errorMessages.companyName}
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
                    {state.companyDetails.country ?? '' + ' '}
                    {state.companyDetails.state ?? '' + ' '}
                    {state.companyDetails.city ?? '' + ' '}
                    {state.companyDetails.street ?? '' + ' '}
                    {state.companyDetails.postalCode ?? ''}
                  </label>
                  <div className="space-y-1">
                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.country}
                      type="text"
                      placeholder="国名を入力してください"
                      onChange={(e) =>
                        handleFormChanges('company', 'country', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.country ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.country}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.state}
                      type="text"
                      placeholder="都道府県を入力してください"
                      onChange={(e) =>
                        handleFormChanges('company', 'state', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.state ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.state}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.city}
                      type="text"
                      placeholder="市区町村を入力してください"
                      onChange={(e) =>
                        handleFormChanges('company', 'city', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.city ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.city}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.companyEditValues.street}
                      type="text"
                      placeholder="地名番地、建物名等"
                      onChange={(e) =>
                        handleFormChanges('company', 'street', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.street ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.street}
                    </label>

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      maxLength={7}
                      value={state.companyEditValues.postalCode}
                      type="text"
                      placeholder="郵便番号"
                      onChange={(e) =>
                        handleFormChanges(
                          'company',
                          'postalCode',
                          e.target.value
                        )
                      }
                    />
                    <label
                      className={
                        (errorMessages.postalCode ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.postalCode}
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
                    {state.companyDetails.contactNumber}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    maxLength={11}
                    value={state.companyEditValues.contactNumber}
                    placeholder="電話番号"
                    onChange={(e) =>
                      handleFormChanges(
                        'company',
                        'contactNumber',
                        e.target.value
                      )
                    }
                  />
                  <label
                    className={
                      (errorMessages.contactNumber ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {errorMessages.contactNumber}
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
                    {state.companyDetails.website}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    value={state.companyEditValues.website}
                    placeholder="ウェブサイト"
                    onChange={(e) =>
                      handleFormChanges('company', 'website', e.target.value)
                    }
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
                    {state.companyDetails.industry}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    value={state.companyEditValues.industry}
                    placeholder="業種"
                    onChange={(e) =>
                      handleFormChanges('company', 'industry', e.target.value)
                    }
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
                      placeholder="性"
                      onChange={(e) =>
                        handleFormChanges('admin', 'LastName', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.LastName ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.LastName}
                    </label>

                    <input
                      type="text"
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      value={state.adminDetailsEditValues.FirstName}
                      placeholder="名"
                      onChange={(e) =>
                        handleFormChanges('admin', 'FirstName', e.target.value)
                      }
                    />
                    <label
                      className={
                        (errorMessages.FirstName ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {errorMessages.FirstName}
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
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.adminDetails.Email}
                  </label>
                  <input
                    type="input"
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8 input-label'
                    }
                    value={state.adminDetailsEditValues.Email}
                    placeholder="メールアドレス"
                    onChange={(e) =>
                      handleFormChanges('admin', 'Email', e.target.value)
                    }
                    disabled
                  />
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
                    <span className="text-red-500">*</span>
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
                    placeholder="電話番号"
                    onChange={(e) =>
                      handleFormChanges('admin', 'MobilePhone', e.target.value)
                    }
                  />
                  <label
                    className={
                      (errorMessages.MobilePhone ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {errorMessages.MobilePhone}
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
                {state.KotDetails.negotiationID ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 利用料 :</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.amount ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 物販:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.type ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">KOT 契約番:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full px-3">
                {state.KotDetails.stagename ?? 'N/A'}
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
                {state.ZenDetails.orgName ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 border-b border-gray-100 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">アカウントID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                {state.ZenDetails.opportunityOwner ?? 'N/A'}
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start items-center py-2 hover:bg-gray-50">
              <div className="mb-1 md:mb-0 md:w-1/2">
                <label className="text-sm text-gray-400">商談ID:</label>
              </div>
              <div className="md:w-1/2 flex-grow text-sm text-black w-full">
                {state.ZenDetails.opportunityId ?? 'N/A'}
              </div>
            </div>
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
