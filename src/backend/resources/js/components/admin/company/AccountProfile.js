import React, { useState, useEffect } from 'react'
import profileIcon from '../../../../img/customer-company-profile.png'
import editIcon from '../../../../img/edit-icon.png'
import saveIcon from '../../../../img/Icon awesome-save.png'
import AddAccountToken from './AddAccountToken'
import ConfirmAddAccountDialog from './ConfirmDialog'
import ConfirmSaveUpdateDialog from './ConfirmDialog'
import MessageDialog from './MessageDialog'
import _ from 'lodash'
import Select from 'react-select'
import queryString from 'query-string'
import axios from 'axios'
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
    isLoading: false,
    isNeedToFetchData: false
  })

  function initIsEditingProfile() {
    if (!_.isEmpty(props.formState)) {
      return props.isEditingProfile ?? true
    } else {
      return true
    }
  }

  function initFormState() {
    if (!_.isEmpty(props.isEditingProfile)) {
      return props.formState
    } else {
      return 'edit form'
    }
  }

  function initCompany() {
    if (_.isEmpty(props.company)) {
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
        industry: null,
        industrySub: '',
        industrySub2: '',
        kotTransType: '',
        paymentType: '',
        kotAccountId: '',
        zenOrgName: '',
        zendeskOpportunityId: '',
        phoneNumber: '',
        recordTypeCode: '',
        sfRecords: {
          numberofemployees: '',
          kot_sales_phase__c: '',
          servername__c: '',
          kotcompanycode__c: ''
        }
      }
    } else {
      if (_.isEmpty(props.company.sfRecords)) {
        props.company.sfRecords = {
          numberofemployees: '',
          kot_sales_phase__c: '',
          servername__c: '',
          kotcompanycode__c: ''
        }
      }
      return props.company
    }
  }

  const industryTypes = [
    { value: null, label: '--None--' },
    { value: '????????????????????????', label: '????????????????????????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '??????', label: '??????' },
    { value: '??????', label: '??????' },
    { value: '??????', label: '??????' },
    { value: '???????????????', label: '???????????????' },
    { value: '????????????', label: '????????????' },
    { value: '???????????????', label: '???????????????' },
    { value: '??????', label: '??????' },
    {
      value: '??????????????????????????????????????????',
      label: '??????????????????????????????????????????'
    },
    { value: '?????????', label: '?????????' },
    { value: '??????', label: '??????' },
    { value: '????????????', label: '????????????' },
    {
      value: '????????????|????????????|????????????????????????',
      label: '????????????|????????????|????????????????????????'
    },
    {
      value: '????????????|????????????|???????????????',
      label: '????????????|????????????|???????????????'
    },
    {
      value: '????????????|????????????|????????????????????????????????????',
      label: '????????????|????????????|????????????????????????????????????'
    },
    { value: '????????????|????????????', label: '????????????|????????????' },
    { value: '????????????|????????????????????????', label: '????????????|????????????????????????' },
    { value: '????????????|????????????????????????', label: '????????????|????????????????????????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '??????|??????', label: '??????|??????' },
    { value: '?????????', label: '?????????' },
    { value: '??????', label: '??????' }
  ]

  const handleChangeIndustry = (selectedOption) => {
    state.company.industry = selectedOption.value
    setState((prevState) => {
      return {
        ...prevState
      }
    })
  }

  const addCompanyToken = (token) => {
    state.company.token = token

    setState((prevState) => {
      return {
        ...prevState,
        showPopupAddAccountToken: false,
        dialogMessage:
          '????????????????????? \n ????????????????????????????????????????????????????????????',
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
            '????????????????????????????????????????????????????????????????????????????????????\n ?????????????????????Salesforce????????????????????????????????????????????????',
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

    let account = state.company
    account._token = props.token

    axios
      .post(`/admin/company/saveAddedCompany`, account, {
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
                '???????????????????????????????????????????????????\n ?????????????????????????????????????????????????????????????????????\n ????????????????????????????????????????????????',
              redirectAfterSuccess: true,
              isLoading: false
            }
          })
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              dialogMessage:
                '??????????????????????????????????????????\n ?????????????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????',
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
                '??????????????????????????????????????????\n ?????????????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????????????????????????????????',
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
        dialogMessage: '?????????????????????????????????????????????',
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
              dialogMessage: '??????????????????????????????????????????',
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
              dialogMessage: '??????????????????????????????????????????',
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

  const handleTextChange = (e) => {
    setState((prevState) => {
      return {
        ...prevState,
        company: { ...prevState.company, [e.target.name]: e.target.value }
      }
    })
  }

  const handleTextChangeNumberofemployees = () => {
    // const value = e.target.value
    // state.company.sfRecords.numberofemployees = value
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
        alert('?????????????????????????????????????????????')
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
        .then((data) => {
          if (data.data.success !== undefined && data.data.success === true) {
            setState((prevState) => {
              return {
                ...prevState,
                company: data.data.data,
                isEditingProfile: isEditingProfile
              }
            })
          } else {
            setState((prevState) => {
              return {
                ...prevState,
                fetchResult:
                  '????????????????????????????????????????????????????????????????????????????????????'
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
          <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">
            ??????????????????
          </span>
        </div>

        <div className="my-4 ml-14 mr-5 py-5 px-6  rounded-xl border-gray-200 border ">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">
                  ?????????????????????????????? :
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
                <label className="text-sm text-gray-400">???????????? :</label>
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
                <label className="text-sm text-gray-400">????????? :</label>
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
                    ????????????
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
                    ????????????
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
                    ????????????
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
                    ????????????
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
                    ??????
                  </label>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">?????? :</label>
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
                <label className="text-sm text-gray-400">Web ????????? :</label>
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
                <label className="text-sm text-gray-400">??????:</label>
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
                <Select
                  className={(state.isEditingProfile ? '' : ' hidden ') + ''}
                  defaultValue={{ value: true, label: state.company.industry }}
                  onChange={handleChangeIndustry}
                  options={industryTypes}
                />
              </div>
            </div>

            <div className="hidden">
              <div className="mb-1 md:mb-0 md:w-1/5">
                <label className="text-sm text-gray-400">???????????? :</label>
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
                  kot?????????????????? :
                </label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.sfRecords.kot_sales_phase__c}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">KoT??????????????? :</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label
                  className={' text-sm text-black w-full h-8 px-3 leading-8'}
                >
                  {state.company.sfRecords.servername__c}
                </label>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 w-full">
                <label className="text-sm text-gray-400">KoT??????????????? :</label>
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
            className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
          >
            <img
              className="inline mr-2"
              src={state.company.isEditingProfile ? saveIcon : editIcon}
            />
            {state.isEditingProfile === false
              ? '??????'
              : state.company.isEditingProfile
              ? '????????????'
              : '???????????????'}
          </button>

          <button
            onClick={props.handleCloseProfile}
            className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1"
          >
            <img className="inline mr-2" />
            ???????????????
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
