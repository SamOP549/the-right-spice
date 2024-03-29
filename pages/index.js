import Head from 'next/head'
import ImageSlider from '../components/ImageSlider';
import Promotion from '../models/Promotion';
import Product from '../models/Product';
import mongoose from 'mongoose';
import Link from 'next/link';
import Combo from '../models/Combo';

export default function Home({ promotions, spices, combos }) {
  console.log(spices, combos)
  return (
    <div className='bg-white'>
      <Head>
        <title>The Right Spice</title>
        <meta name="description" content="The Right Spice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ display: 'flex' }}>
        <ImageSlider screen={0} promotions={promotions} />
      </div>
      <section>
        <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            <div className="group relative block">
              <div className="relative h-[350px] md:h-full">
                <img
                  src="./newrange/new-spices-2.jpg"
                  alt="Spices Spoons"
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src="./newrange/new-spices-1.jpg"
                  alt="Spices Spoons 2"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Spices</h3>

                <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                  Check out our newly launched spices!!
                </p>
                <Link href="/spices">
                  <span
                    className="mt-3 cursor-pointer inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </span>
                </Link>
              </div>
            </div>

            <div className='grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-8 my-auto'>
              <ImageSlider screen={1} items={spices} category="product" />
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
            <div className="group relative block">
              <div className="relative h-[350px] md:h-full">
                <img
                  src="./newrange/new-combos-2.jpg"
                  alt="Spices bowls"
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src="./newrange/new-combos-1.jpg"
                  alt="Spices bowls 2"
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                />
              </div>

              <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 className="text-xl font-medium text-white">Combos</h3>

                <p className="mt-1.5 max-w-[40ch] text-xs text-white">
                  Check out our newly launched combos!!
                </p>
                <Link href="/combos">
                  <span
                    className="mt-3 cursor-pointer inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                  >
                    Shop Now
                  </span>
                </Link>
              </div>
            </div>

            <div className='grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-8 my-auto'>
              <ImageSlider screen={1} items={combos} category="combo" />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let promotions = await Promotion.find()
  let products = await Product.find()
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
      else {
        spices[item.title].size = []
      }
    }
  }
  let combos = {}
  combos = await Combo.find();
  return { props: { promotions: JSON.parse(JSON.stringify(promotions)), spices: JSON.parse(JSON.stringify(spices)), combos: JSON.parse(JSON.stringify(combos)) } }
}
