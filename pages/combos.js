import React from 'react'
import Image from 'next/image'
import combo from '../public/combo.jpg'
import Link from 'next/link'

const Combos = () => {
  return (
    <div>
      <section class="text-gray-600 body-font bg-white">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap items-center justify-center">
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                  <p class="mt-1">$16.00</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                  <p class="mt-1">$21.15</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                  <p class="mt-1">$12.00</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                  <p class="mt-1">$18.40</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">The Catalyzer</h2>
                  <p class="mt-1">$16.00</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">Shooting Stars</h2>
                  <p class="mt-1">$21.15</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">Neptune</h2>
                  <p class="mt-1">$12.00</p>
                </div>
              </div>
            </Link>
            <Link href='/product/combo'>
              <div class="lg:w-1/5 md:w-1/3 p-4 w-3/5 shadow-xl rounded-xl m-4">
                <a class="block relative h-48 rounded overflow-hidden">
                  <Image alt="ecommerce" class="w-full h-full block relative" src={combo} />
                </a>
                <div class="mt-4">
                  <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">CATEGORY</h3>
                  <h2 class="text-gray-900 title-font text-lg font-medium">The 400 Blows</h2>
                  <p class="mt-1">$18.40</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Combos