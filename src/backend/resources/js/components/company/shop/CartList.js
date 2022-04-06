import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Pagination from '../../Pagination'
import { useCart } from 'react-use-cart'
import ProductDetail from './ProductDetail'
import { CartProvider } from 'react-use-cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from 'react-router-dom'

import CheckoutOption from './CheckoutOption'
import axios from 'axios'
import _ from 'lodash'
import CheckoutMessage from './CheckoutMessage'
import CheckoutContent from './CheckoutContent'
import CheckoutAddress from './CheckoutAddress'
// eslint-disable-next-line
const CartList = () => {
  const SERVICE_TYPE = 'payment'
  const [isAgreedTerms, setAgreedTerms] = useState(false)
  const [orderId, setOrderId] = useState({ orderId: null, token: null })
  const [csrfItem, setCsrfToken] = useState({})
  let userData = JSON.parse(document.getElementById('userData').textContent)
  const [state, setState] = useState({
    method: '',
    modalDisplay: false,
    modalDisplayMessage: false,
    orderInvoiceSuccess: false,
    modalCheckoutContentDisplay: false,
    htmlContent: '',
    addressModalDisplay: false,
    messageContent:
      'ご請求書を発行いたしました。ご登録のメールアドレスをご確認してください。',
    loader: false,
    isSubmit: false
  })

  const [addressData, setAddressData] = useState({
    company_name: userData.companyCode || '',
    email: userData.email || '',
    first_name: userData.firstName || '',
    last_name: userData.lastName || '',
    street_address: userData.address1 || '',
    building_name: userData.address2 || '',
    city: userData.city || '',
    postal_code: userData.postal || '',
    prefecture: userData.state || '',
    number: userData.number || ''
  })
  const [errorData, setErrorData] = useState({
    email: false,
    company_name: false,
    first_name: false,
    last_name: false,
    street_address: false,
    building_name: false,
    city: false,
    postal_code: false,
    prefecture: false,
    number: false,
    postalCodeIsValid: false,
    emailIsValid: false,
    numberIsValid: false
  })
  const history = useHistory()
  const { cartTotal, items, updateItemQuantity, removeItem, emptyCart } =
    useCart()
  const [calculatedItem, setCalculatedItem] = useState({
    totalTax: 0,
    totalAmount: 0
  })
  const [modalMessage, setModalMessage] = useState()

  const handleIncOrder = (item) => {
    let updateQuantity = item.quantity + 1
    updateItemQuantity(item.id, updateQuantity)
  }

  const handleDecOrder = (item) => {
    let updateQuantity = item.quantity - 1
    updateItemQuantity(item.id, updateQuantity)
  }

  const handleOrderChange = (value, item) => {
    // if (item.defaultStock <= item.quantity) {
    //   return
    // } else {
    updateItemQuantity(item.id, parseInt(value))
    // }
  }

  const handleDeleteItem = (id) => {
    removeItem(id)
  }

  const handleAcceptAgreement = (event) => {
    setAgreedTerms(event.target.checked)
  }
  const handleAddressOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const reg = /^[A-Za-z_][A-Za-z\d_]*$/
    if (value === '' || reg.test(parseInt(value))) {
      setAddressData({ ...addressData, [name]: value.replace(/[^\w\s]/gi, '') })
    }
  }
  const handleAddressSelectOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setAddressData({ ...addressData, [name]: value })
  }
  const handleAddressPostalOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const numberValue = value.replace(/(\..*)\./g, '$1')
    const re = /^[0-9]+$/
    if (value === '' || re.test(numberValue)) {
      setAddressData({
        ...addressData,
        [name]: numberValue.replace(/\s/gi, '')
      })
    }
  }

  const handleAddressNumberOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const numberValue = value.replace(/(\..*)\./g, '$1')
    const re = /^[0-9]+$/
    if (value === '' || re.test(numberValue)) {
      setAddressData({
        ...addressData,
        [name]: numberValue.replace(/\s/gi, '')
      })
    }
  }

  const handleAddressTextOnChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    const reg_txt = /^[a-zA-Z\s]*$/
    if (value === '' || reg_txt.test(value)) {
      setAddressData({
        ...addressData,
        [name]: value.replace(/[^\w\s]/gi, '')
      })
    }
  }
  // const handleTelNumber = (event) => {
  //   const name = event.target.name
  //   const value = event.target.value
  //   const tel_eg_txt = /^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/
  //   if (value === '' || tel_eg_txt.test(value)) {
  //     setAddressData({
  //       ...addressData,
  //       [name]: value.replace(/[^\w\s]/gi, '')
  //     })
  //   }
  // }
  const handleOpenAddressModal = () => {
    setAddressData({
      company_name: userData.companyCode || '',
      email: userData.email || '',
      first_name: userData.firstName || '',
      last_name: userData.lastName || '',
      street_address: userData.address1 || '',
      building_name: userData.address2 || '',
      city: userData.city || '',
      postal_code: userData.postal || '',
      prefecture: userData.state || '',
      number: userData.number || ''
    })
    setState((prevState) => {
      return {
        ...prevState,
        // modalDisplay: !prevState.modalDisplay
        addressModalDisplay: !prevState.addressModalDisplay
      }
    })
  }

  const handleCheckoutModalOpen = async () => {
    formValidation()
    if (Object.values(errorData).includes(true)) {
      setState((prevState) => {
        return {
          ...prevState,
          loader: false,
          isSubmit: !prevState.isSubmit
        }
      })
    } else {
      setState((prevState) => {
        return {
          ...prevState,
          isSubmit: !prevState.isSubmit,
          loader: true
        }
      })

      saveToBasket()
    }
  }

  /**
   * Handle Error
   * Remove basket cache to continue
   */
  const handleError = (err) => {
    console.error('@error: ', err)
    setModalMessage(
      'システムエラーが発生しました。しばらくしてから再度実行してください。'
    )
    handleCheckoutModalClose()
    handleCheckoutMessageModalOpen()
  }

  async function saveToBasket() {
    try {
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
        //
      }
      let url = '/jsonapi/basket?id=default&related=product'
      // let csrfItem = props.location.state.meta.csrf
      // save state csrfItem
      // setCsrfToken(csrfItem)

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
        .then((res) => {
          console.info('@create product to basket', res)
          createAddressService(
            'payment',
            res.data.links['basket/address'].href
          ).then(() => {
            createDeliveryService().catch(() => {
              console.log('error')
            })
          })
        })
        .catch((err) => {
          deleteBasketCache(csrfItem)
          console.log(err)
          handleError(err)
        })
    } catch (err) {
      console.log('saveBasketTryCatch', err)
    }
  }

  async function createDeliveryService() {
    try {
      // fetch delivery
      await axios
        .get(
          `/jsonapi/service?filter[cs_type]=delivery&include=text,price,media`,
          {
            'Content-Type': 'application/json'
          }
        )
        .then((res1) => {
          console.info('fetch delivery services')
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
              console.info('@created delivery service')
              createPaymentService()
              // set address for invoice
            })
            .catch((err) => {
              deleteBasketCache(csrfItem)
              handleError(err)
            })
        })
        .catch((err) => {
          deleteBasketCache(csrfItem)
          handleError(err)
        })
    } catch (err) {
      console.log('createDeliver', err)
    }
  }

  async function createAddressService(serviceId, addressUrl) {
    try {
      // let addressUrl = '/jsonapi/basket?id=default&related=address'
      const params = {
        data: [
          {
            id: serviceId, // or 'delivery'
            attributes: {
              'order.base.address.company': addressData.company_name, // (optional)
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
      await axios
        .post(
          `${addressUrl}&_token=${csrfItem.value}`,
          JSON.stringify(params),
          {
            'Content-Type': 'application/json'
          }
        )
        .then((response) => {
          history.push({ pathname: '/company/cart', state: response.data })
        })
        .catch((err) => {
          console.log('address', err)
        })
    } catch (err) {
      console.log('createAddressService', err)
    }
  }

  async function createPaymentService() {
    try {
      await axios
        .get(
          `/jsonapi/service?filter[cs_type]=${SERVICE_TYPE}&include=text,price,media`,
          {
            'Content-Type': 'application/json'
          }
        )
        .then((res1) => {
          console.info('fetch payment service')
          const urlParams = res1.data.data.filter(function (item) {
            // this should be selected config for company
            return (
              item.type === 'service' &&
              item.attributes['service.type'] == SERVICE_TYPE
            )
          })[0]
          let url = urlParams.links['basket/service'].href
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

          // create delivery service
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
          if (res1) {
            createServicePersistBasket(params, url)
          } else {
            console.log('error on res1')
          }
        })
    } catch (err) {
      console.log('createPaymentService', err)
    }
  }

  const deleteBasketCache = (csrfItem) => {
    try {
      axios
        .delete(`/jsonapi/basket?id=default&_token=${csrfItem.value}`)
        .then(() => {
          console.info('@deleted basket items')
        })
    } catch (err) {
      console.log('deleteBasketCache', err)
    }
  }

  async function createServicePersistBasket(params, url) {
    try {
      axios
        .post(url, JSON.stringify(params), {
          'Content-Type': 'application/json'
        })
        .then((res2) => {
          console.info('create payment service')
          let basketUrl = res2.data.links.self.href
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
          if (res2) {
            axios
              .post(basketUrl, {
                'Content-Type': 'application/json'
              })
              .then((res3) => {
                console.info('save order')
                setState((prevState) => {
                  return {
                    ...prevState,
                    addressModalDisplay: !prevState.addressModalDisplay,
                    modalDisplay: !prevState.modalDisplay,
                    loader: !prevState.loader
                  }
                })
                setOrderId({
                  orderId: res3.data.data.attributes['order.base.id'],
                  token: res3.data.meta.csrf.value
                })
              })
              .catch((err) => {
                // deleteBasketCache(csrfItem)
                console.log('servicePres', err)
                handleError(err)
              })
          } else {
            console.log('error on service pres')
          }
        })
    } catch (err) {
      console.log('createServicePersistBasket', err)
    }
  }
  const handleCheckoutModalAddressClose = () => {
    setState((prevState) => {
      return {
        ...prevState,
        addressModalDisplay: false,
        loader: false
      }
    })
    setErrorData({
      email: false,
      company_name: false,
      first_name: false,
      last_name: false,
      street_address: false,
      building_name: false,
      city: false,
      postal_code: false,
      prefecture: false,
      number: false,
      postalCodeIsValid: false,
      emailIsValid: false,
      numberIsValid: false
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
    deleteBasketCache(csrfItem)
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
        setModalMessage(
          'ご利用ありがとうございます。クレジットカード決済を受け付けました。'
        )
        const ccData = {
          data: {
            attributes: {
              'order.baseid': orderId.orderId // generated ID returned in the basket POST response (waiting for the order base id)
            }
          }
        }

        generateFinalOrder(ccData)
          .then((res) => {
            console.info('successfully created order')
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
          .catch((err) => {
            deleteBasketCache(csrfItem)
            console.log('error cc', err)
            handleError(err)
          })
        break
      }
      case 2: {
        setModalMessage(
          'ご請求書を発行いたしました。ご登録のメールアドレスをご確認してください。'
        )
        // generate final order
        const invData = {
          data: {
            attributes: {
              'order.baseid': orderId.orderId // generated ID returned in the basket POST response (waiting for the order base id)
            }
          }
        }

        generateFinalOrder(invData)
          .then((res) => {
            console.info('successfully created order')
            axios
              .post(res.data.data.links.process.href)
              .then(() => console.log('success'))
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
          .catch((err) => {
            deleteBasketCache(csrfItem)
            console.log('err invoice', err)
            handleError(err)
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
    setCalculatedItem({
      ...calculatedItem,
      totalTax: Math.round(totalTax),
      totalAmount: cartTotal + Math.round(totalTax)
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
  const stockData = items.filter(
    (data) => data.defaultStock + 1 <= data.quantity
  )
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
            {item.price.toLocaleString('jp')}円
          </td>
          <td className="text-center font-bold text-red-500">
            <div className="flex m-auto justify-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-dash-circle text-gray-500 mt-1 font-semibold  ${
                  item.quantity == 1
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                viewBox="0 0 16 16"
                onClick={() =>
                  item.quantity == 1 ? null : handleDecOrder(item)
                }
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
              </svg>
              <input
                type="number"
                className="w-14 shadow-lg rounded font-bold text-red-500 border px-1 text-right"
                min="1"
                max={item.defaultStock}
                value={item.quantity}
                onChange={(e) => {
                  handleOrderChange(e.target.value, item)
                }}
                onKeyDown={(event) => {
                  event.preventDefault()
                }}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className={`bi bi-plus-circle text-gray-500 mt-1 font-semibold ${
                  item.defaultStock <= item.quantity
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                viewBox="0 0 16 16"
                onClick={() => {
                  item.defaultStock <= item.quantity
                    ? null
                    : handleIncOrder(item)
                }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </div>
            {item.defaultStock === item.quantity ? (
              <span className="flex justify-center items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                注文可能数に達しました
              </span>
            ) : item.defaultStock <= item.quantity ? (
              <span className="flex justify-center items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                数量が現在の在庫より多い
              </span>
            ) : (
              ''
            )}
          </td>
          <td className="text-center font-bold text-red-500">
            {item.itemTotal.toLocaleString('jp')}円
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

  const formValidation = () => {
    if (addressData.email.length >= 1) {
      new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(addressData.email)
        ? setErrorData((prevState) => {
            return { ...prevState, emailIsValid: false }
          })
        : setErrorData((prevState) => {
            return { ...prevState, emailIsValid: true }
          })
    }
    if (addressData.number.length >= 12 && addressData.number.length <= 13) {
      if (
        new RegExp(/[0-9]{2}-[0-9]{4}-[0-9]{4}/).test(addressData.number) ||
        new RegExp(/[0-9]{3}-[0-9]{3}-[0-9]{4}/).test(addressData.number) ||
        new RegExp(/[0-9]{4}-[0-9]{3}-[0-9]{3}/).test(addressData.number) ||
        new RegExp(/[0-9]{3}-[0-9]{4}-[0-9]{4}/).test(addressData.number)
      ) {
        setErrorData((prevState) => {
          return { ...prevState, numberIsValid: false }
        })
      } else {
        setErrorData((prevState) => {
          return { ...prevState, numberIsValid: true }
        })
      }
    } else {
      setErrorData((prevState) => {
        return { ...prevState, numberIsValid: true }
      })
    }

    if (addressData.postal_code.length >= 1) {
      new RegExp(/[0-9]{3}-[0-9]{4}/).test(addressData.postal_code)
        ? setErrorData((prevState) => {
            return { ...prevState, postalCodeIsValid: false }
          })
        : setErrorData((prevState) => {
            return { ...prevState, postalCodeIsValid: true }
          })
    }

    for (const [key, value] of Object.entries(addressData)) {
      String(value).length === 0 || value.trim().length === 0
        ? setErrorData((prevState) => {
            return { ...prevState, [key]: true }
          })
        : setErrorData((prevState) => {
            return { ...prevState, [key]: false }
          })
    }
    Object.values(errorData).includes(true) && state.isSubmit
      ? null
      : setState((prevState) => {
          return {
            ...prevState,
            isSubmit: false
          }
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
  useEffect(() => {
    formValidation()
  }, [addressData, addressData.email, state.addressModalDisplay])

  useEffect(() => {
    axios
      .options('/jsonapi', {
        'Content-Type': 'application/json'
      })
      .then((res) => setCsrfToken(res.data.meta.csrf))
  }, [])
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
                  {cartTotal.toLocaleString('jp')}円
                </div>
              </div>
              <div className="flex flex-wrap space-x-4 justify-between">
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  消費稅:
                </div>
                <div className="h-15 items-center font-extrabold text-gray-400 text-center font-bold">
                  {calculatedItem.totalTax.toLocaleString('jp')}円
                </div>
              </div>
            </div>
            <div className="px-7 pt-10">
              <div className="flex flex-wrap space-x-4 justify-between py-10">
                <div className="h-15 items-center font-extrabold text-gray-400 text-center text-2xl">
                  合計
                </div>
                <div className="h-15 items-center font-extrabold text-red-500 text-center text-2xl">
                  {calculatedItem.totalAmount.toLocaleString('jp')}円
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
                  isAgreedTerms && items.length !== 0 && stockData.length === 0
                    ? ''
                    : 'bg-opacity-50 cursor-not-allowed'
                }`}
                onClick={
                  isAgreedTerms && items.length !== 0 && stockData.length === 0
                    ? handleOpenAddressModal
                    : null
                }
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
          handleSelectOnChange={handleAddressSelectOnChange}
          handleNumberOnChange={handleAddressNumberOnChange}
          handleAddressPostalOnChange={handleAddressPostalOnChange}
          handleTextOnChanage={handleAddressTextOnChange}
          // handleTelOnChange={handleTelNumber}
          handleSubmit={handleCheckoutModalOpen}
          handleCloseModal={handleCheckoutModalAddressClose}
          state={addressData}
          loader={state.loader}
          error={errorData}
          isSubmit={state.isSubmit}
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
        <CheckoutMessage
          handleCloseModal={handleCheckoutMessageModalClose}
          message={modalMessage}
        />
      ) : null}

      {state.modalCheckoutContentDisplay ? (
        <CheckoutContent
          htmlContent={state.htmlContent}
          handleCloseModal={handleCheckoutContentModalClose}
        />
      ) : null}
    </div>
  )
}

export default CartList

// when refresh the blade will be called which has elementID=companyCart
/**
 * <div id="companyCart"></div>
 */
if (document.getElementById('companyCart')) {
  let userId = JSON.parse(
    document.getElementById('userData').textContent
  ).userId

  ReactDOM.render(
    <div>
      <Router>
        <Switch>
          <Route
            path="/company/productDetail"
            render={(props) => (
              <CartProvider id={userId}>
                <ProductDetail {...props} />
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
    document.getElementById('companyCart')
  )
}
