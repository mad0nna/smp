import React from 'react'
// import ReactDOM from 'react-dom'
import SalesProfile from './SalesProfile'
import SalesContact from './SalesContact'
import ContractedServices from '../ContractedServices'
import LinkageServices from '../LinkageServices'
import PurchaseHistorySmall from './PurchaseHistorySmall'

const SalesAccount = () => {
  return (
    <div
      className="bg-primaryBg grid lg:grid-cols-4 grid-flow-row grid-rows-6 gap-4 mx-10 mt-5"
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
