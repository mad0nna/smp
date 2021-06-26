import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import profileIcon from '../../../../img/customer-company-profile.png'
import editIcon from '../../../../img/edit-icon.png'
import saveIcon from '../../../../img/Icon awesome-save.png'
import AddAccountToken from './addAccountToken'
import ConfirmAddAccountDialog from './confirmDialog'
import ConfirmSaveUpdateDialog from './confirmDialog'
import MessageDialog from './messageDialog'
import _ from 'lodash'

// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const AccountProfile = (props) => {
  const [state, setState] = useState({
    company: initCompany(),
    isEditingProfile: initIsEditingProfile(),
    showPopupAddAccountToken: false,
    showPopupConfirmAddAccountDialog: false,
    showPopupMessageDialog: false,
    showPopupConfirmSaveUpdateDialog: false,
    dialogMessage: '',
    formState: initFormState(),
    redirectAfterSuccess: false,
    isLoading: false
  })

  function initIsEditingProfile() {
    if (!_.isEmpty(props.formState)) {
      return props.isEditingProfile
    } else {
      return false
    }
  }

  function initFormState() {
    if (!_.isEmpty(props.isEditingProfile)) {
      return props.formState
    } else {
      return false
    }
  }

  function initCompany() {
    console.log('init profile company')
    if (!_.isEmpty(props.company)) {
      return props.company
    } else {
      return {
        licenseVersion: '',
        companyCode: '',
        id: 0,
        companyId: '',
        sfId: '',
        email: '',
        accountType: '',
        customerClassification: '',
        name: '',
        industry: '',
        industrySub: '',
        industrySub2: '',
        kotTransType: '',
        paymentType: '',
        kotAccountId: '',
        zenOrgName: '',
        zendeskOpportunityId: '',
        phoneNumber: ''
      }
    }
  }

  const addCompanyToken = (token) => {
    console.log('add token')

    state.company.token = token

    setState((prevState) => {
      return {
        ...prevState,
        showPopupAddAccountToken: false,
        dialogMessage:
          'この顧客企業を \n 本当に韋駄天に追加してもよろしいですか？',
        showPopupConfirmAddAccountDialog: true
      }
    })
  }

  const handleShowAddToken = () => {
    console.log('handleAddToken')

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
    console.log('handleConfirmAddAccount')

    setState((prevState) => {
      return {
        ...prevState,
        isLoading: true
      }
    })

    let account = state.company
    account._token = props.token

    fetch('/admin/company/saveAddedCompany', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account)
    })
      .then((response) => {
        if (response.ok) return response.json()
        return { success: false }
      })
      .then((data) => {
        if (data.success !== undefined && data.success === true) {
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
          console.log(data)
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
    console.log('closeConfirmDialog')
    console.log('from ' + name)

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
    console.log('handleShowUpdateSaveDialog')

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
    account.isPullFromSf = props.isPullFromSf

    fetch('/admin/company/updateSaveAccount', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(account)
    })
      .then((response) => {
        if (response.ok) return response.json()
        return { success: false }
      })
      .then((data) => {
        if (data.success !== undefined && data.success === true) {
          setState((prevState) => {
            return {
              ...prevState,
              isEditingProfile: !prevState.isEditingProfile,
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

  const handleTextChange = (e) => {
    const value = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        company: { ...prevState.company, [e.target.name]: value }
      }
    })
  }

  const closeAccountToken = () => {
    console.log('closeAccountToken')
    setState((prevState) => {
      return {
        ...prevState,
        showPopupAddAccountToken: !prevState.showPopupAddAccountToken
      }
    })
  }

  // useEffect(() => {
  //   console.log(state.company)
  // }, [props.company])

  return (
    <div
      className="flex justify-center w-full h-full bg-white"
      style={{ height: '800px' }}
    >
      <input type="hidden" name="_token" value={state.token}></input>
      <div className="align-top inline-block w-8/12 ">
        <div className="my-4 ml-14 mr-5 py-5 px-6">
          <img className="inline align-top" src={profileIcon} />
          <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">
            顧客企業情報
          </span>
        </div>

        <div className="my-4 ml-14 mr-5 py-5 px-6  rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  ライセンス契約バージョン :
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.negotiateCode}
                </label>
                <input
                  className={
                    'hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  type="text"
                  name="negotiateCode"
                  defaultValue={state.company.negotiateCode}
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">HT 顧客CD :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.companyCode}
                </label>
                <input
                  className={
                    'hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  type="text"
                  name="companyCode"
                  defaultValue={state.company.companyCode}
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">企業ID :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.id}
                </label>
                <input
                  className={
                    'hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="id"
                  defaultValue={state.company.id}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 ml-14 mr-5 py-5 px-6  rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  メールアドレス :{' '}
                </label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {!_.isEmpty(state.company.admin[0])
                    ? state.company.admin[0].email
                    : ''}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="email"
                  defaultValue={
                    _.isSet(state.company.admin[0])
                      ? state.company.admin[0]['email']
                      : ''
                  }
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  レコードタイプ :
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
                <label className="text-sm text-gray-400">顧客区分 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.type}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="type"
                  defaultValue={state.company.type}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">顧客企業名 :</label>
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
                  defaultValue={state.company.name}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">業種 - 大分類:</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.industrySub}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="industrySub"
                  defaultValue={state.company.industrySub}
                  type="text"
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">業種 - 中分類 :</label>
              </div>
              <div className="md:w-2/3 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.industrySub2}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="industrySub2"
                  defaultValue={state.company.industrySub2}
                  type="text"
                  onChange={handleTextChange}
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
                <label className="text-sm text-gray-400">KOT取引種別 :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.kotTransType}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="kotTransType"
                  type="text"
                  defaultValue={state.company.kotTransType}
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">支払方法 :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.paymentMethod}
                </label>
                <input
                  className={
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="paymentMethod"
                  type="text"
                  defaultValue={state.company.paymentMethod}
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">アカウントID :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.accountId}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' hidden text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="accountId"
                  type="text"
                  defaultValue={state.company.accountId}
                  onChange={handleTextChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 ml-6 mr-10 py-5 px-6  rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">
                  Zendesk 組織名 :
                </label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={
                    (state.isEditingProfile ? 'hidden' : '') +
                    ' text-sm text-black w-full h-8 px-3 leading-8'
                  }
                >
                  {state.company.zenOrgName}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="zenOrgName"
                  type="text"
                  defaultValue={state.company.zenOrgName}
                  onChange={handleTextChange}
                />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">商談 ID :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm  text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.opportunityCode}
                </label>
                <input
                  className={
                    (state.isEditingProfile ? '' : 'hidden') +
                    ' hidden text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'
                  }
                  name="opportunityCode"
                  type="text"
                  defaultValue={state.company.opportunityCode}
                  onChange={handleTextChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="my-4 ml-6 mr-10 py-5 px-6 mt-0 pt-3 ">
          <button
            onClick={
              props.formState === 'add form'
                ? handleShowAddToken
                : handleShowUpdateSaveDialog
            }
            className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
          >
            <img
              className="inline mr-2"
              src={state.company.isEditingProfile ? saveIcon : editIcon}
            />
            {props.formState === 'add form'
              ? '追加'
              : state.company.isEditingProfile
              ? '編集する'
              : '変更を保存'}
          </button>

          <button
            onClick={props.handleCloseProfile}
            className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
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
if (document.getElementById('admin-account-profile')) {
  ReactDOM.render(
    <AccountProfile />,
    document.getElementById('admin-account-profile')
  )
}
