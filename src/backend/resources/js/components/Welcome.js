import React, { useEffect, useState } from 'react'

const Welcome = () => {
  const [state, setState] = useState({
    lastName: ''
  })
  let userData = JSON.parse(document.getElementById('userData').textContent)
  useEffect(() => {
    setState({
      loading: false,
      lastName: userData.lastName
    })
  }, [state.lastName])
  return (
    <div className="w-full">
      <h1 className="text-green-600 text-lg font-bold tracking-normal">
        ようこそ{' '}
        <span className="capitalize text-2xl text-green-700">
          {state.lastName}
        </span>
        {' 様'}
      </h1>
    </div>
  )
}
export default Welcome
