import Head from 'next/head'
import Script from 'next/script'

export default function Home() {
  return (
    <div className='bg-white'>
      <Head>
        <title>The Right Spice</title>
        <meta name="description" content="The Right Spice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="carousel w-full">
        <div id="slide1" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" alt="img" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">&lt;</a>
            <a href="#slide2" className="btn btn-circle">&gt;</a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" alt="img" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="btn btn-circle">&lt;</a>
            <a href="#slide3" className="btn btn-circle">&gt;</a>
          </div>
        </div>
        <div id="slide3" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" alt="img" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="btn btn-circle">&lt;</a>
            <a href="#slide4" className="btn btn-circle">&gt;</a>
          </div>
        </div>
        <div id="slide4" className="carousel-item relative w-full">
          <img src="https://placeimg.com/800/200/arch" className="w-full" alt="img" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" className="btn btn-circle">&lt;</a>
            <a href="#slide1" className="btn btn-circle">&gt;</a>
          </div>
        </div>
      </div>
    </div>
  )
}
