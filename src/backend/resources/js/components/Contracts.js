import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Settings from './DashboardSettings'
import Pagination from './Pagination'
import _ from 'lodash'

const Contracts = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 15,
    keyword: '',
    handlePageClick: handlePageClick
  })

  const [state, setState] = useState({
    data: [],
    pageCount: 1,
    lastPage: 1,
    pageNumbers: ''
  })

  const handlePageClick = (n) => {
    setCurrentPage(n)
  }

  const handleNavigation = (change) => {
    setPagingConditions({
      ...pagingConditions,
      ...{ page: pagingConditions.page + change }
    })
  }

  const setCurrentPage = (curpage) => {
    setPagingConditions({ ...pagingConditions, ...{ page: curpage } })
  }

  useEffect(() => {
    axios
      .post(
        `/company/contractslist?page=${pagingConditions.page}&limit=${pagingConditions.limit}&keyword=${pagingConditions.keyword}`
      )
      .then((response) => {
        if (!_.isEmpty(response.data)) {
          // Logic for displaying page numbers
          const pageNumbers = []
          for (
            let i = 1;
            i <= Math.ceil(response.data.pageCount / pagingConditions.limit);
            i++
          ) {
            pageNumbers.push(i)
          }
          // console.log(pageNumbers)
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
                      ? `text-white bg-tertiary-500 rounded-2xl px-3 py-1`
                      : `text-tertiary-500 px-3 py-1`
                  }
                >
                  {number}
                </span>
              </li>
            )
          })

          const list = <ul id="page-numbers">{renderPageNumbers}</ul>

          let contracts = response.data.data
          setState((prevState) => {
            return {
              ...prevState,
              data: contracts,
              pageCount: response.data.pageCount,
              lastPage: response.data.lastPage,
              pageNumbers: list,
              currentPage: response.data.currentPage
            }
          })
        }
      })
  }, [pagingConditions])

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-flow-row lg:grid-rows-3 gap-6 mx-10 mt-5 font-meiryo">
      <div className="col-span-3 row-span-2">
        <div
          className="w-full rounded-lg border overflow-hidden bg-white mb-10"
          style={{ 'min-height': '568px' }}
        >
          <div className="px-3 pt-3 pb-6">
            <div className="w-full pb-2 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">契約一覧</h2>
            </div>
          </div>
          <div className="px-3">
            <table className="table-auto w-full mb-6">
              <thead className="bg-gray-50 border-b border-t border-gray-200">
                <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                  <th>プロダクト</th>
                  <th>KoT申込日</th>
                  <th>KoT課金開始日</th>
                  <th>KoT支払い方法</th>
                  <th>KoT販売経路</th>
                </tr>
              </thead>
              <tbody>
                {state.data.map((contract, index) => {
                  const stripe = !(index % 2) ? '' : 'bg-white'
                  const styles =
                    contract.status === '申請する'
                      ? 'text-tertiary-500'
                      : 'text-green-900'
                  return (
                    <tr
                      className={
                        stripe +
                        ' table-row font-sans text-sm text-gray-500 p-5 h-16 hover:bg-gray-50 border-b border-gray-100 ' +
                        contract.rowcolor
                      }
                      key={index}
                    >
                      <td className="text-center">{contract.Field141__c}</td>
                      <td className="text-center">
                        {contract.ApplicationDay__c}
                      </td>
                      <td className="text-center">
                        {contract.KoT_startBillingMonth__c}
                      </td>
                      <td className="text-center">
                        {contract.KoT_shiharaihouhou__c}
                      </td>
                      <td className={styles + ' text-center'}>
                        {contract.KoT_hanbaikeiro__c}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div
          id="billing-pagination"
          className="w-full h-12 text-center space-x-2 mt-3 col-span-3"
        >
          <Pagination
            listNumbers={state.pageNumbers}
            currentPage={state.lastPage}
            lastPage={state.lastPage}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
      <div className="w-full align-top grid grid-cols-1 justify-center gap-6">
        <div className="h-44">
          <Settings />
        </div>
      </div>
    </div>
  )
}

export default Contracts

if (document.getElementById('contracts')) {
  ReactDOM.render(<Contracts />, document.getElementById('contracts'))
}
