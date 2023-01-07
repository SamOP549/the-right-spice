import Link from 'next/link'
import React, { useState } from 'react'
import mongoose from 'mongoose';
import Article from '../../models/Article';

const Blog = ({ articles }) => {
    const [blogs, setBlogs] = useState(articles)

    const formatText = (oldText) => {
        let newText = oldText.slice(0,100)+"....."
        return newText
    }

    const formatDate = (d) => {
        let date = new Date(Date.parse(d));
        let dispDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`
        return dispDate
    }

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
                                blog.stage == 'Published' &&
                                <Link key={blog._id} href={`/blogs/${blog.slug}`} >
                                    <div className="group rounded-3xl  bg-white border-gray-200 border-2 dark:shadow-none bg-opacity-50 shadow-2xl shadow-gray-700 cursor-pointer hover:shadow-lg">
                                        <div className="relative overflow-hidden rounded-t-xl">
                                            <img src={blog.coverImg[0]['data_url']}
                                                alt="art cover" loading="lazy" width="1000" height="667" className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                                        </div>
                                        <div className="relative p-6 group-hover:-translate-y-2 transition-all">
                                            <h3 className="pt-4 text-xl font-semibold text-black">
                                                {blog.title}
                                            </h3>
                                            <p className="pt-4 mb-8 text-gray-500 text-base">
                                                {formatText(blog.text)}
                                            </p>
                                            <div className='pt-4 border-t flex items-center justify-between'>
                                                <span className="text-sm text-black">{formatDate(blog.updatedAt)}</span>
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
            </div>
        </div>
    )
}

export default Blog

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let articles = await Article.find().sort({ createdAt: -1 })
    return { props: { articles: JSON.parse(JSON.stringify(articles)) } }
}