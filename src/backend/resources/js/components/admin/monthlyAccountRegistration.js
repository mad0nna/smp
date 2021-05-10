import React,{useState} from 'react'
import GraphIcon from '../../../img/admin/graph-icon.png'
import Ellipsis from '../../../img/ellipsis.png'
import CustomerRegisteredGraph from '../../../img/admin/customer-registered-graph.png'
import SalesRegisteredGraph from '../../../img/admin/sales-registered-graph.png'
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
      <div id="pieChart">
        <div className="pt-10 px-4">
          <div id="graphItem" className="w-full my-8 relative flex text-center">
            <div className="w-1/2 my-auto">
              <div className="w-3 h-3 rounded-lg bg-primary-200 inline-block mb-1 mr-4"/>
              <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800">
                              500 / 1000
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1">顧客企業数</p>
              <div className="w-full rounded-lg bg-primary-100 h-1"/>
            </div>
            <div className="my-auto w-1/2">
              <img src={CustomerRegisteredGraph} className="w-auto mx-auto"/>
            </div>
          </div>
          <div id="graphItem" className="w-full relative flex text-center">
            <div className="my-auto w-1/2">
              <img src={SalesRegisteredGraph} className=" w-auto mx-auto"/>
            </div>
            <div className="w-1/2 my-auto">
              <div className="w-3 h-3 rounded-lg bg-cyan inline-block mb-1 mr-4"/>
              <div className="inline-block 2xl:text-4xl xl:text-2xl lg:text-2xl font-black text-gray-800">
                              200 / 1000
              </div>
              <p className="text-sm text-gray-600 font-bold mb-1 h-4"/>
              <div className="w-full rounded-lg bg-cyan h-1"/>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const renderBarChart = () => {
    return (
      <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="621.499" height="546" viewBox="0 0 621.499 546">
        <g id="UI_Element_Light_Column_charts_Clustered_column_2_categories" data-name="UI Element/Light/Column charts/Clustered column 2 categories">
          <g id="UI_Element_Column_charts_Clustered_column_2_categories" data-name="UI Element/Column charts/Clustered column 2 categories">
            <g id="Mobile-chart-background">
              <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="621.499" height="469.114" rx="12" fill="#fff"/>
            </g>
            <g id="Chart" transform="translate(107.764 80.114)">
              <g id="x-axis" transform="translate(0 328.756)">
                <text id="Jun" transform="translate(416.671)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.862" y="13">6</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
                <text id="May" transform="translate(332.495)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.862" y="13">5</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
                <text id="Apr" transform="translate(248.319)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.862" y="13">4</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
                <text id="Mar" transform="translate(170.456)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="16.705" y="13">3</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
                <text id="Feb" transform="translate(86.28)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.856" y="13">2</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
                <text id="Jan" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.862" y="13">1</tspan><tspan y="13" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">月</tspan></text>
              </g>
              <g id="Columns">
                <g id="category-02" transform="translate(21.044 185.544)">
                  <g id="Charts_Columns_Bars_Single-column-size02" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(416.671 40.173)">
                    <rect id="Rectangle_Copy_35" data-name="Rectangle Copy 35" width="16.835" height="93.305" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-2" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(332.495)">
                    <rect id="Rectangle_Copy_35-2" data-name="Rectangle Copy 35" width="16.835" height="133.477" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-3" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(248.319 69.978)">
                    <rect id="Rectangle_Copy_35-3" data-name="Rectangle Copy 35" width="16.835" height="63.499" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-4" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(166.247 54.428)">
                    <rect id="Rectangle_Copy_35-4" data-name="Rectangle Copy 35" width="16.835" height="79.05" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-5" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(86.28 6.479)">
                    <rect id="Rectangle_Copy_35-5" data-name="Rectangle Copy 35" width="16.835" height="126.998" rx="4" fill="#56dce1"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-6" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 69.978)">
                    <rect id="Rectangle_Copy_35-6" data-name="Rectangle Copy 35" width="16.835" height="63.499" rx="4" fill="#56dce1"/>
                  </g>
                </g>
                <g id="category-01" transform="translate(0 84.464)">
                  <g id="Charts_Columns_Bars_Single-column-size02-7" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(416.671 32.397)">
                    <rect id="Rectangle_Copy_35-7" data-name="Rectangle Copy 35" width="16.835" height="202.16" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-8" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(332.495 60.907)">
                    <rect id="Rectangle_Copy_35-8" data-name="Rectangle Copy 35" width="16.835" height="173.65" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-9" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(248.319 130.886)">
                    <rect id="Rectangle_Copy_35-9" data-name="Rectangle Copy 35" width="16.835" height="103.672" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-10" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(166.247)">
                    <rect id="Rectangle_Copy_35-10" data-name="Rectangle Copy 35" width="16.835" height="234.557" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-11" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(86.28 80.346)">
                    <rect id="Rectangle_Copy_35-11" data-name="Rectangle Copy 35" width="16.835" height="154.212" rx="4" fill="#5490de"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-12" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 116.631)">
                    <rect id="Rectangle_Copy_35-12" data-name="Rectangle Copy 35" width="16.835" height="117.927" rx="4" fill="#5490de"/>
                  </g>
                </g>
                <g id="category-01-2" data-name="category-01" transform="translate(44.581)">
                  <g id="Charts_Columns_Bars_Single-column-size02-13" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(416.671 44.064)">
                    <rect id="Rectangle_Copy_35-13" data-name="Rectangle Copy 35" width="16.835" height="274.958" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-14" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(332.495 82.84)">
                    <rect id="Rectangle_Copy_35-14" data-name="Rectangle Copy 35" width="16.835" height="236.182" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-15" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(248.319 178.018)">
                    <rect id="Rectangle_Copy_35-15" data-name="Rectangle Copy 35" width="16.835" height="141.004" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-16" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(166.247)">
                    <rect id="Rectangle_Copy_35-16" data-name="Rectangle Copy 35" width="16.835" height="319.022" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-17" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(86.28 109.278)">
                    <rect id="Rectangle_Copy_35-17" data-name="Rectangle Copy 35" width="16.835" height="209.743" rx="4" fill="#1d9e48"/>
                  </g>
                  <g id="Charts_Columns_Bars_Single-column-size02-18" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 158.63)">
                    <rect id="Rectangle_Copy_35-18" data-name="Rectangle Copy 35" width="16.835" height="160.392" rx="4" fill="#1d9e48"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
        <rect id="Rectangle_2161" data-name="Rectangle 2161" width="45" height="45" rx="12" transform="translate(147.38 479)" fill="#56dce1"/>
        <rect id="Rectangle_2162" data-name="Rectangle 2162" width="45" height="45" rx="12" transform="translate(308.932 479)" fill="#5490de"/>
        <text id="SmartHR" transform="translate(169.462 543)" fill="#56dce1" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-25.497" y="0">SmartHR</tspan></text>
        <text id="Freee" transform="translate(330.042 543)" fill="#5490de" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-15.223" y="0">Freee</tspan></text>
        <rect id="Rectangle_2163" data-name="Rectangle 2163" width="45" height="45" rx="12" transform="translate(465.76 481)" fill="#1d9e48"/>
        <text id="King_of_Time_" data-name="King of Time " transform="translate(493.826 543)" fill="#1d9e48" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-37.749" y="0">King of Time </tspan></text>
        <g id="y-axis" transform="translate(14.331 91.255)">
          <text id="_0" data-name="0" transform="translate(0 321.23)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="39.064" y="12">0</tspan></text>
          <text id="_250" data-name="250" transform="translate(0 238.23)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="24.664" y="12">250</tspan></text>
          <text id="_500" data-name="500" transform="translate(0 152.438)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="24.664" y="12">500</tspan></text>
          <text id="_750" data-name="750" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="17.464" y="12">1000</tspan></text>
          <text id="_750-2" data-name="750" transform="translate(0 69.438)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="24.664" y="12">750</tspan></text>
        </g>
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
                  <text id="Jun" transform="translate(411.65)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.425" y="13">6</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="May" transform="translate(329.71)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">5</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Apr" transform="translate(245.819)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">4</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Mar" transform="translate(163.879)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">3</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Feb" transform="translate(81.94)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">2</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
                  <text id="Jan" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="29.419" y="13">1</tspan><tspan y="13" fontFamily="YuGothicUI-Regular, Yu Gothic UI">月</tspan></text>
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
