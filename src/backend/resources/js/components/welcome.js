import React from 'react'

const Welcome = (props) => {
  return (
    <div className="w-full">
      <h1 className="text-green-600 text-lg font-bold tracking-normal">
        ようこそ{' '}
        <span className="capitalize text-2xl text-green-700">
          {props && props.lastName ? props.lastName : ''}
        </span>
      </h1>
    </div>
    // <div className="w-full">
    //   <h1 className="text-green-700 text-3xl tracking-normal">
    //     ダッシュボード
    //   </h1>
    // </div>
  )
}
export default Welcome
