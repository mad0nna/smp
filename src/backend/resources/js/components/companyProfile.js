import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import profileIcon from '../../img/customer-company-profile.png'
import contactIcon from '../../img/support-profile-icon.png'
import editIcon from '../../img/edit-icon.png'
import saveIcon from '../../img/Icon awesome-save.png'
import businessLogo from '../../img/business-logo.png'
import iconProfile from '../../img/Icon awesome-user-alt.png'
import iconEmail from '../../img/Icon material-email.png'
import iconPhone from '../../img/Icon awesome-phone-alt.png'

 
// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

class CompanyProfile extends Component {
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
    this.handleChangeProfile = this.handleChangeProfile.bind(this)
    this.handleChangeContact = this.handleChangeContact.bind(this)
  }
 
  handleChangeProfile (event) {
    console.log('handleChangeProfile')
    event.preventDefault()
    
    // const { name, value } = event.target
    // let errors = this.state.errors
   
    // this.setState({errors, [name]: value}, ()=> {
    //   console.log(errors)
    // })
    this.setState({isEditingProfile: !this.state.isEditingProfile})
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
      <div className="flex justify-center w-full h-full bg-gray-100"  style={{height: '800px'}} >
        <div className="align-top inline-block w-6/12 rounded-xl border-gray-200 border h-full bg-white my-4 ml-14 mr-5 py-5 px-6">
          <div className="component-header relative w-full">
            <img className="inline align-top" src={profileIcon}    />
            <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">顧客企業プロフィール</span>
          </div>
          <div className="mx-10 mt-11 mb-2">
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <img className="inline" src={businessLogo}    />
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
              
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/6">
                  <label className="text-sm text-gray-400">会社名</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label className={(this.state.isEditingProfile ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'} >株式会社町田</label>
                  <input className={(this.state.isEditingProfile ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} defaultValue="さんよう" type="text" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/6">
                  <label className="text-sm text-gray-400">所在地</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label className={(this.state.isEditingProfile ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'} >東京都江東区荒池1-5-2</label>
                  <input className={(this.state.isEditingProfile ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} defaultValue="東京都江東区荒池1-5-2" type="text" />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/6">
                  <label className="text-sm text-gray-400">電話番号</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label className={(this.state.isEditingProfile ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'} >03-1234-5678</label>
                  <input className={(this.state.isEditingProfile ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="textarea" defaultValue="03-1234-5678"/>
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/6">
                  <label className="text-sm text-gray-400">企業説明</label>
                </div>
                <div className="md:w-2/3 md:flex-grow">
                  <label className={(this.state.isEditingProfile ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'} >企業説明をここに入力</label>                  
                </div>
                <textarea className={(this.state.isEditingProfile ? '' : 'hidden') + ' text-sm w-full px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 mt-2 leading-8'}  rows={3} cols={3} defaultValue='企業説明をここに入力'  />
              </div>

            </div>
            <div className="flex flex-wrap gap-0 w-full justify-end mt-6 ">
              <button   onClick={this.handleChangeProfile} 
                className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1">
                <img className="inline mr-2" src={ this.state.isEditingProfile ? saveIcon : editIcon} />
                { this.state.isEditingProfile ? '変更を保存' : '編集する' }
              </button>
            </div>
          </div>          
          
        </div>

        <div className="align-top inline-block w-6/12 rounded-xl border-gray-200 border h-full bg-white my-4 ml-5 mr-14 py-5 px-6">
          <div className="component-header relative w-full">
            <img className="inline align-top" src={contactIcon}   />
            <span className="align-bottom ml-2 p-0 inline text-primary-200 font-bold text-lg">連絡サポートプロフィール</span>
          </div>
          <div className="mx-10 mt-11 mb-2">
            <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
              <label className="text-sm text-primary-200 font-bold text-lg" >管理部</label>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconProfile}/>
                  <label className="text-sm text-gray-400" >連絡サポート担当者名</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>山田太郎</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='山田太郎' />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconEmail}/>
                  <label className="text-sm text-gray-400">連絡サポート担当者メールアドレス</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>contactadmin@sample.com</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='contactadmin@sample.com'/>
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconPhone}/>
                  <label className="text-sm text-gray-400" >連絡サポート担当者電話番号</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>08012345678</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 py-2 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='08012345678' />
                </div>
              </div>
            </div>



            <div className="flex flex-wrap gap-0 w-full justify-start mt-8">
              <label className="text-sm text-primary-200 font-bold text-lg" >人事部</label>
            </div>
            <div className="flex flex-wrap gap-0 w-full justify-start">
              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconProfile}/>
                  <label className="text-sm text-gray-400" >連絡サポート担当者名</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>山田太郎</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='山田太郎' />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconEmail}/>
                  <label className="text-sm text-gray-400">連絡サポート担当者メールアドレス</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm  text-black w-full h-8 px-3 leading-8'}>contactadmin@sample.com</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue='contactadmin@sample.com' />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-0 text-gray-700 md:flex md:items-center mt-5">
                <div className="mb-1 md:mb-0 md:w-1/2">
                  <img className="inline mr-4" src={iconPhone}/>
                  <label className="text-sm text-gray-400">連絡サポート担当者電話番号</label>
                </div>
                <div className="md:w-1/2 md:flex-grow">
                  <label className={(this.state.isEditingContact ? 'hidden' : '') + ' text-sm text-black w-full h-8 px-3 leading-8'}>08012345678</label>
                  <input className={(this.state.isEditingContact ? '' : 'hidden') + ' text-sm w-full h-8 px-3 placeholder-gray-600 border rounded focus:shadow-outline bg-gray-100 leading-8'} type="text" defaultValue="08012345678" />
                </div>
              </div>
            </div>




            <div className="flex flex-wrap gap-0 w-full justify-end mt-6 ">
              <button   onClick={this.handleChangeContact} 
                className="bg-primary-200 hover:bg-green-700 text-white  rounded-lg p-2 text-sm mr-1">
                <img className="inline mr-2" src={ this.state.isEditingContact ? saveIcon : editIcon} />
                { this.state.isEditingContact ? '変更を保存' : '編集する' }
              </button>
            </div>
          </div> 
        </div>
      </div>  
    )
  }
}

export default CompanyProfile
if (document.getElementById('companyProfile')){
  ReactDOM.render(<CompanyProfile/>,document.getElementById('companyProfile'))
}