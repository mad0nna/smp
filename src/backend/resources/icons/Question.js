import React from 'react'
import PropTypes from 'prop-types'

const Question = (props) => {
  const { className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18.762 18.762"
      className={className}
    >
      <g id="question-circle" transform="translate(0 0.631)">
        <path
          d="M9.381,17.589A8.208,8.208,0,1,0,1.173,9.381,8.208,8.208,0,0,0,9.381,17.589Zm0,1.173A9.381,9.381,0,1,0,0,9.381,9.381,9.381,0,0,0,9.381,18.762Z"
          transform="translate(0 -0.631)"
          fill="#1E9E47"
          fillRule="evenodd"
        />
        <path
          id="Path_3627"
          data-name="Path 3627"
          d="M11.813,10.7h1.673A1.524,1.524,0,0,1,15.21,9.158c.868,0,1.664.383,1.664,1.3,0,.71-.474,1.036-1.223,1.532a2.514,2.514,0,0,0-1.481,2.22l.009.517h1.657v-.4c0-.8.346-1.036,1.28-1.66a2.712,2.712,0,0,0,1.577-2.3c0-1.688-1.618-2.5-3.388-2.5-1.681,0-3.532.723-3.491,2.83Zm1.98,6.162a1.141,1.141,0,0,0,1.28,1.036c.772,0,1.3-.44,1.3-1.036,0-.617-.532-1.05-1.3-1.05a1.138,1.138,0,0,0-1.279,1.05Z"
          transform="translate(-5.872 -4.138)"
          fill="#1e9e47"
        />
      </g>
    </svg>
  )
}

Question.propTypes = {
  className: PropTypes.string
}

export default Question
