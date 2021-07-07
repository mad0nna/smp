import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import topIcon from '../../img/contractsIcon.png'
import Settings from './dashboardSettings'
import Purchase from './purchaseHistory'
import Pagination from './pagination'
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
    console.log('handlePaging' + n)
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
      .get(
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

          console.log('response')
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
    <div className="bg-mainbg grid lg:grid-cols-4 md:grid-cols-2 grid-flow-row lg:grid-rows-3 gap-10 mx-10 mt-5 font-meiryo">
      <div className="col-span-3 row-span-2">
        <div className="w-full rounded-lg border border-gray-200 overflow-hidden bg-white mb-10">
          <div className="flex gap-2 w-full bg-white pl-8 p-5 align-middle h-16">
            <span>
              <img src={topIcon} />
            </span>
            <span className="bg-white text-primary-200 font-sans font-bold">
              契約一覧
            </span>
          </div>
          <table className="table w-full bg-white ">
            <thead className="bg-gray-200 font-bold font-sans text-gray-500 pt-4 pb-4 text-left">
              <tr>
                <th className="w-3/12 pl-12">プロダクト</th>
                <th className="w-2/12 pl-5">kot申込日</th>
                <th className="w-2/12 pl-5">KoT課金開始日</th>
                <th className="w-2/12 pl-5">KoT支払い方法</th>
                <th className="w-3/12 pl-5">KoT販売経路</th>
              </tr>
            </thead>
            <tbody>
              {state.data.map((contract, index) => {
                const stripe = !(index % 2) ? 'bg-gray-50' : 'bg-white'
                const styles =
                  contract.status === '申請する'
                    ? 'text-primary-200'
                    : 'text-black'
                return (
                  <tr
                    className={
                      stripe +
                      ' table-row bg-gray-50 font-sans 2xl:text-base lg:text-sm text-gray-900 p-5 h-20 ' +
                      contract.rowcolor
                    }
                    key={index}
                  >
                    <td className="w-3/12 pl-5">{contract.Field141__c}</td>
                    <td className="w-2/12 text-sm content-center text-left bg-no-repeat pt-4 ">
                      <span className="text-left pl-5">
                        {contract.ApplicationDay__c}
                      </span>
                    </td>
                    <td className="w-2/12 pl-5 text-left text-sm ">
                      {contract.KoT_startBillingMonth__c}
                    </td>
                    <td className="w-2/12 pl-5 text-left text-sm ">
                      {contract.KoT_shiharaihouhou__c}
                    </td>
                    <td
                      className={
                        styles + ' w-3/12 pl-5 text-left text-sm font-bold '
                      }
                    >
                      {contract.KoT_hanbaikeiro__c}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div
          id="billing-pagination"
          className="w-full h-12 p-3 text-center space-x-2 mt-3 col-span-3"
        >
          <Pagination
            listNumbers={state.pageNumbers}
            currentPage={state.currentPage}
            lastPage={state.lastPage}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
      <div className="h-40 w-full align-top grid grid-cols-1 justify-center gap-10">
        <Settings />
        <div className="h-96">
          <Purchase />
        </div>
      </div>
    </div>
  )
}

export default Contracts

if (document.getElementById('contracts')) {
  ReactDOM.render(<Contracts />, document.getElementById('contracts'))
}
