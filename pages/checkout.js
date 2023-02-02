import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal, itemCount }) => {
  const router = useRouter()
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [address, setAddress] = useState('')
  const [locality, setLocality] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [user, setUser] = useState({ value: null })
  const [addresses, setAddresses] = useState([])
  const [activeAddress, setActiveAddress] = useState({ value: null })
  const [addAddress, setAddAddress] = useState('')
  const [guest, setGuest] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'))
    if (user && user.token) {
      setUser(user)
      setEmail(user.email)
      fetchAdresses(user.token)
      setAddAddress(false)
    }
  }, [])

  useEffect(() => {
    if (fname && email && phone.length >= 3 && address.length >= 3 && locality && pinCode.length >= 3) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }, [fname, lname, email, phone, pinCode, address, locality])

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
    setAddresses(res.addresses)
  }

  const initializeRazorpay = () => {
    if(!guest){
      if(!user.value){
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

    const sendData = { subTotal, cart, email, fname, lname, address, pinCode, phone, locality, city, state };

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

  const handleAddress = (id) => {
    let selectedAddress = addresses.find((a) => a.CA_id == id)
    setActiveAddress(selectedAddress)
    setFname(selectedAddress.CA_fname)
    setLname(selectedAddress.CA_lname)
    setPhone(selectedAddress.CA_phone)
    setAddress(selectedAddress.CA_address)
    setLocality(selectedAddress.CA_locality)
    setPinCode(selectedAddress.CA_pincode)
    setCity(selectedAddress.CA_city)
    setState(selectedAddress.CA_state)
  }

  const handleAddressSave = async () => {
    let completeAddress = {
      "CA_fname": fname,
      "CA_lname": lname,
      "CA_phone": phone,
      "CA_pincode": pinCode,
      "CA_address": address,
      "CA_locality": locality,
      "CA_city": city,
      "CA_state": state
    }
    let data = { token: user.token, completeAddress, addressFunction: 'add' }
    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuseraddress`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const res = await t.json()
    setAddAddress(false)
  }

  const handleChange = async (e) => {
    if (e.target.name == 'fname') {
      setFname(e.target.value)
    }
    else if (e.target.name == 'lname') {
      setLname(e.target.value)
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value)
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value)
    }
    else if (e.target.name == 'locality') {
      setLocality(e.target.value)
    }
    else if (e.target.name == 'pincode') {
      setPinCode(e.target.value)
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0])
          setState(pinJson[e.target.value][1])
        }
      }
      else {
        setState('')
        setCity('')
      }
    }
  }
  return (
    <section>

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
              addresses && user.token && !addAddress ?
                <div className="max-w-lg px-4 mx-auto lg:px-8">
                  <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-medium tracking-tight">Select an Address:</h2>
                    <button
                      className="disabled:bg-gray-300 rounded-lg bg-black text-sm p-2.5 text-white block"
                      onClick={() => setAddAddress(true)}
                    >
                      + Add Address
                    </button>
                  </div>
                  {
                    addresses.map((address, index) => {
                      return (
                        <div key={index} className='mt-3 cursor-pointer hover:scale-105 transition-all' onClick={() => handleAddress(address.CA_id)}>
                          <div className={`w-full px-6 py-3 text-sm font-medium text-black transform rounded-md border focus:border-red-700 active:border-red-700 ${activeAddress.CA_id == address.CA_id ? "border-red-700" : ""}`}>
                            <div className='flex-col space-y-3'>
                              <div className='flex justify-between'>
                                <p className='font-bold'>{address.CA_fname} {address.CA_lname}</p>
                              </div>
                              <p>Mobile Number: {address.CA_phone}</p>
                              <p>{address.CA_address}, {address.CA_locality}, {address.CA_city}, {address.CA_state} {address.CA_pincode}</p>
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
                      <div class="form-check col-span-6">
                        <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="guest" onClick={handleGuestCheckout} />
                        <label class="form-check-label inline-block text-md text-gray-600" for="flexCheckDefault">
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
                        value={fname}
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
                        value={lname}
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
                            onChange={handleChange}
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
                        value={phone}
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
                          value={pinCode}
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
                          value={address}
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
                          value={locality}
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
                          value={city}
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
                          value={state}
                          name='state'
                          onChange={handleChange}
                        />
                      </div>
                    </fieldset>
                    {
                      user && user.token ?
                        <div className="col-span-6">
                          <button
                            className="disabled:bg-gray-300 rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                            onClick={handleAddressSave}
                          >
                            Save Address
                          </button>
                        </div>
                        :
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
                    }
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