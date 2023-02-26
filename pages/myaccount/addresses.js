import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Modal from '../../components/Modal'
import Link from 'next/link';

const Myaccount = () => {
    const router = useRouter()
    const [completeAddress, setcompleteAddresss] = useState({
        fname: '',
        lname: '',
        phone: '',
        pincode: '',
        address: '',
        locality: '',
        city: '',
        state: ''
    })
    const [addresses, setAddresses] = useState([])
    const [user, setUser] = useState({ value: null })
    const [showAddressModal, setShowAddressModal] = useState(false)
    const [addressFunction, setaddressFunction] = useState('')
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            fetchData(myuser.token)
        }
    }, [])

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const fetchData = async (token) => {
        let data = { token: token }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        setAddresses(res.addresses)
    }

    const handleAddressSave = async (e) => {
        e.preventDefault();
        if (completeAddress.fname == '' || completeAddress.lname == '' || completeAddress.phone == '' || completeAddress.pincode == '' || completeAddress.address == '' || completeAddress.locality == '') {
            setShowAddressModal(false)
            return
        }
        let data = { token: user.token, completeAddress, addressFunction }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuseraddress`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        toast.success('Addresses Updated!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setShowAddressModal(false)
        fetchData(user.token)
    }

    const openModal = (e) => {
        e.preventDefault()
        setcompleteAddresss({
            fname: '',
            lname: '',
            phone: '',
            pincode: '',
            address: '',
            locality: '',
            city: '',
            state: ''
        })
        setaddressFunction('add')
        setShowAddressModal(true)
    }

    const onClose = () => {
        setShowAddressModal(false)
    }

    const handleCAChange = async (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        if (name == 'pincode') {
            setcompleteAddresss(prevState => ({
                ...prevState,
                [name]: value
            }))
            if (value.length == 6) {
                let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
                let pinJson = await pins.json()
                if (Object.keys(pinJson).includes(value)) {
                    setcompleteAddresss(prevState => ({
                        ...prevState,
                        city: pinJson[value][0],
                        state: pinJson[value][1]
                    }));
                }
            }
            else {
                setcompleteAddresss(prevState => ({
                    ...prevState,
                    city: '',
                    state: ''
                }));
            }
        }
        else {
            setcompleteAddresss(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    const editAddress = (address) => {
        setcompleteAddresss(address)
        setaddressFunction('update')
        setShowAddressModal(true)
    }

    const deleteAddress = async (address) => {
        let data = { token: user.token, address, addressFunction: 'delete' }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuseraddress`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        toast.warning('Address deleted!', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        fetchData(user.token)
    }
    return (
        <Fragment>
            <div className='px-10 py-10'>

                <h1 className='text-center mb-6 text-black font-extrabold text-2xl'>Your Profile</h1>

                <div className="mt-10 sm:mt-0 sm:bg-gray-100 sm:px-8 sm:py-8 pt-4 rounded-md">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className='md:block hidden'>
                            <div className="md:col-span-1">
                                <div className="px-2 py-2 bg-white rounded-md shadow mb-4">
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                                        </svg>
                                        <div className="mx-4">
                                            <p className="text-gray-900 text-sm leading-none m-1">Hello,</p>
                                            <p className="text-gray-600 text-lg m-1">Samarth Jain</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="py-2 bg-white rounded-md shadow">
                                <div className='text-lg font-medium leading-6 text-gray-900 mb-2 px-4 flex align-bottom'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    <h3 className='ml-2'>Account Settings</h3>
                                </div>
                                <Link href='/myaccount'>
                                    <div className='cursor-pointer hover:text-red-700 hover:bg-gray-100 rounded py-1 text-gray-500'>
                                        <p className="mt-1 text-sm ml-10 mb-2">Profile Information</p>
                                    </div>
                                </Link>
                                <div className='cursor-pointer hover:text-red-700 hover:bg-gray-100 rounded py-1 text-gray-500'>
                                    <p className="mt-1 text-sm ml-10 mb-2">Manage Addresses</p>
                                </div>
                                <div className="hidden sm:block" aria-hidden="true">
                                    <div className="py-1">
                                        <div className="border-t border-gray-200" />
                                    </div>
                                </div>
                                <div className='text-lg font-medium leading-6 text-gray-900 mb-2 px-4 pt-2 flex align-bottom hover:text-red-500 cursor-pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
                                    </svg>
                                    <h3 className="px-4">Logout</h3>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end md:hidden'>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                                        Navigate
                                        <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <Link href='/myaccount'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href=""
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Profile Information
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Link>
                                            <Link href='/myaccount/addresses'>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <a
                                                            href=""
                                                            className={classNames(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Manage Addresses
                                                        </a>
                                                    )}
                                                </Menu.Item>
                                            </Link>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            <form action="#" method="POST">
                                <div className="overflow-hidden shadow rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <button onClick={openModal} className="w-full px-6 py-3 text-sm font-medium border-black border tracking-wide text-red-700 capitalize transition-colors duration-300 transform flex bg-white rounded-md align-center space-x-2 justify-start z-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            <p className='my-auto text-base'>Add New Address</p>
                                        </button>

                                        {
                                            addresses.map((address, index) => {
                                                return (
                                                    <div key={index} className='mt-3'>
                                                        <div className='w-full px-6 py-3 text-sm font-medium text-black transform rounded-md border'>
                                                            <div className='flex-col space-y-3'>
                                                                <div className='flex justify-between'>
                                                                    <p className='font-bold'>{address.fname} {address.lname}</p>
                                                                    <Menu as="div" className="relative inline-block text-left">
                                                                        <div>
                                                                            <Menu.Button>
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                                                </svg>
                                                                            </Menu.Button>
                                                                        </div>

                                                                        <Transition
                                                                            as={Fragment}
                                                                            enter="transition ease-out duration-100"
                                                                            enterFrom="transform opacity-0 scale-95"
                                                                            enterTo="transform opacity-100 scale-100"
                                                                            leave="transition ease-in duration-75"
                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                            leaveTo="transform opacity-0 scale-95"
                                                                        >
                                                                            <Menu.Items className="absolute right-4 top-0 z-10 mt-2 w-16 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                                <div className='flex-col'>
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a onClick={() => editAddress(address)}
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                                                                    'block px-2 py-2 text-xs bg-white'
                                                                                                )}>
                                                                                                Edit
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <a
                                                                                                onClick={() => deleteAddress(address)}
                                                                                                className={classNames(
                                                                                                    active ? 'bg-gray-100 text-gray-900 cursor-pointer' : 'text-gray-700',
                                                                                                    'block px-2 py-2 text-xs bg-white'
                                                                                                )}>
                                                                                                Delete
                                                                                            </a>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>
                                                                            </Menu.Items>
                                                                        </Transition>
                                                                    </Menu>
                                                                </div>
                                                                <p>Mobile Number: {address.phone}</p>
                                                                <p>{address.address}, {address.locality}, {address.city}, {address.state} {address.pincode}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Modal showAddressModal={showAddressModal} onClose={onClose} completeAddress={completeAddress} handleCAChange={handleCAChange} handleAddressSave={handleAddressSave} />

        </Fragment>
    )
}



export default Myaccount