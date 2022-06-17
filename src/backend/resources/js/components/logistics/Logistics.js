import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { OrderList, ProductList, EmailTemplate } from './pages'

const Logistics = () => {
  const [active] = useState(location.pathname.split('/')[2])

  return (
    <div className="grid md:grid-cols-4 font-meiryo">
      <div className="col-span-4">
        <div className="mt-14 mb-5 mx-11 border rounded-xl bg-white shadow-5x h-fit">
          {(() => {
            switch (active) {
              case 'order-list':
                return <OrderList />
              case 'email-template':
                return <EmailTemplate />
              case 'dashboard':
                return <ProductList />
              default:
                return <ProductList />
            }
          })()}
        </div>
      </div>
    </div>
  )
}

export default Logistics

if (document.getElementById('logistics-dashboard')) {
  ReactDOM.render(<Logistics />, document.getElementById('logistics-dashboard'))
}
