import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import Combo from '../../models/Combo'
import Product from '../../models/Product'
import mongoose from 'mongoose'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from 'next/error';
import Modal from '../../components/Modal'
import { Rating } from '@mantine/core'

const demo = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Prod({ buyNow, addComboToCart, combo, products, error }) {

    const router = useRouter()
    const { slug } = router.query
    const [pin, setPin] = useState()
    const [quantity, setQuantity] = useState(1)
    const [service, setService] = useState()
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState(
        {
            name: '',
            comment: '',
            description: '',
        }
    )
    const [showReviewModal, setShowReviewModal] = useState(false)

    let comboAvailability = true;
    combo.contents.map((spice) => {
        if (products[spice.value].availableQty < spice.qty) {
            comboAvailability = false;
        }
    })

    const comboReviews = combo.comments.filter((comment) => {
        return comment.approved === true
    })
    const totalRatings = comboReviews.reduce(
        (acc, comment) => acc + comment.rating,
        0
    )
    const avgRating = totalRatings / comboReviews.length;

    useEffect(() => {
        if (!error) {
            // console.log(products)
            // console.log(combo)
        }
    }, [router.query])

    const discountedPrice = (price, discount) => {
        return price - (price * discount) / 100;
    }

    const handleReview = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setReview(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const showModal = (e) => {
        e.preventDefault()
        setShowReviewModal(true)
    }

    const onClose = () => {
        setShowReviewModal(false)
    }

    const submitReview = async (e) => {
        e.preventDefault()
        const rvw = { name: review.name, rating: rating, comment: review.comment, description: review.description, approved: false }
        const data = { rvw, id: combo._id }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addcombocomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        if (res.success) {
            toast.success('Review added successfully!😎', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setRating(0)
            setReview(
                {
                    name: '',
                    comment: '',
                    description: '',
                }
            )
            onClose()
        }
    }

    const checkServiceability = async (e) => {
        e.preventDefault()
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(pin)) {
            setService(true)
            toast.success('Your Pincode is serviceable!😎', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else {
            setService(false)
            toast.error('Sorry, Pincode not serviceable!😒', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    if (error == 404) {
        return <Error statusCode={error} />
    }

    return (
        <div className="bg-white">
            <Modal showReviewModal={showReviewModal} onClose={onClose} review={review} handleReview={handleReview} rating={rating} setRating={setRating} submitReview={submitReview} />
            <div className="pt-6">

                {/* Image gallery */}
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
                        <img
                            src={combo.img[0]["data_url"]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={combo.img[1]["data_url"]}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                            <img
                                src={combo.img[2]["data_url"]}
                                alt=""
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
                        <img
                            src={combo.img[3]["data_url"]}
                            alt=""
                            className="h-full w-full object-cover object-center"
                        />
                    </div>
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{combo.title}</h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Combo information</h2>
                        <div className='flex items-center space-x-3'>
                            {
                                combo.discount ?
                                    <p className="text-3xl tracking-tight text-red-700">₹{discountedPrice(combo.price, combo.discount).toFixed(2)}</p>
                                    : null
                            }
                            <p className={`text-3xl tracking-tight text-gray-900 ${combo.discount ? "line-through decoration-red-700" : ""}`}>{comboAvailability ? "₹" + combo.price.toFixed(2) : "Out of Stock!"}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-6">
                            <h3 className="sr-only">Reviews</h3>
                            <div className="flex items-center">
                                <div className="flex items-center">
                                    <Rating defaultValue={avgRating} fractions={2} readOnly />
                                </div>
                                <p className="sr-only">{avgRating} out of 5 stars</p>
                                <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    {comboReviews.length} reviews
                                </p>
                            </div>
                        </div>

                        <form className="mt-10">

                            {/* Quantity */}
                            {
                                comboAvailability &&
                                <div className="mt-10">
                                    <div className="flex items-center space-x-4">
                                        <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                        <div className='flex space-x-4'>
                                            <div className='flex p-2 items-center'>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    onClick={() => {
                                                        if (quantity <= 1) {
                                                            setQuantity(1)
                                                        }
                                                        else {
                                                            setQuantity((prevValue) => prevValue - 1)
                                                        }
                                                    }}
                                                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <input
                                                    type="number"
                                                    id="quantity"
                                                    value={quantity}
                                                    readOnly
                                                    className="w-6 rounded border-gray-200 py-1 text-center text-base [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                                                />
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    onClick={() => {
                                                        setQuantity((prevValue) => prevValue + 1)
                                                    }}
                                                    fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:fill-black hover:text-white focus:scale-125">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            {/* Serviceability */}
                            <div className='mt-10'>
                                <h3 className="text-sm font-medium text-gray-900">Check Serviceability</h3>
                                <div className='pin mt-6 flex space-x-2'>
                                    <input className='px-2 border-2 border-black rounded-md' type='number' name='pin' onChange={(e) => setPin(e.target.value)} placeholder='Enter your Pincode' />
                                    <button onClick={checkServiceability} className="flex items-center justify-around gap-x-2 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Check</button>
                                </div>
                                {(service === false && service != null) && <div className='text-red-700 text-sm mt-3'>
                                    Sorry! We do not deliver to this pincode yet.
                                </div>}
                                {(service === true && service != null) && <div className='text-green-700 text-sm mt-3'>
                                    Yay! This pincode is serviceable.
                                </div>}
                            </div>

                            <button
                                disabled={!comboAvailability} type="button" onClick={() => { addComboToCart(slug, quantity, combo.discount > 0 ? discountedPrice(combo.price, combo.discount) : combo.price, combo.title, combo.contents, combo.img, "combo", `/combo/${slug}`) }}
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
                            >
                                Add to bag
                            </button>

                        </form>
                    </div>

                    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
                        {/* Description and details */}
                        <div>
                            <h3 className="sr-only">Description</h3>

                            <div className="space-y-6">
                                <p className="text-base text-gray-900">{combo.desc}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Contents:</h3>
                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {combo.contents.map((content) => (
                                        <li key={content.value} className="text-gray-400">
                                            <span className="text-gray-600">{content.qty} x {content.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {demo.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-10 mb-20">
                            <h2 className="text-sm font-medium text-gray-900">Details</h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">{demo.details}</p>
                            </div>
                        </div>

                        {/* Reviews */}
                        <section className="bg-white py-8 lg:py-16 border-t">
                            <div className="w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900">Reviews</h2>
                                    <button
                                        onClick={showModal}
                                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                                        Write a review
                                    </button>
                                </div>
                                {
                                    comboReviews.length > 0 ?
                                        comboReviews.map((comment, index) => {
                                            if (comment.approved == false) return
                                            return (
                                                <article key={index} className="py-3 mb-4 text-base bg-white rounded-lg">
                                                    <div className='flex justify-start'>
                                                        <div className='flex flex-col w-1/5'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mr-2">
                                                                <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                                            </svg>
                                                            <p className="my-2 inline-flex items-center text-sm font-medium text-gray-900 break-words">
                                                                {comment.name}
                                                            </p>
                                                            <Rating defaultValue={comment.rating} readOnly />
                                                        </div>
                                                        <div className='pt-1 w-4-5 break-words'>
                                                            <p className='text-sm font-medium text-gray-900 mb-2'>{comment.comment}</p>
                                                            <p className="text-sm text-gray-600">{comment.description}</p>
                                                        </div>
                                                    </div>
                                                </article>
                                            )
                                        }) :
                                        <p className='text-sm font-medium text-gray-900 mb-2'>No reviews yet!</p>
                                }
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    let error = null
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let combo = await Combo.findOne({ slug: context.query.slug })
    let product = await Product.find()
    let products = {}
    for (let item of product) {
        products[item._id] = { availableQty: item.availableQty }
    }
    if (combo == null) {
        return { props: { error: 404 } }
    }

    return { props: { error: error, combo: JSON.parse(JSON.stringify(combo)), products: JSON.parse(JSON.stringify(products)) } }
}