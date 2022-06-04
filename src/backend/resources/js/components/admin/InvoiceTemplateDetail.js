import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import SettingSideNav from '../SettingSideNav'
import InvoiceTemplateDetailTable from './InvoiceTemplateDetailTable'
import arrowLeft from '../../../img/arrow-left-2.png'
import arrowRight from '../../../img/arrow-right-2.png'
import axios from 'axios'
import MessageDialog from '../MessageDialog'
import _, { isEmpty } from 'lodash'

const InvoiceTemplateDetails = () => {
  const url = new URL(location.href).searchParams
  const [state, setState] = useState({
    action: url.get('action'),
    file: '',
    masterList: [],
    leftList: [],
    rightList: [],
    status: false,
    message: '',
    tab: 1,
    firstLoad: true,
    templateID: url.get('template'),
    changeFile: false,
    templateOldName: null,
    showPopupMessageDialog: false,
    dialogMessage: '',
    validFile: false
  })

  const handleCloseMessageDialog = () => {
    setState((prevState) => {
      return {
        ...prevState,
        showPopupMessageDialog: false
      }
    })
  }

  useEffect(() => {
    if (
      _.isEmpty(state.leftList) &&
      (state.action === 'add' || state.action === null) &&
      state.firstLoad
    ) {
      getCompanyList()
    }

    if (state.action === 'edit' && state.firstLoad) {
      axios
        .post(`/admin/template/getTemplateDetail`, {
          templateID: state.templateID
        })
        .then((response) => {
          if (!_.isEmpty(response.data)) {
            setState((prevState) => {
              let data = response.data
              getCompanyList()
              return {
                ...prevState,
                file: data.templateName,
                templateOldName: data.templateName,
                rightList: data.rightList,
                firstLoad: false,
                tab: 2,
                changeFile: state.changeFile
              }
            })
          }
        })
    }
  }, [state])

  const getCompanyList = () => {
    axios.get(`/admin/template/getListOfCompany`).then((response) => {
      if (!_.isEmpty(response.data)) {
        setState((prevState) => {
          let masterList = response.data.data
          let leftList = []
          for (let index = 0; index < masterList.length; index++) {
            if (
              prevState.rightList.some(
                (data) => data.id == masterList[index].id
              )
            ) {
              continue
            }
            leftList.push(masterList[index])
          }
          return {
            ...prevState,
            leftList: leftList,
            masterList: masterList,
            firstLoad: false
          }
        })
      }
    })
  }

  const getSelectValues = (select) => {
    let result = []
    let options = select && select[0].options
    let opt
    for (let i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i]

      if (opt.selected) {
        result.push(opt.value || opt.text)
      }
    }
    return result
  }

  const addCompany = () => {
    let selectedCompanies = getSelectValues(
      document.getElementsByName('companyToBeAdded')
    )
    setState((prevState) => {
      let masterList = prevState.masterList
      let newRightList = []
      let newLeftList = []
      for (let index = 0; index < selectedCompanies.length; index++) {
        newRightList.push(prevState.leftList[selectedCompanies[index]])
      }
      newRightList = newRightList.concat(prevState.rightList)
      for (let index = 0; index < masterList.length; index++) {
        if (newRightList.some((data) => data.id == masterList[index].id)) {
          continue
        }
        newLeftList.push(masterList[index])
      }
      return {
        ...prevState,
        rightList: newRightList,
        leftList: newLeftList
      }
    })
  }

  const removeCompany = () => {
    let selectedCompanies = getSelectValues(
      document.getElementsByName('companyAdded')
    )
    setState((prevState) => {
      let toBeRemoved = []
      let masterList = prevState.masterList
      let newRightList = []
      for (let index = 0; index < selectedCompanies.length; index++) {
        toBeRemoved.push(prevState.rightList[selectedCompanies[index]])
      }
      let leftList = toBeRemoved.concat(prevState.leftList)

      for (let index = 0; index < masterList.length; index++) {
        if (leftList.some((data) => data.id == masterList[index].id)) {
          continue
        }
        newRightList.push(masterList[index])
      }

      return {
        ...prevState,
        rightList: newRightList,
        leftList: leftList
      }
    })
  }

  const uploadPDFFile = () => {
    let formData = new FormData()
    let pdfFile = document.querySelector('#PdfContainer')
    if (state.validFile === false) {
      setState((prevState) => {
        return {
          ...prevState,
          status: false,
          showPopupMessageDialog: true,
          dialogMessage: 'You should select a file first'
        }
      })
      return
    }

    formData.append('pdf', pdfFile.files[0])
    let endpoint = '/admin/template/uploadNewTemplate'
    if (state.action === 'edit' && !isEmpty(state.templateID)) {
      endpoint = '/admin/template/updateTemplate'
      formData.append(
        'data',
        JSON.stringify({
          rightList: state.rightList,
          leftList: state.leftList,
          fileName: state.file,
          templateID: state.templateID,
          oldTemplateName: state.templateOldName,
          changeFile: state.changeFile
        })
      )
    } else {
      formData.append(
        'data',
        JSON.stringify({
          rightList: state.rightList,
          leftList: state.leftList,
          fileName: state.file,
          templateID: state.templateID,
          oldTemplateName: state.templateOldName
        })
      )
    }
    axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'html'
        }
      })
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          location.replace('/admin/settings')
          return
        }
      })
      .catch((error) => {
        alert(error.response.data.error)
        location.reload()
      })
  }

  const uploadTemplate = () => {
    uploadPDFFile()
  }

  const minheight = { minHeight: '700px' }
  const minheightCompanyList = { minHeight: '400px' }
  const minHeightCompanyListContainer = { minHeight: '350px' }
  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <div className="col-span-1 py-8 px-4 space-x-2 border-r-2">
        <SettingSideNav />
      </div>
      <div className="col-span-5 bg-white py-8 px-32">
        <div className="mb-4">
          <div className="bg-cover bg-no-repeat bg-paper w-8 h-8 inline-block"></div>
          <h1 className="inline-block align-middle mb-4 inline-block align-middle mb-4 text-tertiary-500 font-bold">
            Invoice Template Details
          </h1>
        </div>
        <div className="flex">
          <input
            type="file"
            id="PdfContainer"
            hidden
            onChange={(e) => {
              let files = e.target.files[0]
              if (files.type !== 'application/pdf') {
                setState((prevState) => {
                  return {
                    ...prevState,
                    status: false,
                    showPopupMessageDialog: true,
                    validFile: false,
                    dialogMessage: 'File type is not supported.'
                  }
                })
              } else {
                setState((prevState) => {
                  let editTemplate = state.action === 'edit'
                  return {
                    ...prevState,
                    file: files.name,
                    validFile: true,
                    tab: 2,
                    changeFile: editTemplate
                  }
                })
              }
            }}
          />
          <div className="w-80">
            <div
              className="pt-4 cursor-pointer"
              id="pdfFileUploadButton"
              onClick={() => {
                document.getElementById('PdfContainer').click()
              }}
            >
              <span id="filename">
                {state.file === '' ? 'No file chosen' : state.file}
              </span>
              <div className="inline-block px-4 py-2 rounded-md border-green-500 border-2 border-solid h-12 ml-2">
                {state.file != '' ? 'Change file' : 'Select file'}
              </div>
            </div>
          </div>
          <div className="w-56"></div>
          <div className="mr-4">
            <button
              className="cursor-pointer border-tertiary-500 text-bold w-36 py-2 mt-5 px-3 border-2 text-tertiary-500 rounded-3xl tracking-tighter"
              onClick={uploadTemplate}
            >
              Upload
            </button>
          </div>
          <div>
            <button className="cursor-pointer border-tertiary-500 text-bold py-2 mt-5 px-3 border-2 text-tertiary-500 rounded-3xl tracking-tighter">
              Download Sample Template
            </button>
          </div>
        </div>

        <div
          id="widget-body"
          className="h-50 w-full bg-white overflow-hidden mt-6"
        >
          <div className="text-left space-x-2">
            <button
              className={
                'bg-white p-2 ' +
                (state.tab === 1
                  ? 'text-tertiary-500 border border-green-500'
                  : '')
              }
              onClick={() => {
                setState((prevState) => {
                  return {
                    ...prevState,
                    tab: 1
                  }
                })
              }}
            >
              Template Details
            </button>
            <button
              className={
                'bg-white p-2 ' +
                (state.tab === 2
                  ? 'text-tertiary-500 border border-green-500 '
                  : '') +
                (state.file == '' ? 'text-gray-400' : '')
              }
              onClick={() => {
                if (state.file == '') {
                  return
                }
                setState((prevState) => {
                  return {
                    ...prevState,
                    tab: 2
                  }
                })
              }}
            >
              Company Using Template
            </button>
          </div>
          <div
            className={
              'table-auto w-full mb-6 ' + (state.tab === 1 ? '' : 'hidden')
            }
          >
            <InvoiceTemplateDetailTable />
          </div>
          <div
            className={'bg-gray-100 ' + (state.tab === 2 ? '' : 'hidden')}
            style={minheightCompanyList}
          >
            <div className="w-3/5 block text-center mx-auto">
              <div className="p-4 flex" style={minheightCompanyList}>
                <div className="w-2/5">
                  <input type="text" placeholder="Search" className="w-full" />
                  <div
                    className="bg-gray-200 border border-gray-400"
                    style={minHeightCompanyListContainer}
                  >
                    <select
                      multiple="multiple"
                      className="w-full h-full bg-gray-200 "
                      style={minHeightCompanyListContainer}
                      name="companyToBeAdded"
                    >
                      {state.leftList.map((company, index) => {
                        if (!_.isEmpty(company)) {
                          return (
                            <option value={index} key={index}>
                              {company.name}
                            </option>
                          )
                        }
                      })}
                    </select>
                  </div>
                </div>
                <div className="w-1/5 my-auto space-y-3">
                  <div className="cursor-pointer" onClick={addCompany}>
                    <img src={arrowRight} className="mx-auto"></img>
                  </div>
                  <div className="cursor-pointer" onClick={removeCompany}>
                    <img src={arrowLeft} className="mx-auto"></img>
                  </div>
                </div>
                <div className="w-2/5">
                  <input type="text" placeholder="Search" className="w-full" />
                  <div
                    className="bg-gray-200 border border-gray-400"
                    style={minHeightCompanyListContainer}
                  >
                    <select
                      multiple="multiple"
                      className="w-full h-full bg-gray-200 "
                      style={minHeightCompanyListContainer}
                      name="companyAdded"
                    >
                      {state.rightList.map((company, index) => {
                        if (!_.isEmpty(company)) {
                          return (
                            <option value={index} key={index}>
                              {company.name}
                            </option>
                          )
                        }
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {state.showPopupMessageDialog ? (
        <MessageDialog
          handleCloseMessageDialog={handleCloseMessageDialog}
          message={state.dialogMessage}
        />
      ) : null}
    </div>
  )
}
export default InvoiceTemplateDetails
if (document.getElementById('admin-settings-invoice-details')) {
  ReactDOM.render(
    <InvoiceTemplateDetails />,
    document.getElementById('admin-settings-invoice-details')
  )
}
