import React, { useState, useEffect } from 'react'
import profileIcon from '../../../../img/customer-company-profile.png'
import editIcon from '../../../../img/edit-icon.png'
import saveIcon from '../../../../img/Icon awesome-save.png'
import AddAccountToken from './AddAccountToken'
import ConfirmAddAccountDialog from './ConfirmDialog'
import ConfirmSaveUpdateDialog from './ConfirmDialog'
import MessageDialog from './MessageDialog'
import _, { isEmpty } from 'lodash'
import queryString from 'query-string'
import axios from 'axios'

const AccountProfile = (props) => {
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
    contactNum: '',
    recordTypeCode: '',
    billingPostalCode: '',
    billingCity: '',
    billingState: '',
    billingCountry: '',
    billingStreet: ''
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
    isLoading: false,
    errors: [],
    errorMessages: {}
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
    validate(state.company)
    if (state.errors.length > 0) {
      return
    }
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

  const handleCompanyChanges = (e) => {
    let key = e.target.name
    let val = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        company: {
          ...prevState.company,
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
      if (key === 'name') {
        let companyCodeLength = state.company.companyCode.length + 2
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
      if (key === 'contactNum') {
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
      if (key === 'billingPostalCode') {
        if (!(numbersOnly.test(fields[key]) && fields[key].length == 7)) {
          addError(key, 'ハイフンなしの７桁の郵便番号を入力してください')
          return
        }
        removeError(key)
      }
      if (
        key === 'billingCity' ||
        key === 'billingState' ||
        key === 'billingCountry' ||
        key === 'billingStreet'
      ) {
        if (isEmpty(fields[key])) {
          addError(key, '必須フィールド')
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
  return (
    <div className="flex justify-center w-full h-full rounded-lg bg-white">
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
                {/* <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="recordTypeCode"
                  defaultValue={state.company.recordTypeCode}
                  type="text"
                  onChange={handleTextChange}
                /> */}
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
                  onChange={(e) => handleCompanyChanges(e)}
                />

                <label
                  className={
                    (_.includes(state.errors, 'name') ? '' : 'hidden') +
                    ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                  }
                >
                  {state.errorMessages['name']}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  所在地 : <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.billingCountry ?? '' + ' '}
                  {state.company.billingState ?? '' + ' '}
                  {state.company.billingCity ?? '' + ' '}
                  {state.company.billingStreet ?? '' + ' '}
                  {state.company.billingPostalCode ?? ''}
                </label>
                <div className="space-y-1">
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    value={state.company.billingCountry}
                    type="text"
                    name="billingCountry"
                    placeholder="国名を入力してください"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'billingCountry')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['billingCountry']}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    value={state.company.billingState}
                    type="text"
                    name="billingState"
                    placeholder="都道府県を入力してください"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'billingState')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['billingState']}
                  </label>
                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100'
                    }
                    value={state.company.billingCity}
                    type="text"
                    name="billingCity"
                    placeholder="市区町村を入力してください"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'billingCity')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['billingCity']}
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 '
                    }
                    value={state.company.billingStreet}
                    name="billingStreet"
                    type="text"
                    placeholder="地名番地、建物名等"
                    onChange={(e) => handleCompanyChanges(e)}
                  />

                  <label
                    className={
                      (_.includes(state.errors, 'billingStreet')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['billingStreet']}
                  </label>

                  <input
                    className={
                      (state.isEditingProfile ? '' : 'hidden') +
                      ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 '
                    }
                    value={state.company.billingPostalCode}
                    type="text"
                    placeholder="郵便番号"
                    name="billingPostalCode"
                    onChange={(e) => handleCompanyChanges(e)}
                  />
                  <label
                    className={
                      (_.includes(state.errors, 'billingPostalCode')
                        ? ''
                        : 'hidden') +
                      ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                    }
                  >
                    {state.errorMessages['billingPostalCode']}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  電話番号 : <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <input
                  className={
                    (state.isEditingProfile ? '' : ' hidden ') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="contactNum"
                  type="text"
                  value={state.company.contactNum}
                  placeholde="電話番号"
                  onChange={(e) => handleCompanyChanges(e)}
                  maxLength={11}
                />

                <label
                  className={
                    (_.includes(state.errors, 'contactNum') ? '' : 'hidden') +
                    ' text-sm text-black w-full h-8 px-3 leading-8 text-red-600'
                  }
                >
                  {state.errorMessages['contactNum']}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">Web サイト :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.website}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-50 leading-8'
                  }
                  type="text"
                  value={state.company.website}
                  name="website"
                  placeholder="ウェブサイト"
                  onChange={(e) => handleCompanyChanges(e)}
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
                    onChange={(e) => handleCompanyChanges(e)}
                    value={
                      industryTypes[
                        industryTypes.indexOf(state.company.industry)
                      ]
                    }
                  >
                    {industryTypes.map(function (val) {
                      return <option key={val}>{val}</option>
                    })}
                  </select>
                }
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
            disabled={state.errors.length > 0}
            className={
              (state.errors.length > 0
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
