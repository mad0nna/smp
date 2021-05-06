import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import contactIcon from '../../../svg/support-icon.svg'
import iconProfile from '../../../img/Icon awesome-user-alt.png'
import iconEmail from '../../../img/Icon material-email.png'
import iconPhone from '../../../img/Icon awesome-phone-alt.png'

// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

class SalesContact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      address: null,
      contactNumber: null,
      description: null,
      isEditingProfile: false,
      isEditingContact: false,
    }
    
    this.validateForm = (errors) => {
      let valid = true
      Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
      )
      return valid
    }
    console.log('init')
    this.handleChangeContact = this.handleChangeContact.bind(this)
  }
 

  handleChangeContact (event) {
    console.log('handleChangeContact')
    event.preventDefault()
    
    // const { name, value } = event.target
    // let errors = this.state.errors
   
    // this.setState({errors, [name]: value}, ()=> {
    //   console.log(errors)
    // })
    this.setState({isEditingContact: !this.state.isEditingContact})
  }


  errorClass() { //(error)
    // return(error.length === 0 ? '' : 'has-error')
  }

  render (){
    return(
      <div className="flex justify-center bg-white align-top inline-block w-12/12 rounded-xl border-gray-200 border py-6 px-8 mt-6 mb-2 mx-8 overflow-hidden"    > 
        <div className="w-1/2">
          <div className="flex flex-wrap gap-0 w-full justify-start">
            <img className="inline align-top mr-2" src={contactIcon} style={{height: '24px'}}  />
            <label className="text-sm text-primary-200 font-bold text-lg" >管理者名</label>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-start ml-6 text-sm">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconProfile}/>
                <label className="text-sm text-gray-400" >管理者名</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>大谷翔平</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='大谷翔平' />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconEmail}/>
                <label className="text-sm text-gray-400">メールアドレス</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>contactadmin@sample.com</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='contactadmin@sample.com'/>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconPhone}/>
                <label className="text-sm text-gray-400" >電話番号</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>08012345678</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='08012345678' />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2">
          <div className="flex flex-wrap gap-0 w-full justify-start text-sm">
            <img className="inline align-top mr-2" src={contactIcon} style={{height: '24px'}}  />
            <label className="text-sm text-primary-200 font-bold text-lg" >連絡担当者名</label>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-start ml-6">
            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconProfile}/>
                <label className="text-sm text-gray-400" >管理者名</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>鈴木一郎</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='鈴木一郎' />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconEmail}/>
                <label className="text-sm text-gray-400">メールアドレス</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm  text-black w-full h-8 px-3 leading-8'}>contactadmin@sample.com</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='contactadmin@sample.com' />
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
              <div className="mb-1 md:mb-0 lg:w-1/4 md:w-1/6 overflow-hidden">
                <img className="inline mr-4" src={iconPhone}/>
                <label className="text-sm text-gray-400">電話番号</label>
              </div>
              <div className="md:w-1/2 md:flex-grow">
                <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>08012345678</label>
                <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue="08012345678" />
              </div>
            </div>
          </div>
        </div> 
     
      </div>  
    )
  }
}

export default SalesContact
if (document.getElementById('sales-contact')){
  ReactDOM.render(<SalesContact/>,document.getElementById('sales-contact'))
}