import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import { display } from '@mui/system';

const Post = ({ buyNow, addToCart, product, variants, error }) => {
  const router = useRouter()
  const { slug } = router.query
  const [pin, setPin] = useState()
  const [quantity, setQuantity] = useState(1)
  const [service, setService] = useState()
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [size, setSize] = useState()
  const [displayImg, setDisplayImg] = useState('')

  useEffect(() => {
    if (!error) {
      setSize(product.size)
      setDisplayImg(product.img[0]['data_url'])
    }
  }, [router.query])

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
    let pinJson = await pins.json()
    if (Object.keys(pinJson).includes(pin)) {
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

  const refreshVariant = (newsize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newsize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={error} />
  }

  return (
    <section>
      <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
        <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
            <img
              alt={product.title}
              src={product.img[0]["data_url"]}
              className="object-cover w-full aspect-square rounded-xl"
            />

            <div className="grid grid-cols-2 gap-4 lg:mt-4">
              {
                product.img.map((img, index) => {
                  if (index == 0) return;
                  return (
                    <img
                      alt={product.title}
                      key={index}
                      src={product.img[index]["data_url"]}
                      className="object-cover w-full aspect-square rounded-xl"
                    />
                  )
                })
              }
            </div>
          </div>

          <div className="sticky top-0">

            <div className="flex justify-between mt-8">
              <div className="max-w-[35ch]">
                <h1 className="text-2xl font-bold">
                  {product.title}
                </h1>

                <p className="mt-0.5 text-sm">{product.size}</p>

                <div className="mt-2 -ml-0.5 flex">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="w-5 h-5 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>

                  <svg
                    className="w-5 h-5 text-gray-200"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-lg font-bold">{product.availableQty <= 0 ? "Out of Stock!" : "₹" + product.price}</p>
            </div>

            <details
              className="group relative mt-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="block">
                <div>
                  <div className="prose max-w-none group-open:hidden">
                    <p>
                      {product.desc}
                    </p>
                  </div>
                </div>
              </summary>
            </details>

            <form className="mt-8">

              <fieldset className="mt-4">

                <div className="flex items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => { refreshVariant(e.target.value) }} className="rounded border appearance-none border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-sm pl-3 pr-7 py-1">
                      {size && Object.keys(variants).map((variant) => {
                        return (
                          <option key={variant} value={variant}>{variant}</option>
                        )
                      })}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </fieldset>
              <div className="flex flex-col">
                <div className='flex mt-4 space-x-4'>
                  {
                    product.availableQty > 0 &&
                    <div className='flex p-2 items-center'>
                      <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          if (quantity <= 1) {
                            setQuantity(1)
                          }
                          else {
                            setQuantity((prevValue) => prevValue - 1)
                          }
                        }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        className="w-6 rounded border-gray-200 py-1 text-center text-base [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setQuantity((prevValue) => prevValue + 1)
                        }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }
                  <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, quantity, product.price, product.title, product.size, product.img, "spice", `/product/${slug}`) }} className="px-5 py-3 ml-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500 flex items-center gap-x-2">Add To Cart
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </button>
                </div>
                <div className='mt-4'>
                  <button disabled={product.availableQty <= 0} onClick={() => { buyNow(slug, quantity, product.price, product.title, product.size, product.img, "spice", `/product/${slug}`) }} className="disabled:bg-blue-400 flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-2xl w-full  ">Buy Now</button>
                </div>
              </div>
              <div className='pin mt-6 flex space-x-2'>
                <input className='px-2 border-2 border-black rounded-md' type='number' name='pin' onChange={(e) => setPin(e.target.value)} placeholder='Enter your Pincode' />
                <button onClick={checkServiceability} className="flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
              </div>
              {(service === false && service != null) && <div className='text-red-700 text-sm mt-3'>
                Sorry! We do not deliver to this pincode yet.
              </div>}
              {(service === true && service != null) && <div className='text-green-700 text-sm mt-3'>
                Yay! This pincode is serviceable.
              </div>}
              <div>
                <p className="text-base lg:leading-tight leading-normal text-gray-600 mt-7">It is a long established fact that a reader will be distracted by thereadable content of a page when looking at its layout. The point of usingLorem Ipsum is that it has a more-or-less normal distribution of letters.</p>
                <p className="text-base leading-4 mt-7 text-gray-600">Product Code: 8BN321AF2IF0NYA</p>
                <p className="text-base leading-4 mt-4 text-gray-600">Length: 13.2 inches</p>
                <p className="text-base leading-4 mt-4 text-gray-600">Height: 10 inches</p>
                <p className="text-base leading-4 mt-4 text-gray-600">Depth: 5.1 inches</p>
                <p className="md:w-96 text-base leading-normal text-gray-600 mt-4">Composition: 100% calf leather, inside: 100% lamb leather</p>
              </div>
              <div>
                <div className="border-t border-b py-4 mt-7 border-gray-200">
                  <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                    <p className="text-base leading-4 text-gray-800">Shipping and returns</p>
                    <button
                      className="
    							cursor-pointer
    							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
    							rounded
    						"
                      aria-label="show or hide"
                    >
                      <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                    You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are nonrefundable
                  </div>
                </div>
              </div>
              <div>
                <div className="border-b py-4 border-gray-200">
                  <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                    <p className="text-base leading-4 text-gray-800">Contact us</p>
                    <button
                      className="
    							cursor-pointer
    							focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
    							rounded
    						"
                      aria-label="show or hide"
                    >
                      <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                  <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                    If you have any questions on how to return your item to us, contact us.
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  let error = null
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let product = await Product.findOne({ slug: context.query.slug })
  if (product == null) {
    return { props: { error: 404 } }
  }
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

  return { props: { error: error, product: JSON.parse(JSON.stringify(product)), variants: JSON.parse(JSON.stringify(sizeSlug)) } }
}

export default Post