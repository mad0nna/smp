import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../Pagination'
import { Link } from 'react-router-dom'
import _ from 'lodash'

const ProductList = () => {
  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })

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
    loaded: false
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
    fetchProductList()
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

  function fetchProductList() {
    let offset = (pagingConditions.page - 1) * pagingConditions.limit
    setLoadedImage(false)

    let searchParam =
      searchItem.searchText !== ''
        ? `&filter[%7E%3D][product.label]=${searchItem.searchText}`
        : ''

    let sortProduct = sortParam(sortItem.selectedSortValue)

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
              onClick={() => pagingConditions.handlePageClick(number)}
              className=""
            >
              <span
                className={
                  pagingConditions.page == number
                    ? `text-white bg-primary-200 rounded-2xl px-3 py-1`
                    : `text-primary-200 px-3 py-1`
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
  }

  useEffect(() => {
    fetchProductList()
  }, [])

  const productItem = (products) => {
    if (!_.isEmpty(products)) {
      return products.map((product, index) => {
        let prodDescription, prodPrice

        if (!_.isEmpty(product.text)) {
          prodDescription = product.text['text.content'].replace(/<[^>]+>/g, '')
        }
        if (!_.isEmpty(product.price)) {
          prodPrice = _.parseInt(product.price['price.value']).toLocaleString(
            'jp'
          )
        }

        return state.loaded ? (
          <div className="overflow-hidden mx-2" key={index}>
            {loadedImage ? (
              <div></div>
            ) : (
              <div
                className="bg-gray-100"
                style={{ height: '318px', width: '318px' }}
              >
                <div className="lg:w-full"></div>
              </div>
            )}
            <img
              style={{ height: '318px', width: '318px' }}
              className={loadedImage ? 'mx-auto w-full p-5' : 'hidden'}
              src={`/aimeos/${product.media['media.preview']}`}
              onLoad={() => {
                setLoadedImage(true)
              }}
            ></img>
            <div className="flex flex-col justify-between gap-2 pb-2 ">
              <div className="text-red-500 font-bold mt-2 h-10">
                {product.product['product.label'] ?? ''}
              </div>
              <div className="text-red-500 font-bold text-right">
                {`${prodPrice ?? '0'}円`}
              </div>
              <div className="text-gray-500 font-bold">商品說明</div>
              <p
                className="text-gray-400 text-left text-sm"
                style={{ height: '60px' }}
              >
                {prodDescription.substring(0, 65) + '...'}
              </p>
              <div className="text-primary-200 underline font-bold text-sm pt-2 cursor-pointer">
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

  return (
    <div className="bg-mainbg grid lg:grid-cols-4 md:grid-cols-1 gap-6 mx-10 mt-5 font-meiryo">
      <div className="md:col-span-1 lg:col-span-4 pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-2">
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
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left p-3 bg-arrow-down bg-no-repeat appearance-none text-primary-200 tex-right"
                    style={{
                      backgroundPosition: 'calc(100% - 1.2em) center'
                    }}
                    value={sortItem.selectedSortValue || ''}
                    onChange={(e) => {
                      handleSorting(e.target.value)
                    }}
                  >
                    <option value="">選別</option>
                    {sortDropdown(sortItem.sortDropdown)}
                  </select>
                </div>
              </div>
              <div className="table-cell relative h-20 w-full align-middle">
                <div className="bg-gray-100 h-12 rounded-lg w-96 mx-0 my-auto">
                  <svg
                    className="text-primary-200 font-bold fill-current w-auto h-11 float-left mt-0.5 p-3 cursor-pointer"
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
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left placeholder-primary-200"
                    placeholder="商品名を検索"
                    onKeyUp={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
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
