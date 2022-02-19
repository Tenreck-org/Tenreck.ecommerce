import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

const subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };
  return (
    <div className="Cart">
      <div className="Product">
        <h1>Shopping Cart</h1>
        {/* Inside shopping cart */}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="Cart_card">
                  <div>
                    <img
                      src={"https://api.tenreck.com" + item.image}
                      alt={item.name}
                      className="Cart_product_image"
                    ></img>
                  </div>
                  <div className="">
                    <Link className="Cart_product_title" to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                    className="Cart_select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="Cart_price">${item.price}</div>
                  <div>
                    <button
                    className="Cart_remove"
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              {/* Subtotal */}
              <h2 className="Cart_subtotal">
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : <span className="Cart_price">$
                {Math.round(subtotal)}</span>
              </h2>
            </li>
            <li>
              {/* Checkout Button */}
              <button className="Cart_checkout"
                type="button"
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
