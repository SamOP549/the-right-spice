import Head from 'next/head'
import ImageSlider from '../components/ImageSlider';
import Promotion from '../models/Promotion';
import Product from '../models/Product';
import mongoose from 'mongoose';
import Link from 'next/link';

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
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[600px]">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src="https://images.unsplash.com/photo-1593795899630-b6033c0fa58d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
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
            <div className="group relative block">
              <div className="relative h-[350px] sm:h-[600px]">
                <img
                  src="https://images.unsplash.com/photo-1593795899768-947c4929449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                />

                <img
                  src="https://images.unsplash.com/photo-1593795899630-b6033c0fa58d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                  alt=""
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
