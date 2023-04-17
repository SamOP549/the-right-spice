import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Modal from '../components/Modal'

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal, itemCount }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })
  const [addresses, setAddresses] = useState([])
  const [activeAddress, setActiveAddress] = useState({ value: null })
  const [showAddressModal, setShowAddressModal] = useState('')
  const [guest, setGuest] = useState(false)
  const [completeAddress, setcompleteAddresss] = useState({
    fname: '',
    lname: '',
    phone: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: ''
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))
    if (user && user.token) {
      setUser(user)
      setEmail(user.email)
      fetchAdresses(user.token)
      setShowAddressModal(false)
    }
    console.log(cart)
  }, [])

  useEffect(() => {
    if (completeAddress.fname && email && completeAddress.phone.length >= 3 && completeAddress.address.length >= 3 && completeAddress.locality && completeAddress.pincode.length >= 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [completeAddress.fname, completeAddress.lname, completeAddress.email, completeAddress.phone, completeAddress.pincode, completeAddress.address, completeAddress.locality])

  const fetchAdresses = async (token) => {
    let data = { token: token }
    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await t.json()
    console.log(res)
    setAddresses(res.addresses)
  }

  const initializeRazorpay = () => {
    if (!guest) {
      if (!user.token) {
        alert('Please login to continue')
        router.push('/login')
        return
      }
    }
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (e) => {
    e.preventDefault();

    const res = await initializeRazorpay();

    if (!res) {
      console.log("Razorpay SDK Failed to load");
      return;
    }
    const sendData = { subTotal, cart, email, completeAddress };

    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/checkout`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
    const data = await t.json()
    console.log(data)
    if (data.error) {
      if (data.cartClear) {
        console.log(data)
        clearCart()
      }
      toast.error(data.error, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      var options = {
        "key": process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
        "name": "The Right Spice",
        "currency": data.currency,
        "amount": data.amount,
        "order_id": data.id,
        "description": "Thankyou for your purchase",
        "image": "",
        "callback_url": `${process.env.NEXT_PUBLIC_HOST}/api/paymentverification`,
        "redirect": true,
        "prefill": {
          "name": "Manu Arora",
          "email": "manuarorawork@gmail.com",
          "contact": "9999999999",
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#d20404"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    }
  }

  const handleGuestCheckout = () => {
    setGuest(document.getElementById('guest').checked)
  }

  const onClose = () => {
    setShowAddressModal(false)
  }

  const handleAddress = (id) => {
    let selectedAddress = addresses.find((a) => a.id == id)
    setActiveAddress(selectedAddress)
    setcompleteAddresss(selectedAddress)
    setDisabled(false)
  }

  const handleAddressSave = async () => {
    let data = { token: user.token, completeAddress, addressFunction: 'add' }
    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuseraddress`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await t.json()
    setShowAddressModal(false)
  }

  const handleChange = async (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    if (name == 'pincode') {
      setcompleteAddresss(prevState => ({
        ...prevState,
        [name]: value
      }))
      if (value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(value)) {
          setcompleteAddresss(prevState => ({
            ...prevState,
            city: pinJson[value][0],
            state: pinJson[value][1]
          }));
        }
      }
      else {
        setcompleteAddresss(prevState => ({
          ...prevState,
          city: '',
          state: ''
        }));
      }
    }
    else {
      setcompleteAddresss(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }
  return (
    <section>
      <Modal showAddressModal={showAddressModal} onClose={onClose} completeAddress={completeAddress} handleCAChange={handleChange} handleAddressSave={handleAddressSave} />
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-8 bg-gray-50 md:py-16">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              {
                Object.keys(cart).length == 0 ?
                  <div className='my-4 mx-auto'>No items in the cart</div> :
                  <div className="mt-8">
                    <p className="text-2xl font-medium tracking-tight">₹{subTotal}</p>
                    <p className="mt-1 text-sm text-gray-500">For the purchase of</p>
                  </div>
              }


              <div className="mt-12">
                <div className="flow-root">
                  <ul className="-my-4 divide-y divide-gray-200">

                    {
                      Object.keys(cart).map((k) => (
                        <li className="flex items-center justify-between py-4" key={k}>
                          <div className="flex items-start">
                            <img
                              alt={cart[k].imageAlt}
                              src={cart[k].imageSrc[0]["data_url"]}
                              className="flex-shrink-0 object-cover w-16 h-16 rounded-lg"
                            />

                            <div className="ml-4 text-black">
                              <p className="text-sm">{cart[k].name}</p>

                              <dl className="mt-1 text-xs text-gray-500 space-y-1">
                                <div>
                                  <dt className="inline">Size:</dt>
                                  <dd className="inline">{cart[k].size}</dd>
                                </div>
                              </dl>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-black">
                              ₹{cart[k].price}
                              <small className="text-gray-500"> x{cart[k].qty}</small>
                            </p>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="py-8 bg-white md:py-16">
            {
              addresses && user.token ?
                <div className="max-w-lg px-4 mx-auto lg:px-8">
                  <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-medium tracking-tight">Select an Address:</h2>
                    <button
                      className="disabled:bg-gray-300 rounded-lg bg-black text-sm p-2.5 text-white block"
                      onClick={() => setShowAddressModal(true)}
                    >
                      + Add Address
                    </button>
                  </div>
                  {
                    addresses.map((address, index) => {
                      return (
                        <div key={index} className='mt-3 cursor-pointer hover:scale-105 transition-all' onClick={() => handleAddress(address.id)}>
                          <div className={`w-full px-6 py-3 text-sm font-medium text-black transform rounded-md border focus:border-red-700 active:border-red-700 ${activeAddress.id == address.id ? "border-red-700" : ""}`}>
                            <div className='flex-col space-y-3'>
                              <div className='flex justify-between'>
                                <p className='font-bold'>{address.fname} {address.lname}</p>
                              </div>
                              <p>Mobile Number: {address.phone}</p>
                              <p>{address.address}, {address.locality}, {address.city}, {address.state} {address.pincode}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  <div className="col-span-6 mt-6">
                    <Link href='/checkout' >
                      <button
                        className="disabled:bg-gray-300 rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                        onClick={initiatePayment}
                        disabled={disabled}
                      >
                        Pay Now
                      </button>
                    </Link>
                  </div>
                </div>
                :
                <div className="max-w-lg px-4 mx-auto lg:px-8">
                  <h2 className="text-2xl font-medium tracking-tight">Shipping details</h2>
                  <form className="grid grid-cols-6 gap-4 mt-4">
                    {
                      !user.token &&
                      <div className="form-check col-span-6">
                        <input className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="guest" onClick={handleGuestCheckout} />
                        <label className="form-check-label inline-block text-md text-gray-600" for="flexCheckDefault">
                          Continue as a guest
                        </label>
                      </div>
                    }
                    <div className="col-span-3">
                      <label className="block mb-1 text-sm text-gray-600" htmlFor="first_name">
                        First Name
                      </label>

                      <input
                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                        type="text"
                        id="frst_name"
                        value={completeAddress.fname}
                        name='fname'
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-3">
                      <label className="block mb-1 text-sm text-gray-600" htmlFor="last_name">
                        Last Name
                      </label>

                      <input
                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                        type="text"
                        id="last_name"
                        value={completeAddress.lname}
                        name='lname'
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6">
                      <label className="block mb-1 text-sm text-gray-600" htmlFor="email">
                        Email
                      </label>

                      {
                        user && user.token ?
                          <input
                            className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                            type="email"
                            id="email"
                            value={user.email}
                            name='email'
                            readOnly
                            onChange={handleChange}
                          /> :
                          <input
                            className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                            type="email"
                            id="email"
                            value={email}
                            name='email'
                            onChange={(e) => setEmail(e.target.value)}
                          />
                      }
                    </div>

                    <div className="col-span-6">
                      <label className="block mb-1 text-sm text-gray-600" htmlFor="phone">
                        Phone
                      </label>

                      <input
                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                        type="tel"
                        id="phone"
                        value={completeAddress.phone}
                        name='phone'
                        onChange={handleChange}
                      />
                    </div>

                    <fieldset className="col-span-6 grid grid-cols-6 gap-4">
                      <legend className="block mb-1 text-sm text-gray-600">
                        Billing Address
                      </legend>
                      <div className="col-span-6">

                        <input
                          className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                          type="number"
                          id="pincode"
                          placeholder='Pin Code'
                          value={completeAddress.pincode}
                          name='pincode'
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-6">

                        <input
                          className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                          type="text"
                          id="address"
                          placeholder='Address(House No, Building, Street, Area)'
                          value={completeAddress.address}
                          name='address'
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-6">

                        <input
                          className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                          type="text"
                          id="town"
                          placeholder='Locality/Town'
                          value={completeAddress.locality}
                          name='locality'
                          onChange={handleChange}
                        />
                      </div>

                      <div className="col-span-3">

                        <input
                          className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                          type="text"
                          id="city"
                          placeholder='City/District'
                          readOnly
                          value={completeAddress.city}
                          name='city'
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-span-3">

                        <input
                          className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                          type="text"
                          id="state"
                          placeholder='State'
                          readOnly
                          value={completeAddress.state}
                          name='state'
                          onChange={handleChange}
                        />
                      </div>
                    </fieldset>
                    <div className="col-span-6">
                      <Link href='/checkout' >
                        <button
                          className="disabled:bg-gray-300 rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                          onClick={initiatePayment}
                          disabled={disabled}
                        >
                          Pay
                        </button>
                      </Link>
                    </div>

                  </form>
                </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout