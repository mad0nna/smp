import React, { useState } from 'react'
// import GraphIcon from '../../../img/admin/graph-icon.png'
import Ellipsis from '../../../img/ellipsis.png'

// const MonthlyAccountRegistration = (props) => {
const MonthlyAccountRegistration = () => {
  //   let showMoveButton = ''
  //   if (typeof props.interActivePages != 'undefined') {
  //     showMoveButton = props.interActivePages.includes(location.pathname)
  //       ? 'group-hover:block'
  //       : ''
  //   }
  let [state, setState] = useState({
    graphType: 'pieChart'
  })
  const renderChart = () => {
    switch (state.graphType) {
      case 'pieChart':
        return renderPieChart()
      case 'lineChart':
        return renderLineChart()
      case 'barChart':
        return renderBarChart()
    }
  }
  const renderPieChart = () => {
    return (
      <svg
        className="w-full 2xl:pt-8 lg:pt-0"
        id="UI_Element_Light_Line_charts_03-categories_line_chart"
        data-name="UI Element/Light/Line charts/03-categories line chart"
        xmlns="http://www.w3.org/2000/svg"
        width="614.548"
        height="527.608"
        viewBox="0 0 614.548 527.608"
      >
        <defs>
          <filter
            id="Rectangle_282"
            x="198.714"
            y="115.115"
            width="179"
            height="23"
            filterUnits="userSpaceOnUse"
          >
            <feOffset dy="3" input="SourceAlpha" />
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodOpacity="0.161" />
            <feComposite operator="in" in2="blur" />
            <feComposite in="SourceGraphic" />
          </filter>
        </defs>
        <g
          id="UI_Element_Line_charts_03-categories_line_chart"
          data-name="UI Element/Line charts/03-categories line chart"
        >
          <g id="Mobile-chart-background">
            <rect
              id="Rectangle_Copy_16"
              data-name="Rectangle Copy 16"
              width="614.548"
              height="527.608"
              rx="1"
              fill="#fff"
            />
          </g>

          {/* <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(20 87.114)" fill="#1ace74" stroke="#1ace74" strokeWidth="1">
            <circle cx="4.5" cy="4.5" r="4.5" stroke="none" />
            <circle cx="4.5" cy="4.5" r="4" fill="none" />
          </g>           */}

          {/* King of Time */}
          <text
            id="_700_1000"
            data-name="700 / 1,000"
            fontSize="12px"
            transform="translate(518 33)"
            fontFamily="Meiryo-UI"
            opacity="0.5"
          >
            <tspan x="0" y="0">
              700{' '}
            </tspan>
            <tspan opacity="0.5">/ 1,000</tspan>
          </text>
          <text
            id="顧客企業数"
            transform="translate(20 33)"
            fontSize="13px"
            fontFamily="YuGothicUI-Regular, Yu Gothic UI"
            opacity="0.6"
          >
            <tspan x="0" y="0">
              King of Time
            </tspan>
          </text>
          {/* King of Time Progress Line */}
          <rect
            id="Rectangle_282-2"
            data-name="Rectangle 282"
            width="580"
            height="5"
            rx="2.5"
            transform="translate(20 40)"
            fill="#f5f5f5"
          />
          <rect
            id="Rectangle_2157"
            data-name="Rectangle 2157"
            width="400"
            height="5"
            rx="2.5"
            transform="translate(20 40)"
            fill="#1d9e48"
          />

          {/* Freee */}
          <text
            id="_200_1000"
            data-name="200 / 1,000"
            fontSize="12px"
            transform="translate(518 94)"
            fontFamily="Meiryo-UI"
            opacity="0.5"
          >
            <tspan x="0" y="0">
              200{' '}
            </tspan>
            <tspan opacity="0.5">/ 1,000</tspan>
          </text>
          <text
            id="顧客企業数"
            transform="translate(20 94)"
            fontSize="13px"
            fontFamily="YuGothicUI-Regular, Yu Gothic UI"
            opacity="0.6"
          >
            <tspan x="0" y="0">
              Freee
            </tspan>
          </text>
          {/* Freee Progress Line */}
          <rect
            id="Rectangle_2158"
            data-name="Rectangle 2158"
            width="580"
            height="5"
            rx="2.5"
            transform="translate(20 101)"
            fill="#f5f5f5"
          />
          <rect
            id="Rectangle_2159"
            data-name="Rectangle 2159"
            width="116"
            height="5"
            rx="2.5"
            transform="translate(20 101)"
            fill="#5490de"
          />

          {/* SmartHR */}
          <text
            id="_300_1000"
            data-name="300 / 1,000"
            fontSize="12px"
            transform="translate(518 157)"
            fontFamily="Meiryo-UI"
            opacity="0.5"
          >
            <tspan x="0" y="0">
              300{' '}
            </tspan>
            <tspan opacity="0.5">/ 1,000</tspan>
          </text>
          <text
            id="顧客企業数"
            transform="translate(20 157)"
            fontSize="13px"
            fontFamily="YuGothicUI-Regular, Yu Gothic UI"
            opacity="0.6"
          >
            <tspan x="0" y="0">
              SmartHR
            </tspan>
          </text>
          {/* SmartHR Progress Line */}
          <rect
            id="Rectangle_2158"
            data-name="Rectangle 2158"
            width="580"
            height="5"
            rx="2.5"
            transform="translate(20 164)"
            fill="#f5f5f5"
          />
          <rect
            id="Rectangle_2159"
            data-name="Rectangle 2159"
            width="174"
            height="5"
            rx="2.5"
            transform="translate(20 164)"
            fill="#56dce1"
          />

          {/* Freee Circle Point */}
          {/* <circle id="Ellipse_3" data-name="Ellipse 3" cx="4.5" cy="4.5" r="4.5" transform="translate(211.714 260.114)" fill="#56dce1" />
          <text id="_200_1000" data-name="200 / 1,000" transform="translate(228.714 274.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7">
            <tspan x="0" y="0">200 / 1,000</tspan>
          </text>
          <text id="販売代理店数" transform="translate(252.714 287.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7">
            <tspan x="0" y="0">販売代理店数 (number of client companies)</tspan>
          </text>
          
          <text id="_300_1000" data-name="300 / 1,000" transform="translate(232.714 444.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7">
            <tspan x="0" y="0">300 / 1,000</tspan>
          </text>
          <circle id="Ellipse_4" data-name="Ellipse 4" cx="4.5" cy="4.5" r="4.5" transform="translate(215.714 431.114)" fill="#5490de" />
          
          <text id="販売代理店数-2" data-name="販売代理店数" transform="translate(252.714 459.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7">
            <tspan x="0" y="0">販売代理店数 (number of client companies SmartHR)</tspan>
          </text> */}

          {/* King of Time Circle Graph */}
          <g
            id="Ring_Chart5"
            data-name="Ring Chart5"
            transform="translate(20 260)"
          >
            <path
              id="Path_3516"
              data-name="Path 3516"
              d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z"
              transform="translate(77.501 77.493)"
              fill="#1d9e48"
            />
            <path
              id="Path_3517"
              data-name="Path 3517"
              d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z"
              transform="translate(77.501 77.493)"
              fill="#f5f5f5"
            />
            <text
              id="_70_"
              data-name="70%"
              transform="translate(77.501 89.056)"
              fill="#1f78b4"
              fontSize="34.875"
              fontFamily="ArialMT, Arial"
            >
              <tspan x="-34.901" y="0">
                70%
              </tspan>
            </text>
          </g>

          {/* Freee Circle Graph */}
          <g
            id="Ring_Chart5-3"
            data-name="Ring Chart5"
            transform="translate(232 260)"
          >
            <path
              id="Path_3516-3"
              data-name="Path 3516"
              d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z"
              transform="translate(77.501 77.493)"
              fill="#5490de"
            />
            <path
              id="Path_3517-3"
              data-name="Path 3517"
              d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z"
              transform="translate(77.501 77.493)"
              fill="#f5f5f5"
            />
            <text
              id="_30_"
              data-name="30%"
              transform="translate(77.501 89.056)"
              fill="#1f78b4"
              fontSize="34.875"
              fontFamily="ArialMT, Arial"
            >
              <tspan x="-34.901" y="0">
                30%
              </tspan>
            </text>
          </g>

          {/* SmartHR Circle Graph */}
          <g
            id="Ring_Chart5-2"
            data-name="Ring Chart5"
            transform="translate(442 260)"
          >
            <path
              id="Path_3516-2"
              data-name="Path 3516"
              d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z"
              transform="translate(77.501 77.493)"
              fill="#56dce1"
            />
            <path
              id="Path_3517-2"
              data-name="Path 3517"
              d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z"
              transform="translate(77.501 77.493)"
              fill="#f5f5f5"
            />
            <text
              id="_20_"
              data-name="20%"
              transform="translate(77.501 89.056)"
              fill="#1f78b4"
              fontSize="34.875"
              fontFamily="ArialMT, Arial"
            >
              <tspan x="-34.901" y="0">
                20%
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    )
  }
  const renderBarChart = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="461.127"
        viewBox="0 0 554 461.127"
      >
        <g
          id="Group_1608"
          data-name="Group 1608"
          transform="translate(-2450 -2552.333)"
        >
          <g
            id="UI_Element_Light_Column_charts_Clustered_column_2_categories"
            data-name="UI Element/Light/Column charts/Clustered column 2 categories"
            transform="translate(2450 2552.333)"
          >
            <g
              id="UI_Element_Column_charts_Clustered_column_2_categories"
              data-name="UI Element/Column charts/Clustered column 2 categories"
            >
              <g id="Mobile-chart-background">
                <rect
                  id="Rectangle_Copy_16"
                  data-name="Rectangle Copy 16"
                  width="554"
                  height="396.647"
                  rx="12"
                  fill="#fff"
                />
              </g>
              <g id="Chart" transform="translate(96.06 67.739)">
                <g id="x-axis" transform="translate(0 277.971)">
                  <text
                    id="Jun"
                    transform="translate(371.418)"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="16.662" y="13">
                      5
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                  <text
                    id="May"
                    transform="translate(296.384)"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="16.662" y="13">
                      4
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                  <text
                    id="Apr"
                    transform="translate(221.35)"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="16.662" y="13">
                      3
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                  <text
                    id="Mar"
                    transform="translate(151.944)"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="13.848" y="13">
                      2
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                  <text
                    id="Feb"
                    transform="translate(76.91)"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="16.656" y="13">
                      1
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                  <text
                    id="Jan"
                    fontSize="12"
                    fontFamily="NunitoSans-ExtraBold, Nunito Sans"
                    fontWeight="800"
                  >
                    <tspan x="16.662" y="13">
                      12
                    </tspan>
                    <tspan
                      y="13"
                      fontFamily="YuGothicUI-Bold, Yu Gothic UI"
                      fontWeight="700"
                    >
                      月
                    </tspan>
                  </text>
                </g>
                <g id="Columns" transform="translate(0 0)">
                  <g id="category-02" transform="translate(18.758 156.882)">
                    <g
                      id="Charts_Columns_Bars_Single-column-size02"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(371.418 33.967)"
                    >
                      <rect
                        id="Rectangle_Copy_35"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="78.891"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-2"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(296.384)"
                    >
                      <rect
                        id="Rectangle_Copy_35-2"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="112.858"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-3"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(221.35 59.168)"
                    >
                      <rect
                        id="Rectangle_Copy_35-3"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="53.69"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-4"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(148.192 46.02)"
                    >
                      <rect
                        id="Rectangle_Copy_35-4"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="66.838"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-5"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(76.91 5.479)"
                    >
                      <rect
                        id="Rectangle_Copy_35-5"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="107.38"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-6"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(0 59.168)"
                    >
                      <rect
                        id="Rectangle_Copy_35-6"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="53.69"
                        rx="4"
                        fill="#56dce1"
                      />
                    </g>
                  </g>
                  <g id="category-01" transform="translate(0 71.417)">
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-7"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(371.418 27.393)"
                    >
                      <rect
                        id="Rectangle_Copy_35-7"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="170.931"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-8"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(296.384 51.498)"
                    >
                      <rect
                        id="Rectangle_Copy_35-8"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="146.825"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-9"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(221.35 110.667)"
                    >
                      <rect
                        id="Rectangle_Copy_35-9"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="87.657"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-10"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(148.192)"
                    >
                      <rect
                        id="Rectangle_Copy_35-10"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="198.324"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-11"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(76.91 67.934)"
                    >
                      <rect
                        id="Rectangle_Copy_35-11"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="130.39"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-12"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(0 98.614)"
                    >
                      <rect
                        id="Rectangle_Copy_35-12"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="99.71"
                        rx="4"
                        fill="#5490de"
                      />
                    </g>
                  </g>
                  <g
                    id="category-01-2"
                    data-name="category-01"
                    transform="translate(39.74)"
                  >
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-13"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(371.418 37.257)"
                    >
                      <rect
                        id="Rectangle_Copy_35-13"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="232.483"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-14"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(296.384 70.043)"
                    >
                      <rect
                        id="Rectangle_Copy_35-14"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="199.697"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-15"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(221.35 150.518)"
                    >
                      <rect
                        id="Rectangle_Copy_35-15"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="119.222"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-16"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(148.192)"
                    >
                      <rect
                        id="Rectangle_Copy_35-16"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="269.74"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-17"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(76.91 92.397)"
                    >
                      <rect
                        id="Rectangle_Copy_35-17"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="177.343"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                    <g
                      id="Charts_Columns_Bars_Single-column-size02-18"
                      data-name="Charts/Columns&amp;Bars/Single-column-size02"
                      transform="translate(0 134.125)"
                    >
                      <rect
                        id="Rectangle_Copy_35-18"
                        data-name="Rectangle Copy 35"
                        width="15.007"
                        height="135.615"
                        rx="4"
                        fill="#1d9e48"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect
            id="Rectangle_2161"
            data-name="Rectangle 2161"
            width="38.049"
            height="38.049"
            rx="12"
            transform="translate(2581.902 2957.339)"
            fill="#56dce1"
          />
          <rect
            id="Rectangle_2162"
            data-name="Rectangle 2162"
            width="38.049"
            height="38.049"
            rx="12"
            transform="translate(2726.486 2957.339)"
            fill="#5490de"
          />
          <text
            id="SmartHR"
            transform="translate(2598.365 3010.46)"
            fill="#56dce1"
            fontSize="9"
            fontFamily="SegoeUI-Bold, Segoe UI"
            fontWeight="700"
          >
            <tspan x="-19.123" y="0">
              SmartHR
            </tspan>
          </text>
          <text
            id="Freee"
            transform="translate(2742.559 3010.46)"
            fill="#5490de"
            fontSize="9"
            fontFamily="SegoeUI-Bold, Segoe UI"
            fontWeight="700"
          >
            <tspan x="-11.417" y="0">
              Freee
            </tspan>
          </text>
          <rect
            id="Rectangle_2163"
            data-name="Rectangle 2163"
            width="38.049"
            height="38.049"
            rx="12"
            transform="translate(2866.843 2959.03)"
            fill="#1d9e48"
          />
          <text
            id="King_of_Time_"
            data-name="King of Time "
            transform="translate(2887.233 3010.46)"
            fill="#1d9e48"
            fontSize="9"
            fontFamily="SegoeUI-Bold, Segoe UI"
            fontWeight="700"
          >
            <tspan x="-28.312" y="0">
              King of Time{' '}
            </tspan>
          </text>
          <g id="y-axis" transform="translate(2462.774 2623.688)">
            <text
              id="_0"
              data-name="0"
              transform="translate(0 271.608)"
              fill="#7c828a"
              fontSize="12"
              fontFamily="NunitoSans-Regular, Nunito Sans"
            >
              <tspan x="34.039" y="12">
                0
              </tspan>
            </text>
            <text
              id="_250"
              data-name="250"
              transform="translate(0 201.429)"
              fill="#7c828a"
              fontSize="12"
              fontFamily="NunitoSans-Regular, Nunito Sans"
            >
              <tspan x="19.639" y="12">
                250
              </tspan>
            </text>
            <text
              id="_500"
              data-name="500"
              transform="translate(0 128.89)"
              fill="#7c828a"
              fontSize="12"
              fontFamily="NunitoSans-Regular, Nunito Sans"
            >
              <tspan x="19.639" y="12">
                500
              </tspan>
            </text>
            <text
              id="_750"
              data-name="750"
              transform="translate(0 0)"
              fill="#7c828a"
              fontSize="12"
              fontFamily="NunitoSans-Regular, Nunito Sans"
            >
              <tspan x="12.439" y="12">
                1,000
              </tspan>
            </text>
            <text
              id="_750-2"
              data-name="750"
              transform="translate(0 58.711)"
              fill="#7c828a"
              fontSize="12"
              fontFamily="NunitoSans-Regular, Nunito Sans"
            >
              <tspan x="19.639" y="12">
                750
              </tspan>
            </text>
          </g>
        </g>
      </svg>
    )
  }
  const renderLineChart = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="559.753"
        viewBox="0 0 573.674 559.753"
      >
        <g id="Group_1607" data-name="Group 1607" transform="translate(-1.821)">
          <g id="Mobile-chart-background" transform="translate(1.821)">
            <rect
              id="Rectangle_Copy_16"
              data-name="Rectangle Copy 16"
              width="573.674"
              height="559.753"
              rx="12"
              fill="#fff"
            />
          </g>
          <g id="chart" transform="translate(30.96 118.433)">
            <g id="Grid" transform="translate(68.295 7.794)">
              <path
                id="Line_Copy_18"
                data-name="Line Copy 18"
                d="M.5,1l438.906.781"
                transform="translate(-0.5 300.389)"
                fill="none"
                stroke="#d6d9dc"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                id="Line_Copy_19"
                data-name="Line Copy 19"
                d="M.5,1l438.906.781"
                transform="translate(-0.5 142.048)"
                fill="none"
                stroke="#d6d9dc"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                id="Line_Copy_20"
                data-name="Line Copy 20"
                d="M.5,1l438.906.781"
                transform="translate(-0.5 221.219)"
                fill="none"
                stroke="#d6d9dc"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                id="Line_Copy_21"
                data-name="Line Copy 21"
                d="M.5,1l438.906.781"
                transform="translate(-0.5 62.878)"
                fill="none"
                stroke="#d6d9dc"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="1"
                opacity="0.4"
              />
              <path
                id="Line_Copy_19-2"
                data-name="Line Copy 19"
                d="M.5,1l438.906.781"
                transform="translate(6.968 -1)"
                fill="none"
                stroke="#d6d9dc"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="1"
                opacity="0.4"
              />
            </g>
            <g
              id="Charts_Line_charts_03-categories"
              data-name="Charts/Line charts/03-categories"
            >
              <g id="x-axis" transform="translate(58.278 330.668)">
                <text
                  id="Jun"
                  transform="translate(401.049)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="27.28" y="12">
                    5月
                  </tspan>
                </text>
                <text
                  id="May"
                  transform="translate(321.219)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="25.468" y="12">
                    4月
                  </tspan>
                </text>
                <text
                  id="Apr"
                  transform="translate(239.489)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="25.666" y="12">
                    3月
                  </tspan>
                </text>
                <text
                  id="Mar"
                  transform="translate(159.659)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="24.49" y="12">
                    2月
                  </tspan>
                </text>
                <text
                  id="Feb"
                  transform="translate(79.83)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="27.136" y="12">
                    1月
                  </tspan>
                </text>
                <text
                  id="Jan"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="27.262" y="12">
                    12月
                  </tspan>
                </text>
              </g>
              <g id="y-axis">
                <text
                  id="_0"
                  data-name="0"
                  transform="translate(0 298.386)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="38.33" y="12">
                    0
                  </tspan>
                </text>
                <text
                  id="_250"
                  data-name="250"
                  transform="translate(0 221.288)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="23.93" y="12">
                    250
                  </tspan>
                </text>
                <text
                  id="_500"
                  data-name="500"
                  transform="translate(0 141.597)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="23.93" y="12">
                    500
                  </tspan>
                </text>
                <text
                  id="_750"
                  data-name="750"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="16.73" y="12">
                    1,000
                  </tspan>
                </text>
                <text
                  id="_750-2"
                  data-name="750"
                  transform="translate(0 64.5)"
                  fill="#7c828a"
                  fontSize="12"
                  fontFamily="NunitoSans-Regular, Nunito Sans"
                >
                  <tspan x="23.93" y="12">
                    750
                  </tspan>
                </text>
              </g>
              <g
                id="Line_02"
                data-name="Line 02"
                transform="translate(80.011 184.997)"
              >
                <path
                  id="Path_4866"
                  data-name="Path 4866"
                  d="M2.578,2.168l92-60.667,84,47.333L267.245,5.5l86.666-68.667,84.667,35.333"
                  transform="translate(-5.837 68.051)"
                  fill="none"
                  stroke="#59c0cb"
                  strokeWidth="4"
                />
                <g
                  id="Dot_21"
                  transform="translate(-5.939 59.747)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-2"
                  data-name="Dot_21"
                  transform="translate(85.348 3.375)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-3"
                  data-name="Dot_21"
                  transform="translate(165.187 46.194)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-4"
                  data-name="Dot_21"
                  transform="translate(250.492 62.747)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-5"
                  data-name="Dot_21"
                  transform="translate(337.597 -2)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-6"
                  data-name="Dot_21"
                  transform="translate(420.463 31.466)"
                  fill="#fff"
                  stroke="#59c0cb"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
              </g>
              <g
                id="Line_02-2"
                data-name="Line 02"
                transform="translate(77.713 88.078)"
              >
                <path
                  id="Path_4866-2"
                  data-name="Path 4866"
                  d="M2.578,2.168,95.911-36.166l82-80.667L267.245,13.834l86.666-66.667L443.245-81.5"
                  transform="translate(-5.871 119.587)"
                  fill="none"
                  stroke="#3c7dc0"
                  strokeWidth="4"
                />
                <g
                  id="Dot_21-7"
                  data-name="Dot_21"
                  transform="translate(-4.642 111.384)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-8"
                  data-name="Dot_21"
                  transform="translate(89.646 73.769)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-9"
                  data-name="Dot_21"
                  transform="translate(164.485 -2)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-10"
                  data-name="Dot_21"
                  transform="translate(250.791 122.047)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-11"
                  data-name="Dot_21"
                  transform="translate(336.897 61.084)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-12"
                  data-name="Dot_21"
                  transform="translate(422.763 31.324)"
                  fill="#fff"
                  stroke="#3c7dc0"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
              </g>
              <g
                id="Line_02-3"
                data-name="Line 02"
                transform="translate(77.713 12.062)"
              >
                <path
                  id="Path_4866-3"
                  data-name="Path 4866"
                  d="M2.578,2.168,93.911-49l85.334-104.667,88,176,86.666-85.5,89.334-48.5"
                  transform="translate(-5.871 154.319)"
                  fill="none"
                  stroke="#318e36"
                  strokeWidth="4"
                />
                <g
                  id="Dot_21-13"
                  data-name="Dot_21"
                  transform="translate(-6.642 145.856)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-14"
                  data-name="Dot_21"
                  transform="translate(84.646 97.127)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-15"
                  data-name="Dot_21"
                  transform="translate(165.417 -4)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-16"
                  data-name="Dot_21"
                  transform="translate(251.791 164.382)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-17"
                  data-name="Dot_21"
                  transform="translate(333.897 86.407)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
                <g
                  id="Dot_21-18"
                  data-name="Dot_21"
                  transform="translate(423.763 37.856)"
                  fill="#fff"
                  stroke="#318e36"
                  strokeMiterlimit="10"
                  strokeWidth="4"
                >
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none" />
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    )
  }
  const changeChart = (type) => {
    setState((prevState) => {
      return {
        ...prevState,
        graphType: type
      }
    })
  }
  const setActiveChart = (type) => {
    let activeClasses = 'bg-gray-100 text-gray-600 border-l border-r'
    let inactiveClasses = 'bg-white text-gray-400 '
    if (state.graphType === type) {
      return activeClasses
    }
    return inactiveClasses
  }
  return (
    <div className="w-full h-full relative group">
      <div className="w-full h-full overflow-hidden relative  rounded-lg bg-white shadow-xl">
        <div
          id="widget-header"
          className="bg-white box-border p-3 pb-6 relative"
        >
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">
                月次アカウント登録
              </h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-3 text-gray-500 text-xs">
          <div className="w-64 h-12 text-center float-right">
            <div
              className={
                'leading-3 align-middle inline-block px-6 py-3 border-gray-200 border-t border-b border-l cursor-pointer ' +
                setActiveChart('pieChart')
              }
              onClick={() => changeChart('pieChart')}
            >
              <p className="text-xxs text-center">円グラフ</p>
            </div>
            <div
              className={
                'leading-3 p-1 align-middle inline-block px-6 py-3 border-gray-200 border-t border-b border-r border-l cursor-pointer ' +
                setActiveChart('lineChart')
              }
              onClick={() => changeChart('lineChart')}
            >
              <p className="text-xxs text-center">カラム</p>
            </div>
            <div
              className={
                'leading-3 p-1 align-middle inline-block px-6 py-3 border-gray-200 border-t border-b border-r cursor-pointer ' +
                setActiveChart('barChart')
              }
              onClick={() => changeChart('barChart')}
            >
              <p className="text-xxs text-center">棒グラフ</p>
            </div>
          </div>
          {renderChart()}
        </div>
      </div>
    </div>
  )
}
export default MonthlyAccountRegistration
