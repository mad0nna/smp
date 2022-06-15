import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { OrderList, ProductList, EmailTemplate } from './pages'

const Logistics = () => {
  const [active] = useState('product-list')

  return (
    <div className="grid md:grid-cols-4 font-meiryo">
      <div className="col-span-4">
        <div className="mt-14 mb-5 mx-11 border rounded-xl bg-white shadow-5x h-fit">
          {(() => {
            switch (active) {
              case 'order-list':
                return <OrderList />
              case 'email-template':
                return <ProductList />
              default:
                return <EmailTemplate />
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
