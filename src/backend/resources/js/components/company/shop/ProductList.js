import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../../Pagination'
import { useHistory } from 'react-router-dom'
import _ from 'lodash'

const ProductList = () => {
  const history = useHistory()

  const [pagingConditions, setPagingConditions] = useState({
    page: 1,
    limit: 10,
    keyword: '',
    handlePageClick: handlePageClick
  })

  const handleDetailPageClick = (product) => {
    history.push({
      pathname: `/company/productDetail`,
      state: product
    })
  }

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
    lastPage: 1,
    pageNumbers: '',
    loaded: false,
    loadProductDetail: false,
    detailData: [],
    showProductDetail: false
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

  const handleSearch = (text) => {
    if (text === '') {
      setSearchItem({
        ...searchItem,
        searchText: ''
      })
    }
    setSearchItem({
      ...searchItem,
      searchText: text
    })
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
  useEffect(() => {
    let offset = (pagingConditions.page - 1) * pagingConditions.limit
    setLoadedImage(false)
    let searchParam =
      searchItem.searchText === ''
        ? ''
        : `&filter[%7E%3D][product.label]=${searchItem.searchText}`
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
        _.forEach(data.data, (items) => {
          // getting id from relationship media
          let prodMediaId = items.relationships.media.data[0]['id']
          // for long description
          let prodTextId = items.relationships.text.data[0]['id']
          //for price value
          let prodPriceId = items.relationships.price.data[0]['id']
          // for stock
          let prodStockId = items.relationships.stock.data[0]['id']

          if (!_.isEmpty(items) || items !== undefined) {
            groupItems.push({
              product: items.attributes,
              media:
                _.filter(data.included, (inc) => {
                  return inc.type === 'media' && inc['id'] === prodMediaId
                })[0].attributes ?? {},
              text:
                _.filter(data.included, (inc) => {
                  return inc.type == 'text' && inc['id'] == prodTextId
                })[0].attributes ?? {},
              price:
                _.filter(data.included, (inc) => {
                  return inc.type === 'price' && inc['id'] === prodPriceId
                })[0].attributes ?? {},
              stock:
                _.filter(data.included, (inc) => {
                  return inc.type === 'stock' && inc['id'] == prodStockId
                })[0].attributes ?? {}
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
            currentPage: data.meta.current,
            loaded: true
          }
        })
      }
    })
  }, [pagingConditions, searchItem, sortItem])

  const productItem = (products) => {
    if (!_.isEmpty(products)) {
      return products.map((product, index) => {
        let prodDescription = product.text['text.content'].replace(
          /<[^>]+>/g,
          ''
        )
        let prodPrice = _.parseInt(product.price['price.value']).toLocaleString(
          'jp'
        )
        return state.loaded ? (
          <div className="grid grid-flow-row mx-2" key={index}>
            {loadedImage ? (
              <div></div>
            ) : (
              <div className="bg-gray-100 h-full">
                <div className="lg:w-full 2xl:h-100"></div>
              </div>
            )}
            <img
              className={loadedImage ? 'mx-auto w-full p-5' : 'hidden'}
              src={product.media['media.preview']}
              onLoad={() => {
                setLoadedImage(true)
              }}
            ></img>

            <div className="gap-2 pb-2">
              <div className="text-red-500 font-bold mt-2">
                {product.product['product.label'] ?? ''}
              </div>
              <div className="text-red-500 font-bold text-right">
                {`¥ ${prodPrice}`}
              </div>
              <div className="text-gray-500 font-bold">商品說明</div>
              <p className="text-gray-400 text-left h-26">{prodDescription}</p>
              <div
                className="text-primary-200 underline font-bold text-sm mt-2 cursor-pointer"
                onClick={() => handleDetailPageClick(product)}
              >
                カートに追加
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full bg-gray-400"></div>
        )
      })
    }
    return <div className="grid grid-flow-row mx-2"> </div>
  }

  return (
    <div className="bg-mainbg grid lg:grid-cols-4 md:grid-cols-2 gap-6 mx-10 mt-5 font-meiryo">
      <div className="md:col-span-1 lg:col-span-4 pb-5">
        <div className="w-full rounded-lg shadow-xl overflow-hidden bg-white mb-10">
          <div className="px-3 pt-3 pb-2">
            <div className="pb-2 border-b border-green-800 border-opacity-80 flex space-x-4 items-center">
              <div className="bg-cart-icon h-10 w-8"></div>
              <h2 className="text-green-600 text-lg font-bold">物販</h2>
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
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left p-3 bg-arrow-down bg-no-repeat appearance-none text-green-600 tex-right"
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
                    className="text-green-600 font-bold fill-current w-auto h-11 float-left mt-0.5 p-3"
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
                    className="h-full w-80 bg-gray-100 custom-outline-none text-left placeholder-green-600"
                    placeholder="検索"
                    value={searchItem.searchText || ''}
                    onChange={(e) => {
                      handleSearch(e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div className="p-7">
            <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 overflow-auto">
              {productItem(state.data || [])}
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
