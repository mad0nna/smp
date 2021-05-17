import React, { useState } from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import CalendarIcon from '../../../img/calendar-icon.png'
const AdminServiceUsageChart = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = props.interActivePages.includes(location.pathname)
      ? 'group-hover:block'
      : ''
  }
  let [state, setState] = useState({
    fromDate: '',
    toDate: ''
  })
  const getDate = (e, key) => {
    e.preventDefault()
    if (key === 'fromDate') {
      setState((prevState) => {
        return {
          ...prevState,
          fromDate: convertEngToJPDate(e.target.value)
        }
      })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          toDate: convertEngToJPDate(e.target.value)
        }
      })
    }
  }
  const convertEngToJPDate = (date) => {
    let dateSplit = date.split('-')
    let year = dateSplit[0]
    let month = dateSplit[1]
    let day = dateSplit[2]
    if (dateSplit[1].length > 1) {
      month = month[0] === '0' ? month[1] : month
    }
    if (dateSplit[1].length > 1) {
      day = day[0] === '0' ? day[1] : day
    }
    return year + '年' + month + '月' + day + '日'
  }

  return (
    <div
      className={
        props.displayType === 'small'
          ? 'h-12/12'
          : 'h-full' + ' w-full h-12/12 relative group font-meiryo'
      }
    >
      <div
        className={
          'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-pointer hidden ' +
          showMoveButton
        }
      >
        Move
      </div>
      <div className="w-full h-full overflow-hidden relative rounded-lg border-2 border-gray-200 bg-white">
        <div
          id="widget-header"
          className="max-w-full h-20 box-border align-middle p-3 relative"
        >
          <div
            id="widget-icon"
            className="w-2 h-6 bg-primary-200 float-left ml-4"
          >
            {' '}
          </div>
          <div
            id="widget-name"
            className="text-primary-200 font-sans font-bold ml-8"
          >
            サービス利用
          </div>
          <img
            className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
            src={Ellipsis}
          />
          <div className="w-auto bg-mainbg h-14 rounded-lg absolute top-4 right-4 px-4 flex">
            <input
              type="date"
              className="absolute bottom-4 left-20 opacity-0 z-10"
              onChange={(event) => {
                getDate(event, 'fromDate')
              }}
            />
            <input
              type="date"
              className="absolute bottom-4 right-6 opacity-0 z-10"
              onChange={(event) => {
                getDate(event, 'toDate')
              }}
            />
            <div className="pt-6 w-24 text-xxs font-bold text-gray-400">
              日付フィルター
            </div>
            <div className="h-10 w-40 mt-2 border-2 border-gray-300 rounded-sm relative">
              <p className="absolute top-2 left-1 text-sm">{state.fromDate}</p>
              <div className="absolute right-0 bg-primary-200 w-10 h-9">
                <img src={CalendarIcon} className="w-6 ml-2 mt-1" />
              </div>
            </div>
            <div className="pt-3 text-center w-10 text-lg text-primary-200">
              ~
            </div>

            <div className="h-10 w-40 mt-2 border-2 border-gray-300 rounded-sm relative">
              <p className="absolute top-2 left-1 text-sm">{state.toDate}</p>
              <div className="absolute right-0 bg-primary-200 w-10 h-9">
                <img src={CalendarIcon} className="w-6 ml-2 mt-1" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full">
            <svg
              className="w-full"
              xmlns="http://www.w3.org/2000/svg"
              width="1057"
              height="344.252"
              viewBox="0 0 1057 344.252"
            >
              <defs>
                <clipPath id="clip-path">
                  <rect width="814.412" height="218.509" fill="none" />
                </clipPath>
              </defs>
              <rect
                id="Rectangle_2160"
                data-name="Rectangle 2160"
                width="1057"
                height="344"
                rx="2"
                fill="#fff"
              />
              <g
                id="Group_256"
                data-name="Group 256"
                transform="translate(-301.082 -697)"
              >
                <path
                  id="Path_2102"
                  data-name="Path 2102"
                  d="M3.283,0H946.717A3.479,3.479,0,0,1,950,3.647V340.605a3.479,3.479,0,0,1-3.283,3.647H3.283A3.479,3.479,0,0,1,0,340.605V3.647A3.479,3.479,0,0,1,3.283,0Z"
                  transform="translate(372 697)"
                  fill="#fff"
                />
                <g
                  id="Repeat_Grid_76"
                  data-name="Repeat Grid 76"
                  transform="translate(485.253 748.318)"
                  clipPath="url(#clip-path)"
                >
                  <g
                    id="Group_61"
                    data-name="Group 61"
                    transform="translate(0 -6.688)"
                  >
                    <text
                      id="_0_AM"
                      data-name="0 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        0 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-2"
                    data-name="Group 61"
                    transform="translate(56 -6.688)"
                  >
                    <text
                      id="_2_AM"
                      data-name="2 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        2 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-2"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-3"
                    data-name="Group 61"
                    transform="translate(112 -6.688)"
                  >
                    <text
                      id="_4_AM"
                      data-name=" 4 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        4 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-3"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-4"
                    data-name="Group 61"
                    transform="translate(168 -6.688)"
                  >
                    <text
                      id="_6_AM"
                      data-name="6 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        6 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-4"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-5"
                    data-name="Group 61"
                    transform="translate(224 -6.688)"
                  >
                    <text
                      id="_8_PM"
                      data-name="8 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        8 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-5"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-6"
                    data-name="Group 61"
                    transform="translate(280 -6.688)"
                  >
                    <text
                      id="_10_AM"
                      data-name="  10 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        10 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-6"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-7"
                    data-name="Group 61"
                    transform="translate(336 -6.688)"
                  >
                    <text
                      id="_12_PM"
                      data-name="  12 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        12 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-7"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-8"
                    data-name="Group 61"
                    transform="translate(392 -6.688)"
                  >
                    <text
                      id="_2_PM"
                      data-name="    2 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        2 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-8"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-9"
                    data-name="Group 61"
                    transform="translate(448 -6.688)"
                  >
                    <text
                      id="_4_PM"
                      data-name="   4 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        4 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-9"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-10"
                    data-name="Group 61"
                    transform="translate(504 -6.688)"
                  >
                    <text
                      id="_6_PM"
                      data-name=" 6 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        6 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-10"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-11"
                    data-name="Group 61"
                    transform="translate(560 -6.688)"
                  >
                    <text
                      id="_8_PM-2"
                      data-name="8 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        8 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-11"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-12"
                    data-name="Group 61"
                    transform="translate(616 -6.688)"
                  >
                    <text
                      id="_10_PM"
                      data-name="10 PM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0">
                        10 PM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-12"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-13"
                    data-name="Group 61"
                    transform="translate(672 -6.688)"
                  >
                    <text
                      id="_0_AM-2"
                      data-name=" 0 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        0 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-13"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-14"
                    data-name="Group 61"
                    transform="translate(728 -6.688)"
                  >
                    <text
                      id="_0_AM-3"
                      data-name=" 0 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        0 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-14"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                  <g
                    id="Group_61-15"
                    data-name="Group 61"
                    transform="translate(784 -6.688)"
                  >
                    <text
                      id="_0_AM-4"
                      data-name=" 0 AM"
                      transform="translate(0 310.5)"
                      fill="#4e5f80"
                      fontSize="13"
                      fontFamily="Poppins-Regular, Poppins"
                    >
                      <tspan x="0" y="0" xmlSpace="preserve">
                        {' '}
                        0 AM
                      </tspan>
                    </text>
                    <path
                      id="Path_603-15"
                      data-name="Path 603"
                      d="M165.558,862.5v282.812"
                      transform="translate(-138.058 -855.812)"
                      fill="none"
                      stroke="#e0e2e6"
                      strokeWidth="1"
                    />
                  </g>
                </g>
                <text
                  id="_100"
                  data-name="100"
                  transform="translate(452.253 764.273)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    100
                  </tspan>
                </text>
                <text
                  id="_80"
                  data-name="80"
                  transform="translate(452.253 801.995)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    80
                  </tspan>
                </text>
                <text
                  id="_60"
                  data-name="60"
                  transform="translate(452.253 840.366)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    60
                  </tspan>
                </text>
                <text
                  id="_40"
                  data-name="40"
                  transform="translate(452.253 878.737)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    40
                  </tspan>
                </text>
                <text
                  id="_0"
                  data-name="0"
                  transform="translate(452.253 955.48)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    0
                  </tspan>
                </text>
                <text
                  id="May_1"
                  data-name="May 1"
                  transform="translate(499.533 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 1日
                  </tspan>
                </text>
                <text
                  id="May_2"
                  data-name="May 2"
                  transform="translate(575.351 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 2日
                  </tspan>
                </text>
                <text
                  id="May_3"
                  data-name="May 3"
                  transform="translate(640.472 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 3日
                  </tspan>
                </text>
                <text
                  id="May_4"
                  data-name="May 4"
                  transform="translate(702.662 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 4日
                  </tspan>
                </text>
                <text
                  id="May_5"
                  data-name="May 5"
                  transform="translate(765.908 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 5日
                  </tspan>
                </text>
                <text
                  id="May_6"
                  data-name="May 6"
                  transform="translate(829.192 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 6日
                  </tspan>
                </text>
                <text
                  id="May_7"
                  data-name="May 7"
                  transform="translate(895.38 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 7日
                  </tspan>
                </text>
                <text
                  id="May_8"
                  data-name="May 8"
                  transform="translate(960.587 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 8日
                  </tspan>
                </text>
                <text
                  id="May_9"
                  data-name="May 9"
                  transform="translate(1023.833 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 9日
                  </tspan>
                </text>
                <text
                  id="May_10"
                  data-name="May 10"
                  transform="translate(1087.54 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 10日
                  </tspan>
                </text>
                <text
                  id="May_11"
                  data-name="May 11"
                  transform="translate(1164.257 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 11日
                  </tspan>
                </text>
                <text
                  id="May_12"
                  data-name="May 12"
                  transform="translate(1220.025 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 12日
                  </tspan>
                </text>
                <text
                  id="May_13"
                  data-name="May 13"
                  transform="translate(1273.006 1009.45)"
                  fill="black"
                  fontSize="12"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    5月 13日
                  </tspan>
                </text>
                <text
                  id="_20"
                  data-name="20"
                  transform="translate(452.254 917.109)"
                  fill="#dc5858"
                  fontSize="13"
                  fontFamily="Poppins-Regular, Poppins"
                >
                  <tspan x="0" y="0">
                    20
                  </tspan>
                </text>
              </g>
              <rect
                id="Rectangle_2163"
                data-name="Rectangle 2163"
                width="45"
                height="45"
                rx="12"
                transform="translate(41 59)"
                fill="#56dce1"
              />
              <rect
                id="Rectangle_2164"
                data-name="Rectangle 2164"
                width="45"
                height="45"
                rx="12"
                transform="translate(41 144)"
                fill="#5490de"
              />
              <rect
                id="Rectangle_2165"
                data-name="Rectangle 2165"
                width="45"
                height="45"
                rx="12"
                transform="translate(41 223)"
                fill="#1d9e48"
              />
              <text
                id="Freee"
                transform="translate(62 208)"
                fill="#5490de"
                fontSize="12"
                fontFamily="SegoeUI-Bold, Segoe UI"
                fontWeight="700"
              >
                <tspan x="-15.223" y="0">
                  Freee
                </tspan>
              </text>
              <text
                id="SmartHR"
                transform="translate(69 129)"
                fill="#56dce1"
                fontSize="12"
                fontFamily="SegoeUI-Bold, Segoe UI"
                fontWeight="700"
              >
                <tspan x="-25.497" y="0">
                  SmartHR
                </tspan>
              </text>
              <text
                id="King_of_Time_"
                data-name="King of Time "
                transform="translate(76 293)"
                fill="#1d9e48"
                fontSize="12"
                fontFamily="SegoeUI-Bold, Segoe UI"
                fontWeight="700"
              >
                <tspan x="-37.749" y="0">
                  King of Time{' '}
                </tspan>
              </text>
              <g
                id="Charts_Line_charts_03-categories"
                data-name="Charts/Line charts/03-categories"
                transform="translate(221 60)"
              >
                <g
                  id="Line_02"
                  data-name="Line 02"
                  transform="translate(15.721 17.274)"
                >
                  <path
                    id="Line_2"
                    d="M0,.924,2.118,0l181.8,65.736L368.084,78.5l181.98,14.732.444.065,184.415,40.3-1.517,1.095L549.2,94.437,367.181,79.7l-184.705-12.8Z"
                    transform="translate(3.356 4.032)"
                    fill="#79d2de"
                  />
                  <circle
                    id="Dot_21"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(0.279 -0.274)"
                    fill="#79d2de"
                  />
                  <circle
                    id="Dot_22"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(183.279 65.726)"
                    fill="#79d2de"
                  />
                  <circle
                    id="Dot_23"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(367.279 79.726)"
                    fill="#79d2de"
                  />
                  <circle
                    id="Dot_24"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(548.279 94.726)"
                    fill="#79d2de"
                  />
                  <circle
                    id="Dot_25"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(738.279 135.726)"
                    fill="#79d2de"
                  />
                </g>
                <g id="Line_01" data-name="Line 01">
                  <path
                    id="Line_1"
                    d="M749.577,0l1.468,1.229L563,42.723,375.881,159.4,187.531,50.175,2.712,175.017,0,174.275,187.331,47.738,375.785,157.022,560.815,41.654Z"
                    transform="translate(5.073 3.529)"
                    fill="#1d9e48"
                  />
                  <circle
                    id="Dot_11"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(0 175)"
                    fill="#1d9e48"
                  />
                  <circle
                    id="Dot_12"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(190 49)"
                    fill="#1d9e48"
                  />
                  <circle
                    id="Dot_13"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(376 158)"
                    fill="#1d9e48"
                  />
                  <circle
                    id="Dot_14"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(566 43)"
                    fill="#1d9e48"
                  />
                  <circle
                    id="Dot_15"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(759)"
                    fill="#1d9e48"
                  />
                </g>
                <g
                  id="Line_03"
                  data-name="Line 03"
                  transform="translate(0 76.43)"
                >
                  <path
                    id="Line_3"
                    d="M0,0H187.613L377.989,5.2,564.77,56.143,753.4,12.7l2.131.642L564.586,57.319,376.48,6.02,187.446.853H0Z"
                    transform="translate(9.714 2.133)"
                    fill="#147ad6"
                  />
                  <circle
                    id="Dot_31"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(0 -0.43)"
                    fill="#147ad6"
                  />
                  <circle
                    id="Dot_32"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(188 -0.43)"
                    fill="#147ad6"
                  />
                  <circle
                    id="Dot_33"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(382 4.57)"
                    fill="#147ad6"
                  />
                  <circle
                    id="Dot_34"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(577 54.57)"
                    fill="#147ad6"
                  />
                  <circle
                    id="Dot_35"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(768 12.57)"
                    fill="#147ad6"
                  />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AdminServiceUsageChart
