import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { OrderList, ProductList, EmailTemplate } from './pages'

const Logistics = () => {
  const [active] = useState(location.pathname.split('/')[2])

  return (() => {
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
  })()
}

export default Logistics

if (document.getElementById('content-logistics')) {
  ReactDOM.render(<Logistics />, document.getElementById('content-logistics'))
}
