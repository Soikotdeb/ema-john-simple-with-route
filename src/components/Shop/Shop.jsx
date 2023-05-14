import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // pagination state
  const [currentpage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // added the website theme
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [isDarkTheme]);
  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // pagination start
  // determine the total number of items
  const { totalProducts } = useLoaderData();

  // decide the number items of per page
  const totalPages = Math.ceil(
    totalProducts / itemsPerPage
  ); /* calculate  the items and pages */

  const pageNumber = [...Array(totalPages).keys()];
  // pagination end

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentpage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentpage, itemsPerPage]);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const ids = Object.keys(storedCart);
    fetch(`http://localhost:5000/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
          // step 2: get product from products state by using id
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          if (addedProduct) {
            // step 3: add quantity
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the added product to the saved cart
            savedCart.push(addedProduct);
          }
          // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
      });
  }, []);

  const handleAddToCart = (product) => {
    // cart.push(product); '
    let newCart = [];
    // const newCart = [...cart, product];
    // if product doesn't exist in the cart, then set quantity = 1
    // if exist update quantity by 1
    const exists = cart.find((pd) => pd._id === product._id);
    if (!exists) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      exists.quantity = exists.quantity + 1;
      const remaining = cart.filter((pd) => pd._id !== product._id);
      newCart = [...remaining, exists];
    }

    setCart(newCart);
    addToDb(product._id);
  };

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  const options = [5, 10, 15, 20];

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Product
              key={product._id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>
        <div className="cart-container">
          <Cart cart={cart} handleClearCart={handleClearCart}>
            <Link className="proceed-link" to="/orders">
              <button className="btn-proceed">
                Review Order <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Link>
          </Cart>
        </div>
      </div>

      {/* pagination button  */}
      <div className="pagination">
        <p>
          <small>currentPage: {currentpage}</small>
        </p>
        {pageNumber.map((number) => (
          <button
            key={number}
            className={currentpage === number ? "selected" : ""}
            onClick={() => setCurrentPage(number)}
          >
            {" "}
            {number}{" "}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div> 
        <p><small>Choice Your Theme</small></p>
        <input type="checkbox" id="theme-toggle" onClick={handleThemeChange} />
        <label htmlFor="theme-toggle"></label>
      </div>
    </>
  );
};

export default Shop;
