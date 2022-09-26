import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Product from '../../models/Product'
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Post = ({ buyNow, addToCart, product, variants }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [quantity, setQuantity] = useState(1)
  const [service, setService] = useState()
  const checkServiceability = async () => {
    let pins = await fetch('http://localhost:3000/api/pincode')
    let pinJson = await pins.json()
    if (pinJson.includes(parseInt(pin))) {
      setService(true)
      toast.success('Your Pincode is serviceable!😎', {
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
      setService(false)
      toast.error('Sorry, Pincode not serviceable!😒', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const [size, setSize] = useState(product.size)

  const refreshVariant = (newsize) => {
    setSize(newsize)
    let url = `http://localhost:3000/product/${variants[newsize]['slug']}`
    window.location = url
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full h-64 object-cover object-center rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">THE RIGHT SPICE</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size})</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value) }} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {Object.keys(variants).includes('50g') && <option>50g</option>}
                      {Object.keys(variants).includes('100g') && <option>100g</option>}
                      {Object.keys(variants).includes('150g') && <option>150g</option>}
                      {Object.keys(variants).includes('200g') && <option>200g</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="title-font font-medium text-2xl text-gray-900">₹{product.price}</span>
                <div className='flex'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      if (quantity <= 1) {
                        setQuantity((prevValue) => prevValue - 1)
                      }
                    }}
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 mx-1">{quantity}</p>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setQuantity((prevValue) => prevValue + 1)
                    }}
                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button onClick={() => { addToCart(slug, quantity, product.price, product.title, product.size, product.img, "spice", `/product/${slug}`) }} className="flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add To Cart
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </button>
                <button onClick={() => { buyNow(slug, quantity, product.price, product.title, product.size, product.img, "spice", `/product/${slug}`) }} className="flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
              </div>
              <div className='pin mt-6 flex space-x-2'>
                <input className='px-2 border-2 border-black rounded-md' type='number' name='pin' onChange={(e) => setPin(e.target.value)} placeholder='Enter your Pincode' />
                <button onClick={checkServiceability} className="flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
                <ToastContainer
                  position="bottom-center"
                  autoClose={2000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
              {(service === false && service != null) && <div className='text-red-700 text-sm mt-3'>
                Sorry! We do not deliver to this pincode yet.
              </div>}
              {(service === true && service != null) && <div className='text-green-700 text-sm mt-3'>
                Yay! This pincode is serviceable.
              </div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  let variants = await Product.find({ title: product.title, category: product.category })
  let sizeSlug = {}
  for (let item of variants) {
    if (Object.keys(sizeSlug).includes(item.size)) {
      sizeSlug[item.size] = { slug: item.slug }
    }
    else {
      sizeSlug[item.size] = {}
      sizeSlug[item.size] = { slug: item.slug }
    }
  }

  return { props: { product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(sizeSlug)) } }
}

export default Post