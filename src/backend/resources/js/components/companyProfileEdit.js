import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import CompanyProfileUpdateAccount from './companyProfileUpdateAccount'
// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

const CompanyProfileEdit = () => {
  // eslint-disable-next-line
  const [state, setState] = useState({
    account: {
      name: ''
    }
  })

  const handleTextChange = (e) => {
    console.log(state)
    const value = e.target.value
    setState((prevState) => {
      return {
        ...prevState,
        account: { ...prevState.company, [e.target.name]: value }
      }
    })
  }

  return (
    <div className="flex w-full h-full bg-gray-100" style={{ height: '800px' }}>
      <CompanyProfileUpdateAccount handleTextChange={handleTextChange} />
    </div>
  )
}

export default CompanyProfileEdit

if (document.getElementById('companyProfileEdit')) {
  ReactDOM.render(
    <CompanyProfileEdit />,
    document.getElementById('companyProfileEdit')
  )
}
