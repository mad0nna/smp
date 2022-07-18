import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { WidgetSettings, PaymentMethod, PasswordSettings } from './pages'

const CompanySettings = () => {
  const [active] = useState(location.pathname.split('/')[3])
  console.log(active)

  return (() => {
    switch (active) {
      case 'widget':
        return <WidgetSettings />
      case 'payment-method':
        return <PaymentMethod />
      case 'password':
        return <PasswordSettings />
      default:
        return <WidgetSettings />
    }
  })()
}

export default CompanySettings

if (document.getElementById('content-company-settings')) {
  ReactDOM.render(
    <CompanySettings />,
    document.getElementById('content-company-settings')
  )
}
