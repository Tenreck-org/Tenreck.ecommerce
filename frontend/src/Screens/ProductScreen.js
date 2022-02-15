import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createReview, detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants";

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (successReviewCreate) {
      window.alert("Review Submitted Successfully");
      setRating("");
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
    }
    dispatch(detailsProduct(productId));
  }, [dispatch, productId, successReviewCreate]);
  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      );
    } else {
      alert("Please enter comment and rating");
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="product">
          <div>
            <div className="main_product_detail card">
              <img
                className="product_img_main"
                src={"https://api.tenreck.com" + product.image}
                alt={product.name}
              ></img>

              <div className="product_detail_1">
                <ul className="main_product_ul">
                  <li>
                    <h1 className="product_title">{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li>
                  <li className="product price">Price : ${product.price}</li>
                  <li className="product_description">
                    Description:
                    <p>{product.description}</p>
                  </li>
                </ul>

                <div className="card-body ">
                  <ul className="main_product_ul">
                    <li className="product_seller">
                      Seller{" "}
                      <h2>
                        <Link
                          className="product_seller"
                          to={`/seller/${product.seller._id}`}
                        >
                          {product.seller.seller.name}
                        </Link>
                      </h2>
                      <Rating
                        rating={product.seller.seller.rating}
                        numReviews={product.seller.seller.numReviews}
                      ></Rating>
                    </li>
                    <li>
                      <div className="product price">
                        <div>Price</div>
                        <div>${product.price}</div>
                      </div>
                    </li>
                    <li>
                      <div className="product_status">
                        <div>Status</div>
                        <div className="product_status_content">
                          {product.countInStock > 0 ? (
                            <span className="success">In Stock</span>
                          ) : (
                            <span className="danger">Unavailable</span>
                          )}
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="product_seller">
                            {/* <div>Quantity</div>
                          <div>
                            <select className='Qty'
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div> */}
                          </div>
                        </li>
                        <li>
                          <Link
                            onClick={addToCartHandler}
                            className="add_to_cart"
                          >
                            Add to Cart
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="comments">
            <h2 id="reviews">Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li className="card comment_user" key={review._id}>
                  <h3 className="username">{review.name}</h3>
                  <Rating rating={review.rating} caption=" "></Rating>
                  <p className="date">{review.createdAt.substring(0, 10)}</p>
                  <p className="comment_content">{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className="review_form card" onSubmit={submitHandler}>
                    <div>
                      <h2 className="review_title">Write a customer review</h2>
                    </div>
                    <div className="rating_select">
                      <label className="rating_label" htmlFor="rating">
                        Rating
                      </label>
                      <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1- Poor</option>
                        <option value="2">2- Fair</option>
                        <option value="3">3- Good</option>
                        <option value="4">4- Very good</option>
                        <option value="5">5- Excelent</option>
                      </select>
                    </div>
                    <div className="comment">
                      <label className="comment_label" htmlFor="comment">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className="comment_submit" type="submit">
                        Submit
                      </button>
                    </div>
                    <div>
                      {loadingReviewCreate && <LoadingBox></LoadingBox>}
                      {errorReviewCreate && (
                        <MessageBox variant="danger">
                          {errorReviewCreate}
                        </MessageBox>
                      )}
                    </div>
                  </form>
                ) : (
                  <MessageBox>
                    Please <Link to="/signin">Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
