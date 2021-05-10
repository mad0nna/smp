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
      <div id="barChart">
        <svg className="w-full" xmlns="http://www.w3.org/2000/svg" width="655.216" height="546" viewBox="0 0 655.216 546">
          <g id="UI_Element_Light_Column_charts_Clustered_column_2_categories" data-name="UI Element/Light/Column charts/Clustered column 2 categories">
            <g id="UI_Element_Column_charts_Clustered_column_2_categories" data-name="UI Element/Column charts/Clustered column 2 categories">
              <g id="Mobile-chart-background">
                <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="655.216" height="469.114" rx="12" fill="#fff"/>
              </g>
              <g id="Chart" transform="translate(-7.863 150.324)">
                <g id="x-axis" transform="translate(121.474 258.546)">
                  <text id="Jun" transform="translate(439.276)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="21.694" y="12">Jun</tspan></text>
                  <text id="May" transform="translate(350.533)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="19.528" y="12">May</tspan></text>
                  <text id="Apr" transform="translate(261.79)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="20.47" y="12">Apr</tspan></text>
                  <text id="Mar" transform="translate(177.485)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="16.998" y="12">Mar</tspan></text>
                  <text id="Feb" transform="translate(90.961)" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="20.812" y="12">Feb</tspan></text>
                  <text id="Jan" fontSize="12" fontFamily="NunitoSans-ExtraBold, Nunito Sans" fontWeight="800"><tspan x="21.952" y="12">Jan</tspan></text>
                </g>
                <g id="Columns" transform="translate(121.474 14.255)">
                  <g id="category-02" transform="translate(22.186 101.08)">
                    <g id="Charts_Columns_Bars_Single-column-size02" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 40.173)">
                      <rect id="Rectangle_Copy_35" data-name="Rectangle Copy 35" width="17.749" height="93.305" rx="4" fill="#56dce1"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-2" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533)">
                      <rect id="Rectangle_Copy_35-2" data-name="Rectangle Copy 35" width="17.749" height="133.477" rx="4" fill="#56dce1"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-3" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 69.978)">
                      <rect id="Rectangle_Copy_35-3" data-name="Rectangle Copy 35" width="17.749" height="63.499" rx="4" fill="#56dce1"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-4" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267 54.428)">
                      <rect id="Rectangle_Copy_35-4" data-name="Rectangle Copy 35" width="17.749" height="79.05" rx="4" fill="#56dce1"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-5" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 6.479)">
                      <rect id="Rectangle_Copy_35-5" data-name="Rectangle Copy 35" width="17.749" height="126.998" rx="4" fill="#56dce1"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-6" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 69.978)">
                      <rect id="Rectangle_Copy_35-6" data-name="Rectangle Copy 35" width="17.749" height="63.499" rx="4" fill="#56dce1"/>
                    </g>
                  </g>
                  <g id="category-01">
                    <g id="Charts_Columns_Bars_Single-column-size02-7" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 32.397)">
                      <rect id="Rectangle_Copy_35-7" data-name="Rectangle Copy 35" width="17.749" height="202.16" rx="4" fill="#5490de"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-8" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533 60.907)">
                      <rect id="Rectangle_Copy_35-8" data-name="Rectangle Copy 35" width="17.749" height="173.65" rx="4" fill="#5490de"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-9" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 130.886)">
                      <rect id="Rectangle_Copy_35-9" data-name="Rectangle Copy 35" width="17.749" height="103.672" rx="4" fill="#5490de"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-10" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267)">
                      <rect id="Rectangle_Copy_35-10" data-name="Rectangle Copy 35" width="17.749" height="234.557" rx="4" fill="#5490de"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-11" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 80.346)">
                      <rect id="Rectangle_Copy_35-11" data-name="Rectangle Copy 35" width="17.749" height="154.212" rx="4" fill="#5490de"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-12" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 116.631)">
                      <rect id="Rectangle_Copy_35-12" data-name="Rectangle Copy 35" width="17.749" height="117.927" rx="4" fill="#5490de"/>
                    </g>
                  </g>
                  <g id="category-01-2" data-name="category-01" transform="translate(47 -84.464)">
                    <g id="Charts_Columns_Bars_Single-column-size02-13" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(439.276 44.064)">
                      <rect id="Rectangle_Copy_35-13" data-name="Rectangle Copy 35" width="17.749" height="274.958" rx="4" fill="#1d9e48"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-14" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(350.533 82.84)">
                      <rect id="Rectangle_Copy_35-14" data-name="Rectangle Copy 35" width="17.749" height="236.182" rx="4" fill="#1d9e48"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-15" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(261.79 178.018)">
                      <rect id="Rectangle_Copy_35-15" data-name="Rectangle Copy 35" width="17.749" height="141.004" rx="4" fill="#1d9e48"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-16" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(175.267)">
                      <rect id="Rectangle_Copy_35-16" data-name="Rectangle Copy 35" width="17.749" height="319.022" rx="4" fill="#1d9e48"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-17" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(90.961 109.278)">
                      <rect id="Rectangle_Copy_35-17" data-name="Rectangle Copy 35" width="17.749" height="209.743" rx="4" fill="#1d9e48"/>
                    </g>
                    <g id="Charts_Columns_Bars_Single-column-size02-18" data-name="Charts/Columns&amp;Bars/Single-column-size02" transform="translate(0 158.63)">
                      <rect id="Rectangle_Copy_35-18" data-name="Rectangle Copy 35" width="17.749" height="160.392" rx="4" fill="#1d9e48"/>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect id="Rectangle_2161" data-name="Rectangle 2161" width="45" height="45" rx="12" transform="translate(156 479)" fill="#56dce1"/>
          <rect id="Rectangle_2162" data-name="Rectangle 2162" width="45" height="45" rx="12" transform="translate(327 479)" fill="#5490de"/>
          <text id="SmartHR" transform="translate(178 543)" fill="#56dce1" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-25.497" y="0">SmartHR</tspan></text>
          <text id="Freee" transform="translate(348 543)" fill="#5490de" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-15.223" y="0">Freee</tspan></text>
          <rect id="Rectangle_2163" data-name="Rectangle 2163" width="45" height="45" rx="12" transform="translate(493 481)" fill="#1d9e48"/>
          <text id="King_of_Time_" data-name="King of Time " transform="translate(522 543)" fill="#1d9e48" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-37.749" y="0">King of Time </tspan></text>
          <g id="y-axis" transform="translate(15.108 149.355)">
            <text id="_0" data-name="0" transform="translate(0 256.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="41.574" y="12">0</tspan></text>
            <text id="_250" data-name="250" transform="translate(0 173.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">250</tspan></text>
            <text id="_500" data-name="500" transform="translate(0 87.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">500</tspan></text>
            <text id="_750" data-name="750" transform="translate(0 -64.963)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="19.974" y="12">1000</tspan></text>
            <text id="_750-2" data-name="750" transform="translate(0 4.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">750</tspan></text>
          </g>
        </svg>

      </div>
    )
  }
  const renderLineChart = () => {
    return (
      <div id="lineChart">
        <svg  className="w-full" id="Component_7_1" data-name="Component 7 – 1" xmlns="http://www.w3.org/2000/svg" width="614.548" height="505.608" viewBox="0 0 614.548 505.608">
          <g id="UI_Element_Light_Line_charts_03-categories_line_chart" data-name="UI Element/Light/Line charts/03-categories line chart">
            <g id="UI_Element_Line_charts_03-categories_line_chart" data-name="UI Element/Line charts/03-categories line chart" transform="translate(-1.951 -97)">
              <g id="Mobile-chart-background" transform="translate(1.951 97)">
                <rect id="Rectangle_Copy_16" data-name="Rectangle Copy 16" width="614.548" height="505.608" rx="12" fill="#fff"/>
              </g>
              <g id="chart" transform="translate(33.166 192.463)">
                <g id="Grid" transform="translate(73.16 12.196)">
                  <path id="Line_Copy_18" data-name="Line Copy 18" d="M.5,1l470.178.841" transform="translate(-0.5 254.695)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                  <path id="Line_Copy_19" data-name="Line Copy 19" d="M.5,1l470.178.841" transform="translate(-0.5 84.232)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                  <path id="Line_Copy_20" data-name="Line Copy 20" d="M.5,1l470.178.841" transform="translate(-0.5 169.463)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                  <path id="Line_Copy_21" data-name="Line Copy 21" d="M.5,1l470.178.841" transform="translate(-0.5 -1)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                  <path id="Line_Copy_19-2" data-name="Line Copy 19" d="M.5,1l470.178.841" transform="translate(7.5 -69.768)" fill="none" stroke="#d6d9dc" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="1" opacity="0.4"/>
                </g>
                <g id="Charts_Line_charts_03-categories" data-name="Charts/Line charts/03-categories" transform="translate(0 -64.963)">
                  <g id="x-axis" transform="translate(62.43 355.984)">
                    <text id="Jun" transform="translate(411.65)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="28.285" y="12">JUN</tspan></text>
                    <text id="May" transform="translate(329.71)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="26.473" y="12">MAY</tspan></text>
                    <text id="Apr" transform="translate(245.819)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="26.671" y="12">APR</tspan></text>
                    <text id="Mar" transform="translate(163.879)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="25.495" y="12">MAR</tspan></text>
                    <text id="Feb" transform="translate(81.94)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="28.141" y="12">FEB</tspan></text>
                    <text id="Jan" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="28.267" y="12">JAN</tspan></text>
                  </g>
                  <g id="y-axis" transform="translate(0 64.963)">
                    <text id="_0" data-name="0" transform="translate(0 256.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="41.574" y="12">0</tspan></text>
                    <text id="_250" data-name="250" transform="translate(0 173.267)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">250</tspan></text>
                    <text id="_500" data-name="500" transform="translate(0 87.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">500</tspan></text>
                    <text id="_750" data-name="750" transform="translate(0 -64.963)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="19.974" y="12">1000</tspan></text>
                    <text id="_750-2" data-name="750" transform="translate(0 4.475)" fill="#7c828a" fontSize="12" fontFamily="NunitoSans-Regular, Nunito Sans"><tspan x="27.174" y="12">750</tspan></text>
                  </g>
                  <g id="Line_02" data-name="Line 02" transform="translate(79.989 86.752)">
                    <path id="Line_2" d="M0,1.53,1.314,0,114.038,108.91l114.2,21.148,112.839,24.407.275.107L455.7,221.345l-.941,1.813-114.218-66.7L227.675,132.052l-114.528-21.2Z" transform="translate(5.196 5.445)" fill="#79d2de"/>
                    <circle id="Dot_21" cx="3" cy="3" r="3" fill="#79d2de"/>
                    <circle id="Dot_22" cx="3" cy="3" r="3" transform="translate(114.575 110.758)" fill="#79d2de"/>
                    <circle id="Dot_23" cx="3" cy="3" r="3" transform="translate(229.15 134.188)" fill="#79d2de"/>
                    <circle id="Dot_24" cx="3" cy="3" r="3" transform="translate(341.75 159.747)" fill="#79d2de"/>
                    <circle id="Dot_25" cx="3" cy="3" r="3" transform="translate(460.276 227.906)" fill="#79d2de"/>
                  </g>
                  <g id="Line_01" data-name="Line 01" transform="translate(83.891 8.569)">
                    <path id="Line_1" d="M454.948,0l.891,2.108L341.708,73.294,228.137,273.454,113.82,86.077,1.646,300.25,0,298.978,113.7,81.9l114.38,187.482,112.3-197.92Z" transform="translate(3.079 6.055)" fill="#1d9e48"/>
                    <circle id="Dot_11" cx="3" cy="3" r="3" transform="translate(0 304.407)" fill="#1d9e48"/>
                    <circle id="Dot_12" cx="3" cy="3" r="3" transform="translate(112.606 87.669)" fill="#1d9e48"/>
                    <circle id="Dot_13" cx="3" cy="3" r="3" transform="translate(227.187 275.184)" fill="#1d9e48"/>
                    <circle id="Dot_14" cx="3" cy="3" r="3" transform="translate(341.768 75.493)" fill="#1d9e48"/>
                    <circle id="Dot_15" cx="3" cy="3" r="3" transform="translate(458.325)" fill="#1d9e48"/>
                  </g>
                  <g id="Line_03" data-name="Line 03" transform="translate(79.989 187.764)">
                    <path id="Line_3" d="M0,0,112.334,0l.7,0,114.7,10.258L340.276,110.706,453.928,25.042l1.284,1.267L340.165,113.026,226.831,11.871,112.937,1.682H0Z" transform="translate(5.853 4.206)" fill="#147ad6"/>
                    <circle id="Dot_31" cx="3" cy="3" r="3" fill="#147ad6"/>
                    <circle id="Dot_32" cx="3" cy="3" r="3" transform="translate(112.6)" fill="#147ad6"/>
                    <circle id="Dot_33" cx="3" cy="3" r="3" transform="translate(229.15 10.471)" fill="#147ad6"/>
                    <circle id="Dot_34" cx="3" cy="3" r="3" transform="translate(345.701 113.436)" fill="#147ad6"/>
                    <circle id="Dot_35" cx="3" cy="3" r="3" transform="translate(460.276 26.178)" fill="#147ad6"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
          <rect id="Rectangle_2160" data-name="Rectangle 2160" width="45" height="45" rx="12" transform="translate(130.274 421.115)" fill="#56dce1"/>
          <rect id="Rectangle_2161" data-name="Rectangle 2161" width="45" height="45" rx="12" transform="translate(301.274 421.115)" fill="#5490de"/>
          <text id="SmartHR" transform="translate(152.274 485.115)" fill="#56dce1" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-25.497" y="0">SmartHR</tspan></text>
          <text id="Freee" transform="translate(322.274 485.115)" fill="#5490de" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-15.223" y="0">Freee</tspan></text>
          <rect id="Rectangle_2162" data-name="Rectangle 2162" width="45" height="45" rx="12" transform="translate(467.274 423.115)" fill="#1d9e48"/>
          <text id="King_of_Time_" data-name="King of Time " transform="translate(496.274 485.115)" fill="#1d9e48" fontSize="12" fontFamily="SegoeUI-Bold, Segoe UI" fontWeight="700"><tspan x="-37.749" y="0">King of Time </tspan></text>
        </svg>
      </div>
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
