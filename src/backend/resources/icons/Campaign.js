import React from 'react'
import PropTypes from 'prop-types'

const Campaign = (props) => {
  const { className } = props
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="15.771"
      viewBox="0 0 20 15.771"
      className={className}
    >
      <path
        id="campaign"
        d="M19.229,16.2V14.549H23.1V16.2Zm1.338,7.073-3.106-2.294.98-1.338,3.13,2.318ZM18.512,11.108l-.98-1.338L20.567,7.5l1,1.314ZM6.182,22.339V18.492H4.725a1.6,1.6,0,0,1-1.171-.514A1.678,1.678,0,0,1,3.1,16.8v-2.82a1.673,1.673,0,0,1,.478-1.195,1.61,1.61,0,0,1,1.219-.5H8.835L13.9,9.244V21.526L8.835,18.492H7.9v3.847Zm9.008-3.56V11.992a4.9,4.9,0,0,1,1.147,1.47,4.3,4.3,0,0,1,0,3.847A4.9,4.9,0,0,1,15.191,18.778Z"
        transform="translate(-3.1 -7.5)"
        fill="#17a8a4"
      />
    </svg>
  )
}

Campaign.propTypes = {
  className: PropTypes.string
}

export default Campaign
