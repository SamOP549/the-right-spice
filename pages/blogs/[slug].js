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
    <div className='flex md:p-12 p-4 justify-start space-x-4'>
      <div className='md:w-4/5 w-full p-12'>
        <h1 className='text-5xl font-bold'>{article.title}</h1>
        <p className='mt-4 text-gray-600'>{formatDate(article.updatedAt)}</p>
        <img className='mt-10' src={article.coverImg[0].data_url} alt='image' />
        <div className='mt-6 text-base' dangerouslySetInnerHTML={{ __html: article.excerpt }} />
      </div>
      <div className='md:block hidden w-1/5 pt-12'>
        <h1 className='text-lg font-medium'>Recent Posts</h1>
        <div className='bg-gray-200 h-px mt-2' />
        <div className='mt-4 flex-col'>
          <ul>
            {recents.map((recent, index) => (
              <li key={index}>
                <Link href={`/blogs/${recent.slug}`}>
                  <p className='no-underline'>{recent.title}</p>
                </Link>
              </li>
            ))}
          </ul>
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