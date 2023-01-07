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

  const setDisplayImage = (event) => {
    setDisplayImg(event.target.src)
  }


  const refreshVariant = (newsize) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newsize]['slug']}`
    router.push(url)
  }

  if (error == 404) {
    return <Error statusCode={error} />
  }

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden bg-white">
        <div className="container py-24 md:px-0 px-4 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className='lg:w-1/2 w-full flex justify-start items-start max-h-max lg:pr-10'>
              <div className='w-1/5 flex flex-col justify-center content-center space-y-6'>
                {
                  product.img.map((img, index) => {
                    return (
                      <img key={img} onClick={setDisplayImage} alt="ecommerce" className="w-full border border-[3px] border-red-700 active:border-amber-700 hover:opacity-80" src={img["data_url"]} />
                    )
                  })
                }
              </div>
              <div className='w-4/5 pl-6 h-full'>
                <img alt="ecommerce" className="w-4/5 mx-auto my-10" src={displayImg} />
              </div>
            </div>
            <div className="lg:w-1/2 w-full lg:py-6 mt-6 lg:mt-0">
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
                      {size && Object.keys(variants).includes('50g') && <option>50g</option>}
                      {size && Object.keys(variants).includes('100g') && <option>100g</option>}
                      {size && Object.keys(variants).includes('150g') && <option>150g</option>}
                      {size && Object.keys(variants).includes('200g') && <option>200g</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className='flex space-x-4'>
                  <span className="title-font font-medium text-2xl text-gray-900">{product.availableQty <= 0 ? "Out of Stock!" : "₹" + product.price}</span>
                </div>
                <div className='flex mt-4 space-x-4'>
                  {
                    product.availableQty > 0 &&
                    <div className='flex p-2'>
                      <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          if (quantity <= 1) {
                            setQuantity(1)
                          }
                          else{
                            setQuantity((prevValue) => prevValue - 1)
                          }
                        }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 text-lg px-1">{quantity}</p>
                      <svg xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          setQuantity((prevValue) => prevValue + 1)
                        }}
                        fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  }
                  <button disabled={product.availableQty <= 0} onClick={() => { addToCart(slug, quantity, product.price, product.title, product.size, product.img, "spice", `/product/${slug}`) }} className="disabled:bg-blue-400 flex items-center gap-x-3 content-center justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-2xl w-full ">Add To Cart
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
            </div>
          </div>
        </div>
      </section>
    </div>
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