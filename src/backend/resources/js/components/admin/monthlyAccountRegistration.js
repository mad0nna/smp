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
          <text id="_700_1000" data-name="700 / 1,000" transform="translate(228.714 102.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.9"><tspan x="0" y="0">700 / 1,000</tspan></text>
          <g id="Ellipse_2" data-name="Ellipse 2" transform="translate(211.714 87.114)" fill="#1ace74" stroke="#1ace74" strokeWidth="1">
            <circle cx="4.5" cy="4.5" r="4.5" stroke="none"/>
            <circle cx="4.5" cy="4.5" r="4" fill="none"/>
          </g>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_282)">
            <rect id="Rectangle_282-2" data-name="Rectangle 282" width="161" height="5" rx="2.5" transform="translate(207.71 121.11)" fill="#78db6d"/>
          </g>
          <text id="顧客企業数" transform="translate(258.714 116.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7"><tspan x="0" y="0">顧客企業数</tspan></text>
          <text id="_200_1000" data-name="200 / 1,000" transform="translate(228.714 274.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7"><tspan x="0" y="0">200 / 1,000</tspan></text>
          <circle id="Ellipse_3" data-name="Ellipse 3" cx="4.5" cy="4.5" r="4.5" transform="translate(211.714 260.114)" fill="#56dce1"/>
          <rect id="Rectangle_284" data-name="Rectangle 284" width="127" height="5" rx="2.5" transform="translate(207.714 292.114)" fill="#56dce1"/>
          <text id="販売代理店数" transform="translate(252.714 287.114)" fontSize="12" fontFamily="YuGothicUI-Regular, Yu Gothic UI" opacity="0.7"><tspan x="0" y="0">販売代理店数</tspan></text>
          <rect id="Rectangle_2157" data-name="Rectangle 2157" width="127" height="5" rx="2.5" transform="translate(207.714 121.114)" fill="#1d9e48"/>
          <rect id="Rectangle_2158" data-name="Rectangle 2158" width="161" height="5" rx="2.5" transform="translate(211.714 462.114)" fill="#9bc5d8"/>
          <text id="_300_1000" data-name="300 / 1,000" transform="translate(232.714 444.114)" fontSize="30" fontFamily="SegoeUI-Semibold, Segoe UI" fontWeight="600" opacity="0.7"><tspan x="0" y="0">300 / 1,000</tspan></text>
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
      <svg xmlns="http://www.w3.org/2000/svg" width="573.674" height="559.753" viewBox="0 0 573.674 559.753">
        <g id="Group_1607" data-name="Group 1607" transform="translate(-1.821)">
          <g id="Mobile-chart-background" transform="translate(1.821)">
            <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="573.674" height="559.753" rx="12" fill="#fff"/>
          </g>
          <g id="chart" transform="translate(30.96 118.433)">
            <g id="Grid" transform="translate(68.295 7.794)">
              <path id="Line_Copy_18" data-name="Line Copy 18" d="M.5,1l438.906.781" transform="translate(-0.5 300.389)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
              <path id="Line_Copy_19" data-name="Line Copy 19" d="M.5,1l438.906.781" transform="translate(-0.5 142.048)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
              <path id="Line_Copy_20" data-name="Line Copy 20" d="M.5,1l438.906.781" transform="translate(-0.5 221.219)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
              <path id="Line_Copy_21" data-name="Line Copy 21" d="M.5,1l438.906.781" transform="translate(-0.5 62.878)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
              <path id="Line_Copy_19-2" data-name="Line Copy 19" d="M.5,1l438.906.781" transform="translate(6.968 -1)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
            </g>
            <g id="Charts_Line_charts_03-categories" data-name="Charts/Line charts/03-categories">
              <g id="x-axis" transform="translate(58.278 330.668)">
                <text id="Jun" transform="translate(401.049)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.28" y="12">6月</tspan></text>
                <text id="May" transform="translate(321.219)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="25.468" y="12">5月</tspan></text>
                <text id="Apr" transform="translate(239.489)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="25.666" y="12">4月</tspan></text>
                <text id="Mar" transform="translate(159.659)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="24.49" y="12">3月</tspan></text>
                <text id="Feb" transform="translate(79.83)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.136" y="12">2月</tspan></text>
                <text id="Jan" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.262" y="12">1月</tspan></text>
              </g>
              <g id="y-axis">
                <text id="_0" data-name="0" transform="translate(0 298.386)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="38.33" y="12">0</tspan></text>
                <text id="_250" data-name="250" transform="translate(0 221.288)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="23.93" y="12">250</tspan></text>
                <text id="_500" data-name="500" transform="translate(0 141.597)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="23.93" y="12">500</tspan></text>
                <text id="_750" data-name="750" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="16.73" y="12">1000</tspan></text>
                <text id="_750-2" data-name="750" transform="translate(0 64.5)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="23.93" y="12">750</tspan></text>
              </g>
              <g id="Line_02" data-name="Line 02" transform="translate(80.011 184.997)">
                <path id="Path_4866" data-name="Path 4866" d="M2.578,2.168l92-60.667,84,47.333L267.245,5.5l86.666-68.667,84.667,35.333" transform="translate(-5.837 68.051)" fill="none" stroke="#59c0cb" strokeWidth="4"/>
                <g id="Dot_21" transform="translate(-5.939 59.747)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-2" data-name="Dot_21" transform="translate(85.348 3.375)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-3" data-name="Dot_21" transform="translate(165.187 46.194)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-4" data-name="Dot_21" transform="translate(250.492 62.747)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-5" data-name="Dot_21" transform="translate(337.597 -2)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-6" data-name="Dot_21" transform="translate(420.463 31.466)" fill="#fff" stroke="#59c0cb" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
              </g>
              <g id="Line_02-2" data-name="Line 02" transform="translate(77.713 88.078)">
                <path id="Path_4866-2" data-name="Path 4866" d="M2.578,2.168,95.911-36.166l82-80.667L267.245,13.834l86.666-66.667L443.245-81.5" transform="translate(-5.871 119.587)" fill="none" stroke="#3c7dc0" strokeWidth="4"/>
                <g id="Dot_21-7" data-name="Dot_21" transform="translate(-4.642 111.384)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-8" data-name="Dot_21" transform="translate(89.646 73.769)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-9" data-name="Dot_21" transform="translate(164.485 -2)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-10" data-name="Dot_21" transform="translate(250.791 122.047)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-11" data-name="Dot_21" transform="translate(336.897 61.084)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-12" data-name="Dot_21" transform="translate(422.763 31.324)" fill="#fff" stroke="#3c7dc0" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
              </g>
              <g id="Line_02-3" data-name="Line 02" transform="translate(77.713 12.062)">
                <path id="Path_4866-3" data-name="Path 4866" d="M2.578,2.168,93.911-49l85.334-104.667,88,176,86.666-85.5,89.334-48.5" transform="translate(-5.871 154.319)" fill="none" stroke="#318e36" strokeWidth="4"/>
                <g id="Dot_21-13" data-name="Dot_21" transform="translate(-6.642 145.856)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-14" data-name="Dot_21" transform="translate(84.646 97.127)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-15" data-name="Dot_21" transform="translate(165.417 -4)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-16" data-name="Dot_21" transform="translate(251.791 164.382)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-17" data-name="Dot_21" transform="translate(333.897 86.407)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
                </g>
                <g id="Dot_21-18" data-name="Dot_21" transform="translate(423.763 37.856)" fill="#fff" stroke="#318e36" strokeMiterlimit="10" strokeWidth="4">
                  <circle cx="7.98" cy="7.98" r="7.98" stroke="none"/>
                  <circle cx="7.98" cy="7.98" r="5.98" fill="none"/>
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
