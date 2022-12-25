import Link from 'next/link'
import React from 'react'

const Blog = () => {
    const blogs = [1, 2, 3, 4, 56, 7, 8, 56, 45, 4]
    return (
        <div>
            <div className="max-w-screen-xl mx-auto p-4">
                <section className="text-gray-800">
                    <div className="container max-w-6xl mx-auto space-y-6 sm:space-y-12">
                        <div>
                            <span className="inline-block w-12 h-1 bg-red-700"></span>
                            <h2 className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black">
                                Latest from our Blog
                            </h2>
                        </div>
                        <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {blogs.map((blog, index) => (
                                <Link key={index} href={`/blogs/${blog}`} >
                                    <div className="group rounded-3xl  bg-white border-gray-200 border-2 dark:shadow-none bg-opacity-50 shadow-2xl shadow-gray-700 cursor-pointer hover:shadow-lg">
                                        <div className="relative overflow-hidden rounded-t-xl">
                                            <img src="https://images.unsplash.com/photo-1661749711934-492cd19a25c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
                                                alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="relative p-6 group-hover:-translate-y-2 transition-all">
                                            <h3 className="pt-4 text-xl font-semibold text-black">
                                                De fuga fugiat lorem ispum laboriosam expedita.
                                            </h3>
                                            <p className="pt-4 mb-8 text-gray-500 text-base">
                                                Voluptates harum aliquam totam, doloribus eum impedit atque! Temporibus...
                                            </p>
                                            <div className='pt-4 border-t flex items-center justify-between'>
                                                <span className="text-sm text-black">January 21, 2021</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-black ">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            ))}
                        </div>
                        <div className="flex justify-center">
                            <button type="button" className="px-6 py-3 text-sm rounded-md hover:underline bg-gray-50 text-gray-600">Load more posts...</button>
                        </div>
                    </div>
                </section>
            </div >
        </div >
    )
}

export default Blog