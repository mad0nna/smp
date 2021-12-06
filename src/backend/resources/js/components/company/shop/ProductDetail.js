import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
// import { useCart } from 'react-use-cart'
import _ from 'lodash'

const ProductDetail = () => {
  const location = useLocation()
  const history = useHistory()
  // const { addItem } = useCart()

  const [state, setState] = useState({
    orderNum: 0,
    stock: 0
  })

  const [isLoaded, setLoaded] = useState(false)

  const [productDetail, setProductDetail] = useState({
    id: 0,
    imgSrc: '',
    description: '',
    title: '',
    price: '',
    defaultStock: 0
  })

  const parseProductData = (data) => {
    const { media, price, product, text, stock } = data
    let prodDescription = text['text.content'].replace(/<[^>]+>/g, '')
    let prodPrice = _.parseInt(_.parseInt(price['price.value'])).toLocaleString(
      'jp'
    )
    setProductDetail({
      ...productDetail,
      id: product['product.id'],
      description: prodDescription,
      price: prodPrice,
      title: product['product.label'],
      imgSrc: media['media.preview'],
      defaultStock: stock['stock.stocklevel'] ?? 0
    })

    setState((prevState) => {
      return {
        ...prevState,
        stock: stock['stock.stocklevel'] ?? 0
      }
    })
    setLoaded(true)
  }

  const handleIncrementOrder = () => {
    setState((prevState) => {
      return {
        ...prevState,
        orderNum: state.orderNum + 1,
        stock: state.stock - 1
      }
    })
  }

  const handleDecrementOrder = () => {
    setState((prevState) => {
      return {
        ...prevState,
        orderNum: state.orderNum - 1,
        stock: state.stock + 1
      }
    })
  }

  const handleOrderChange = (n) => {
    let currentOrder = n - 1 <= 0 ? 1 : n - 1
    // disable if stock is reach to limit
    if (state.stock - 1 <= 0 && currentOrder >= productDetail.defaultStock) {
      return
    } else {
      // disable if order number is less than to zero
      if (n < 0) {
        return
      }
      setState((prevState) => {
        let orderCount =
          prevState.orderNum >= n ? state.orderNum - 1 : state.orderNum + 1
        let prodStock =
          prevState.orderNum >= n ? state.stock + 1 : state.stock - 1
        return {
          ...prevState,
          orderNum: orderCount,
          stock: prodStock
        }
      })
    }
  }

  const handleProductListPage = () => {
    history.replace('/company/shop')
  }

  // const handleCartListPage = () => {
  //   // create cart items
  //   addItem(productDetail, state.orderNum)
  //   history.replace('/company/cart')
  // }

  const productDetailItem = () => {
    return (
      <tr>
        <td className="text-center font-bold text-red-500 p-3">
          {productDetail.price}
          <br />
          <span className="text-gray-400  font-bold">
            ({productDetail.price} * {state.orderNum})
          </span>
        </td>
        <td className="text-center font-bold text-red-500 p-3">
          {state.stock}
        </td>
        <td className="text-center font-bold p-3">
          <div className="flex m-auto justify-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-plus-circle text-gray-500 mt-1 font-semibold ${
                state.stock == 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              viewBox="0 0 16 16"
              onClick={() => {
                state.stock > 0 ? handleIncrementOrder() : null
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
            <input
              type="number"
              className="w-14 shadow-lg rounded tex-red-500 border px-1"
              value={state.orderNum}
              onChange={(e) => {
                handleOrderChange(e.target.value)
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-dash-circle text-gray-500 mt-1 font-semibold cursor-pointer
                ${
                  state.orderNum == 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              viewBox="0 0 16 16"
              onClick={() => {
                state.orderNum > 0 ? handleDecrementOrder() : null
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>
          </div>
        </td>
      </tr>
    )
  }

  useEffect(() => {
    parseProductData(location.state)
  })

  return (
    <div className="bg-mainbg grid md:grid-cols-1 gap-6 mx-10 mt-5 font-meiryo">
      <div className=" pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-6">
            <div className="pb-2 border-b border-green-800 border-opacity-80 flex space-x-4 items-center">
              <div className="bg-cart-icon h-10 w-8"></div>
              <h2 className="text-green-600 text-lg font-bold">物販</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
              <div className="grid col-span-2 gap-3">
                <div className="grid grid-cols-2">
                  <div className="grid col-span-1 text-center flex content-center">
                    <img
                      className="w-auto h-auto p-3 tex-center m-auto"
                      src={isLoaded ? productDetail.imgSrc : ''}
                    ></img>
                  </div>
                  <div className="grid col-span-1 text-center flex content-center">
                    <div className="font-bold text-red-500 text-right pr-10">
                      <div className="font-bold text-red-500 text-3xl w-auto pr-10 w-full text-right">
                        {isLoaded ? productDetail.title : ''}
                      </div>
                      <div className="font-bold text-red-500 text-3xl w-auto pr-10 w-full text-right">
                        {isLoaded ? `¥ ${productDetail.price}` : ''}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 mb-5 flex content-end ">
                  <table className="table-fixed w-full min-w-full shadow-xl rounded-xl">
                    <thead className="bg-gray-50 border-b border-t border-gray-200">
                      <tr className="text-gray-500 text-shadow-none">
                        <th className="p-4 font-semibold">
                          販売価格
                          <br />
                          (小売価格 X 数量)
                        </th>
                        <th className="p-4 font-semibold">在庫</th>
                        <th className="p-4 font-semibold">注文数</th>
                      </tr>
                    </thead>
                    <tbody>{productDetailItem()}</tbody>
                  </table>
                </div>
              </div>
              <div className="grid lg:grid-cols-1 col-span-1 grid-rows-2 gap-6">
                <div className="tracking-tighter text-gray-400 text-lg mt-10">
                  <div className="font-bold">商品説明</div>
                  {isLoaded ? productDetail.description : ''}
                </div>
                <div className="flex flex-wrap content-end space-x-5 row-span-5 text-center">
                  <div className="space-x-5 w-full flex flex-row">
                    <button
                      className="bg-gray-400 h-14 shadow-xl w-3/5 rounded-3xl text-black font-semibold"
                      onClick={handleProductListPage}
                    >
                      キャンセル
                    </button>
                    <button
                      className="bg-primary-200 text-white h-14 shadow-xl w-3/5 rounded-3xl font-semibold"
                      onClick={() => {
                        console.log('@item')
                      }}
                    >
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

export default ProductDetail
