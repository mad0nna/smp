import React from 'react'
import ReactDOM from 'react-dom'
import Ellipsis from '../../img/ellipsis.png'
import { Pie } from 'react-chartjs-2'

class TimeInChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.data = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }
      ]
    }

    if (this.props.displayType === 'small') {
      this.state.contractedServices.pop()
    }
  }

  render() {
    let showMoveButton = ''
    if (typeof this.props.interActivePages != 'undefined') {
      showMoveButton = this.props.interActivePages.includes(location.pathname)
        ? 'group-hover:block'
        : ''
    }

    return (
      <div
        className={
          this.props.displayType === 'small'
            ? 'h-12/12'
            : 'h-full' + ' h-full w-full relative group'
        }
      >
        <div
          className={
            'absolute w-12 h-5 -top-4 px-1 pt-0.5 right-6 text-center font-sans text-gray-500 bg-white font-sans text-xxs leading-2 rounded-md border-gray-200 2xl:border-2 lg:border cursor-move hidden ' +
            showMoveButton
          }
        >
          Move
        </div>
        <div className="dashboard-widget-list w-full h-full relative  rounded-lg border-2 border-gray-200 bg-white">
          <div
            id="widget-header"
            className="max-w-full h-12 bg-white box-border align-middle p-3 relative"
          >
            <div id="widget-name" className=" font-sans">
              <div className="text-primary-200 font-bold text-center">
                Time-in Record
              </div>
              <div className="text-sm text-gray-400">
                350 time-in out of 500 active users
              </div>
            </div>
            <img
              className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block"
              src={Ellipsis}
            />
          </div>
          <div
            id="widget-body"
            className="w-full bg-white 2xl:space-y-1 overflow-hidden "
          >
            <Pie data={this.data} />
          </div>
          {this.props.displayType === 'small' ? this.addFooter() : ''}
        </div>
      </div>
    )
  }
  addFooter() {
    return (
      <div id="widget-footer" className="w-full h-10 pr-4 mt-3">
        <div id="widget-footer-control" className="float-right">
          <button className="border-primary-200 text-bold w-24 border-2 text-primary-200 rounded-3xl tracking-tighter">
            もっと見る
          </button>
        </div>
      </div>
    )
  }
}
export default TimeInChart
if (document.getElementById('time-in-chart')) {
  ReactDOM.render(<TimeInChart />, document.getElementById('time-in-chart'))
}
