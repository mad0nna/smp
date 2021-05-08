import React from 'react'
import ReactDOM from 'react-dom'
import CompanyList from './companyListWidget'
import ContractedServices from '../contractedServices'
import LinkageServices from '../linkageServices'
import SalesBillingHistory from './salesBillingHistory'
import Announcement from '../announcement'
import Notification from '../Notification'
import PurchaseHistory from '../purchaseHistory'
import Graph1 from './graph1Widget'
import Graph2 from './graph2Widget'

const SalesDashboard = () => {

  return(
    <div className="bg-mainbg grid grid-cols-16 grid-rows-12 grid-flow-row gap-4 mx-10 mt-5" style={{height: '850px'}}>
      <div className="col-span-6 row-span-4  ">
        <Graph1/>
      </div>
      <div className="col-span-6 row-span-4 " >
        <Graph2/>
      </div> 
      <div className="col-span-4 row-span-16 " >
        <CompanyList />
      </div> 


      <div className="col-span-3 row-span-3  ">
        <ContractedServices />
      </div>
      <div className="col-span-3 row-span-3 " >
        <LinkageServices displayType="small" />
      </div>
      <div className="col-span-3 row-span-8 " >
        <PurchaseHistory version="2" />
      </div> 
      <div className="col-span-3 row-span-3 " >
        <Announcement  />
      </div>


      <div className="col-span-6 row-span-6  " >
        <SalesBillingHistory />
      </div>
      <div className="col-span-3 row-span-6" >
        <Notification displayType="small"/>
      </div>


    </div>
  )

}

export default SalesDashboard

if (document.getElementById('sales-dashboard')){
  ReactDOM.render(<SalesDashboard/>,document.getElementById('sales-dashboard'))
}