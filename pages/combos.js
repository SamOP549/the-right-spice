import React from 'react'
import Link from 'next/link'
import Combo from '../models/Combo'
import mongoose from "mongoose";

const Combos = ({ combos }) => {
  const discountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  }
  return (
    <section>
      <div className="px-6 py-8 mx-auto">
        <div>
          <span className="inline-block w-12 h-1 bg-red-700"></span>

          <h2
            className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
          >
            Combos
          </h2>
        </div>

        {Object.keys(combos).length === 0 && <p className='mt-10 text-center'>Sorry, currently all the combos are out of stock. New stock coming soon! Stay tuned!</p>}
        <div className="grid grid-cols-2 mt-8 lg:grid-cols-4 gap-x-4 gap-y-8">
          {
            Object.keys(combos).map((item) => {
              return (
                <Link passHref={true} href={`/combo/${combos[item].slug}`} key={combos[item]._id}>
                  <div className="block shadow-lg rounded-lg p-3 cursor-pointer hover:shadow-xl">
                    <img
                      alt="Simple Watch"
                      src={combos[item].img[0]["data_url"]}
                      className="object-cover w-full rounded aspect-square"
                    />

                    <h5 className="mt-4 text-xl text-black/90">
                      {combos[item].title}
                    </h5>

                    <div className="flex items-center justify-between mt-4 font-bold text-black">
                      <div className='flex space-x-2 items-center'>
                        {
                          combos[item].discount ?
                            <p className="text-xl text-red-700">₹{discountedPrice(combos[item].price, combos[item].discount).toFixed(2)}</p>
                            : null
                        }
                        <p className={`text-xl ${combos[item].discount ? "line-through decoration-red-700" : ""}`}>₹{combos[item].price.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
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
  let allcombos = await Combo.find()
  let combos = {}
  for (let item of allcombos) {
    combos[item._id] = item
  }

  // Pass data to the page via props
  return { props: { combos: JSON.parse(JSON.stringify(combos)) } }
}

export default Combos