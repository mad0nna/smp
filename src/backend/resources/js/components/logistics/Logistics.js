import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ProductListIcon, InventoryIcon, MainIcon } from '../../../icons'

const Logistics = () => {
  const [active, setActive] = useState('product-list')

  return (
    <div className="grid md:grid-cols-4 font-meiryo">
      <div className="md:col-span-1 md:flex md:justify-end md:h-screen">
        <nav className="w-sideBar bg-sideBar">
          <ul className="text-sm mt-10">
            <li
              className={`py-3 font-bold w-sideBarBtn mx-auto rounded-xs hover:bg-active ${
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </div>
    </div>
  )
}

export default Logistics

if (document.getElementById('logistics-dashboard')) {
  ReactDOM.render(<Logistics />, document.getElementById('logistics-dashboard'))
}
