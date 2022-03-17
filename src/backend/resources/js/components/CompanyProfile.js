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
      postalCode: ''
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
    errorMessages: {
      postalCode: '',
      contactNumber: '',
      MobilePhone: '',
      email: '',
      hasError: false
    },
    validationFields: ['postalCode', 'contactNumber', 'MobilePhone', 'email'],
    isSaving: false
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
            ;(companyDetails.companyName = data.Name),
              (companyDetails.contactNumber = data.Phone),
              (companyDetails.street = data.BillingStreet),
              (companyDetails.city = data.BillingCity),
              (companyDetails.state = data.BillingState),
              ((companyDetails.country = data.BillingCountry),
              (companyDetails.postalCode = data.BillingPostalCode),
              (companyDetails.website = data.Website)),
              (companyDetails.industry = data.Industry)
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

        let adminDetails

        setState((prevState) => {
          adminDetails = { ...data.adminDetails }
          ;(adminDetails.Id = data.Id ?? ''),
            (adminDetails.FirstName = data.FirstName ?? ''),
            (adminDetails.LastName = data.LastName ?? ''),
            (adminDetails.Email = data.Email ?? ''),
            (adminDetails.Title = data.Title ?? ''),
            (adminDetails.MobilePhone = data.MobilePhone ?? ''),
            (adminDetails.section__c = data.section__c ?? ''),
            (adminDetails.admin__c = data.admin__c == '3' ? true : false)

          return {
            ...prevState,
            adminDetails: adminDetails,
            adminDetailsEditValues: adminDetails,
            isAbleToEdit: data.ableToEdit
          }
        })
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
        isEditingProfile: !prevState.isEditingProfile
      }
    })
  }

  const handleFormChanges = (cat, key, val) => {
    const re = /^[0-9\b]+$/
    let hasError = false
    let errorMessage = ''

    switch (key) {
      case 'contactNumber':
        key = 'contactNumber'
        if (val === '' || re.test(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの７桁の郵便番号を入力してください'
          hasError = true
        }

        break
      case 'postalCode':
        key = 'postalCode'

        if (val === '' || re.test(val)) {
          errorMessage = ''
        } else {
          errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
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

    setState((prevState) => {
      let { companyEditValues, adminDetailsEditValues, errorMessages } = {
        ...prevState
      }
      if (cat === 'company' && hasError == false) {
        companyEditValues[key] = val
      } else if (cat === 'admin' && hasError == false) {
        adminDetailsEditValues[key] = val
      }
      errorMessages[key] = errorMessage
      errorMessages['hasError'] = hasError

      return {
        ...prevState,
        companyEditValues,
        errorMessages
      }
    })
  }

  // const validateForm = () => {
  //   // validationFields
  //   const re = /^[0-9\b]+$/
  //   let hasError = false
  //   let errorMessage = ''

  //   switch (key) {
  //     case 'contactNumber':
  //       key = 'contactNumber'
  //       if (val === '' || re.test(val)) {
  //         errorMessage = ''
  //       } else {
  //         errorMessage = 'ハイフンなしの７桁の郵便番号を入力してください'
  //         hasError = true
  //       }

  //       break
  //     case 'postalCode':
  //       key = 'postalCode'

  //       if (val === '' || re.test(val)) {
  //         errorMessage = ''
  //       } else {
  //         errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
  //         hasError = true
  //       }

  //       break
  //     case 'MobilePhone':
  //       key = 'MobilePhone'

  //       if (val === '' || re.test(val)) {
  //         errorMessage = ''
  //       } else {
  //         errorMessage = 'ハイフンなしの10桁～11桁の電話番号を入力してください'
  //         hasError = true
  //       }

  //       break
  //   }

  //   setState((prevState) => {
  //     let { companyEditValues, adminDetailsEditValues, errorMessages } = {
  //       ...prevState
  //     }
  //     if (cat === 'company' && hasError == false) {
  //       companyEditValues[key] = val
  //     } else if (cat === 'admin' && hasError == false) {
  //       adminDetailsEditValues[key] = val
  //     }
  //     errorMessages[key] = errorMessage
  //     errorMessages['hasError'] = hasError

  //     return {
  //       ...prevState,
  //       companyEditValues,
  //       errorMessages
  //     }
  //   })
  // }

  const saveProfile = (event) => {
    event.preventDefault()
    if (state.isSaving) {
      return
    }
    if (confirm('本当にこのデータを更新してもよろしいですか？')) {
      setState((prevState) => {
        return {
          ...prevState,
          isSaving: true
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
                isSaving: false
              }
            })
            alert('入力内容を更新しました.')
            window.document.getElementById('iconContainer').src = saveIcon
            window.document.getElementById('iconContainer').disabled = false
            // location.reload()
          }
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
            onClick={state.isEditingProfile ? saveProfile : handleChangeProfile}
            className={
              (state.errorMessages.hasError
                ? 'bg-primary-100 pointer-events-none'
                : 'bg-primary-200') +
              `  hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1`
            }
            disabled={state.errorMessages.hasError}
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
              onClick={() =>
                setState((prevState) => {
                  return { ...prevState, isEditingProfile: false }
                })
              }
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
              顧客企業プロフィール
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
                  <label className="text-sm text-gray-400">会社名</label>
                </div>
                <div className="md:w-2/3 flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full px-3 leading-8'
                    }
                  >
                    {state.companyEditValues.companyName}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    defaultValue={state.companyEditValues.companyName}
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
                  <label className="text-sm text-gray-400">所在地</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.companyEditValues.country ?? '' + ' '}
                    {state.companyEditValues.state ?? '' + ' '}
                    {state.companyEditValues.city ?? '' + ' '}
                    {state.companyEditValues.street ?? '' + ' '}
                    {state.companyEditValues.postalCode ?? ''}
                  </label>
                  <div className="space-y-1">
                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={state.companyEditValues.country}
                      type="text"
                      placeholder="国"
                      onChange={(e) =>
                        handleFormChanges('company', 'country', e.target.value)
                      }
                    />

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={state.companyEditValues.state}
                      type="text"
                      placeholder="都道府県"
                      onChange={(e) =>
                        handleFormChanges('company', 'state', e.target.value)
                      }
                    />

                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={state.companyEditValues.city}
                      type="text"
                      placeholder="市区町村"
                      onChange={(e) =>
                        handleFormChanges('company', 'city', e.target.value)
                      }
                    />
                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={state.companyEditValues.street}
                      type="text"
                      placeholder="地名番地、建物名等"
                      onChange={(e) =>
                        handleFormChanges('company', 'street', e.target.value)
                      }
                    />
                    <input
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      maxLength={11}
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
                        (state.errorMessages.postalCode ? '' : 'hidden') +
                        ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                      }
                    >
                      {state.errorMessages.postalCode}
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
                  <label className="text-sm text-gray-400">電話番号</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label
                    className={
                      (state.isEditingProfile ? 'hidden' : '') +
                      ' text-sm text-black w-full h-8 px-3 leading-8'
                    }
                  >
                    {state.companyEditValues.contactNumber}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    maxLength={7}
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
                      (state.errorMessages.contactNumber ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages.contactNumber}
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
                    {state.companyEditValues.website}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    defaultValue={state.companyEditValues.website}
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
                    {state.companyEditValues.industry}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    type="textarea"
                    defaultValue={state.companyEditValues.industry}
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
                    連絡サポート担当者名
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
                      defaultValue={state.adminDetailsEditValues.LastName}
                      placeholder="性"
                      onChange={(e) =>
                        handleFormChanges('admin', 'LastName', e.target.value)
                      }
                    />

                    <input
                      type="text"
                      className={
                        (state.isEditingProfile ? '' : 'hidden') +
                        ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                      }
                      defaultValue={state.adminDetailsEditValues.FirstName}
                      placeholder="名"
                      onChange={(e) =>
                        handleFormChanges('admin', 'FirstName', e.target.value)
                      }
                    />
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
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                    }
                    defaultValue={state.adminDetailsEditValues.Email}
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
                    value={state.adminDetailsEditValues.MobilePhone}
                    placeholder="電話番号"
                    onChange={(e) =>
                      handleFormChanges('admin', 'MobilePhone', e.target.value)
                    }
                  />
                  <label
                    className={
                      (state.errorMessages.MobilePhone ? '' : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages.MobilePhone}
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
