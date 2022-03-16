import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'
import SettingSideNav from '../SettingSideNav'
import Pagination from '../Pagination'

const InvoiceTemplate = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })
  const [state, setState] = useState({
    listOfTemplate: [],
    pageNumbers: '',
    currentPage: 1,
    lastPage: 1,
    pageCount: 0
  })

  function handlePageClick(n) {
    setPagingConditions({ ...pagingConditions, ...{ page: n } })
  }

  const handleFilter = (e) => {
    setPagingConditions((prevState) => {
      return {
        ...prevState,
        keyword: e.target.value,
        page: 1
      }
    })
  }

  const handleNavigation = (change) => {
    setPagingConditions({
      ...pagingConditions,
      ...{ page: pagingConditions.page + change }
    })
  }

  useEffect(() => {
    axios
      .get(
        `/admin/template/getListOfTemplate?page=${pagingConditions.page}&limit=${pagingConditions.limit}&keyword=${pagingConditions.keyword}`
      )
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          const pageNumbers = []
          for (
            let i = 1;
            i <= Math.ceil(response.data.pageCount / pagingConditions.limit);
            i++
          ) {
            pageNumbers.push(i)
          }
          const renderPageNumbers = pageNumbers.map((number) => {
            return (
              <li
                key={number}
                id={number}
                onClick={() => pagingConditions.handlePageClick(number)}
                className=""
              >
                <span
                  className={
                    pagingConditions.page == number
                      ? `text-white bg-primary-200 rounded-2xl px-3 py-1`
                      : `text-primary-200 px-3 py-1`
                  }
                >
                  {number}
                </span>
              </li>
            )
          })
          const list = <ul id="page-numbers">{renderPageNumbers}</ul>
          setState((prevState) => {
            return {
              ...prevState,
              listOfTemplate: response.data.data,
              pageCount: response.data.pageCount,
              lastPage: response.data.lastPage,
              pageNumbers: list,
              currentPage: response.data.currentPage
            }
          })
        }
      })
  }, [pagingConditions])

  var minheight = { 'min-height': '700px' }
  return (
    <div className="mx-10 grid grid-cols-6 bg-white" style={minheight}>
      <div className="col-span-1 py-8 px-4 space-x-2 border-r-2">
        <SettingSideNav />
      </div>
      <div className="col-span-5 bg-white py-8 px-32">
        <div className="mb-4">
          <div className="bg-cover bg-no-repeat bg-paper w-8 h-8 inline-block"></div>
          <h1 className="inline-block align-middle mb-4 inline-block align-middle mb-4 text-primary-200 font-bold">
            Invoice Template List
          </h1>
        </div>

        <div className="grid grid-cols-5">
          <div className="col-span-1">
            <a href="/admin/settings/invoice/detail?action=add">
              <button className="cursor-pointer border-primary-200 text-bold w-52 py-2 mt-5 px-3 border-2 text-primary-200 rounded-3xl tracking-tighter float-right">
                + Add new
              </button>
            </a>
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-2">
            <div className="table-cell relative h-20 w-full align-middle">
              <div
                id="search-bar"
                className="bg-mainbg h-12 rounded-3xl w-96 mx-0 my-auto"
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
                  id=""
                  className="h-full w-80 bg-mainbg custom-outline-none"
                  placeholder="検索"
                  onChange={handleFilter}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          id="widget-body"
          className="h-50 w-full bg-white overflow-hidden mt-6"
        >
          <table className="table-auto w-full mb-6">
            <thead className="bg-gray-50 border-b border-t border-gray-200">
              <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                <th>Template name</th>
                <th>Number of Company Using</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {state.listOfTemplate.map((template, i) => {
                return (
                  <tr key={i}>
                    <td>{template.template_name}</td>
                    <td>{template.targets_count}</td>
                    <td>
                      <a
                        href={
                          '/admin/settings/invoice/detail?action=edit&template=' +
                          template.id
                        }
                      >
                        <button className="underline">update</button>
                      </a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <div
            id="billing-pagination"
            className="w-full h-12 p-3 text-center space-x-2 mt-3"
          >
            <Pagination
              listNumbers={state.pageNumbers}
              currentPage={state.currentPage}
              lastPage={state.lastPage}
              handleNavigation={handleNavigation}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default InvoiceTemplate
if (document.getElementById('admin-settings')) {
  ReactDOM.render(
    <InvoiceTemplate />,
    document.getElementById('admin-settings')
  )
}
