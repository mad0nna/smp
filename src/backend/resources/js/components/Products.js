import React from 'react'
import printer1 from './../../img/company/products/printer1.png'
import printer2 from './../../img/company/products/printer2.png'
import scanner1 from './../../img/company/products/scanner1.png'
import scanner2 from './../../img/company/products/scanner2.png'
import Ellipsis from './../../img/ellipsis.png'

const Products = () => {
  const products = [
    {
      label: 'HP プリンター',
      price: '¥ 10,077',
      font: '3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-lg md: text-md sm:text-md',
      url: '#',
      photo: printer1
    },
    {
      label: '指紋スキャナー',
      price: '¥ 14,054',
      font: '3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md: text-lg sm:text-md',
      url: '#',
      photo: scanner1
    },
    {
      label: '指紋スキャナー',
      price: '¥ 2,902',
      font: '3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-xl md: text-lg sm:text-md',
      url: '#',
      photo: scanner2
    },
    {
      label: 'HP プリンター',
      price: '¥ 19,610',
      font: '3xl:text-2xl 2xl:text-2xl xl:text-xl lg:text-lg md: text-md sm:text-md',
      url: '#',
      photo: printer2
    }
  ]

  return (
    <div className="dashboard-widget-list w-full h-full relative group font-meiryo overflow-hidden">
      <div className="relative gap-1 w-full h-full bg-white rounded-lg shadow-xl group">
        <div id="widget-header" className="relative box-border p-3">
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">物販</h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>

        <div className=" w-full px-4">
          <div className="grid grid-cols-2 gap-1">
            {products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="col-span-2 xl:col-span-1 h-32 bg-top bg-no-repeat flex flex-col items-center justify-center"
                  style={{ backgroundImage: `url("${product.photo}")` }}
                >
                  <h3 className={'text-xxs mt-24'}>{product.label}</h3>
                  <h3 className={'text-xxs'}>{product.price}</h3>
                  <p className="font-bold text-xxs text-primary-200">
                    こちらをクリックしてご確認ください
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
