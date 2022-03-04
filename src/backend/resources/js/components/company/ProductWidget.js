import React, { useEffect, useState } from 'react'
import Ellipsis from '../../../img/ellipsis.png'
import axios from 'axios'
import _ from 'lodash'
import spinner from '../../../img/spinner.gif'

const ProductWidget = () => {
  const API_URL =
    '/jsonapi/product?page[offset]=0&page[limit]=6&include=media,text,price'
  const [state, setState] = useState({
    loading: true
  })
  const [productList, setProductList] = useState([])

  // const productItem = () => {}

  // const displayProductList = () => {
  //   console.log('@productList', productList)
  //   // populate product item here
  // }

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

  const getProductListApi = () => {
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
  }
  /**
   *
   */
  useEffect(() => {
    // set product list
    if (productList.length == 0) {
      getProductListApi()
    }
  }, [productList])

  return (
    <div className="h-full w-full relative group">
      <div className="dashboard-widget-list w-full h-full overflow-hidden relative bg-white rounded-lg shadow-xl">
        <div
          id="widget-header"
          className="bg-white box-border p-3 pb-6 relative"
        >
          <div>
            <div className="w-full pb-2 border-b border-green-800 border-opacity-80">
              <h2 className="text-green-800 text-lg font-bold">物販</h2>
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
            <div className="grid md:grid-cols-1 px-4 lg:grid-cols-2">
              {productList.map((item, index) => {
                return (
                  <div
                    className="grid justify-center gap-2 pb-2 overflow-hidden mx-2 mb-2"
                    key={index}
                  >
                    <a
                      href={`/company/productDetail/?id=${item.product['product.id']}`}
                    >
                      <img
                        className="mx-auto h-40 p-4"
                        src={`/aimeos/${item.media['media.url']}`}
                      ></img>
                    </a>
                    <div className="">{item.product['product.label']}</div>
                    <div className="">
                      {item.price['price.value'].substring(
                        0,
                        item.price['price.value'].length - 3
                      )}
                      円
                    </div>
                    <div className="text-primary-200">
                      <a
                        href={`/company/productDetail/?id=${item.product['product.id']}`}
                      >
                        ご購入はこちらから
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductWidget
