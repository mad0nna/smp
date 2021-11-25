import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
// temporary
import printerImg1 from '../../img/company/products/printer1.png'

const CompanyProductDetail = () => {
  useEffect(() => {}, [])

  const productDetailItem = () => {
    let items = [
      {
        price: '¥ 10,077',
        stock: 2,
        orderNum: 1
      },
      {
        price: '¥ 10,077',
        stock: 2,
        orderNum: 1
      }
    ]
    return items.map((item) => {
      return (
        <tr>
          <td className="text-center font-bold text-red-500">
            {item.price}
            <br />
            <span className="text-gray-400  font-bold">
              ( {item.price} * {item.orderNum} )
            </span>
          </td>
          <td className="text-center font-bold text-red-500">{item.stock}</td>
          <td className="text-center font-bold text-red-500">
            {item.orderNum}
          </td>
        </tr>
      )
    })
  }

  return (
    <div className="bg-mainbg grid md:grid-cols-1 gap-6 mx-10 mt-5 font-meiryo">
      <div className=" pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-6">
            <div className="pb-2 border-b border-green-800 border-opacity-80 flex space-x-4 items-center">
              <div className="bg-cart-icon h-10 w-8"></div>
              <h2 className="text-green-800 text-lg font-bold">
                Product Sales
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              <div className="grid col-span-2 gap-3">
                <div className="grid grid-cols-2">
                  <div className="grid col-span-1 text-center flex content-center">
                    <img className="h-auto w-full" src={printerImg1}></img>
                  </div>
                  <div className="grid col-span-1 text-center flex content-center">
                    <div className="font-bold text-red-500 text-right pr-10">
                      <div className="font-bold text-red-500 text-4xl w-auto px-10 w-full text-right">
                        Biometric Scanner
                      </div>
                      <div className="font-bold text-red-500 text-4xl w-auto px-10 w-full text-right">
                        ¥ 10,077
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 mb-5 flex content-end">
                  <table className="table-fixed w-full min-w-full shadow-xl rounded-xl">
                    <thead className="bg-gray-50 border-b border-t border-gray-200">
                      <tr className="text-gray-500 text-shadow-none">
                        <th className="p-4 font-semibold">
                          Selling Price
                          <br />
                          (unit price x quantity)
                        </th>
                        <th className="p-4 font-semibold">stock</th>
                        <th className="p-4 font-semibold">number of orders</th>
                      </tr>
                    </thead>
                    <tbody>{productDetailItem()}</tbody>
                  </table>
                </div>
              </div>
              <div className="grid lg:grid-cols-1 col-span-1 grid-rows-2 gap-6">
                <div className="tracking-tighter text-gray-400 text-lg">
                  MAAR AALorem ipsum dolor sit amet. Ad ducimus quia rem natus
                  fuga qui minus sunt aut recusandae tenetur est voluptatem
                  dolores sit quos eius! Id velit alias eos quia vero aut
                  aspernatur necessitatibus et officia molestias Lorem ipsum
                  dolor sit amet. Ad ducimus quia rem natus fuga qui minus sunt
                  aut recusandae tenetur est voluptatem dolores sit quos eius!
                  Id velit alias eos quia vero aut aspernatur necessitatibus et
                  officia molestias MAAR AALorem ipsum dolor sit amet. Ad
                  ducimus quia rem natus fuga qui minus sunt aut recusandae
                  tenetur est voluptatem dolores sit quos eius! Id velit alias
                  eos quia vero aut aspernatur necessitatibus et officia
                  molestias Lorem ipsum dolor sit amet. Ad ducimus quia rem
                  natus fuga qui minus sunt aut recusandae tenetur est
                  voluptatem dolores sit quos eius! Id velit alias eos quia vero
                  aut aspernatur necessitatibus et officia molestias
                </div>
                <div className="flex flex-wrap content-end space-x-5 row-span-5 text-center">
                  <div className="space-x-5 w-full flex flex-row">
                    <button className="bg-gray-400 h-14 shadow-xl w-3/5 rounded-3xl text-black font-semibold">
                      キャンセル
                    </button>
                    <button className="bg-primary-200 text-white h-14 shadow-xl w-3/5 rounded-3xl font-semibold">
                      カートに追加
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyProductDetail

if (document.getElementById('companyProductDetail')) {
  ReactDOM.render(
    <CompanyProductDetail />,
    document.getElementById('companyProductDetail')
  )
}
