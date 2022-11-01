import React from 'react'
import Image from 'next/image'
import combo from '../public/combo.jpg'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from "mongoose";

const Combos = ({ products }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto">
        <div>
          <span className="inline-block w-12 h-1 bg-red-700"></span>

          <h2
            className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
          >
            Combos
          </h2>
        </div>

        {Object.keys(products).length === 0 && <p className='mt-10 text-center'>Sorry, currently all the combos are out of stock. New stock coming soon! Stay tuned!</p>}
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {
            Object.keys(products).map((item) => {
              return (
                <Link passHref={true} href={`/product/${products[item].slug}`} key={products[item]._id}>
                  <a href="#" className="block shadow-2xl rounded-lg p-3">
                    <img
                      alt="Simple Watch"
                      src={products[item].img}
                      className="object-cover w-full rounded aspect-square"
                    />

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
                </Link>
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
  let products = await Product.find({ category: "combos" })
  let combos = {}
  for (let item of products) {
    if (item.title in combos) {
      if (!combos[item.title].size.includes(item.size) && item.availableQty > 0) {
        combos[item.title].size.push(item.size)
      }
    }
    else {
      combos[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        combos[item.title].size = [item.size]
      }
      else {
        combos[item.title].size = []
      }
    }
  }

  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(combos)) } }
}

export default Combos