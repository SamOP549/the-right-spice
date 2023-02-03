import Head from 'next/head'
import ImageSlider from '../components/ImageSlider';
import Promotion from '../models/Promotion';
import Product from '../models/Product';
import mongoose from 'mongoose';
import spicescover from "../public/spices-cover.jpg"

export default function Home({ promotions, spices, combos }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
            <div className="flex items-center rounded bg-gray-100 p-8">
              <div className="mx-auto text-center lg:text-left">
                <h2 className="text-2xl font-bold">Spices</h2>

                <p className="mt-4 max-w-[45ch] text-sm text-gray-700">
                  Check out our new range of spices!!
                </p>

                <a
                  href="#"
                  className="mt-6 inline-block rounded bg-black px-6 py-3 text-sm text-white"
                >
                  View the Range
                </a>
              </div>
            </div>
            <div className='grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12'>
              <ImageSlider screen={1} items={spices} />
            </div>

          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
            <div className="flex items-center rounded bg-gray-100 p-8">
              <div className="mx-auto text-center lg:text-left">
                <h2 className="text-2xl font-bold">Combos</h2>

                <p className="mt-4 max-w-[45ch] text-sm text-gray-700">
                  Check out our newly launched Combos!!
                </p>

                <a
                  href="#"
                  className="mt-6 inline-block rounded bg-black px-6 py-3 text-sm text-white"
                >
                  View the Range
                </a>
              </div>
            </div>

            <div className='grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12'>
              <ImageSlider screen={1} items={combos} />
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
      else {
        spices[item.title].size = []
      }
    }
  }
  products = await Product.find({ category: "combos" })
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
  return { props: { promotions: JSON.parse(JSON.stringify(promotions)), spices: JSON.parse(JSON.stringify(spices)), combos: JSON.parse(JSON.stringify(combos)) } }
}
