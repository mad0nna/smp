import React from 'react'
import PrevButton from '../../img/pagination-prev.png'
import NextButton from '../../img/pagination-next.png'

const Pagination = (props) => {
  console.log('pagination', props)
  return (
    <div>
      <img
        src={PrevButton}
        className={
          (props.currentPage == 1 ? `` : `cursor-pointer`) +
          ` inline-block  w-8 h-auto mr-1`
        }
        onClick={() => {
          props.currentPage == 1 ? '' : props.handleNavigation(-1)
        }}
      />
      <div className="inline-block text-primary-200">{props.listNumbers}</div>
      <img
        src={NextButton}
        className={
          (props.currentPage == props.lastPage ? `` : `cursor-pointer`) +
          ` inline-block  w-8 h-auto ml-1`
        }
        onClick={() => {
          props.currentPage == props.lastPage ? '' : props.handleNavigation(+1)
        }}
      />
    </div>
  )
}

export default Pagination
