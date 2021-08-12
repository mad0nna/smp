import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PdfIcon from '../../img/pdf2-icon.png'
import Ellipsis from '../../img/ellipsis.png'

const CompanyBilling = () => {
  const [state, setState] = useState({
    loading: true,
    currentPage: 1,
    masterList: [],
    billingList: []
  })

  useEffect(() => {
    fetch('/company/getBilling', {
      method: 'get',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((data) => {
        let maxId = Math.ceil(state.currentPage * 10)
        let minId = maxId - 10
        setState((prevState) => {
          return {
            ...prevState,
            loading: false,
            billingList: data,
            masterList: data,
            currentPage: prevState.currentPage,
            numberOfPages: Math.ceil(data.length / 10),
            maxId: maxId,
            minId: minId
          }
        })
      })
  }, [state.currentPage])

  const search = (text) => {
    let results = []
    if (text === '') {
      setState((prevState) => {
        return {
          ...prevState,
          billingList: state.masterList
        }
      })
    }
    state.masterList.map((item) => {
      let searchableKeys = {
        invoiceDate: item.invoiceDate,
        invoiceNumber: item.invoiceNumber,
        amount: item.amount,
        dueDate: item.dueDate
      }
      let values = Object.values(searchableKeys)
      values.filter((value) => {
        if (typeof value === 'string') {
          if (value.indexOf(text) > -1) {
            if (!checkIfExist(item, results)) {
              results.push(item)
            }
          }
        }
      })
    })
    setState((prevState) => {
      return {
        ...prevState,
        billingList: results
      }
    })
  }
  const checkIfExist = (newItem, source) => {
    let indicator = false
    source.map((item) => {
      if (item.invoiceNumber === newItem.invoiceNumber) {
        indicator = true
      }
    })
    return indicator
  }

  const getInvoiceFile = (invoiceFileId, invoiceNumber, accountNumber) => {
    fetch('/company/getInvoicePDF', {
      method: 'post',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename=testpdf.pdf',
        'X-CSRF-TOKEN':
          document.getElementsByTagName('meta')['csrf-token'].content,
        invoiceFileId: invoiceFileId,
        invoiceNumber: invoiceNumber,
        accountNumber: accountNumber
      },
      body: JSON.stringify({ invoiceFileId: invoiceFileId })
    })
      .then((response) => response.text())
      .then((data) => {
        if (typeof data !== 'string') {
          let jsonValue = JSON.parse(data)
          if (!jsonValue.status) {
            return alert(jsonValue.message)
          }
        }
        const link = document.createElement('a')
        link.href = '/temp/' + data
        link.download = data + '.pdf'
        document.body.append(link)
        link.click()
      })
  }

  let numberOFPages = Math.ceil(state.masterList.length / 10)
  let pageNumbers = []
  pageNumbers.push(
    <img
      src="/images/pagination-prev.png?1ac337e7f7bfaacab64ea9a2369b5930"
      className=" inline-block w-8 h-auto mr-1 cursor-pointer"
      onClick={() => {
        if (state.currentPage <= 1) {
          return
        }
        setState((prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage - 1
          }
        })
      }}
    />
  )
  for (let index = 1; index <= numberOFPages; index++) {
    let activeStyle =
      index === state.currentPage
        ? 'text-white bg-primary-200 '
        : 'text-primary-200 '
    pageNumbers.push(
      <li
        key={index}
        className={activeStyle + 'rounded-3xl px-3 py-1'}
        onClick={() => {
          setState((prevState) => {
            return { ...prevState, currentPage: index }
          })
        }}
      >
        {index}
      </li>
    )
  }
  pageNumbers.push(
    <img
      src="/images/pagination-next.png?831991390ac360b1b03a00cdcd915ec5"
      className=" inline-block  w-8 h-auto ml-1 cursor-pointer"
      onClick={() => {
        if (state.currentPage === state.numberOfPages) {
          return
        }
        setState((prevState) => {
          return {
            ...prevState,
            currentPage: prevState.currentPage + 1
          }
        })
      }}
    />
  )

  return (
    <div className="relative px-10 mt-5 bg-mainbg">
      <div className="w-full h-full bg-white overflow-hidden relative  rounded-lg shadow-xl">
        <div className="px-3 pt-3 pb-1">
          <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
            <h2 className="text-green-800 text-lg font-bold">請求履歴</h2>
          </div>
        </div>

        <div
          id="widget-header"
          className="max-w-full h-24 bg-white box-border align-middle p-4 relative"
        >
          <div id="widget-name" className="float-right mr-3">
            <div className="table-cell relative h-20 w-full align-middle">
              <div
                id="search-bar"
                className="bg-gray-100 h-12 rounded-lg w-96 mx-0 my-auto"
              >
                <svg
                  className="text-gray-500 fill-current w-auto h-11 float-left mt-0.5 p-3"
                  xmlns="http://www.w3.org/2000/svg"
                  x="30px"
                  y="30px"
                  viewBox="0 0 487.95 487.95"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                            c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                            c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                    />
                  </g>
                </svg>
                <input
                  type="text"
                  id="billingSearch"
                  className="h-full w-80 bg-gray-100 custom-outline-none"
                  placeholder="検索"
                  onChange={(e) => {
                    search(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          <div></div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
        </div>
        <div
          id="widget-body"
          className="h-50 w-full bg-white overflow-hidden px-3"
        >
          <table className="table-auto w-full h-auto text-center mb-6">
            <thead className="bg-gray-50 border-b border-t border-gray-200">
              <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                <th>請求書番号</th>
                {/* <th>請求書名</th> */}
                <th>請求日</th>
                <th>支払期限</th>
                <th className="text-right">請求額</th>
                <th>支払日</th>
                <th>状態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {state.billingList.map((item, index) => {
                if (index >= state.minId && index <= state.maxId) {
                  let txtcolor =
                    item.status === '未払い' ? 'orange' : 'text-gray-500'
                  return (
                    <tr
                      className="table-row h-16 text-sm text-gray-500 hover:bg-gray-50 border-b border-gray-100"
                      key={index}
                    >
                      <td className="text-center">{item.invoiceNumber}</td>
                      {/* <td className="text-center">{item.billingName}</td> */}
                      <td className="text-center"> {item.invoiceDate}</td>
                      <td className="text-center">{item.dueDate}</td>
                      <td className="text-right">¥ {item.amount}</td>
                      <td className="text-center">{item.paymentDate}</td>
                      <td className={txtcolor + ' text-center'}>-</td>
                      <td className="text-center">
                        <img
                          src={PdfIcon}
                          className="mx-auto w-6 h-auto cursor-pointer"
                          onClick={() => {
                            getInvoiceFile(
                              item.body,
                              item.invoiceNumber,
                              item.accountNumber
                            )
                          }}
                        />{' '}
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        id="pagination"
        className="w-full h-12 p-3 text-center space-x-2 mt-4"
      >
        <div>
          {/* <img
            src="/images/pagination-prev.png?1ac337e7f7bfaacab64ea9a2369b5930"
            className=" inline-block  w-8 h-auto mr-1"
          /> */}
          <div className="inline-block text-primary-200">
            <ul id="page-numbers">{pageNumbers}</ul>
          </div>
          {/* <img
            src="/images/pagination-next.png?831991390ac360b1b03a00cdcd915ec5"
            className=" inline-block  w-8 h-auto ml-1"
          /> */}
        </div>
      </div>
    </div>
  )
}

export default CompanyBilling

if (document.getElementById('companyBilling')) {
  ReactDOM.render(<CompanyBilling />, document.getElementById('companyBilling'))
}
