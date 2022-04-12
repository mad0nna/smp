import React from 'react'
import ReactDOM from 'react-dom'
import ProductList from './company/shop/ProductList'
import ProductDetail from './company/shop/ProductDetail'
import CartList from './company/shop/CartList'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'

const CompanyShop = () => {
  let userId = JSON.parse(
    document.getElementById('userData').textContent
  ).userId
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/company/shop">
            <CartProvider id={userId}>
              <ProductList />
            </CartProvider>
          </Route>
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
            render={(props) => (
              <CartProvider id={userId}>
                <CartList {...props} />
              </CartProvider>
            )}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default CompanyShop
if (document.getElementById('companyShop')) {
  ReactDOM.render(<CompanyShop />, document.getElementById('companyShop'))
}
