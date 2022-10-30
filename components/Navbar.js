import React from 'react'
import Image from 'next/image'
import dp from '../public/favicon.ico'
import Link from 'next/link'
import logo from '../public/logo.png'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal, itemCount }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='sticky top-0 z-20 shadow-lg'>
            <div className="navbar bg-white text-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                            <Link href="/"><li><a>Home</a></li></Link>
                            <Link href="/about"><li><a>About</a></li></Link>
                            <Link href="/spices"><li><a>Spices</a></li></Link>
                            <Link href="/combos"><li><a>Combos</a></li></Link>
                            <Link href="/recipes"><li><a>Recipes</a></li></Link>
                            <Link href="/contact"><li><a>Contact</a></li></Link>
                        </ul>
                    </div>
                    <Link href="/"><Image src={logo} alt='logo' height={109 * 0.8} width={150 * 0.8} /></Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal p-0">
                        <Link href="/"><li><a>Home</a></li></Link>
                        <Link href="/about"><li><a>About</a></li></Link>
                        <Link href="/spices"><li><a>Spices</a></li></Link>
                        <Link href="/combos"><li><a>Combos</a></li></Link>
                        <Link href="/recipes"><li><a>Recipes</a></li></Link>
                        <Link href="/contact"><li><a>Contact</a></li></Link>
                    </ul>
                </div>
                <div className="navbar-end space-x-2">
                    <button className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle" onClick={() => setOpen(true)}>
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{itemCount}</span>
                            </div>
                        </label>
                        <Transition.Root show={open} as={Fragment}>
                            <Dialog as="div" className="relative z-20" onClose={setOpen}>
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-in-out duration-500"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="ease-in-out duration-500"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                </Transition.Child>

                                <div className="fixed inset-0 overflow-hidden">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                                enterFrom="translate-x-full"
                                                enterTo="translate-x-0"
                                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                                leaveFrom="translate-x-0"
                                                leaveTo="translate-x-full"
                                            >
                                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                                            <div className="flex items-start justify-between">
                                                                <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                                                                <div className="ml-3 flex h-7 items-center">
                                                                    <button
                                                                        onClick={clearCart}
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500 mr-6">
                                                                        Clear Cart
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                                                                        onClick={() => setOpen(false)}>
                                                                        <span className="sr-only">Close panel</span>
                                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="mt-8">
                                                                <div className="flow-root">
                                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                        {Object.keys(cart).length == 0 && <div className='my-4 mx-auto'>No items in the cart</div>}
                                                                        {Object.keys(cart).map((k) => (
                                                                            <li className="flex py-6" key={k}>
                                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                    <Link href={cart[k].href} className='cursor-pointer'>
                                                                                        <img
                                                                                            src={cart[k].imageSrc}
                                                                                            alt={cart[k].imageAlt}
                                                                                            className="h-full w-full object-cover object-center"
                                                                                        />
                                                                                    </Link>
                                                                                </div>

                                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                                    <div>
                                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                            <h3>
                                                                                                <Link href={cart[k].href}>{cart[k].name}</Link>
                                                                                            </h3>
                                                                                            <p className="ml-4">₹{cart[k].price}</p>
                                                                                        </div>
                                                                                        <p className="mt-1 text-sm text-gray-500">{cart[k].size}</p>
                                                                                    </div>
                                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                                        <div className='flex'>
                                                                                            <p className="text-gray-500 mr-2">Qty</p>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { removeFromCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].imageSrc, cart[k].imageAlt, cart[k].href) }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                            </svg>
                                                                                            <p className="text-gray-500 mx-1">{cart[k].qty}</p>
                                                                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => { addToCart(k, 1, cart[k].price, cart[k].name, cart[k].size, cart[k].imageSrc, cart[k].imageAlt, cart[k].href) }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                            </svg>
                                                                                        </div>


                                                                                        <div className="flex">
                                                                                            <button
                                                                                                type="button"
                                                                                                onClick={() => { removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].imageSrc, cart[k].imageAlt, cart[k].href) }}
                                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                            >
                                                                                                Remove
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <p>Subtotal</p>
                                                                <p>₹{subTotal}</p>
                                                            </div>
                                                            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                            <Link href='/checkout'>
                                                                <div className="mt-6">
                                                                    <a onClick={() => setOpen(false)} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                                        </svg>
                                                                        Checkout
                                                                    </a>
                                                                </div>
                                                            </Link>
                                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                                <p>
                                                                    or
                                                                    <button
                                                                        type="button"
                                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                        onClick={() => setOpen(false)}
                                                                    >
                                                                        Continue Shopping
                                                                        <span aria-hidden="true"> &rarr;</span>
                                                                    </button>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dialog.Panel>
                                            </Transition.Child>
                                        </div>
                                    </div>
                                </div>
                            </Dialog>
                        </Transition.Root>
                    </div>
                    {
                        !user.value &&
                        <Link href='/login'>
                            <button className="btn btn-ghost">LogIn/SignUp</button>
                        </Link>
                    }
                    {
                        user.value &&
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                                <Link href='/myaccount'><li><a className="justify-between">Profile</a></li></Link>
                                <Link href='/orders'><li><a>Orders</a></li></Link>
                                <li><a>Settings</a></li>
                                <li onClick={logout}><a>Logout</a></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar