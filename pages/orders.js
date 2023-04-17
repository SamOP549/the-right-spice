import React from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Pagination from '@mui/material/Pagination';

const Orders = () => {
  const router = useRouter()
  const [orders, setOrders] = useState([])
  const [showOrders, setshowOrders] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    const fetchOrders = async () => {
      const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myuser')).token }),
      })
      const res = await t.json()
      setOrders(res.orders)
      setshowOrders(res.orders?.slice(0, 5))
    }
    if (!localStorage.getItem('myuser')) {
      router.push('/')
    }
    else {
      fetchOrders()
    }
  }, [])

  const formatDate = (d) => {
    let date = new Date(Date.parse(d));
    let dispDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`
    return dispDate
  }

  const handlePageChange = (event, value) => {
    setPage(value);
    setshowOrders(orders.slice(value * 5 - 5, value * 5))
  };

  return (
    <div className='text-black'>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-12">
            <div className="overflow-hidden px-4">
              <div className='py-10'>
                <span className="inline-block w-12 h-1 bg-red-700"></span>
                <h1 className='text-3xl font-semibold text-left'>Order History</h1>
              </div>
              {
                showOrders.map(order => {
                  return (
                    <div key={order._id} className='mb-20'>
                      <div className="max-w-full bg-gray-100">
                        <div className='border p-2 rounded-lg'>
                          <div className='sm:flex items-center sm:flex-row flex-col justify-between'>
                            <div className='flex sm:flex-row flex-col items-center justify-between sm:px-0 px-2'>
                              <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 md:mr-16 sm:mr-4 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full sm:border-b-0 border-b-2">
                                <p>Order number</p>
                                <p className='text-gray-500'>{order.orderId.slice(6)}</p>
                              </div>
                              <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 md:mr-16 sm:mr-4 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full sm:border-b-0 border-b-2">
                                <p>Date placed</p>
                                <p className='text-gray-500'>{formatDate(order.createdAt)}</p>
                              </div>
                              <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full">
                                <p>Total amount</p>
                                <p>₹{order.amount.toFixed(2)}</p>
                              </div>
                            </div>
                            <div className='flex sm:mx-2 py-2 -sm:w-full justify-end sm:px-0 px-2 space-x-3'>
                              <Link href={`/order?id=${order._id}`}><button className="px-2 py-2 m-2 border-2 sm:mx-0 mx-auto sm:w-auto w-full border-gray-800 text-gray-800 font-medium sm:text-sm text-xl leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">View Order</button></Link>
                              <button className="px-2 py-2 m-2 border-2 sm:mx-0 mx-auto sm:w-auto w-full border-gray-800 text-gray-800 font-medium sm:text-sm text-xl leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">View Invoice</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead className="bg-white border-b hidden sm:table-row-group">
                                  <tr>
                                    <th scope="col" className="text-sm font-normal text-gray-500 px-8 py-3 text-left">
                                      Product
                                    </th>
                                    <th scope="col" className="text-sm font-normal text-gray-500 px-8 py-3 text-left">
                                      Price
                                    </th>
                                    <th scope="col" className="text-sm font-normal text-gray-500 px-8 py-3 text-left">
                                      Status
                                    </th>
                                    <th scope="col" className="text-sm font-normal text-gray-500 px-8 py-3 text-right">
                                      Info
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {
                                    Object.keys(order.products).map(product => {
                                      return (
                                        <tr key={order.products[product].itemCode} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                          <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-500 flex items-center md:mr-0 mr-6">
                                            <img className='sm:w-16 sm:h-full h-full w-24' src={order.products[product].imageSrc[0]["data_url"]} alt={order.products[product].imageAlt} />
                                            <div className='sm:text-sm text-xl font-semibold text-gray-800 px-6 sm:py-5 text-left'>
                                              <p>{order.products[product].name}  <span className='text-gray-500 font-normal sm:text-sm text-md'>x{order.products[product].qty}</span></p>
                                              <p className='sm:hidden text-gray-500 mt-2'>₹{order.products[product].price}</p>
                                            </div>
                                          </td>
                                          <td className="text-sm text-gray-500 hidden sm:table-cell font-normal px-8 py-5 whitespace-nowrap">
                                            ₹{order.products[product].price}
                                          </td>
                                          <td className="text-sm text-gray-500 hidden sm:table-cell font-normal px-8 py-5 whitespace-nowrap">
                                            Delivered Jan 25, 2021
                                          </td>
                                          <td className="text-sm text-blue-700 font-medium px-8 py-5 whitespace-nowrap text-right">
                                            <div className='sm:text-sm text-xl'>
                                              <p className='sm:block hidden'><a href={order.products[product].href} className='cursor-pointer'>View product</a></p>
                                              <p className='sm:hidden'><a href={order.products[product].href} className='cursor-pointer'>View</a></p>
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    })
                                  }
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }

            </div>
            <Pagination className="flex justify-around mb-10" count={Math.ceil(orders?.length / 5)} page={page} onChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

