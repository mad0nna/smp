import React, { useCallback, useEffect, useState } from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import axios from 'axios'
import _ from 'lodash'
import spinner from '../../../img/spinner.gif'
const ProductWidget = () => {
  const API_URL =
    '/jsonapi/product?page[offset]=0&page[limit]=6&include=media,text,price,stock'
  let userData = JSON.parse(document.getElementById('userData').textContent)
  const [state, setState] = useState({
    loading: true,
    loadedComponent: false,
    img_domain: userData.img_domain || '/aimeos'
  })
  const [productList, setProductList] = useState([])

  const parseProductObj = (obj) => {
    let groupItems = []
    let prodPriceId, prodMediaId, prodTextId, prodStockId

    _.forEach(obj.data, (items) => {
      // getting id from relationship media
      if (items.relationships.media !== undefined) {
        prodMediaId = items.relationships.media.data[0]['id'] ?? null
      }
      // for long description
      if (items.relationships.text !== undefined) {
        prodTextId = items.relationships.text.data[0]['id'] ?? null
      }
      //for price value
      if (items.relationships.price !== undefined) {
        prodPriceId = items.relationships.price.data[0]['id'] ?? null
      }
      // for stock
      if (items.relationships.stock !== undefined) {
        prodStockId = items.relationships.stock.data[0]['id'] ?? null
      }

      if (!_.isEmpty(items) || items !== undefined) {
        let mediaObj = _.filter(obj.included, (inc) => {
          return (
            prodMediaId !== 0 &&
            inc.type === 'media' &&
            inc['id'] == prodMediaId
          )
        })

        let textObj = _.filter(obj.included, (inc) => {
          return (
            prodTextId !== null &&
            inc.type === 'text' &&
            inc['id'] == prodTextId
          )
        })

        let priceObj = _.filter(obj.included, (inc) => {
          return (
            prodPriceId !== null &&
            inc.type === 'price' &&
            inc['id'] === prodPriceId
          )
        })
        let stockObj = _.filter(obj.included, (inc) => {
          return (
            prodStockId != null &&
            inc.type === 'stock' &&
            inc['id'] == prodStockId
          )
        })

        groupItems.push({
          product: items.attributes,
          media:
            mediaObj !== undefined && mediaObj[0] !== undefined
              ? mediaObj[0].attributes
              : [],
          text:
            textObj !== undefined && textObj[0] !== undefined
              ? textObj[0].attributes
              : [],
          price:
            priceObj !== undefined && priceObj[0] !== undefined
              ? priceObj[0].attributes
              : [],
          stock:
            stockObj !== undefined && stockObj[0] !== undefined
              ? stockObj[0].attributes
              : [],
          meta: obj.meta
        })
      }
    })

    return groupItems
  }

  const getProductListApi = useCallback(() => {
    axios({
      url: API_URL,
      method: 'get',
      responseType: 'json'
    }).then((response) => {
      let data = response.data
      let productItems = parseProductObj(data)
      setProductList(productItems)

      // hide spinner
      setState((prevState) => {
        return {
          ...prevState,
          loading: false
        }
      })
    })
  }, [])

  useEffect(() => {
    // set product list
    let isMounted = true

    if (productList.length == 0) {
      getProductListApi()
    }
    if (isMounted) {
      setState((prevState) => {
        return {
          ...prevState,
          loadedComponent: isMounted
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [productList, getProductListApi])

  return state.loadedComponent ? (
    <div className="h-full w-full relative group">
      <div className="dashboard-widget-list w-full h-full relative bg-white rounded-lg shadow-xl overflow-auto">
        <div
          id="widget-header"
          className="bg-white box-border p-3 pb-6 relative"
        >
          <div>
            <div className="w-full pb-2">
              <h2 className="text-green-800 text-lg font-bold">ショップ</h2>
            </div>
          </div>
          <div className="absolute w-5 h-1 top-1.5 right-3 hidden group-hover:block">
            <img src={Ellipsis} />
          </div>
        </div>
        <div id="widget-body" className="w-full px-3 text-gray-500 text-xs">
          {state.loading === true ? (
            <div className="w-full relative h-12 dashboard-widget-list overflow-hidden">
              <div className="mx-auto absolute bottom-1 w-full text-center md:text-sm">
                <img className="mx-auto h-12 mt-5" src={spinner}></img>
              </div>
            </div>
          ) : (
            <div className="grid lg:grid-cols-1 xl:grid-cols-2 gap-y-8 ">
              {productList.map((item, index) => {
                let prodPrice
                if (!_.isEmpty(item.price)) {
                  prodPrice = _.parseInt(
                    item.price['price.value']
                  ).toLocaleString('jp')
                }

                return (
                  <div
                    className="grid justify-center gap-2 pb-2 overflow-hidden mb-2 m-1.5"
                    key={index}
                  >
                    <div className="max-w-full w-80 p-6 opacity-100 rounded-2xl bg-hex-F5F5F5">
                      <a
                        href={`/company/productDetail/?id=${item.product['product.id']}`}
                      >
                        <img
                          className="mx-auto p-4 w-56 h-auto bg-transparent"
                          src={`${state.img_domain}/${item.media['media.preview']}`}
                          // src="https://idaten.local/images/printer1.png"
                        ></img>
                      </a>
                    </div>
                    <div className="pl-2 line-clamp-2 w-40 text-body-500">
                      {item.product['product.label']}
                    </div>
                    <div className="pl-2 pt-3 pb-2 text-center font-bold text-hex-1E1E1E text-lg">
                      {prodPrice} 円
                    </div>
                    <div className="pl-2 text-center text-lg p-3 rounded-3xl tracking-tighter m-auto w-64 opacity-100 text-primary-600 bg-hex-8EE9AB ">
                      <a
                        href={`/company/productDetail/?id=${item.product['product.id']}`}
                      >
                        <span className="tracking-tighter drop-shadow-none">
                          {' '}
                          ご購入はこちらから
                        </span>
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        {!state.loading ? (
          <div id="widget-footer" className="w-full h-10 p-4 mb-7">
            <div id="widget-footer-control" className="float-right">
              <a href="/company/shop">
                <button className="dashboard-widget-button bg-primary-600 text-white">
                  さらに表示
                </button>
              </a>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  ) : null
}

export default ProductWidget
