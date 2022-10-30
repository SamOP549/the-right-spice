import Head from 'next/head'
import Script from 'next/script'
import ImageSlider from '../components/ImageSlider'

export default function Home() {
  return (
    <div className='bg-white'>
      <Head>
        <title>The Right Spice</title>
        <meta name="description" content="The Right Spice" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ImageSlider />
    </div>
  )
}
