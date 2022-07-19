import React from 'react'
import PropTypes from 'prop-types'

const NewsPaper = (props) => {
  const { className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16.895"
      viewBox="0 0 24 23.944"
      c
      lassName={className}
    >
      <path
        id="newspaper"
        d="M5.221,21.2a1.894,1.894,0,0,1-1.386-.585,1.894,1.894,0,0,1-.585-1.386V4.322L4.766,5.795,6.261,4.3,7.755,5.795,9.272,4.3l1.495,1.495L12.239,4.3l1.495,1.495L15.228,4.3l1.495,1.495L18.218,4.3l1.495,1.495L21.25,4.322v14.9a1.878,1.878,0,0,1-.6,1.386,1.906,1.906,0,0,1-1.375.585Zm0-1.971h6.173v-6.13H5.221v6.13Zm7.884,0h6.173V17.036H13.106Zm0-3.921h6.173V13.094H13.106ZM5.221,11.361H19.279V9.2H5.221Z"
        transform="translate(-3.25 -4.3)"
        fill="#17a8a4"
      />
    </svg>
  )
}

NewsPaper.propTypes = {
  className: PropTypes.string
}

export default NewsPaper
