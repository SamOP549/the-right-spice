import Head from 'next/head'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ImageSlider from '../components/ImageSlider'

export default function Home() {
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

      <ImageSlider />
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch"
          >
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

            <Carousel className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12"
              responsive={responsive}
              draggable={true}
              swipeable={true}
              slidesToSlide={1}
            >
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 1</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 2</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 3</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 4</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 5</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 6</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
            </Carousel>
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

            <Carousel className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-3 lg:py-12"
              responsive={responsive}
              draggable={true}
              swipeable={true}
              slidesToSlide={1}
            >
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 1</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 2</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 3</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 4</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 5</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
              <div className='mx-1'>
                <a href="#" className="block">
                  <img
                    alt="Simple Watch"
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                    className="aspect-square w-full rounded object-cover"
                  />

                  <div className="mt-2">
                    <h3 className="font-medium">Simple Watch 6</h3>

                    <p className="mt-1 text-sm text-gray-700">$150</p>
                  </div>
                </a>
              </div>
            </Carousel>
          </div>
        </div>
      </section>

    </div>
  )
}
