import React from 'react'
import ReactDOM from 'react-dom'
import ProductList from './company/shop/ProductList'
import ProductDetail from './company/shop/ProductDetail'
import CartList from './company/shop/CartList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'

const CompanyShop = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/company/shop">
            <ProductList />
          </Route>
          <Route path="/company/productDetail">
            <CartProvider>
              <ProductDetail />
            </CartProvider>
          </Route>
          <Route path="/company/cart">
            <CartProvider>
              <CartList />
            </CartProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default CompanyShop
if (document.getElementById('companyShop')) {
  ReactDOM.render(<CompanyShop />, document.getElementById('companyShop'))
}
