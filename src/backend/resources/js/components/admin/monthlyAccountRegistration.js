import React,{useState} from 'react'
import GraphIcon from '../../../img/admin/graph-icon.png'
import Ellipsis from '../../../img/ellipsis.png'


const MonthlyAccountRegistration = (props) => {
  let showMoveButton = ''
  if (typeof props.interActivePages != 'undefined') {
    showMoveButton = (props.interActivePages.includes(location.pathname)) ? 'group-hover:block' : ''
  }
  let [state, setState] = useState(
    {
      graphType: 'pieChart'
    }
  )
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
      <svg className="w-full 2xl:pt-8 lg:pt-0" id="UI_Element_Light_Line_charts_03-categories_line_chart" data-name="UI Element/Light/Line charts/03-categories line chart" xmlns="http://www.w3.org/2000/svg" width="614.548" height="527.608" viewBox="0 0 614.548 527.608">
        <defs>
          <filter id="Rectangle_282" x="198.714" y="115.115" width="179" height="23" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feFlood floodOpacity="0.161"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
          </filter>
        </defs>
        <g id="UI_Element_Line_charts_03-categories_line_chart" data-name="UI Element/Line charts/03-categories line chart">
          <g id="Mobile-chart-background">
            <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="614.548" height="527.608" rx="1" fill="#fff"/>
          </g>
          <rect id="Rectangle_283" data-name="Rectangle 283" width="161" height="5" rx="2.5" transform="translate(207.714 292.114)" fill="#c2e5d3"/>
          <g id="Ring_Chart5" data-name="Ring Chart5" transform="translate(420.214 13.616)">
            <path id="Path_3516" data-name="Path 3516" d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z" transform="translate(77.501 77.493)" fill="#1d9e48"/>
            <path id="Path_3517" data-name="Path 3517" d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z" transform="translate(77.501 77.493)" fill="#5edf89"/>
            <text id="_70_" data-name="70%" transform="translate(77.501 89.056)" fill="#1f78b4" fontSize="34.875" fontFamily="ArialMT, Arial"><tspan x="-34.901" y="0">70%</tspan></text>
          </g>
          <g id="Ring_Chart5-2" data-name="Ring Chart5" transform="translate(24.214 182.822)">
            <path id="Path_3516-2" data-name="Path 3516" d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z" transform="translate(77.501 77.493)" fill="#56dce1"/>
            <path id="Path_3517-2" data-name="Path 3517" d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z" transform="translate(77.501 77.493)" fill="#c2e5d3"/>
            <text id="_20_" data-name="20%" transform="translate(77.501 89.056)" fill="#1f78b4" fontSize="34.875" fontFamily="ArialMT, Arial"><tspan x="-34.901" y="0">20%</tspan></text>
          </g>
          <g id="Ring_Chart5-3" data-name="Ring Chart5" transform="translate(420.214 347.612)">
            <path id="Path_3516-3" data-name="Path 3516" d="M1.006-77.493A77.5,77.5,0,0,1,76.88-9.78a77.5,77.5,0,0,1-56.5,84.554L16.371,59.281A61.5,61.5,0,0,0,61.008-7.761a61.5,61.5,0,0,0-60-53.73Z" transform="translate(77.501 77.493)" fill="#5490de"/>
            <path id="Path_3517-3" data-name="Path 3517" d="M18.429,75.277a77.5,77.5,0,0,1-78.3-26.066A77.5,77.5,0,0,1-70.285-32.653,77.5,77.5,0,0,1-1.006-77.493v16A61.5,61.5,0,0,0-55.8-25.849,61.5,61.5,0,0,0-47.554,39,61.5,61.5,0,0,0,14.422,59.785Z" transform="translate(77.501 77.493)" fill="#9bc5d8"/>
            <text id="_30_" data-name="30%" transform="translate(77.501 89.056)" fill="#1f78b4" fontSize="34.875" fontFamily="ArialMT, Arial"><tspan x="-34.901" y="0">30%</tspan></text>
          </g>
          <text id="_700_1000" data-name="700 / 1,000" transform="translate(228.714 102.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.9"><tspan x="0" y="0">700 / 1000</tspan></text>
          <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(211.714 87.114)" fill="#1ace74" stroke="#1ace74" strokeWidth="1">
            <circle cx="4.5" cy="4.5" r="4.5" stroke="none"/>
            <circle cx="4.5" cy="4.5" r="4" fill="none"/>
          </g>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_282)">
            <rect id="Rectangle_282-2" data-name="Rectangle 282" width="161" height="5" rx="2.5" transform="translate(207.71 121.11)" fill="#78db6d"/>
          </g>
          <text id="顧客企業数" transform="translate(258.714 116.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7"><tspan x="0" y="0">顧客企業数</tspan></text>
          <text id="_200_1000" data-name="200 / 1,000" transform="translate(228.714 274.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7"><tspan x="0" y="0">200 / 1000</tspan></text>
          <circle id="Ellipse_3" data-name="Ellipse 3" cx="4.5" cy="4.5" r="4.5" transform="translate(211.714 260.114)" fill="#56dce1"/>
          <rect id="Rectangle_284" data-name="Rectangle 284" width="127" height="5" rx="2.5" transform="translate(207.714 292.114)" fill="#56dce1"/>
          <text id="販売代理店数" transform="translate(252.714 287.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7"><tspan x="0" y="0">販売代理店数</tspan></text>
          <rect id="Rectangle_2157" data-name="Rectangle 2157" width="127" height="5" rx="2.5" transform="translate(207.714 121.114)" fill="#1d9e48"/>
          <rect id="Rectangle_2158" data-name="Rectangle 2158" width="161" height="5" rx="2.5" transform="translate(211.714 462.114)" fill="#9bc5d8"/>
          <text id="_300_1000" data-name="300 / 1,000" transform="translate(232.714 444.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7"><tspan x="0" y="0">300 / 1000</tspan></text>
          <circle id="Ellipse_4" data-name="Ellipse 4" cx="4.5" cy="4.5" r="4.5" transform="translate(215.714 431.114)" fill="#5490de"/>
          <rect id="Rectangle_2159" data-name="Rectangle 2159" width="127" height="5" rx="2.5" transform="translate(211.714 462.114)" fill="#5490de"/>
          <text id="販売代理店数-2" data-name="販売代理店数" transform="translate(252.714 459.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7"><tspan x="0" y="0">販売代理店数</tspan></text>
        </g>
      </svg>
    )
  }
  const renderBarChart = () => {
    return (
      <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="655.216" height="580.115" viewBox="0 0 655.216 580.115">
        <g id="account_circle-24px" transform="translate(13.568 178.665)">
          <path id="Path_2177" data-name="Path 2177" d="M0,0H121V121H0Z" fill="none"/>
        </g>
        <g id="UI_Element_Light_Column_charts_Clustered_column_2_categories" data-name="UI Element/Light/Column charts/Clustered column 2 categories">
          <g id="UI_Element_Column_charts_Clustered_column_2_categories" data-name="UI Element/Column charts/Clustered column 2 categories">
            <g id="Mobile-chart-background">
              <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="655.216" height="580.114" rx="12" fill="#fff"/>
            </g>
            <g id="Chart" transform="translate(-7.863 150.324)">
              <g id="Columns" transform="translate(121.474 14.255)">
                <g id="category-02" transform="translate(22.186 101.08)">
                  <g id="Charts_Columns_Bars_Single-column-size02" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 79.173)">
                    <rect id="Rectangle_Copy_35" data-name="Rectangle Copy 35" width="17.749" height="54.305" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-2" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533 40.173)">
                    <rect id="Rectangle_Copy_35-2" data-name="Rectangle Copy 35" width="17.749" height="93.305" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-3" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 -18.521)">
                    <rect id="Rectangle_Copy_35-3" data-name="Rectangle Copy 35" width="17.749" height="151.998" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-4" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267 -18.521)">
                    <rect id="Rectangle_Copy_35-4" data-name="Rectangle Copy 35" width="17.749" height="151.998" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-5" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 -18.521)">
                    <rect id="Rectangle_Copy_35-5" data-name="Rectangle Copy 35" width="17.749" height="151.998" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-6" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 -126.022)">
                    <rect id="Rectangle_Copy_35-6" data-name="Rectangle Copy 35" width="17.749" height="259.499" rx="4" fill="#56dce1"/>
                  </g>
                </g>
                <g id="category-01">
                  <g id="Charts_Columns_Bars_Single-column-size02-7" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 113.397)">
                    <rect id="Rectangle_Copy_35-7" data-name="Rectangle Copy 35" width="17.749" height="121.16" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-8" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533 179.907)">
                    <rect id="Rectangle_Copy_35-8" data-name="Rectangle Copy 35" width="17.749" height="54.65" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-9" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 80.346)">
                    <rect id="Rectangle_Copy_35-9" data-name="Rectangle Copy 35" width="17.749" height="154.212" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-10" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267 80.346)">
                    <rect id="Rectangle_Copy_35-10" data-name="Rectangle Copy 35" width="17.749" height="154.212" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-11" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 80.346)">
                    <rect id="Rectangle_Copy_35-11" data-name="Rectangle Copy 35" width="17.749" height="154.212" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-12" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 97.631)">
                    <rect id="Rectangle_Copy_35-12" data-name="Rectangle Copy 35" width="17.749" height="136.927" rx="4" fill="#5490de"/>
                  </g>
                </g>
                <g id="category-01-2" data-name="category-01" transform="translate(47 -84.464)">
                  <g id="Charts_Columns_Bars_Single-column-size02-13" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 -23.936)">
                    <rect id="Rectangle_Copy_35-13" data-name="Rectangle Copy 35" width="17.749" height="342.958" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-14" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533 62.84)">
                    <rect id="Rectangle_Copy_35-14" data-name="Rectangle Copy 35" width="17.749" height="256.182" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-15" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 167.018)">
                    <rect id="Rectangle_Copy_35-15" data-name="Rectangle Copy 35" width="17.749" height="152.004" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-16" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267 122)">
                    <rect id="Rectangle_Copy_35-16" data-name="Rectangle Copy 35" width="17.749" height="197.022" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-17" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 74.278)">
                    <rect id="Rectangle_Copy_35-17" data-name="Rectangle Copy 35" width="17.749" height="244.743" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-18" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 220.63)">
                    <rect id="Rectangle_Copy_35-18" data-name="Rectangle Copy 35" width="17.749" height="98.392" rx="4" fill="#1d9e48"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <g id="y-axis" transform="translate(36.347 127.078)">
          <text id="_0" data-name="0" transform="translate(0 256.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="41.574" y="12">0</tspan></text>
          <text id="_250" data-name="250" transform="translate(0 173.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">250</tspan></text>
          <text id="_500" data-name="500" transform="translate(0 87.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">500</tspan></text>
          <text id="_750" data-name="750" transform="translate(0 -64.963)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="19.974" y="12">1000</tspan></text>
          <text id="_750-2" data-name="750" transform="translate(0 4.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">750</tspan></text>
        </g>
        <rect id="Rectangle_2167" data-name="Rectangle 2167" width="45" height="45" rx="12" transform="translate(151.233 495.115)" fill="#56dce1"/>
        <rect id="Rectangle_2168" data-name="Rectangle 2168" width="45" height="45" rx="12" transform="translate(322.233 495.115)" fill="#5490de"/>
        <text id="SmartHR" transform="translate(173.233 559.115)" fill="#56dce1" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-25.497" y="0">SmartHR</tspan></text>
        <text id="Freee" transform="translate(343.233 559.115)" fill="#5490de" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-15.223" y="0">Freee</tspan></text>
        <rect id="Rectangle_2169" data-name="Rectangle 2169" width="45" height="45" rx="12" transform="translate(488.233 497.115)" fill="#1d9e48"/>
        <text id="King_of_Time_" data-name="King of Time " transform="translate(517.233 559.115)" fill="#1d9e48" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-37.749" y="0">King of Time </tspan></text>
        <text id="Jan" transform="translate(102.733 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">12</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
        <text id="Jan-2" data-name="Jan" transform="translate(199.233 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">1</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
        <text id="Jan-3" data-name="Jan" transform="translate(280.196 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">2</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
        <text id="Jan-4" data-name="Jan" transform="translate(367.233 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">3</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
        <text id="Jan-5" data-name="Jan" transform="translate(454.271 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">4</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
        <text id="Jan-6" data-name="Jan" transform="translate(545.271 411.484)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.425" y="13">5</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
      </svg>
    )
  }
  const renderLineChart = () => {
    return (
      <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="621.499" height="560.024" viewBox="0 0 621.499 560.024">
        <g id="account_circle-24px" transform="translate(0 171.081)">
          <path id="Path_2177" data-name="Path 2177" d="M0,0H121V121H0Z" fill="none"/>
        </g>
        <g id="UI_Element_Light_Line_charts_03-categories_line_chart" data-name="UI Element/Light/Line charts/03-categories line chart" transform="translate(6.951)">
          <g id="UI_Element_Line_charts_03-categories_line_chart" data-name="UI Element/Line charts/03-categories line chart" transform="translate(-1.951 -86)">
            <g id="Mobile-chart-background" transform="translate(1.951 86)">
              <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="614.548" height="560.024" rx="12" fill="#fff"/>
            </g>
            <g id="chart" transform="translate(33.166 130.988)">
              <g id="Grid" transform="translate(73.16 9.096)">
                <path id="Line_Copy_18" data-name="Line Copy 18" d="M.5,1l470.178.912" transform="translate(-0.5 350.731)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                <path id="Line_Copy_19" data-name="Line Copy 19" d="M.5,1l470.178.912" transform="translate(-0.5 165.942)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                <path id="Line_Copy_20" data-name="Line Copy 20" d="M.5,1l470.178.912" transform="translate(-0.5 258.337)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                <path id="Line_Copy_21" data-name="Line Copy 21" d="M.5,1l470.178.912" transform="translate(-0.5 73.548)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                <path id="Line_Copy_19-2" data-name="Line Copy 19" d="M.5,1l470.178.912" transform="translate(7.5 -1)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
              </g>
              <g id="Charts_Line_charts_03-categories" data-name="Charts/Line charts/03-categories" transform="translate(0 0)">
                <g id="x-axis" transform="translate(62.43 385.902)">
                  <text id="Jun" transform="translate(411.65)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.425" y="13">5</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="May" transform="translate(329.71)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">4</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Apr" transform="translate(245.819)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">3</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Mar" transform="translate(163.879)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">2</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Feb" transform="translate(81.94)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">1</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Jan" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">12</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                </g>
                <g id="y-axis">
                  <text id="_0" data-name="0" transform="translate(0 348.227)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="41.574" y="12">0</tspan></text>
                  <text id="_250" data-name="250" transform="translate(0 258.251)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">250</tspan></text>
                  <text id="_500" data-name="500" transform="translate(0 165.249)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">500</tspan></text>
                  <text id="_750" data-name="750" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="19.974" y="12">1000</tspan></text>
                  <text id="_750-2" data-name="750" transform="translate(0 75.274)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">750</tspan></text>
                </g>
                <g id="Line_02" data-name="Line 02" transform="translate(79.989 94.043)">
                  <path id="Line_2" d="M0,1.659,1.314,0,114.038,118.063l114.2,22.925,112.839,26.459.275.116L455.7,239.946l-.941,1.966-114.218-72.3L227.675,143.15,113.146,120.163Z" transform="translate(5.196 5.902)" fill="#79d2de"/>
                  <circle id="Dot_21" cx="3" cy="3" r="3" fill="#79d2de"/>
                  <circle id="Dot_22" cx="3" cy="3" r="3" transform="translate(114.575 120.311)" fill="#79d2de"/>
                  <circle id="Dot_23" cx="3" cy="3" r="3" transform="translate(229.15 145.762)" fill="#79d2de"/>
                  <circle id="Dot_24" cx="3" cy="3" r="3" transform="translate(341.75 173.526)" fill="#79d2de"/>
                  <circle id="Dot_25" cx="3" cy="3" r="3" transform="translate(460.276 247.563)" fill="#79d2de"/>
                </g>
                <g id="Line_01" data-name="Line 01" transform="translate(83.891 9.289)">
                  <path id="Line_1" d="M454.948,0l.891,2.285L341.708,79.453,228.137,296.435,113.82,93.311,1.646,325.483,0,324.1,113.7,88.779l114.38,203.238,112.3-214.553Z" transform="translate(3.079 6.563)" fill="#1d9e48"/>
                  <circle id="Dot_11" cx="3" cy="3" r="3" transform="translate(0 330.494)" fill="#1d9e48"/>
                  <circle id="Dot_12" cx="3" cy="3" r="3" transform="translate(112.606 95.182)" fill="#1d9e48"/>
                  <circle id="Dot_13" cx="3" cy="3" r="3" transform="translate(227.187 298.767)" fill="#1d9e48"/>
                  <circle id="Dot_14" cx="3" cy="3" r="3" transform="translate(341.768 81.963)" fill="#1d9e48"/>
                  <circle id="Dot_15" cx="3" cy="3" r="3" transform="translate(458.325)" fill="#1d9e48"/>
                </g>
                <g id="Line_03" data-name="Line 03" transform="translate(79.989 203.544)">
                  <path id="Line_3" d="M0,0,112.334,0l.7,0,114.7,11.12L340.276,120.009,453.928,27.147l1.284,1.373L340.165,122.525,226.831,12.869,112.937,1.824H0Z" transform="translate(5.853 4.559)" fill="#147ad6"/>
                  <circle id="Dot_31" cx="3" cy="3" r="3" fill="#147ad6"/>
                  <circle id="Dot_32" cx="3" cy="3" r="3" transform="translate(112.6)" fill="#147ad6"/>
                  <circle id="Dot_33" cx="3" cy="3" r="3" transform="translate(229.15 11.398)" fill="#147ad6"/>
                  <circle id="Dot_34" cx="3" cy="3" r="3" transform="translate(345.701 123.474)" fill="#147ad6"/>
                  <circle id="Dot_35" cx="3" cy="3" r="3" transform="translate(460.276 28.494)" fill="#147ad6"/>
                </g>
              </g>
            </g>
          </g>
        </g>
        <rect id="Rectangle_2166" data-name="Rectangle 2166" width="45" height="45" rx="12" transform="translate(137.665 487.531)" fill="#56dce1"/>
        <rect id="Rectangle_2167" data-name="Rectangle 2167" width="45" height="45" rx="12" transform="translate(308.665 487.531)" fill="#5490de"/>
        <text id="SmartHR" transform="translate(159.665 551.531)" fill="#56dce1" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-25.497" y="0">SmartHR</tspan></text>
        <text id="Freee" transform="translate(329.665 551.531)" fill="#5490de" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-15.223" y="0">Freee</tspan></text>
        <rect id="Rectangle_2168" data-name="Rectangle 2168" width="45" height="45" rx="12" transform="translate(474.665 489.531)" fill="#1d9e48"/>
        <text id="King_of_Time_" data-name="King of Time " transform="translate(503.665 551.531)" fill="#1d9e48" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-37.749" y="0">King of Time </tspan></text>
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
    let activeClasses = 'bg-greenOld text-white'
    let inactiveClasses = 'bg-gray-200 text-gray-700 '
    if (state.graphType === type) {
      return activeClasses
    }
    return inactiveClasses
  }
  return (
    <div className="w-full h-full relative group">
      <div className={'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white text-xxs leading-2 rounded-md border-gray-200 border-2 cursor-move hidden ' + showMoveButton}>Move</div>
      <div className="w-full h-full overflow-hidden relative  rounded-lg border-2 border-gray-200 bg-white">
        <img className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block" src={Ellipsis}/>
        <div id="contact-logo-container" className="h-16 flex mb-2 px-4 pb-2 pt-5 ">
          <img src={GraphIcon} alt="" className="h-8 w-8 pt-1"/>
          <p className="text-primary-200 text-lg font-bold pt-1 ml-2 ">
                    月次アカウント登録
          </p>
        </div>
        <div className="relative">
          <div className="absolute top-0 right-0 w-64 h-12 text-center">
            <div className={'w-16 h-6 leading-3 p-1 align-middle inline-block border-greenOld border-l-2 border-r-2 border-b-2 border-t-2 cursor-pointer ' + setActiveChart('pieChart')} onClick={() => changeChart('pieChart')}>
              <p className="text-xxs text-center">円グラフ</p>
            </div>
            <div className={'w-16 h-6 leading-3 p-1 align-middle inline-block border-greenOld border-r-2 border-b-2 border-t-2 cursor-pointer ' + setActiveChart('lineChart')} onClick={() => changeChart('lineChart')}>
              <p className="text-xxs text-center">カラム</p>
            </div>
            <div className={'w-16 h-6 leading-3 p-1 align-middle inline-block border-greenOld border-r-2 border-b-2 border-t-2 cursor-pointer ' + setActiveChart('barChart')} onClick={() => changeChart('barChart')}>
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
