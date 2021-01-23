import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Menu from  './components/Main/Menu';
import Home from  './components/Main/Home';
import LandingPage from  './components/Main/LandingPage';

import PrivateRoute from  './components/Main/PrivateRoute';

import Login from './components/users/Login';
import Register from './components/users/Register';
import Profile from './components/users/Profile';
import EditProfile from './components/users/EditProfile';
import StripeConnect from './components/users/StripeConnect';

import UserShops from  './components/shops/UserShops';
import ShopForm from  './components/shops/ShopForm';
import ShowShop from  './components/shops/ShowShop';
import EditShop from  './components/shops/EditShop';

import ProductForm from './components/products/ProductForm';
import EditProduct from './components/products/EditProduct';
import ShowProduct from './components/products/ShowProduct';
import Product from './components/products/Product';
import Cart from './components/products/Cart';

import ShopOrders from './components/orders/ShopOrders';

import AuctionList from './components/auctions/AuctionList';
import AuctionForm from './components/auctions/AuctionForm';
import AuctionShow from './components/auctions/AuctionShow';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/cart' component={Cart} />
        {/*Users Routes*/}
        <PrivateRoute exact path='/profile/:userId' component={Profile} />
        <PrivateRoute exact path='/profile/:userId/edit' component={EditProfile} />
        <PrivateRoute exact path='/seller/stripe/connect' component={StripeConnect} />
        {/*Shops Routes*/}
        <PrivateRoute exact path='/shops/:userId' component={UserShops} />
        <PrivateRoute exact path='/shop/new' component={ShopForm} />
        <PrivateRoute exact path='/shops/show/:shopId' component={ShowShop} />
        <PrivateRoute exact path='/shop/edit/:shopId' component={EditShop} />
        {/*Products Routes*/}
        <PrivateRoute exact path='/product/:shopId/create/:userId' component={ProductForm} />
        <PrivateRoute exact path='/product/:shopId/edit/:productId' component={EditProduct} />
        <PrivateRoute exact path='/product/:shopId/show/:productId' component={Product} />
        {/*Orders Routes*/}
        <PrivateRoute exact path='/orders/:shopId' component={ShopOrders} />

        {/*Auction Routes*/}
        <PrivateRoute exact path='/auctions' component={AuctionList} />
        <PrivateRoute exact path='/auctions/new/:userId' component={AuctionForm} />
        <PrivateRoute exact path='/auctions/show/:auctionId' component={AuctionShow} />
      </Switch>
    </div>
  );
}

export default App;
