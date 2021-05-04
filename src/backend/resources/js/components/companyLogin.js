import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import logo from '../../img/kot-admin-panel.png'
// eslint-disable-next-line
let validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

//temporarily comment out, not needed for now per client feedback
// const validateForm = (errors) => {
//   let valid = true
//   Object.values(errors).forEach(
//     (val) => val.length > 0 && (valid = false)
//   )

//   return valid
// }

class CompanyLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      errors: {
        email: '',
        password: '',
      },
      formError: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange (event) {

    event.preventDefault()

    const { name, value } = event.target
    let errors = this.state.errors
    console.log('handleChange name:' + name)
    console.log('handleChange value:' + value)
    switch (name) {
    case 'email':
      errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'メールアドレスが有効ではありません'
      break
    case 'password':
      errors.password =
          value.length > 7 && value.length < 21
            ? ''
            : 'パスワードは8－20文字以内で入力してください'
      break
    default:
      break
    }

    this.setState({errors, [name]: value, formError: ''}, ()=> {
      console.log(errors)
    })
  }


  errorClass(error) {
    return(error.length === 0 ? '' : 'field-error')
  }

  handleSubmit () {
    //temporarily comment out, not needed for now per client feedback
    // event.preventDefault()
    // if(validateForm(this.state.errors) && this.state.name !== null && this.state.password !== null) {
    //   console.info('Valid Form')
    window.location.href = '/company/dashboard'
    // }else{
    //   console.error('Invalid Form')
    //   this.setState({formError: '無効な入力です'})

    //}
  }



  render (){
    // let errors = this.state.errors
    return(
      <div className="" style={{width:'728px'}}>
        <div className="h-82 bg-white p-6 shadow-sm mt-32">
          <div className="flex flex-wrap justify-around gap-4">
            <img className= "p-0 rounded-xl mt-5" src={logo} style={{height: '42px'}} />
          </div>
          <div className="flex flex-wrap justify-around text-lg text-2xl font-bold mt-5 mb-3" style={{color: '#5B5B5B'}}>
            顧客企業
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-center">
            <div className="flex flex-wrap gap-0 w-1/2 ">
              <input type="text" name="email" placeholder="メールアドレス"
                className={'w-full px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-b-none border-b-0'}/>
              <input type="password"  name="password" placeholder="パスワード"
                className={'w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none rounded-t-none'}/>
            </div>
          </div>
          <div className="flex flex-wrap gap-0 w-full justify-center mt-2 mb-6">
            <button   onClick={this.handleSubmit}
              className="bg-primary-200 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2">
              サインイン
            </button>
          </div>

          {this.state.errors.email.length > 0 &&
                    <div className='flex flex-wrap items-center justify-center  text-sm login-error '>{this.state.errors.email}<br/></div>}
          {this.state.errors.password.length > 0 &&
                <div className='flex flex-wrap items-center justify-center  login-error text-sm login-error '>{this.state.errors.password}</div>}
          {this.state.formError.length > 0 &&
                <div className='flex flex-wrap items-center justify-center  text-sm login-error login-error '>{this.state.formError}</div>}


          <div className="text-xs text-center static bottom-10 mt-6 mb-1 text-gray-600"><a href="#">パスワードを取得する方法</a></div>
        </div>
      </div>

    )
  }
}

export default CompanyLogin
if (document.getElementById('companyLogin')){
  ReactDOM.render(<CompanyLogin/>,document.getElementById('companyLogin'))
}
