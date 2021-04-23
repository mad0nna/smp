import React from 'react'
import ReactDOM from 'react-dom'
import adminLogin from '../../img/index/adminLogin.png'
import companyLogin from '../../img/index/companyLogin.png'
import salesLogin from '../../img/index/salesLogin.png'
import employeeLogin from '../../img/index/employeeLogin.png'

const links = [
  { label:'管理者', url: '/login?type=admin', photo: adminLogin },
  { label:'顧客企業', url: '/login?type=company', photo: companyLogin },
  { label:'販売代理店', url: '/login?type=sales', photo: salesLogin },
  { label:'従業員', url: '/login?type=employee', photo: employeeLogin },
]

const Landing = () =>{
  return (
    <>
      <div className="h-20 font-bold text-white text-4xl text-center align-middle bg-primary-200 pt-5">
        韋駄天サービスにログイン
      </div> 
      <div className="flex flex-wrap justify-around space-x-4 py-32 px-4 relative " >
        {
          links.map((link, index) => {
            return (
              <a href={link.url} key={index} className="shadow-2xl p-0 rounded-xl hover:shadow-4xl overflow-hidden">
                <img src={link.photo} className="p-0 rounded-t-xl overflow-hidden hover:shadow-4xl"/>
                <div className="bg-primary-200 flex flex-col items-center justify-center p-8 h-44 rounded-b-xl w-63 text-center">
                  <h3 className="font-bold text-white text-2xl">{ link.label }</h3>
                  <span className="font-bold text-white text-2xl">ログイン</span>
                </div>
              </a>
            )
          })
        }
      </div>
    </>
  )
}
export default Landing

if (document.getElementById('landing')){
  ReactDOM.render(<Landing/>,document.getElementById('landing'))
}
