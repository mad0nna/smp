import React from 'react'

const Welcome = (props) => {
  return (
    <div className="flex gap-2">
      <span className="text-primary-200 text-lg lg:text-md font-bold content-center">
        ようこそ {props && props.lastName ? props.lastName : ''}
      </span>
    </div>
  )
}
export default Welcome
