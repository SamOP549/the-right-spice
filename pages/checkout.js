import React from 'react'

const Checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal, itemCount }) => {
  return (
    <section>
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
                    />
                  </div>

                  <div className="col-span-6">

                    <input
                      className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="address"
                      placeholder='Address(House No, Building, Street, Area)'
                    />
                  </div>

                  <div className="col-span-6">

                    <input
                      className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="town"
                      placeholder='Locality/Town'
                    />
                  </div>

                  <div className="col-span-3">

                    <input
                      className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="city"
                      placeholder='City/District'
                      disabled
                    />
                  </div>
                  <div className="col-span-3">

                    <input
                      className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                      type="text"
                      id="state"
                      placeholder='State'
                      disabled
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