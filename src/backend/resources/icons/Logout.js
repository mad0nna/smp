import React from 'react'
import PropTypes from 'prop-types'

const Logout = (props) => {
  const { className } = props

  return (
    <svg
      id="Logout"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      className={className}
    >
      <rect
        id="Rectangle_570"
        data-name="Rectangle 570"
        width="16"
        height="16"
        fill="none"
      />
      <path
        id="Path_151"
        data-name="Path 151"
        d="M1.655,1.655v12.69H9.563V16H0V0H9.563V1.655ZM9.011,13.241,7.724,11.954l2.943-2.943h-6.8V7.172h6.989L7.724,4.23,9.011,2.943l4.966,4.966Z"
        transform="translate(2)"
        fill="#0a8131"
      />
    </svg>
  )
}

Logout.propTypes = {
  className: PropTypes.string
}

export default Logout