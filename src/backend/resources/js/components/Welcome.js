import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Welcome = () => {
  const [state, setState] = useState({
    loading: true,
    lastName: ''
  })
  useEffect(() => {
    axios.get(`../getLoggedinUser`).then((response) => {
      if (response.status === 200) {
        let Lastnane = response['contactLastName']
        setState({
          loading: false,
          lastName: Lastnane
        })
      }
    })
  }, [])
  return (
    <div className="w-full">
      {!state.loading ? (
        <h1 className="text-green-600 text-lg font-bold tracking-normal">
          ようこそ{' '}
          <span className="capitalize text-2xl text-green-700">
            {state.lastName}
          </span>
          {' 様'}
        </h1>
      ) : (
        ''
      )}
    </div>
    // <div className="w-full">
    //   <h1 className="text-green-700 text-3xl tracking-normal">
    //     ダッシュボード
    //   </h1>
    // </div>
  )
}
export default Welcome
