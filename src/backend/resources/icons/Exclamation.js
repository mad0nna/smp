import React from 'react'
import PropTypes from 'prop-types'

const Exclamation = (props) => {
  const { className = '', fill = '#757575' } = props

  return (
    <svg
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <g
        id="Group_3299"
        data-name="Group 3299"
        transform="translate(-1028.667 -659.667)"
      >
        <circle
          id="Ellipse_377"
          data-name="Ellipse 377"
          cx="8"
          cy="8"
          r="8"
          transform="translate(1028.667 659.667)"
          fill={fill}
        />
        <g
          id="Layer_2"
          data-name="Layer 2"
          transform="translate(1035.668 662.667)"
        >
          <g id="icons_Q2" data-name="icons Q2">
            <path
              id="Path_3641"
              data-name="Path 3641"
              d="M22.977,16.84a.977.977,0,0,0,.977-.977V10.977a.977.977,0,1,0-1.954,0v4.886A.977.977,0,0,0,22.977,16.84Z"
              transform="translate(-21.978 -10)"
              fill="#fff"
            />
            <circle
              id="Ellipse_378"
              data-name="Ellipse 378"
              cx="0.999"
              cy="0.999"
              r="0.999"
              transform="translate(0 7.91)"
              fill="#FFF"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

Exclamation.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default Exclamation
