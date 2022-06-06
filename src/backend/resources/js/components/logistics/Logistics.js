import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { OrderList, ProductList, EmailTemplate } from './menu'
import { ProductListIcon, InventoryIcon, MainIcon } from '../../../icons'

const Logistics = () => {
  const [active, setActive] = useState('product-list')

  return (
    <div className="grid md:grid-cols-4 font-meiryo">
      <div className="bg-sideBar flex xs:col-span-4 sm:col-span-4 md:col-span-1 xs:justify-center sm:justify-center md:justify-end xs:h-fit sm:h-fit md:h-screen md:bg-transparent">
        <nav className="w-sideBar bg-sideBar">
          <ul className="xs:mt-0 md:mt-28">
            <li
              className={`py-3 font-bold w-sideBarBtn mx-auto mt-3 rounded-xs hover:bg-active ${
                active === 'product-list' ? 'bg-active' : ''
              }`}
              onClick={() => setActive('product-list')}
            >
              <a href="#" className="block flex">
                <img
                  alt="Product List Icon"
                  className="ml-8 mr-4"
                  src={ProductListIcon}
                />
                <span className="text-primary-500">商品一覧</span>
              </a>
            </li>
            <li
              className={`py-3 font-bold w-sideBarBtn mx-auto rounded-xs hover:bg-active ${
                active === 'order-list' ? 'bg-active' : ''
              }`}
              onClick={() => setActive('order-list')}
            >
              <a href="#" className="block flex">
                <img
                  alt="Product List Icon"
                  className="ml-8 mr-4"
                  src={InventoryIcon}
                />
                <span className="text-primary-500">注文</span>
              </a>
            </li>
            <li
              className={`py-3 font-bold w-sideBarBtn mx-auto rounded-xs hover:bg-active ${
                active === 'email-template' ? 'bg-active' : ''
              }`}
              onClick={() => setActive('email-template')}
            >
              <a href="#" className="block flex">
                <img
                  alt="Product List Icon"
                  className="ml-8 mr-4"
                  src={MainIcon}
                />
                <span className="text-primary-500">メールテンプレート</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sm:col-span-4 md:col-span-3 md:flex">
        {(() => {
          switch (active) {
            case 'order-list':
              return <OrderList />
            case 'email-template':
              return <EmailTemplate />
            default:
              return <ProductList />
          }
        })()}
      </div>
    </div>
  )
}

export default Logistics

if (document.getElementById('logistics-dashboard')) {
  ReactDOM.render(<Logistics />, document.getElementById('logistics-dashboard'))
}
