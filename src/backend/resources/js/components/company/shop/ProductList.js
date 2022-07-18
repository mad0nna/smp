import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../Pagination'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useCart } from 'react-use-cart'
import shoppingCartIcon from '../../../../img/company/shopping-cart-icon.png'

const ProductList = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })
  let userData = JSON.parse(document.getElementById('userData').textContent)
  const { items } = useCart()
  const [sortItem, setSortItem] = useState({
    selectedSortValue: '',
    sortDropdown: [
      {
        label: '名前で並び替え（降順)',
        value: 'name_desc'
      },
      {
        label: '名前で並び替え（昇順)',
        value: 'name_asc'
      },
      {
        label: '販売価格で並び替え（降順)',
        value: 'price_desc'
      },
      {
        label: '販売価格で並び替え（昇順)',
        value: 'price_asc'
      }
    ]
  })

  const [loadedImage, setLoadedImage] = useState(false)

  const [searchItem, setSearchItem] = useState({
    searchText: ''
  })

  const [state, setState] = useState({
    data: [],
    pageCount: 1,
    currentPage: 1,
    detailData: [],
    lastPage: 1,
    pageNumbers: '',
    loaded: false,
    img_domain: userData.img_domain || '/aimeos'
  })

  function sortDropdown(options) {
    return options.map((item, key) => {
      return (
        <option value={item.value} key={key}>
          {item.label}
        </option>
      )
    })
  }

  function handleSorting(value) {
    if (value === '') {
      setState((prevState) => {
        return {
          ...prevState,
          selectedSortValue: ''
        }
      })
    }

    setSortItem({
      ...sortItem,
      selectedSortValue: value
    })
    fetchProductList(value)
    setLoadedImage(true)
  }

  const sortParam = (value) => {
    let sortUrlParam = ''
    switch (value) {
      case 'name_asc':
        sortUrlParam = `&sort=product.label`
        break
      case 'name_desc':
        sortUrlParam = `&sort=-product.label`
        break
      case 'price_asc':
        sortUrlParam = '&sort=price'
        break
      case 'price_desc':
        sortUrlParam = '&sort=-price'
        break
      default:
        break
    }

    return sortUrlParam
  }

  const handleSearch = (event) => {
    let text = event.target.value
    setSearchItem({
      ...searchItem,
      searchText: text
    })

    if (event.key === 'Enter') {
      fetchProductList()
    }
    setLoadedImage(true)
  }

  const handleSearchClick = (event) => {
    let text = event.target.value
    setSearchItem({
      ...searchItem,
      searchText: text
    })

    fetchProductList()
    setLoadedImage(true)
  }

  function handlePageClick(n) {
    setCurrentPage(n)
  }

  const handleNavigation = (change) => {
    setPagingConditions({
      ...pagingConditions,
      ...{ page: pagingConditions.page + change }
    })
  }

  const setCurrentPage = (n) => {
    setPagingConditions({ ...pagingConditions, ...{ page: n } })
  }

  const fetchProductList = useCallback(
    (value) => {
      let offset = pagingConditions.page * pagingConditions.limit - 10
      setLoadedImage(false)

      let searchParam =
        searchItem.searchText !== ''
          ? `&filter[%7E%3D][product.label]=${searchItem.searchText}`
          : ''
      let sortProduct = sortParam(value)

      axios({
        url: `/jsonapi/product?page[offset]=${offset}&page[limit]=${pagingConditions.limit}&include=media,text,price,stock${searchParam}${sortProduct}`,
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        if (!_.isEmpty(response.data)) {
          const pageNumbers = []
          let data = response.data
          let groupItems = []
          let prodPriceId, prodMediaId, prodTextId, prodStockId

          _.forEach(data.data, (items) => {
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
              let mediaObj = _.filter(data.included, (inc) => {
                return (
                  prodMediaId !== 0 &&
                  inc.type === 'media' &&
                  inc['id'] == prodMediaId
                )
              })

              let textObj = _.filter(data.included, (inc) => {
                return (
                  prodTextId !== null &&
                  inc.type === 'text' &&
                  inc['id'] == prodTextId
                )
              })

              let priceObj = _.filter(data.included, (inc) => {
                return (
                  prodPriceId !== null &&
                  inc.type === 'price' &&
                  inc['id'] === prodPriceId
                )
              })
              let stockObj = _.filter(data.included, (inc) => {
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
                meta: data.meta
              })
            }
          })
          // for pagination
          for (
            let i = 1;
            i <= Math.ceil(data.meta.total / pagingConditions.limit);
            i++
          ) {
            pageNumbers.push(i)
          }

          const renderPageNumbers = pageNumbers.map((number) => {
            return (
              <li
                key={number}
                id={number}
                onClick={() =>
                  pagingConditions.page === number
                    ? null
                    : pagingConditions.handlePageClick(number)
                }
                className=""
              >
                <span
                  className={
                    pagingConditions.page == number
                      ? `text-white bg-tertiary-500 rounded-2xl px-3 py-1`
                      : `text-tertiary-500 px-3 py-1`
                  }
                >
                  {number}
                </span>
              </li>
            )
          })
          const list = <ul id="page-numbers">{renderPageNumbers}</ul>
          setState((prevState) => {
            return {
              ...prevState,
              data: groupItems,
              pageCount: pageNumbers.length,
              pageNumbers: list,
              currentPage: pagingConditions.page,
              loaded: true
            }
          })
        }
      })
    },
    [pagingConditions, searchItem.searchText]
  )

  useEffect(() => {
    fetchProductList()
  }, [pagingConditions, fetchProductList])

  const productItem = (products) => {
    if (!_.isEmpty(products)) {
      return products.map((product, index) => {
        let prodDescription, prodPrice
        if (!_.isEmpty(product.text)) {
          prodDescription = product.text['text.content']
        }
        if (!_.isEmpty(product.price)) {
          prodPrice = _.parseInt(product.price['price.value']).toLocaleString(
            'jp'
          )
        }

        if (!_.isEmpty(prodDescription)) {
          prodDescription =
            prodDescription.length >= 80
              ? `${prodDescription.substring(0, 80)}...`
              : prodDescription
        }

        return state.loaded ? (
          <div className="prod-list overflow-hidden mx-2 mt-6 " key={index}>
            <div className="prod-list-img">
              {loadedImage ? (
                <div></div>
              ) : (
                <div className="bg-gray-100">
                  <div className="lg:w-full"></div>
                </div>
              )}
              <img
                className={loadedImage ? 'mx-auto' : 'hidden'}
                src={`${state.img_domain}/${product.media['media.preview']}`}
                onLoad={() => {
                  setLoadedImage(true)
                }}
              ></img>
            </div>
            <div className="prod-list-desc flex flex-col justify-between gap-10 pb-2">
              <div className="text-red-500 font-bold mt-2 line-clamp-2">
                {product.product['product.label'] ?? ''}
              </div>
              <div className="text-red-500 font-bold text-right">
                {`${prodPrice ?? '0'}円`}
              </div>
              <div className="text-gray-500 font-bold">商品說明</div>
              <p className="text-gray-400 text-left text-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: prodDescription
                  }}
                />
              </p>
              <div className="text-tertiary-500 underline font-bold text-sm pt-2 cursor-pointer">
                <Link
                  to={{
                    pathname: `/company/productDetail/?id=${product.product['product.id']}`,
                    detail: product
                  }}
                >
                  カートに追加
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // </div>
          <div className="h-full bg-gray-400"></div>
        )
      })
    }
    return <div className="grid grid-flow-row mx-2"> </div>
  }

  const ShoppingCart = () => {
    return (
      <div className="max-w-full h-24 bg-white box-border align-middle p-4 relative">
        <div className="float-right mr-3 flex space-x-3 ">
          {items.length !== 0 ? (
            <Link
              to={{
                pathname: `/company/cart`
              }}
            >
              <div className="flex">
                <span className="relative inline-block mr-3">
                  <img className="inline h-7 w-7 mr-2" src={shoppingCartIcon} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {items.length || 0}
                  </span>
                </span>
                <p className="inline-block self-end text-tertiary-500 underline font-bold text-sm pt-2 m-1 cursor-pointer">
                  カートの中をみる
                </p>
              </div>
            </Link>
          ) : (
            <>
              <div className="flex">
                <span className="relative inline-block mr-3">
                  <img className="inline h-7 w-7 mr-2" src={shoppingCartIcon} />
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                    {0}
                  </span>
                </span>
                <p className="inline-block self-end text-tertiary-500 underline font-bold text-sm pt-2 m-1 cursor-pointer">
                  商品はまだ追加されていません
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-primaryBg grid lg:grid-cols-4 md:grid-cols-1 gap-6 mx-10 mt-5 font-meiryo">
      <div className="md:col-span-1 lg:col-span-4 pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-2">
            <div className="pb-2 border-opacity-80 flex space-x-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="currentColor"
                className="text-tertiary-500 h-10 w-8"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" />
              </svg>
              <h2 className="text-tertiary-500 text-lg font-bold">物販</h2>
            </div>
          </div>
          <div
            id="widget-header"
            className="max-w-full h-24 bg-white box-border align-middle p-4 relative"
          >
            <div id="widget-name" className="float-right mr-3 flex space-x-3">
              <div className="table-cell relative h-20 w-full align-middle">
                <div className="bg-gray-100 h-12 rounded-lg w-80 mx-0 my-auto">
                  <select
                    type="text"
                    name="sort"
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left p-3 bg-arrow-down bg-no-repeat appearance-none text-tertiary-500 tex-right"
                    style={{
                      backgroundPosition: 'calc(100% - 1.2em) center'
                    }}
                    value={sortItem.selectedSortValue || ''}
                    onChange={(e) => {
                      handleSorting(e.target.value)
                    }}
                  >
                    <option value="">選択</option>
                    {sortDropdown(sortItem.sortDropdown)}
                  </select>
                </div>
              </div>
              <div className="table-cell relative h-20 w-full align-middle">
                <div className="bg-gray-100 h-12 rounded-lg w-96 mx-0 my-auto">
                  <svg
                    className="text-tertiary-500 font-bold fill-current w-auto h-11 float-left mt-0.5 p-3 cursor-pointer"
                    onClick={handleSearchClick}
                    xmlns="http://www.w3.org/2000/svg"
                    x="30px"
                    y="30px"
                    viewBox="0 0 487.95 487.95"
                    xmlSpace="preserve"
                  >
                    <g>
                      <path
                        d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
                      c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
                      c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z"
                      />
                    </g>
                  </svg>
                  <input
                    type="text"
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left placeholder-tertiary-500"
                    placeholder="商品名を検索"
                    onKeyUp={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <ShoppingCart />
          <div className="p-7">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 overflow-auto">
              {state.data ? productItem(state.data || []) : ''}
            </div>
          </div>
        </div>
        <div
          id="production-pagination"
          className="w-full h-12 p-3 text-center space-x-2 mt-3 col-span-3"
        >
          <Pagination
            listNumbers={state.pageNumbers}
            currentPage={state.currentPage}
            lastPage={state.pageCount}
            handleNavigation={handleNavigation}
          />
        </div>
      </div>
    </div>
  )
}

export default ProductList
