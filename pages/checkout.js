import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal, itemCount }) => {
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [address, setAddress] = useState('')
  const [locality, setLocality] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const handleChange = async (e) => {
    setPinCode(e.target.value)
    if (e.target.value.length == 6) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      let pinJson = await pins.json()
      if (Object.keys(pinJson).includes(e.target.value)) {
        setCity(pinJson[e.target.value][0])
        setState(pinJson[e.target.value][1])
      }
    }
    else{
      setState('')
      setCity('')
    }
  }
  return (
    <section>
      <Head>
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
      </Head>
      <h1 className="sr-only">Checkout</h1>

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="py-12 bg-gray-50 md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <div className="flex items-center">
                <span className="w-10 h-10 bg-blue-900 rounded-full"></span>

                <h2 className="ml-4 font-medium">BambooYou</h2>
              </div>
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
                              src={cart[k].imageSrc}
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

          <div className="py-12 bg-white md:py-24">
            <div className="max-w-lg px-4 mx-auto lg:px-8">
              <form className="grid grid-cols-6 gap-4">
                <div className="col-span-3">
                  <label className="block mb-1 text-sm text-gray-600" for="first_name">
                    First Name
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                    type="text"
                    id="frst_name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                  />
                </div>

                <div className="col-span-3">
                  <label className="block mb-1 text-sm text-gray-600" for="last_name">
                    Last Name
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                    type="text"
                    id="last_name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block mb-1 text-sm text-gray-600" for="email">
                    Email
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="col-span-6">
                  <label className="block mb-1 text-sm text-gray-600" for="phone">
                    Phone
                  </label>

                  <input
                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
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
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="col-span-6">

                    <input
                      className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="town"
                      placeholder='Locality/Town'
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                    />
                  </div>

                  <div className="col-span-3">

                    <input
                      className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="city"
                      placeholder='City/District'
                      readOnly='true'
                      value={city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-span-3">

                    <input
                      className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="state"
                      placeholder='State'
                      readOnly='true'
                      value={state}
                      onChange={handleChange}
                    />
                  </div>
                </fieldset>

                <div className="col-span-6">
                  <button
                    className="rounded-lg bg-black text-sm p-2.5 text-white w-full block"
                    type="submit"
                  >
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout