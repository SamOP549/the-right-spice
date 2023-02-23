import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Article from '../../models/Article'
import mongoose from 'mongoose'
import { Link } from '@mui/material'
import Modal from '../../components/Modal'
import { Rating } from '@mantine/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = ({ article, articles }) => {
  const [recents, setRecents] = useState([])
  const router = useRouter()
  const { slug } = router.query
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState(
    {
      name: '',
      comment: '',
      description: '',
    }
  )
  const [showReviewModal, setShowReviewModal] = useState(false)
  const articleReviews = article.comments.filter((comment) => {
    return comment.approved === true
  })

  useEffect(() => {
    if (articles) {
      setRecents(articles.slice(0, 5))
    }
  }, [articles])

  const showModal = (e) => {
    e.preventDefault()
    setShowReviewModal(true)
  }

  const onClose = () => {
    setShowReviewModal(false)
  }

  const handleReview = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setReview(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const submitReview = async (e) => {
    e.preventDefault()
    const rvw = { name: review.name, rating: rating, comment: review.comment, description: review.description, approved: false }
    const data = { rvw, id: article._id }
    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addblogcomment`, {
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

  const formatDate = (d) => {
    let date = new Date(Date.parse(d));
    let dispDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`
    return dispDate
  }

  return (
    <div className='flex md:p-12 p-2 justify-start space-x-4'>
      <Modal showReviewModal={showReviewModal} onClose={onClose} review={review} handleReview={handleReview} rating={rating} setRating={setRating} submitReview={submitReview} />
      <div className='md:w-4/5 w-full md:p-6 p-4'>
        <h1 className='lg:text-5xl md:text-4xl text-3xl font-bold'>{article.title}</h1>
        <p className='mt-4 text-xs text-gray-600'>{formatDate(article.updatedAt)}</p>
        <img className='mt-10' src={article.coverImg[0].data_url} alt='image' />
        <div className='mt-6 md:text-base text-sm' dangerouslySetInnerHTML={{ __html: article.excerpt }} />
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
              articleReviews.length > 0 ?
              articleReviews.map((comment, index) => {
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