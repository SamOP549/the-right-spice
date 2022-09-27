import React from 'react'
import Link from 'next/link'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [fname, setFname] = useState()
  const [mname, setMname] = useState()
  const [lname, setLname] = useState()
  const [gender, setGender] = useState()
  const [number, setNumber] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match!☠️', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    const data = { fname, mname, lname, gender, number, email, password }
    let res = await fetch('http://localhost:3000/api/signup', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()
    console.log(response)
    setFname('')
    setMname('')
    setLname('')
    setGender('')
    setNumber('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    toast.success('Your account has been created!✅', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
        </div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500">
              Let’s get you all set up so you can verify your personal account and begin setting up your profile.
            </p>

            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2" onSubmit={handleSubmit} method="POST">
              <div>
                <label htmlFor='firstName' className="block mb-2 text-sm text-gray-600">First Name</label>
                <input id='firstName' name='firstName' value={fname} onChange={(e) => setFname(e.target.value)} type="text" placeholder="John" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='middleName' className="block mb-2 text-sm text-gray-600">Middle Name</label>
                <input id='middleName' name='middleName' value={mname} onChange={(e) => setMname(e.target.value)} type="text" placeholder="Latskey" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='lastName' className="block mb-2 text-sm text-gray-600">Last name</label>
                <input id='lastName' name='lastName' value={lname} onChange={(e) => setLname(e.target.value)} type="text" placeholder="Snow" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='gender' className="block mb-2 text-sm text-gray-600">Gender</label>
                <select id='gender' name='gender' value={gender} onChange={(e) => setGender(e.target.value)} className="block mb-2 text-sm w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" >
                  <option defaultValue className="block mb-2 text-sm text-gray-700">Select your gender</option>
                  <option className="block mb-2 text-sm text-gray-700">Male</option>
                  <option className="block mb-2 text-sm text-gray-700">Female</option>
                  <option className="block mb-2 text-sm text-gray-700">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor='number' className="block mb-2 text-sm text-gray-600">Phone number</label>
                <input id='number' name='number' value={number} onChange={(e) => setNumber(e.target.value)} type="number" placeholder="XXX-XX-XXXX-XXX" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='email' className="block mb-2 text-sm text-gray-600">Email address</label>
                <input id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='password' className="block mb-2 text-sm text-gray-600">Password</label>
                <input id='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <label htmlFor='confirmPassword' className="block mb-2 text-sm text-gray-600">Confirm password</label>
                <input id='confirmPassword' name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <button type='submit'
                className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                <span>Sign Up </span>

                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd" />
                </svg>
              </button>
            </form>
            <p className="mt-6 text-sm md:text-left text-center text-gray-400">Already have an account? <Link href='/login'><a className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign in</a></Link>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup