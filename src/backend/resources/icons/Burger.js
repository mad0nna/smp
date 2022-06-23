import React from 'react'
import PropTypes from 'prop-types'

const Bell = (props) => {
  const { className } = props

  return (
    <svg
      className={className}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
  )
}

Bell.propTypes = {
  className: PropTypes.string
}

export default Bell
