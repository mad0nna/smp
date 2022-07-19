import React from 'react'
import PropTypes from 'prop-types'

const X = (props) => {
  const { className = '', fill = '#757575' } = props

  return (
    <svg
      fill={fill}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 21.857 21.853"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_17096"
            data-name="Rectangle 17096"
            width="21.857"
            height="21.853"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="Group_3235" data-name="Group 3235" clipPath="url(#clip-path)">
        <path
          id="Path_3632"
          data-name="Path 3632"
          d="M10.912,12.044l-9.275,9.28C1.058,21.9.6,22,.223,21.612s-.279-.828.308-1.415Q4.978,15.751,9.425,11.3c.114-.114.242-.214.394-.347-.157-.166-.272-.295-.394-.417L.533,1.646C.441,1.554.341,1.468.259,1.368A.824.824,0,0,1,.276.263a.819.819,0,0,1,1.1.006c.1.083.186.181.278.273l8.895,8.892c.113.113.231.22.368.351.142-.135.272-.251.4-.375Q15.832,4.9,20.348.379c.543-.543,1.157-.5,1.425.092a.777.777,0,0,1-.214.924c-.3.317-.618.623-.928.933q-4.1,4.1-8.2,8.2c-.114.114-.233.222-.4.394.117.106.266.255.388.376q4.474,4.454,8.933,8.922a2.982,2.982,0,0,1,.336.352A.744.744,0,0,1,21.63,21.6a.735.735,0,0,1-1.014.1,2.458,2.458,0,0,1-.359-.327l-8.964-8.961c-.113-.113-.231-.221-.381-.365"
          transform="translate(0 0.001)"
          fill={fill}
        />
      </g>
    </svg>
  )
}

X.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
}

export default X
