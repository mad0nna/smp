import React from 'react'
import complogo from '../../img/company/logo.png'

const Welcome = () =>{
  return (
    <div className="flex gap-2">
      <span className="text-primary-200 text-lg font-bold">Welcome </span>
      <span><img src={complogo}/></span>       
    </div>
  )
}
export default Welcome

