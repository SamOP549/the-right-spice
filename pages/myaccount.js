import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'

const Myaccount = () => {
    const router = useRouter()
    useEffect(() => {
      if(!localStorage.getItem('token')){
        router.push('/')
      }
    }, [])
    
  return (
    <div>Myaccount</div>
  )
}

export default Myaccount