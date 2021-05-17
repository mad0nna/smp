import React from 'react'
// import ReactDOM from 'react-dom'
import SalesProfile from './salesProfile'
import SalesContact from './salesContact'
import ContractedServices from '../contractedServices'
import LinkageServices from '../linkageServices'
import PurchaseHistorySmall from './purchaseHistorySmall'

const SalesAccount = () => {
  return (
    <div
      className="bg-mainbg grid lg:grid-cols-4 grid-flow-row grid-rows-6 gap-4 mx-10 mt-5"
      style={{ height: '800px' }}
    >
      <div className="col-span-4 row-span-2  ">
        <SalesContact />
      </div>
      <div className="col-span-2 row-span-3 ">
        <SalesProfile />
      </div>
      <div className="col-span-1 row-span-1  ">
        <ContractedServices displayType="small" />
      </div>
      <div className="col-span-1 row-span-1 pr-8 ">
        <LinkageServices displayType="small" />
      </div>
      <div className="col-span-2 row-span-2 pt-20 pr-8">
        <PurchaseHistorySmall />
      </div>
    </div>
  )
}

export default SalesAccount

// if (document.getElementById('sales-account')){
//   ReactDOM.render(<SalesAccount/>,document.getElementById('sales-account'))
// }
