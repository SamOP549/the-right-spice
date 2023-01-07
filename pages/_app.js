import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [cart, setCart] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [itemCount, setItemCount] = useState(0)
  const [user, setUser] = useState({ value: null })
  const [key, setKey] = useState(0)
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.error(error);
      localStorage.clear()
    }
    const myuser = JSON.parse(localStorage.getItem("myuser"))
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email })
    }
    setKey(Math.random())
  }, [router.query])

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
    toast.success('Item added to cart!😘', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    let newCart = JSON.parse(JSON.stringify(cart));
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty
      itemCount += qty
    }
    else {
      newCart[itemCode] = { itemCode, qty: qty, price, name, size, imageSrc, imageAlt, href }
      itemCount += qty;
    }
    setItemCount(itemCount)
    setCart(newCart)
    saveCart(newCart)
  }

  const buyNow = (itemCode, qty, price, name, size, imageSrc, imageAlt, href) => {
    let newCart = {}
    newCart[itemCode] = { itemCode, qty, price, name, size, imageSrc, imageAlt, href }
    setCart(newCart)
    saveCart(newCart)
    router.push('/checkout')
  }

  const logout = () => {
    localStorage.removeItem("myuser");
    setKey(Math.random())
    setUser({ value: null })
    router.push('/')
  }

  const removeFromCart = (itemCode, qty, price, name, size, imageSrc, imageAlt, href) => {
    toast.info('Item removed from cart!😢', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
    toast.warning('Cart Cleared!🤦‍♂️', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setItemCount(0)
    setCart({})
    saveCart({})
  }
  return (
    <div>
      <LoadingBar
        color='#DAA520'
        waitingTime={400}
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar logout={logout} user={user} key={key} cart={cart} itemCount={itemCount} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
      <Component buyNow={buyNow} cart={cart} itemCount={itemCount} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </div>
  )
}

export default MyApp
