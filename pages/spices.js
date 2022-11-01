import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from "mongoose";
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Spices = ({ products, addToCart }) => {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [product, setProduct] = useState({})
  const [current, setCurrent] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const handleHover = (id, prod) => {
    setProduct(prod)
    setCurrent(id)
    setHover(true)
  }
  return (
    <section>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                    <button
                      type="button"
                      className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                      <div className="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                        <img src={product.img} alt={product.imageAlt} className="object-cover object-center" />
                      </div>
                      <div className="sm:col-span-8 lg:col-span-7">
                        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product.title}</h2>

                        <section aria-labelledby="information-heading" className="mt-2">
                          <h3 id="information-heading" className="sr-only">
                            Product information
                          </h3>

                          <p className="text-2xl text-gray-900">₹{product.price}</p>

                          {/* Reviews */}
                          <div className="mt-6">
                            <h4 className="sr-only">Reviews</h4>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                  <StarIcon
                                    key={rating}
                                    className={classNames(
                                      product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                      'h-5 w-5 flex-shrink-0'
                                    )}
                                    aria-hidden="true"
                                  />
                                ))}
                              </div>
                              <p className="sr-only">4 out of 5 stars</p>
                              <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                4 reviews
                              </a>
                            </div>
                          </div>
                        </section>

                        <section aria-labelledby="options-heading" className="mt-10">
                          <h3 id="options-heading" className="sr-only">
                            Product options
                          </h3>

                          <form>
                            {/* Sizes */}
                            <div className="mt-10">
                              <div className="flex items-center justify-start">
                                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                              </div>

                              <RadioGroup value={selectedSize} onChange={(e) => setSelectedSize(e)} className="mt-4">
                                <RadioGroup.Label className="sr-only"> Choose a size </RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4">
                                  { product.size && product.size.map((item, index) => (
                                    <RadioGroup.Option
                                      key={index}
                                      value={item}
                                      disabled={!item}
                                      className={({ active }) =>
                                        classNames(
                                          
                                           item ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                            : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                          active ? 'ring-2 ring-indigo-500' : '',
                                          'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">{item}</RadioGroup.Label>
                                          
                                          {item ? (
                                            <span
                                              className={classNames(
                                                active ? 'border' : 'border-2',
                                                checked ? 'border-indigo-500' : 'border-transparent',
                                                'pointer-events-none absolute -inset-px rounded-md'
                                              )}
                                              aria-hidden="true"
                                            />
                                          ) : (
                                            <span
                                              aria-hidden="true"
                                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                            >
                                              <svg
                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                viewBox="0 0 100 100"
                                                preserveAspectRatio="none"
                                                stroke="currentColor"
                                              >
                                                <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                              </svg>
                                            </span>
                                          )}
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>

                            <button
                              type="button"
                              onClick={() => { addToCart(product.slug, 1, product.price, product.title, selectedSize, product.img, "spice", `/product/${product.slug}`) }}
                              className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Add to bag
                            </button>
                          </form>
                        </section>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div>
          <span className="inline-block w-12 h-1 bg-red-700"></span>

          <h2
            className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
          >
            Spices
          </h2>
        </div>

        {Object.keys(products).length === 0 && <p className='mt-10 text-center'>Sorry, currently all the spices are out of stock. New stock coming soon! Stay tuned!</p>}
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {
            Object.keys(products).map((item) => {
              return (
                  <a href="#" className="block shadow-2xl rounded-lg p-3" key={products[item]._id} onMouseOver={() => handleHover(products[item]._id, products[item])}>
                    <div className='relative'>
                      {hover && (current == products[item]._id) && <button type="button" onClick={() => setOpen(true)} class="inline-block px-6 py-2 border-2 border-gray-400 text-gray-800 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out absolute bottom-0 w-full">Quick View</button>}
                      <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id}>
                      <img
                        alt="Simple Watch"
                        src={products[item].img}
                        className="object-cover w-full rounded aspect-square"
                      />
                      </Link>
                    </div>
                    <h5 className="mt-4 text-sm text-black/90">
                      {products[item].title}
                    </h5>

                    <div className="flex items-center justify-between mt-4 font-bold text-black">
                      <p className="text-lg">₹{products[item].price}</p>

                      <div className="text-xs tracking-wide">
                        {products[item].size.includes('50g') && <span className='border border-red-500 px-1 mx-1'>50g</span>}
                        {products[item].size.includes('100g') && <span className='border border-red-500 px-1 mx-1'>100g</span>}
                        {products[item].size.includes('150g') && <span className='border border-red-500 px-1 mx-1'>150g</span>}
                        {products[item].size.includes('200g') && <span className='border border-red-500 px-1 mx-1'>200g</span>}
                      </div>
                    </div>
                  </a>
              )
            })
          }
        </div>
      </div>
    </section>

  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let products = await Product.find({ category: "spices" })
  let spices = {}
  for (let item of products) {
    if (item.title in spices) {
      if (!spices[item.title].size.includes(item.size) && item.availableQty > 0) {
        spices[item.title].size.push(item.size)
      }
    }
    else {
      spices[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        spices[item.title].size = [item.size]
      }
      else{
        spices[item.title].size = []
      }
    }
  }

  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(spices)) } }
}

export default Spices