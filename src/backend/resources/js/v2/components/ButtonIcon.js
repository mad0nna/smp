import React from 'react'
import PropTypes from 'prop-types'

const ButtonIcon = (props) => {
  const { icon, text = '', className = 'bg-primary-500', ...rest } = props

  return (
    <button
      type="button"
      className={`flex rounded-md py-2 text-white justify-center px-2 ${className}`}
      {...rest}
    >
      <div className={`w-5 h-5 ${text !== '' ? 'mr-2' : ''}`}>{icon}</div>
      <p>{text}</p>
    </button>
  )
}

ButtonIcon.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string,
  className: PropTypes.string
}

export default ButtonIcon
