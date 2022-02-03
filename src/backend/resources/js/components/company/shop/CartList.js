import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Pagination from '../../Pagination'
import { useCart } from 'react-use-cart'
import { useHistory } from 'react-router'
import CheckoutOption from './CheckoutOption'
import axios from 'axios'
import _ from 'lodash'
import CheckoutMessage from './CheckoutMessage'
import CheckoutContent from './CheckoutContent'
import CheckoutAddress from './CheckoutAddress'
const CartList = (props) => {
  const SERVICE_TYPE = 'payment'
  // let userData = JSON.parse(document.getElementById('userData').textContent)
  const [isAgreedTerms, setAgreedTerms] = useState(false)
  const [orderId, setOrderId] = useState({ orderId: null, token: null })

  const [state, setState] = useState({
    method: '',
    modalDisplay: false,
    modalDisplayMessage: false,
    orderInvoiceSuccess: false,
    modalCheckoutContentDisplay: false,
    htmlContent: '',
    addressModalDisplay: false
    // modalDisplayCreditCard: false
  })

  const [addressData, setAddressData] = useState({})
  console.log('state', addressData)

  const history = useHistory()

  const { cartTotal, items, updateItemQuantity, removeItem, emptyCart } =
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

  const handleOrderChange = () => {}

  const handleDeleteItem = (id) => {
    removeItem(id)
  }

  const handleAcceptAgreement = (event) => {
    setAgreedTerms(event.target.checked)
  }

  const handleAddressOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value

    setAddressData({ ...addressData, [name]: value })
  }

  const handleOpenAddressModal = () => {
    setState((prevState) => {
      return {
        ...prevState,
        // modalDisplay: !prevState.modalDisplay
        addressModalDisplay: !prevState.addressModalDisplay
      }
    })
  }

  const handleCheckoutModalOpen = () => {
    saveToBasket().then(() => {
      createDeliveryService().then(() => {
        createPaymentService()
      })
    })

    setState((prevState) => {
      return {
        ...prevState,
        // modalDisplay: !prevState.modalDisplay
        addressModalDisplay: !prevState.addressModalDisplay,
        modalDisplay: !prevState.modalDisplay
      }
    })
  }

  async function saveToBasket() {
    const data = {
      data: items.map((val) => {
        return {
          attributes: {
            'product.id': val.id,
            quantity: val.quantity,
            stocktype: 'default'
          }
        }
      })
      //  {
      //   'product.id': productDetail.id,
      //   quantity: state.orderNum, // optional
      //   stocktype: 'default' // warehouse code (optional)
      // }
    }
    let url = '/jsonapi/basket?id=default&related=product'
    let csrfItem = props.location.state.meta.csrf

    if (csrfItem) {
      // add CSRF token if available and therefore required
      var csrf = {}
      csrf[csrfItem.name] = csrfItem.value
      url +=
        (url.indexOf('?') === -1 ? '?' : '&') +
        Object.keys(csrf)
          .map((key) => key + '=' + csrf[key])
          .join('&')
    }

    await axios
      .post(url, JSON.stringify(data), {
        'Content-Type': 'application/json'
      })
      .then(() => {
        console.log('@create product to basket')
      })
  }

  async function createDeliveryService() {
    // fetch delivery
    await axios
      .get(
        `/jsonapi/service?filter[cs_type]=delivery&include=text,price,media`,
        {
          'Content-Type': 'application/json'
        }
      )
      .then((res1) => {
        console.log('fetch delivery services')

        let csrfItem = res1.data.meta.csrf
        const urlParams = res1.data.data.filter(function (item) {
          // this should be selected config for company
          return (
            item.type === 'service' &&
            item.attributes['service.type'] == 'delivery'
          )
        })[1]

        let url = urlParams.links['basket/service'].href
        var params = {
          data: [
            {
              id: 'delivery',
              attributes: {
                'service.id': urlParams.attributes['service.id']
              }
            }
          ]
        }

        if (csrfItem) {
          var csrf = {}
          csrf[csrfItem.name] = csrfItem.value
          url +=
            (url.indexOf('?') === -1 ? '?' : '&') +
            Object.keys(csrf)
              .map((key) => key + '=' + csrf[key])
              .join('&')
        }

        axios
          .post(url, JSON.stringify(params), {
            'Content-Type': 'application/json'
          })
          .then(() => {
            console.log('@created delivery service')
          })
      })
  }

  async function createAddressService(serviceId) {
    let addressUrl = '/jsonapi/basket?id=default&related=address'
    let csrfItem = props.location.state.meta.csrf
    const params = {
      data: [
        {
          id: serviceId, // or 'delivery'
          attributes: {
            'order.base.address.company': addressData.companyName, // (optional)
            'order.base.address.firstname': addressData.first_name, // (optional)
            'order.base.address.lastname': addressData.last_name, // (required)
            'order.base.address.address1': addressData.street_address, // (required)
            'order.base.address.address2': addressData.building_name, // (required)
            'order.base.address.city': addressData.city, // (required)
            'order.base.address.postal': addressData.postal_code, // (required)
            'order.base.address.state': addressData.prefecture, // (required)
            'order.base.address.telephone': addressData.number, // (required)
            'order.base.address.email': addressData.email // (required)
          }
        }
      ]
    }
    axios
      .post(`${addressUrl}&_token=${csrfItem.value}`, JSON.stringify(params), {
        'Content-Type': 'application/json'
      })
      .then((response) => {
        history.push({ pathname: '/company/cart', state: response.data })
      })
  }

  async function createPaymentService() {
    await axios
      .get(
        `/jsonapi/service?filter[cs_type]=${SERVICE_TYPE}&include=text,price,media`,
        {
          'Content-Type': 'application/json'
        }
      )
      .then((res1) => {
        console.log('fetch payment service')
        const urlParams = res1.data.data.filter(function (item) {
          // this should be selected config for company
          return (
            item.type === 'service' &&
            item.attributes['service.type'] == SERVICE_TYPE
          )
        })[0]

        let url = urlParams.links['basket/service'].href
        let csrfItem = res1.data.meta.csrf
        var params = {
          data: [
            {
              id: urlParams.attributes['service.type'],
              attributes: {
                'service.id': urlParams.attributes['service.id']
              }
            }
          ]
        }

        // create address service
        createAddressService(urlParams.attributes['service.type'])
        // create delivery service
        // console.log('params service payment post', params)
        if (csrfItem) {
          // add CSRF token if available and therefore required
          var csrf = {}
          csrf[csrfItem.name] = csrfItem.value
          url +=
            (url.indexOf('?') === -1 ? '?' : '&') +
            Object.keys(csrf)
              .map((key) => key + '=' + csrf[key])
              .join('&')
        }

        createServicePersistBasket(params, url)
      })
  }

  const deleteBasketCache = (csrfItem) => {
    axios
      .delete(`/jsonapi/basket?id=default&_token=${csrfItem.value}`)
      .then(() => {
        // console.log('@deleted basket items', response)
      })
  }

  async function createServicePersistBasket(params, url) {
    axios
      .post(url, JSON.stringify(params), {
        'Content-Type': 'application/json'
      })
      .then((res2) => {
        console.log('create payment service')

        let basketUrl = res2.data.links.self.href
        let csrfItem = res2.data.meta.csrf
        if (csrfItem) {
          // add CSRF token if available and therefore required
          var csrf = {}
          csrf[csrfItem.name] = csrfItem.value
          basketUrl +=
            (basketUrl.indexOf('?') === -1 ? '?' : '&') +
            Object.keys(csrf)
              .map((key) => key + '=' + csrf[key])
              .join('&')
        }
        //  save basket order
        axios
          .post(basketUrl, {
            'Content-Type': 'application/json'
          })
          .then((res3) => {
            console.log('save order')
            setOrderId({
              orderId: res3.data.data.attributes['order.base.id'],
              token: res3.data.meta.csrf.value
            })
          })
      })
  }

  const handleCheckoutModalAddressClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        addressModalDisplay: false
      }
    })
  }

  const handleCheckoutModalClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        modalDisplay: false
      }
    })
  }

  const handleCheckoutMessageModalOpen = () => {
    setState((prevState) => {
      return {
        ...prevState,
        modalDisplayMessage: true
      }
    })
  }

  const handleCheckoutMessageModalClose = () => {
    emptyCart()
    window.location.href = '/company/shop'
    setState((prevState) => {
      return {
        ...prevState,
        modalDisplayMessage: false
      }
    })
  }

  const handleCheckoutContentModalClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        modalCheckoutContentDisplay: false
      }
    })
  }

  /**
   * Proceed to request invoice or use payment method
   * @param  int value
   */
  function handleSubmitCheckout(value) {
    switch (parseInt(value)) {
      case 1: {
        // credit card
        // paymentstatus : 4
        // DeliveryStatus:2
        const ccData = {
          data: {
            attributes: {
              'order.baseid': orderId.orderId // generated ID returned in the basket POST response (waiting for the order base id)
            }
          }
        }

        generateFinalOrder(ccData).then((res) => {
          console.log('sucessfully created order')
          deleteBasketCache(res.data.meta.csrf)
          // display modal submit
          let totalAmount = calculatedItem.totalAmount.toLocaleString('jp')
          openZeusPaymentForm(orderId.orderId, totalAmount)

          setState((prevState) => {
            return {
              ...prevState,
              orderInvoiceSuccess: true
            }
          })

          handleCheckoutModalClose()
          handleCheckoutMessageModalOpen()
        })
        break
      }
      case 2: {
        // generate final order
        const invData = {
          data: {
            attributes: {
              'order.baseid': orderId.orderId // generated ID returned in the basket POST response (waiting for the order base id)
            }
          }
        }

        generateFinalOrder(invData).then((res) => {
          console.log('sucessfully created order')
          deleteBasketCache(res.data.meta.csrf)
          // display modal submit
          setState((prevState) => {
            return {
              ...prevState,
              orderInvoiceSuccess: true
            }
          })

          handleCheckoutModalClose()
          handleCheckoutMessageModalOpen()
        })
      }
    }
  }

  async function generateFinalOrder(data) {
    const response = await axios.post(
      `/jsonapi/order?_token=${orderId.token}`,
      JSON.stringify(data),
      {
        'Content-Type': 'application/json'
      }
    )
    // console.log('@created final order', response)
    return response
  }
  function calculateTaxItem(items) {
    let totalTax = _.reduce(
      items,
      (sum, curItem) => {
        return sum + curItem.taxVal * curItem.quantity
      },
      0
    )

    // console.log('@totaTax', totalTax)
    setCalculatedItem({
      ...calculatedItem,
      totalTax: totalTax,
      totalAmount: cartTotal + totalTax
    })
  }

  const openZeusPaymentForm = (orderId, amount) => {
    window
      .open(
        `/payment/creditCardPayment/?orderId=${orderId}&amount=${amount}`,
        '_blank'
      )
      .focus()
  }

  const cartItems = () => {
    let addToCartItem = items
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
                className="w-14 shadow-lg rounded tex-red-500 border px-1 text-right"
                min="1"
                value={item.quantity}
                onChange={() => handleOrderChange(item)}
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
    // if (_.isEmpty(items)) {
    //   var userData = JSON.parse(document.getElementById('userData').textContent)
    //   let lStorage = JSON.parse(
    //     localStorage.getItem(`react-use-cart-${userData.userId}`)
    //   )
    //   setCart({
    //     ...cart,
    //     id: lStorage.id,
    //     items: lStorage.items,
    //     isEmpty: lStorage.isEmpty,
    //     totalUniqueItems: lStorage.totalUniqueItems,
    //     totalItems: lStorage.totalItems,
    //     cartTotal: lStorage.cartTotal,
    //     metadata: lStorage.metadata
    //   })
    //   //   when refresh
    //   calculateTaxItem(lStorage)
    // } else {
    calculateTaxItem(items)
    // }
    // set as cart state
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
                  ¥{cartTotal.toLocaleString('jp')}
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
                  ¥{calculatedItem.totalAmount.toLocaleString('jp')}
                </div>
              </div>
            </div>

            <div className="items-center pt-10 py-3">
              <div className="flex items-center justify-center space-x-4">
                <input
                  type="checkbox"
                  className="h-6 w-6 border-solid border-4 border-gray-500 border-opacity-25 shadow-xl rounded-md checked:bg-gray-500 checked:border-transparent focus:outline-none"
                  onChange={handleAcceptAgreement}
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
              <button
                className={`bg-primary-200 justify-center rounded-3xl items-center text-white h-14 w-4/5 font-bold ${
                  !isAgreedTerms ? 'bg-opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={isAgreedTerms ? handleOpenAddressModal : null}
              >
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
      {state.addressModalDisplay ? (
        <CheckoutAddress
          handleOnChange={handleAddressOnChange}
          handleSubmit={handleCheckoutModalOpen}
          handleCloseModal={handleCheckoutModalAddressClose}
          state={addressData}
        />
      ) : null}
      {state.modalDisplay ? (
        <CheckoutOption
          handleCloseModal={handleCheckoutModalClose}
          handleSubmitCheckout={handleSubmitCheckout}
          method={state.method}
        />
      ) : null}
      {state.modalDisplayMessage ? (
        <CheckoutMessage handleCloseModal={handleCheckoutMessageModalClose} />
      ) : null}

      {state.modalCheckoutContentDisplay ? (
        <CheckoutContent
          htmlContent={state.htmlContent}
          handleCloseModal={handleCheckoutContentModalClose}
        />
      ) : null}

      {/* {state.modalDisplayCreditCard ? (
        <PaymentSelection
          handleCloseModal={handleCloseModal}
          method={state.method}
        />
      ) : null} */}
    </div>
  )
}

export default CartList
if (document.getElementById('companyCart')) {
  ReactDOM.render(<CartList />, document.getElementById('companyCart'))
}
