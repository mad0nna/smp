import React from 'react'
import ReactDOM from 'react-dom'

const PaymentMethod = () => {
  return <h1>Hello World</h1>
}

export default PaymentMethod

if (document.getElementById('methodOfPayment')) {
  ReactDOM.render(<PaymentMethod />, document.getElementById('methodOfPayment'))
}
