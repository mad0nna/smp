import React from 'react'
import complogo from '../../img/company/logo.png'

const Welcome = () => {
  return (
    <div className="flex gap-2">
      <span className="text-primary-200 text-lg lg:text-md font-bold content-center">
        ようこそ{' '}
      </span>
      <span>
        <img src={complogo} className="lg:w-5/6" />
      </span>
    </div>
  )
}
export default Welcome
