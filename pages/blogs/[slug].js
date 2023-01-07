import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Article from '../../models/Article'
import mongoose from 'mongoose'
import { Link } from '@mui/material'

const Blog = ({ article, articles }) => {
  const [recents, setRecents] = useState([])
  const router = useRouter()
  const { slug } = router.query
  console.log(article)

  useEffect(() => {
    if (articles) {
      setRecents(articles.slice(0, 5))
    }
  }, [articles])
  const formatDate = (d) => {
    let date = new Date(Date.parse(d));
    let dispDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`
    return dispDate
  }

  return (
    <div className='flex p-12 justify-start space-x-4'>
      <div className='w-4/5 p-12'>
        <h1 className='text-5xl font-bold'>{article.title}</h1>
        <p className='mt-4 text-gray-600'>{formatDate(article.updatedAt)}</p>
        <img className='mt-10' src={article.coverImg[0].data_url} alt='image' />
        <div className='mt-6 text-base' dangerouslySetInnerHTML={{ __html: article.excerpt }} />
      </div>
      <div className='w-1/5 pt-12'>
        <h1 className='text-lg font-medium'>Recent Posts</h1>
        <div className='bg-gray-200 h-px mt-2' />
        <div className='mt-4 flex-col'>
          {recents.map((recent, index) => (
            <Link key={index} href={`/blogs/${recent.slug}`}>
              <div className='group mt-4 flex gap-x-4 items-center hover:bg-gray-50 rounded'>
                <div className='w-1/3'>
                  <img className='h-12 w-full' src={recent.coverImg[0].data_url} alt='image' />
                </div>
                <div className='w-2/3'>
                  <h1 className='text-xs font-bold text-red-900 group-hover:text-red-700'>{recent.title}</h1>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog

export async function getServerSideProps(context) {
  let error = null
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let articles = await Article.find().sort({ createdAt: -1 })
  let article = await Article.findOne({ slug: context.query.slug })
  console.log(article)
  if (article == null) {
    return { props: { error: 404 } }
  }

  return { props: { article: JSON.parse(JSON.stringify(article)), articles: JSON.parse(JSON.stringify(articles)) } }
}