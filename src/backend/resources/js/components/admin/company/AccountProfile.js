import React, { useState, useEffect } from 'react'
import profileIcon from '../../../../img/customer-company-profile.png'
import editIcon from '../../../../img/edit-icon.png'
import saveIcon from '../../../../img/Icon awesome-save.png'
import AddAccountToken from './AddAccountToken'
import ConfirmAddAccountDialog from './ConfirmDialog'
import ConfirmSaveUpdateDialog from './ConfirmDialog'
import MessageDialog from './MessageDialog'
import _ from 'lodash'
import queryString from 'query-string'
import axios from 'axios'

const AccountProfile = (props) => {
  console.log(props)
  let defaultCompanyState = {
    companyCode: '',
    id: 0,
    companyId: '',
    sfId: '',
    email: '',
    accountType: '',
    customerClassification: '',
    name: '',
    industry: null,
    industrySub: '',
    industrySub2: '',
    kotTransType: '',
    paymentType: '',
    kotAccountId: '',
    zenOrgName: '',
    zendeskOpportunityId: '',
    phoneNumber: '',
    recordTypeCode: ''
  }
  const [state, setState] = useState({
    company: _.isEmpty(props.company) ? defaultCompanyState : props.company,
    isEditingProfile: props.isEditingProfile,
    showPopupAddAccountToken: false,
    showPopupConfirmAddAccountDialog: false,
    showPopupMessageDialog: false,
    showPopupConfirmSaveUpdateDialog: false,
    dialogMessage: '',
    redirectAfterSuccess: false,
    isLoading: false
  })

  const industryTypes = [
    null,
    '農林・水産・鉱業',
    '商業|小売',
    '商業|飲食',
    '商業|卸売',
    '建設',
    '製造',
    '物流',
    '政府・公共',
    '教育機関',
    '福祉・介護',
    '医療',
    '電力・ガス・その他エネルギー',
    '不動産',
    '通信',
    'マスコミ',
    'サービス|レジャー|アミューズメント',
    'サービス|レジャー|旅行・観光',
    'サービス|レジャー|スポーツ・アウトドア施設',
    'サービス|レンタル',
    'サービス|法人向けサービス',
    'サービス|個人向けサービス',
    '金融|金融',
    '金融|保険',
    '金融|証券',
    'その他',
    '不明'
  ]

  const handleChangeIndustry = (e) => {
    setState((prevState) => {
      let _company = prevState.company
      _company['industry'] = e.target.value
      return {
        company: _company,
        ...prevState
      }
    })
  }

  const addCompanyToken = (token) => {
    setState((prevState) => {
      let _company = prevState.company
      _company['token'] = token
      return {
        ...prevState,
        company: _company,
        showPopupAddAccountToken: false,
        dialogMessage:
          'この顧客企業を \n 本当に韋駄天に追加してもよろしいですか？',
        showPopupConfirmAddAccountDialog: true
      }
    })
  }

  const handleShowAddToken = () => {
    // Checking if the company account has an email
    if (_.isEmpty(state.company.admin[0]['email'])) {
      setState((prevState) => {
        return {
          ...prevState,
          dialogMessage:
            '連絡先メールアドレスがないとアカウントを追加できません。\n 続行するには、Salesforceに連絡先情報を入力してください。',
          showPopupMessageDialog: !prevState.showPopupMessageDialog
        }
      })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          showPopupAddAccountToken: !prevState.showPopupAddAccountToken
        }
      })
    }
  }

  const addAccount = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })

    axios
      .post(`/admin/company/saveAddedCompany`, state.company, {
        'Content-Type': 'application/json'
      })
      .then((data) => {
        if (data.data.success !== undefined && data.data.success === true) {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupConfirmAddAccountDialog: false,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              dialogMessage:
                '顧客企業の新規追加に成功しました！\n 招待メールが追加した顧客企業に送信されました。\n アカウント一覧をご確認ください。',
              redirectAfterSuccess: true,
              isLoading: false
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              dialogMessage:
                'データの保存に失敗しました。\n メールがまだ使用されていないことを確認してください。 または、会社のアカウントがすでに追加されている可能性があります。',
              showPopupAddAccountToken: false,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              redirectAfterSuccess: false,
              isLoading: false
            }
          })
        }
      })
      .catch((error) => {
        if (error.response.status == 500) {
          setState((prevState) => {
            return {
              ...prevState,
              dialogMessage:
                'データの保存に失敗しました。\n メールがまだ使用されていないことを確認してください。 または、会社のアカウントがすでに追加されている可能性があります。',
              showPopupAddAccountToken: false,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              redirectAfterSuccess: false,
              isLoading: false
            }
          })
        }
      })
  }

  const closeConfirmDialog = (name) => {
    if (name === 'ConfirmAddAccountDialog') {
      setState((prevState) => {
        return {
          ...prevState,
          showPopupConfirmAddAccountDialog: false
        }
      })
    } else if (name === 'ConfirmSaveUpdateDialog') {
      setState((prevState) => {
        return {
          ...prevState,
          showPopupConfirmSaveUpdateDialog: false
        }
      })
    }
  }

  const handleShowUpdateSaveDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        dialogMessage: '変更を保存しても宜しいですか？',
        showPopupConfirmSaveUpdateDialog: true
      }
    })
  }

  const updateSaveAccount = () => {
    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })

    let nameLength = state.company.name.length
    let kotCompanyCodeLength = state.company.companyCode.length + 2
    let _errorMessages = errorMessages
    if (nameLength + kotCompanyCodeLength >= 101) {
      _errorMessages['name'] = '最大文字数は 100 文字です。'
      _errorMessages['hasError'] = true
      setErrorMessages(() => {
        return {
          ..._errorMessages
        }
      })
      setState((prevState) => {
        return {
          ...prevState,
          showPopupMessageDialog: false,
          showPopupConfirmSaveUpdateDialog: false,
          isLoading: false
        }
      })
    } else {
      _errorMessages['name'] = ''
      _errorMessages['hasError'] = false
      setErrorMessages(() => {
        return {
          ..._errorMessages
        }
      })
    }

    if (errorMessages.hasError) {
      setState((prevState) => {
        return {
          ...prevState,
          showPopupMessageDialog: false,
          showPopupConfirmSaveUpdateDialog: false,
          isLoading: false
        }
      })
      return
    }

    let account = state.company
    account._token = props.token

    axios
      .post(`/admin/company/updateSaveAccount`, account, {
        'Content-Type': 'application/json'
      })
      .then((data) => {
        if (
          data.data.success.status !== undefined &&
          data.data.success.status === true
        ) {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupMessageDialog: !prevState.showPopupMessageDialog,
              dialogMessage: 'データの保存に成功しました。',
              redirectAfterSuccess: true,
              showPopupConfirmSaveUpdateDialog: false,
              isLoading: false
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              showPopupAddAccountToken: false,
              showPopupMessageDialog: true,
              dialogMessage: 'データの保存に失敗しました。',
              redirectAfterSuccess: false,
              showPopupConfirmSaveUpdateDialog: false,
              isLoading: false
            }
          })
        }
      })
  }

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: false,
        showPopupConfirmAddAccountDialog: false
      }
    })

    if (state.redirectAfterSuccess) {
      props.handleUpdateList()
    }
  }

  function handleNumberChange(evt) {
    evt = evt ? evt : window.event
    var charCode = evt.which ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 45) {
      evt.preventDefault()
      return false
    }

    return true
  }

  let defaultErrorMessage = {
    name: '',
    hasError: false
  }

  const [errorMessages, setErrorMessages] = useState({
    defaultErrorMessage
  })

  const handleTextChange = (e) => {
    let fieldName = e.target.name
    let _errorMessages = errorMessages
    if (fieldName == 'name') {
      let nameLength = e.target.value.length
      let kotCompanyCodeLength = state.company.companyCode.length + 2
      if (nameLength + kotCompanyCodeLength >= 101) {
        _errorMessages[fieldName] = '最大文字数は 100 文字です。'
        _errorMessages['hasError'] = true

        setErrorMessages(() => {
          return {
            ..._errorMessages
          }
        })
      } else {
        _errorMessages[fieldName] = ''
        _errorMessages['hasError'] = false
        setErrorMessages(() => {
          return {
            ..._errorMessages
          }
        })
      }
    }
    setState((prevState) => {
      return {
        ...prevState,
        company: { ...prevState.company, [fieldName]: e.target.value }
      }
    })
  }

  const handleTextChangeNumberofemployees = () => {
    setState((prevState) => {
      return {
        ...prevState
      }
    })
  }

  const closeAccountToken = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupAddAccountToken: !prevState.showPopupAddAccountToken
      }
    })
  }

  useEffect(() => {
    if (_.isEmpty(props.company)) {
      let params = queryString.parse(location.search)
      let url = ''
      let id = null
      let code = null
      let isEditingProfile = false

      if (params.id) {
        url = '/admin/company/searchCompanyId'
        id = params.id
        isEditingProfile = true
      } else if (params.code) {
        url = '/admin/company/searchCompanyCode'
        code = params.code
      } else {
        alert('レコードが見つかりませんでした')
        return
      }

      axios
        .post(url, {
          company_id: id,
          code: code,
          _token: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute('content')
        })
        .then((result) => {
          if (
            result.data.success !== undefined &&
            result.data.success === true
          ) {
            setState((prevState) => {
              return {
                ...prevState,
                company: result.data.data,
                isEditingProfile: isEditingProfile
              }
            })
          } else {
            setState((prevState) => {
              return {
                ...prevState,
                fetchResult:
                  '申し訳ありませんが、データの取得中にエラーが発生しました'
              }
            })
          }
        })
    }
  }, [props.company])

  return (
    <div className="flex justify-center w-full h-full bg-white">
      <input type="hidden" name="_token" value={state.token}></input>
      <div className="align-top inline-block w-8/12 ">
        <div className="my-4 ml-14 mr-5 py-5 px-6">
          <img className="inline align-top" src={profileIcon} />
          <span className="align-bottom ml-2 p-0 inline text-tertiary-500 font-bold text-lg">
            顧客企業情報
          </span>
        </div>

        <div className="my-4 ml-14 mr-5 py-5 px-6  rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  取引先レコードタイプ :
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.recordTypeCode}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="recordTypeCode"
                  defaultValue={state.company.recordTypeCode}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  取引先名 :<span className="text-red-500">*</span>
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? ' hidden ' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.name}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : ' hidden ') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="name"
                  value={state.company.name}
                  type="text"
                  onChange={handleTextChange}
                />

                <label
                  className={
                    (errorMessages.name ? '' : 'hidden') +
                    ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                  }
                >
                  {errorMessages.name}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">所在地 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.billingStreet ?? '' + ' '}
                  {state.company.billingCity ?? '' + ' '}
                  {state.company.billingState ?? '' + ' '}
                  {state.company.billingCountry ?? '' + ' '}
                  {state.company.billingPostalCode ?? ''}
                </label>
                <div className="space-y-1">
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    defaultValue={state.company.billingStreet}
                    type="text"
                    name="billingStreet"
                    onChange={handleTextChange}
                  />
                  <label
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' inline-block text-sm text-black w-full h-8 px-3 '
                    }
                  >
                    地名番地
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    defaultValue={state.company.billingCity}
                    type="text"
                    name="billingCity"
                    onChange={handleTextChange}
                  />
                  <label
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' inline-block text-sm text-black w-full h-8 px-3 '
                    }
                  >
                    市区町村
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    defaultValue={state.company.billingState}
                    type="text"
                    name="billingState"
                    onChange={handleTextChange}
                  />
                  <label
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' inline-block text-sm text-black w-full h-8 px-3'
                    }
                  >
                    都道府県
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 '
                    }
                    defaultValue={state.company.billingPostalCode}
                    name="billingPostalCode"
                    type="text"
                    onChange={handleTextChange}
                  />
                  <label
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' inline-block text-sm text-black w-full h-8 px-3 '
                    }
                  >
                    郵便番号
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 '
                    }
                    defaultValue={state.company.billingCountry}
                    type="text"
                    onChange={handleTextChange}
                  />
                  <label
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' inline-block text-sm text-black w-full h-8 px-3 '
                    }
                  >
                    国名
                  </label>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">電話 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? ' hidden ' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.contactNum}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : ' hidden ') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="contactNum"
                  type="text"
                  defaultValue={state.company.contactNum}
                  onKeyPress={(e) => {
                    return handleNumberChange(e)
                  }}
                  onChange={handleTextChange}
                  maxLength="15"
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">Web サイト :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? ' hidden ' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.website}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : ' hidden ') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="website"
                  defaultValue={state.company.website}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">業種:</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? ' hidden ' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.industry}
                </label>

                {
                  <select
                    className={
                      (state.isEditingProfile ? '' : ' hidden ') +
                      'w-full bg-gray-100 p-1 border rounded focus:shadow-outline bg-gray-100 leading-8'
                    }
                    name="industry"
                    onChange={handleChangeIndustry}
                  >
                    {industryTypes.map(function (val) {
                      return (
                        <option
                          key={val}
                          value={val}
                          selected={state.company.industry == val}
                        >
                          {val}
                        </option>
                      )
                    })}
                  </select>
                }
              </div>
            </div>

            <div className="hidden">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">従業員数 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? ' hidden ' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                ></label>
                <input
                  className={
                    (state.isEditingProfile ? '' : ' hidden ') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="industrySub2"
                  type="text"
                  onChange={handleTextChangeNumberofemployees}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="align-top inline-block w-4/12">
        <div className="my-4 ml-6 mr-10 py-5 px-6 mt-24 rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">
                  kot商談フェーズ :
                </label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.phase}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">KoTサーバー名 :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.serverName}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">KoT企業コード :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.companyCode}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 ml-6 mr-10 py-5 px-6 mt-0 pt-3 ">
          <button
            onClick={
              state.isEditingProfile === false
                ? handleShowAddToken
                : handleShowUpdateSaveDialog
            }
            disabled={errorMessages.hasError}
            className={
              (errorMessages.hasError
                ? 'bg-lightGreen pointer-events-none hover:cursor-default'
                : 'bg-tertiary-500 hover:bg-green-700') +
              'bg-tertiary-500 text-white  rounded-lg p-2 text-sm mr-1'
            }
          >
            <img
              className="inline mr-2"
              src={state.company.isEditingProfile ? saveIcon : editIcon}
            />
            {state.isEditingProfile === false
              ? '追加'
              : state.company.isEditingProfile
              ? '編集する'
              : '変更を保存'}
          </button>

          <button
            onClick={props.handleCloseProfile}
            className="bg-tertiary-500 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
          >
            <img className="inline mr-2" />
            キャンセル
          </button>
        </div>
      </div>
      {state.showPopupAddAccountToken ? (
        <AddAccountToken
          closeDialog={closeAccountToken}
          handleOkey={addCompanyToken}
          company={state.company}
        />
      ) : null}

      {state.showPopupConfirmAddAccountDialog ? (
        <ConfirmAddAccountDialog
          name={'ConfirmAddAccountDialog'}
          closeDialog={closeConfirmDialog}
          handleOkey={addAccount}
          message={state.dialogMessage}
          isLoading={state.isLoading}
        />
      ) : null}

      {state.showPopupConfirmSaveUpdateDialog ? (
        <ConfirmSaveUpdateDialog
          name={'ConfirmSaveUpdateDialog'}
          closeDialog={closeConfirmDialog}
          handleOkey={updateSaveAccount}
          message={state.dialogMessage}
          isLoading={state.isLoading}
        />
      ) : null}

      {state.showPopupMessageDialog ? (
        <MessageDialog
          handleCloseMessageDialog={handleCloseMessageDialog}
          message={state.dialogMessage}
        />
      ) : null}
    </div>
  )
}

export default AccountProfile
