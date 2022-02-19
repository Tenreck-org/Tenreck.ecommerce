import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./Screens/CartScreen";
import HomeScreen from "./Screens/HomeScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import OrderScreen from "./Screens/OrderScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import ProductListScreen from "./Screens/ProductListScreen";
import ProductScreen from "./Screens/ProductScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SigninScreen from "./Screens/SigninScreen";
import ProductEditScreen from "./Screens/ProductEditScreen";
import OrderListScreen from "./Screens/OrderListScreen";
import UserListScreen from "./Screens/UserListScreen";
import UserEditScreen from "./Screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./Screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./Screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./Screens/MapScreen";
import DashboardScreen from "./Screens/DashboardScreen";
import SupportScreen from "./Screens/SupportScreen";
import "./Navbar.css";
import PrivacyPolicy from "./Screens/P&Pscreen";
import Tos from "./Screens/TosScreen";
import discordIcon from "./static/logo-discord.svg";
import instagramIcon from "./static/logo-instagram.svg";
import twitterIcon from "./static/logo-twitter.svg";
import "./style/HomeScreen.css";
import "./style/ProductScreen.css";
import "./style/CardScreen.css";
function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  // sidebar category >>>
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="app">
        <div className="header">
          <div className="logo">
            <Link to="/">Tenreck</Link>
          </div>
          <div className="searchbar">
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div className="menu_content">
            <Link to="/cart" className="cart eff1">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <Link to="#" className="style-btn">
                {userInfo.name}{" "}
              </Link>
            ) : (
              <Link to="/signin" className="style-btn">
                Sign In
              </Link>
            )}
          </div>
          {userInfo ? (
            <div className="menu">
              <input type="checkbox" id="active" />
              <label for="active" class="menu-btn">
                <span></span>
              </label>
              <label for="active" class="close"></label>
              <div class="wrapper">
                <ul>
                  {userInfo ? (
                    <>
                      <li>
                        <Link className="eff1" to="/profile">
                          User Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/orderhistory">Order History</Link>
                      </li>
                      <li>
                        <Link
                          to="#signout"
                          className="style-btn"
                          onClick={signoutHandler}
                        >
                          Sign Out
                        </Link>
                      </li>
                    </>
                  ) : (
                    <div className="dropdown-content"></div>
                  )}
                  <li>
                    {userInfo && userInfo.isSeller && (
                      <>
                        <Link
                          to="#admin"
                          className="underline dropdown-content-link"
                        >
                          Seller
                        </Link>

                        <li>
                          <Link to="/productlist/seller">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist/seller">Orders</Link>
                        </li>
                      </>
                    )}
                  </li>
                  <li>
                    {userInfo && userInfo.isAdmin && (
                      <>
                        <li>
                          <Link
                            to="#admin"
                            className="underline dropdown-content-link"
                          >
                            Admin
                          </Link>
                        </li>
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                        <li>
                          <Link to="/productlist">Products</Link>
                        </li>
                        <li>
                          <Link to="/orderlist">Orders</Link>
                        </li>
                        <li>
                          <Link to="/userlist">Users</Link>
                        </li>
                        <li>
                          <Link to="/support">Support</Link>
                        </li>
                      </>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="nothing"></div>
          )}
        </div>

        {/* Routes */}
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>

          <AdminRoute
            path="/dashboard"
            component={DashboardScreen}
          ></AdminRoute>
          <AdminRoute path="/support" component={SupportScreen}></AdminRoute>

          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>

          <Route
            exact
            path="/privacyandpolicy"
            component={PrivacyPolicy}
          ></Route>
          <Route exact path="/termofcondition" component={Tos}></Route>
        </main>

        {/* create a button*/}

        {/* Footer >>> */}

        <footer className="row center">
          <div>
            <ul className="Social_icon">
              <li>
                <a href="">
                  <img className="footer_img" src={discordIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img className="footer_img" src={instagramIcon} alt="" />
                </a>
              </li>
              <li>
                <a href="">
                  <img className="footer_img" src={twitterIcon} alt="" />
                </a>
              </li>
            </ul>
            <ul className="menu">
              <li>
                <a href="/privacypolicy"> privacy and policy</a>
              </li>
              <li>
                <a href="/termofcondition"> term of conditions</a>
              </li>
              <li>
                <a href="/hiring"> Jobs </a>
              </li>
            </ul>
            <p>2022 Tenreck | All Rights Are Reserved</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
