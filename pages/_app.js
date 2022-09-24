import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)
  useEffect((cart) => {
    console.log("Hey I am a useEffect from _app.js")
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
  }, [])

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart))
    let subt = 0;
    let newCount = 0;
    let keys = Object.keys(myCart)
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty
    }
    for (let i = 0; i < keys.length; i++) {
      newCount += myCart[keys[i]].qty
    }
    setItemCount(newCount)
    setSubTotal(subt)
  }

  const addToCart = (itemCode, qty, price, name, size, imageSrc, imageAlt, href) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
      itemCount += qty
    }
    else {
      newCart[itemCode] = { itemCode, qty: 1, price, name, size, imageSrc, imageAlt, href }
      itemCount += 1;
    }
    setItemCount(itemCount)
    setCart(newCart)
    saveCart(newCart)
  }

  const removeFromCart = (itemCode, qty, price, name, size, imageSrc, imageAlt, href) => {
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty
      itemCount -= qty
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }
    setItemCount(itemCount)
    setCart(newCart)
    saveCart(newCart)
  }

  const clearCart = () => {
    console.log("Cart has been cleared")
    setItemCount(0)
    setCart({})
    saveCart({})
  }
  return (
    <div>
      <Navbar cart={cart} itemCount={itemCount} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} itemCount={itemCount} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
