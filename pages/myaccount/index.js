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
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [gender, setGender] = useState('')
    const [birthday, setBirthday] = useState('')
    const [altPhone, setAltPhone] = useState('')
    const [oldpass, setOldpass] = useState('')
    const [newpass, setNewpass] = useState('')
    const [confirmNewpass, setConfirmNewpass] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [user, setUser] = useState({ value: null })
    const [showPasswordModal, setShowPasswordModal] = useState(false)
    const [displayName, setDisplayName] = useState('')
    useEffect(() => {
        const myuser = JSON.parse(localStorage.getItem('myuser'))
        if (!myuser) {
            router.push('/')
        }
        if (myuser && myuser.token) {
            setUser(myuser)
            setEmail(myuser.email)
            fetchData(myuser.token)
        }
    }, [])

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
        setFname(res.fname)
        setLname(res.lname)
        setBirthday(res.birthday)
        setPhone(res.number)
        setAltPhone(res.altNumber)
        setGender(res.gender)
        setDisplayName(`${res.fname} ${res.lname}`)
    }

    const handleUserSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        let data = { token: user.token, fname, lname, phone, gender, birthday, altPhone }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        toast.success('User updated! ✅', {
            position: "bottom-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        router.reload()
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newpass != confirmNewpass) {
            toast.error('Passwords do not match!', {
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
            let data = { token: user.token, newpass, oldpass }
            const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const res = await t.json()
            console.log(res)
            if (res.error) {
                toast.error(res.error, {
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
                toast.success('Password updated successfully!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setShowPasswordModal(false)
                setNewpass('')
                setConfirmNewpass('')
                setOldpass('')
            }
        }
    }

    const handlePasswordUpdate = (e) => {
        const { name, value } = e.target
        if (name == 'oldpass') {
            setOldpass(value)
        }
        else if (name == 'newpass') {
            setNewpass(value)
        }
        else if (name == 'confirmpass') {
            setConfirmNewpass(value)
        }
    }

    const handleChange = async (e) => {
        if (e.target.name == 'fname') {
            setFname(e.target.value)
        }
        else if (e.target.name == 'lname') {
            setLname(e.target.value)
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value)
        }
        else if (e.target.name == 'gender') {
            setGender(e.target.value)
        }
        else if (e.target.name == 'birthday') {
            setBirthday(e.target.value)
        }
        else if (e.target.name == 'altPhone') {
            setAltPhone(e.target.value)
        }
    }

    const onClose = () => {
        setShowPasswordModal(false)
        setNewpass('')
        setConfirmNewpass('')
        setOldpass('')
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Fragment>
            <div className='px-10 py-10'>

                <h1 className='text-center mb-6 text-black font-extrabold text-2xl'>Your Profile</h1>

                <div className="mt-10 md:mt-0 md:bg-gray-100 md:px-8 md:py-8 pt-4 rounded-md">
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
                                            <p className="text-gray-600 text-lg m-1">{displayName}</p>
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
                                <div className='cursor-pointer hover:text-red-700 hover:bg-gray-100 rounded py-1 text-gray-500'>
                                    <p className="mt-1 text-sm ml-10 mb-2">Profile Information</p>
                                </div>
                                <Link href='/myaccount/addresses'>
                                    <div className='cursor-pointer hover:text-red-700 hover:bg-gray-100 rounded py-1 text-gray-500'>
                                        <p className="mt-1 text-sm ml-10 mb-2">Manage Addresses</p>
                                    </div>
                                </Link>
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
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="fname" className="block text-sm font-medium text-gray-700">
                                                    First name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    id="fname"
                                                    value={fname}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="lname" className="block text-sm font-medium text-gray-700">
                                                    Last name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    id="lname"
                                                    value={lname}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-4">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email address (Cannot be updated)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    value={email}
                                                    readOnly
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 cursor-not-allowed"
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                                    Gender
                                                </label>
                                                <select
                                                    id="gender"
                                                    name="gender"
                                                    value={gender}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                >
                                                    <option>Male</option>
                                                    <option>Female</option>
                                                    <option>Other</option>
                                                </select>
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Mobile Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                <label htmlFor="birthday" className="block text-sm font-medium text-gray-700">
                                                    Birthday (dd/mm/yyyy)
                                                </label>
                                                <input
                                                    type="text"
                                                    name="birthday"
                                                    id="birthday"
                                                    value={birthday}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                />
                                            </div>

                                            <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                <label htmlFor="altPhone" className="block text-sm font-medium text-gray-700">
                                                    Alternate Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="altPhone"
                                                    id="altPhone"
                                                    value={altPhone}
                                                    onChange={handleChange}
                                                    disabled={disabled}
                                                    className={`rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5 ${disabled ? 'cursor-not-allowed' : ''}`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-4 py-3 text-right sm:px-6 flex space-x-3 justify-end">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                setShowPasswordModal(true)
                                            }}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Change Password
                                        </button>
                                        {
                                            disabled ?
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setDisabled(false)
                                                    }}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Edit
                                                </button> :
                                                <button
                                                    onClick={handleUserSubmit}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Save
                                                </button>
                                        }
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Modal showPasswordModal={showPasswordModal} onClose={onClose} oldpass={oldpass} newpass={newpass} confirmNewpass={confirmNewpass} handlePasswordSubmit={handlePasswordSubmit} handlePasswordUpdate={handlePasswordUpdate} />

        </Fragment>
    )
}



export default Myaccount