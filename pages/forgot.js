import React from 'react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router';

const Forgot = () => {
    const router = useRouter()
    useEffect(() => {
        if(localStorage.getItem('token')){
          router.push('/')
        }
      }, [])
    return (
        <section className="bg-white">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover bg-center lg:block lg:w-1/2" style={{ backgroundImage: "url('https://source.unsplash.com/oWTW-jNGl9I/600x800')" }}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
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
                                <input type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                            </div>
                            <div className="mb-6 text-center">
                                <button class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
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
                </div>
            </div>
        </section >
    )
}

export default Forgot