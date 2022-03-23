import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import _ from 'lodash'
import {
  useHistory,
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { useCart, CartProvider } from 'react-use-cart'
import CartList from './CartList'

const ProductDetail = (props) => {
  const history = useHistory()
  const { addItem, items } = useCart()
  const [state, setState] = useState({
    orderNum: 1,
    stock: 0
  })
  const [isLoaded, setLoaded] = useState(false)

  const [productDetail, setProductDetail] = useState({
    id: 0,
    userId: 0,
    imgSrc: '',
    description: '',
    title: '',
    price: 0,
    taxVal: 0,
    quantity: 0,
    defaultStock: 0,
    meta: []
  })

  // const [itemData] = useState(useCart())
  // const hasRelaod = itemData.addItem || []

  const parseProductData = (data) => {
    console.log('@data', data)
    const { media, price, product, text, stock, meta } = data

    if (_.isEmpty(price)) {
      alert(
        'Error: Product has lack of attributes. You will be return to shopping page.'
      )
      window.location.replace('/company/shop')
    }
    let prodDescription = !_.isEmpty(text)
      ? text['text.content'].replace(/<[^>]+>/g, '')
      : ''
    let prodPrice = !_.isEmpty(price) ? _.parseInt(price['price.value']) : ''
    let userData = JSON.parse(document.getElementById('userData').textContent)
    let taxValue = !_.isEmpty(price)
      ? _.parseInt(_.parseInt(price['price.taxvalue']))
      : ''

    setProductDetail({
      ...productDetail,
      id: product['product.id'],
      userId: userData.userId,
      description: prodDescription,
      price: prodPrice,
      taxVal: taxValue,
      quantity: price['price.quantity'],
      title: product['product.label'],
      imgSrc: media['media.preview'],
      defaultStock: stock['stock.stocklevel'] ?? 0,
      meta: meta
    })
    setState((prevState) => {
      return {
        ...prevState,
        stock: stock['stock.stocklevel'] ?? 0
      }
    })
    setLoaded(true)
  }

  const itemCartQUantity = items.find((data) => data.id === productDetail.id)
  const handleIncrementOrder = () => {
    if (state.stock - 1 <= 0 && state.orderNum >= productDetail.defaultStock) {
      return
    }

    setState((prevState) => {
      return {
        ...prevState,
        orderNum: state.orderNum + 1,
        stock: state.stock - 1
      }
    })
  }

  const handleDecrementOrder = () => {
    if (state.orderNum - 1 == 0) {
      return
    }
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
    if (_.isEmpty(props)) {
      window.location.replace('/company/shop')
    } else {
      history.replace('/company/shop')
    }
  }

  const handleCartListPage = () => {
    // create cart items
    if (productDetail.defaultStock <= 0) {
      alert('カートに追加できませんでした。在庫がありません。')
      return false
    }
    if (productDetail.defaultStock > 0) {
      addItem(productDetail, state.orderNum)
      history.push({
        pathname: '/company/cart',
        state: productDetail
      })
    }
  }

  const productDetailItem = () => {
    const cartQuantity = (itemCartQUantity && itemCartQUantity?.quantity) || 0
    const maxOrder =
      productDetail?.defaultStock - parseInt(cartQuantity) === 0
        ? 0
        : productDetail?.defaultStock - parseInt(cartQuantity)
    const stockLeft =
      parseInt(productDetail?.defaultStock) - parseInt(cartQuantity)
    return (
      <tr>
        <td className="text-center font-bold text-red-500 p-3">
          {(productDetail.price * state.orderNum).toLocaleString('jp')}円
          <br />
          <span className="text-gray-400  font-bold">
            ({productDetail.price.toLocaleString('jp')}円 * {state.orderNum})
          </span>
        </td>
        <td className="text-center font-bold text-red-500 p-3">
          {stockLeft || 0}
          {productDetail.defaultStock <= 0 ? (
            <span className="flex justify-center items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              在庫切れの商品
            </span>
          ) : (
            ''
          )}
        </td>
        <td className="text-center font-bold p-3">
          <div className="flex m-auto justify-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-dash-circle text-gray-500 mt-1 font-semibold cursor-pointer
                ${
                  state.orderNum == 1
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
            <input
              type="number"
              className="w-14 shadow-lg rounded font-bold text-red-500 border px-1 text-right"
              min="1"
              value={state.orderNum}
              max={maxOrder && maxOrder}
              onChange={(e) => {
                handleOrderChange(e.target.value)
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className={`bi bi-plus-circle text-gray-500 mt-1 font-semibold ${
                state.stock == 0 ||
                parseInt(itemCartQUantity?.quantity) +
                  parseInt(state.orderNum) ===
                  parseInt(productDetail.defaultStock) ||
                parseInt(itemCartQUantity?.quantity) ===
                  productDetail.defaultStock
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer'
              }`}
              viewBox="0 0 16 16"
              onClick={() => {
                state.stock === 0 ||
                parseInt(itemCartQUantity?.quantity) +
                  parseInt(state.orderNum) ===
                  productDetail.defaultStock ||
                parseInt(itemCartQUantity?.quantity) ===
                  productDetail.defaultStock
                  ? null
                  : handleIncrementOrder()
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          {state.orderNum == productDetail.defaultStock ||
          parseInt(itemCartQUantity?.quantity) + parseInt(state.orderNum) ===
            productDetail.defaultStock ||
          parseInt(itemCartQUantity?.quantity) ===
            productDetail.defaultStock ? (
            <span className="flex justify-center items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              注文可能数に達しました
            </span>
          ) : (
            ''
          )}
        </td>
      </tr>
    )
  }

  useEffect(() => {
    if (_.isEmpty(props) || props === undefined) {
      fetchProductDetail()
    } else {
      const { location } = props
      if (location.detail === undefined) {
        fetchProductDetail()
      } else {
        parseProductData(location.detail)
      }
    }
    // fetch product details to API
    // and parse the data to object
    function fetchProductDetail() {
      let urlParams = new URLSearchParams(location.search)

      let id = urlParams.get('id')
      let digitOnly = /^\d+$/
      if (!digitOnly.test(id)) {
        alert('記録が見当たりませんでした')
        window.history.go(-1)
        location.reload()
      }
      axios({
        url: `/jsonapi/product?id=${id}&include=media,text,price,stock`,
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        if (!_.isEmpty(response.data)) {
          let item = response.data
          // getting id from relationship media
          let prodMediaId = item.data.relationships.media.data[0]['id']
          // for long description
          let prodTextId = item.data.relationships.text.data[0]['id']
          //for price value
          let prodPriceId = item.data.relationships.price.data[0]['id']
          // for stock
          let prodStockId = item.data.relationships.stock.data[0]['id']

          if (!_.isEmpty(item) || item !== undefined) {
            let prodDetail = {
              product: item.data.attributes,
              media:
                _.filter(item.included, (inc) => {
                  return inc.type === 'media' && inc['id'] === prodMediaId
                })[0].attributes ?? {},
              text:
                _.filter(item.included, (inc) => {
                  return inc.type == 'text' && inc['id'] == prodTextId
                })[0].attributes ?? {},
              price:
                _.filter(item.included, (inc) => {
                  return inc.type === 'price' && inc['id'] === prodPriceId
                })[0].attributes ?? {},
              stock:
                _.filter(item.included, (inc) => {
                  return inc.type === 'stock' && inc['id'] == prodStockId
                })[0].attributes ?? {}
            }
            parseProductData(prodDetail)
          }
        }
      })
    }
  }, [props])
  console.log('x', productDetail.description.substring(0, 65))
  return (
    <div className="bg-mainbg grid md:grid-cols-1 gap-6 mx-10 mt-5 font-meiryo">
      <div className=" pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-6">
            <div className="pb-2 border-b border-green-800 border-opacity-80 flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="currentColor"
                className="text-primary-200 h-10 w-8"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
              </svg>
              <h2 className="text-primary-200 text-lg font-bold">物販</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-6">
              <div className="grid col-span-2 gap-3">
                <div className="grid grid-cols-2">
                  <div className="grid col-span-1 text-center flex content-center">
                    <img
                      className="w-auto h-auto p-3 tex-center m-auto"
                      src={isLoaded ? `/aimeos/${productDetail.imgSrc}` : ''}
                    ></img>
                  </div>
                  <div className="grid col-span-1 text-center flex content-center">
                    <div className="font-bold text-red-500 text-right pr-10">
                      <div className="font-bold text-red-500 text-3xl w-auto pr-10 w-full text-right">
                        {isLoaded ? productDetail.title : ''}
                      </div>
                      <div className="font-bold text-red-500 text-3xl w-auto pr-10 w-full text-right">
                        {isLoaded
                          ? `${productDetail.price.toLocaleString('jp')}円`
                          : ''}
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
                  {isLoaded
                    ? productDetail.description.substring(0, 65) + '...'
                    : ''}
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
                      className={`bg-primary-200 text-white h-14 shadow-xl w-3/5 rounded-3xl font-semibold ${
                        state.orderNum <= 0 ||
                        productDetail.defaultStock <= 0 ||
                        productDetail.defaultStock ===
                          itemCartQUantity?.quantity
                          ? 'bg-opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      onClick={
                        state.orderNum <= 0 ||
                        productDetail.defaultStock <= 0 ||
                        productDetail.defaultStock ===
                          itemCartQUantity?.quantity
                          ? null
                          : handleCartListPage
                      }
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
// when refresh the blade will be called which has elementID=companyProductDetail
/**
 * <div id="companyProductDetail"></div>
 */
if (document.getElementById('companyProductDetail')) {
  let userId = JSON.parse(
    document.getElementById('userData').textContent
  ).userId

  ReactDOM.render(
    <div>
      <Router>
        <Switch>
          <Route
            path="/company/productDetail"
            render={() => (
              <CartProvider id={userId}>
                <ProductDetail />
              </CartProvider>
            )}
          />
          <Route
            path="/company/cart"
            render={() => (
              <CartProvider id={userId}>
                <CartList />
              </CartProvider>
            )}
          />
        </Switch>
      </Router>
    </div>,
    document.getElementById('companyProductDetail')
  )
}
