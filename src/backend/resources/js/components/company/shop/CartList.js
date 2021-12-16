import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Pagination from '../../Pagination'
import { useCart } from 'react-use-cart'
import { useHistory } from 'react-router'
import _ from 'lodash'

const CartList = (props) => {
  const [cart, setCart] = useState({
    items: [],
    id: '',
    cartTotal: 0,
    totalItems: [],
    isEmpty: false,
    totalUniqueItems: 0,
    metadata: []
  })

  const history = useHistory()
  const { isEmpty, cartTotal, items, updateItemQuantity, removeItem } =
    useCart()

  const [calculatedItem, setCalculatedItem] = useState({
    totalTax: 0,
    totalAmount: 0
  })

  const handleIncOrder = (item) => {
    let updateQuantity = item.quantity + 1
    updateItemQuantity(item.id, updateQuantity)
  }

  const handleDecOrder = (item) => {
    let updateQuantity = item.quantity - 1
    updateItemQuantity(item.id, updateQuantity)
  }

  const handleOrderChange = (n) => {}

  const handleDeleteItem = (id) => {
    removeItem(id)
  }

  const cartItems = () => {
    let addToCartItem = _.isEmpty(items) ? cart.items : items

    return addToCartItem.map((item) => {
      return (
        <tr key={item.id}>
          <td className="text-center">
            <div className="flex flex-col p-2">
              <img
                className="w-auto h-auto p-5 tex-center m-auto"
                src={`/aimeos/${item.imgSrc}`}
              ></img>
              <div className="text-red-500 font-bold">{item.title}</div>
            </div>
          </td>
          <td className="text-center font-bold text-red-500">
            {item.price.toLocaleString('jp')}
          </td>
          <td className="text-center font-bold text-red-500">
            <div className="flex m-auto justify-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-plus-circle text-gray-500 mt-1 font-semibold cursor-pointer`}
                viewBox="0 0 16 16"
                onClick={() => handleIncOrder(item)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <input
                type="number"
                className="w-14 shadow-lg rounded tex-red-500 border px-1"
                min="1"
                value={item.quantity}
                onChange={() => handleOrderChange}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-dash-circle text-gray-500 mt-1 font-semibold cursor-pointer cursor-pointer`}
                viewBox="0 0 16 16"
                onClick={() => handleDecOrder(item)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
            </div>
          </td>
          <td className="text-center font-bold text-red-500">
            {item.itemTotal.toLocaleString('jp')}
          </td>
          <td className="text-center font-bold">
            <div
              className="text-green-500 cursor-pointer underline"
              onClick={() => {
                handleDeleteItem(item.id)
              }}
            >
              削除する
            </div>
          </td>
        </tr>
      )
    })
  }

  useEffect(() => {
    if (_.isEmpty(items)) {
      var userData = JSON.parse(document.getElementById('userData').textContent)
      let lStorage = JSON.parse(
        localStorage.getItem(`react-use-cart-${userData.userId}`)
      )

      setCart({
        ...cart,
        id: lStorage.id,
        items: lStorage.items,
        isEmpty: lStorage.isEmpty,
        totalUniqueItems: lStorage.totalUniqueItems,
        totalItems: lStorage.totalItems,
        cartTotal: lStorage.cartTotal,
        metadata: lStorage.metadata
      })
    }

    setCalculatedItem({
      ...calculatedItem,
      totalTax: _.reduce(
        items,
        (sum, curItem) => {
          return sum + curItem.taxVal * curItem.quantity
        },
        0
      ),
      totalAmount: _.reduce(
        items,
        (sum, curItem) => {
          return sum + curItem.itemTotal
        },
        0
      )
    })
  }, [items])

  return (
    <div className="bg-mainbg grid lg:grid-cols-4 md:grid-cols-2 gap-6 mx-10 mt-5 font-meiryo">
      <div className="md:col-span-1 lg:col-span-3 pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-6">
            <div className="pb-2 border-b border-green-800 border-opacity-80 flex space-x-4 items-center">
              <div className="bg-cart-icon h-10 w-8"></div>
              <h2 className="text-green-700 text-lg font-bold">カート</h2>
            </div>
          </div>
          <div className="px-3">
            <table className="table-fixed w-full mb-6">
              <thead className="bg-gray-50 border-b border-t border-gray-200">
                <tr className="h-11 text-xs text-gray-500 text-shadow-none">
                  <th>商品</th>
                  <th>値段</th>
                  <th>数量</th>
                  <th>合計</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{cartItems()}</tbody>
            </table>
          </div>
        </div>
        <div
          id="production-pagination"
          className="w-full h-12 p-3 text-center space-x-2 mt-3 col-span-3"
        >
          <Pagination
            listNumbers=""
            currentPage=""
            lastPage=""
            handleNavigation=""
          />
        </div>
      </div>
      <div className="w-full h-full relative group overflow-hidden">
        <div className="relative gap-3 bg-white rounded-2xl border-2 border-gray-400 shadow-xl w-full">
          <div className="w-full px-1">
            <div className="grid gap-6 grid-cols-1 p-7 items-center justify-center">
              <div className="flex flex-wrap space-x-4 justify-between pt-10 pb-5">
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  カート内合計:
                </div>
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  ¥
                  {isEmpty
                    ? cart.cartTotal.toLocaleString('jp')
                    : cartTotal.toLocaleString('jp')}
                </div>
              </div>
              <div className="flex flex-wrap space-x-4 justify-between">
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  消費稅:
                </div>
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  ¥ {calculatedItem.totalTax.toLocaleString('jp')}
                </div>
              </div>
            </div>
            <div className="px-7 pt-10">
              <div className="flex flex-wrap space-x-4 justify-between py-10">
                <div className="h-15 items-center font-extrabold text-gray-400 text-center text-2xl">
                  合計
                </div>
                <div className="h-15 items-center font-extrabold text-red-500 text-center text-2xl">
                  ¥
                  {isEmpty
                    ? cart.cartTotal.toLocaleString('jp')
                    : cartTotal.toLocaleString('jp')}
                </div>
              </div>
            </div>

            <div className="items-center pt-10 py-3">
              <div className="flex items-center justify-center space-x-4">
                <input
                  type="checkbox"
                  className="h-6 w-6 border-solid border-4 border-gray-500 border-opacity-25 shadow-xl rounded-md checked:bg-gray-500 checked:border-transparent focus:outline-none"
                />
                <div className="text-sm  text-primary-200 ">
                  利用規約
                  <span className="text-gray-400 cursor-pointer">
                    に同意します
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 py-10">
              <button className="bg-primary-200 justify-center rounded-3xl items-center text-white h-14 w-4/5 font-bold">
                お会計
              </button>
              <button
                className="bg-gray-400 text-black justify-center rounded-3xl items-center h-14 w-4/5 font-bold"
                onClick={() => {
                  history.goBack()
                }}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartList
if (document.getElementById('companyCart')) {
  ReactDOM.render(<CartList />, document.getElementById('companyCart'))
}
