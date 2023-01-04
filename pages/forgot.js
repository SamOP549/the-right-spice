import React from 'react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Forgot = () => {
    const router = useRouter()
    const [newpass, setNewpass] = useState('')
    const [confirmpass, setConfirmpass] = useState('')
    const [email, setEmail] = useState('')
    useEffect(() => {
        if (localStorage.getItem('myuser')) {
            router.push('/')
        }
    }, [])

    const sendResetEmail = async (e) => {
        e.preventDefault()
        let data = { email, sendMail: true }
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        console.log(res)
        if (res.success) {
            toast.success('Password Reset email sent!', {
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
            toast.error('Error!', {
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

    const resetPassword = async (e) => {
        e.preventDefault()
        if (newpass != confirmpass) {
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
            let data = { token: router.query.token, sendMail: false, newpass }
            const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const res = await t.json()
            if (res.success) {
                toast.success('Password changed Successfully!', {
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
    }

    return (
        <section className="bg-white">
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover bg-center lg:block lg:w-1/2" style={{ backgroundImage: "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')" }}>
                </div>
                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
                    {
                        router.query.token ?
                            <div className="w-full">
                                <div className="px-8 mb-4 text-center">
                                    <h3 className="pt-4 mb-2 text-2xl text-black">Enter your New Password</h3>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4">
                                        <label for="newpass" className="block mb-2 text-sm text-gray-600">New Password</label>
                                        <input value={newpass} onChange={(e) => setNewpass(e.target.value)} type="password" name="newpass" id="newpass" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mb-4">
                                        <label for="confirmpass" className="block mb-2 text-sm text-gray-600">Confirm New Password</label>
                                        <input value={confirmpass} onChange={(e) => setConfirmpass(e.target.value)} type="password" name="confirmpass" id="confirmpass" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button onClick={resetPassword} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Continue
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <Link href='/signup'>
                                            <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                                Create an Account!
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link href='/login'>
                                            <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                                Already have an account? Login!
                                            </a>
                                        </Link>
                                    </div>
                                </form>
                            </div> :
                            <div className="w-full">
                                <div className="px-8 mb-4 text-left">
                                    <h3 className="pt-4 mb-2 text-2xl text-black">Forgot Your Password?</h3>
                                    <p className="mb-4 text-sm text-gray-700">
                                        We get it, stuff happens. Just enter your email address below and we&apos;ll send you a
                                        link to reset your password!
                                    </p>
                                </div>
                                <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                                    <div className="mb-4">
                                        <label for="email" className="block mb-2 text-sm text-gray-600">Email Address</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    </div>
                                    <div className="mb-6 text-center">
                                        <button onClick={sendResetEmail} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            Reset Password
                                        </button>
                                    </div>
                                    <hr className="mb-6 border-t" />
                                    <div className="text-center">
                                        <Link href='/signup'>
                                            <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                                Create an Account!
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="text-center">
                                        <Link href='/login'>
                                            <a className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
                                                Already have an account? Login!
                                            </a>
                                        </Link>
                                    </div>
                                </form>
                            </div>
                    }
                </div>

            </div>
        </section>
    )
}

export default Forgot