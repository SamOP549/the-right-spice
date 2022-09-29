import React from 'react'
import Order from '../models/Order'
import mongoose from 'mongoose'

const Orders = () => {
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
              <div className="min-w-full bg-gray-100">
                <div className='border p-2 rounded-lg'>
                  <div className='sm:flex items-center sm:flex-row flex-col justify-between'>
                    <div className='flex sm:flex-row flex-col items-center justify-between sm:px-0 px-2'>
                      <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 md:mr-16 sm:mr-8 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full sm:border-b-0 border-b-2">
                        <p>Order number</p>
                        <p className='text-gray-500'>WU88193103</p>
                      </div>
                      <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 md:mr-16 sm:mr-8 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full sm:border-b-0 border-b-2">
                        <p>Date placed</p>
                        <p className='text-gray-500'>Jul 6, 2021</p>
                      </div>
                      <div className="sm:text-sm text-xl font-medium text-gray-500 sm:px-3 px-2 py-4 text-left flex sm:flex-col flex-row justify-between sm:items-start items-center sm:w-auto w-full">
                        <p>Total amount</p>
                        <p>$160</p>
                      </div>
                    </div>
                    <div className='flex sm:mx-2 py-2 -sm:w-full justify-end sm:px-0 px-2'>
                      <button type="button" className="px-2 py-2 m-2 border-2 sm:mx-0 mx-auto sm:w-auto w-full border-gray-800 text-gray-800 font-medium sm:text-sm text-xl leading-tight rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">View Invoice</button>
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
                          <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                            <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-500 flex items-center md:mr-0 mr-6">
                              <img className='sm:w-16 sm:h-16 h-24 w-24' src='https://picsum.photos/200' alt='prod' />
                              <div className='sm:text-sm text-xl font-semibold text-gray-800 px-6 sm:py-5 text-left'>
                                <p>Haldi</p>
                                <p className='sm:hidden text-gray-500 mt-2'>$499</p>
                              </div>
                            </td>
                            <td className="text-sm text-gray-500 hidden sm:table-cell font-normal px-8 py-5 whitespace-nowrap">
                              $499
                            </td>
                            <td className="text-sm text-gray-500 hidden sm:table-cell font-normal px-8 py-5 whitespace-nowrap">
                              Delivered Jan 25, 2021
                            </td>
                            <td className="text-sm text-blue-700 font-medium px-8 py-5 whitespace-nowrap text-right">
                              <div className='sm:text-sm text-xl'>
                                <p className='sm:block hidden'><a className='cursor-pointer'>View product</a></p>
                                <p className='sm:hidden'><a className='cursor-pointer'>View</a></p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI)
  }
  let orders = await Order.find({  })

  return { props: { orders: orders } }
}

export default Orders