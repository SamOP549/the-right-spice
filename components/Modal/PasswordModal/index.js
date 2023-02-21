import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const PasswordModal = (props) => {
  return (
    <Transition.Root show={true} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={props.onClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <form className="grid grid-cols-6 gap-4">

                                            <div className="col-span-6">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="oldpass">
                                                    Old Password
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="password"
                                                    id="oldpass"
                                                    value={props.oldpass}
                                                    name='oldpass'
                                                    onChange={props.handlePasswordUpdate}
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="newpass">
                                                    New Password
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="password"
                                                    id="newpass"
                                                    value={props.newpass}
                                                    name='newpass'
                                                    onChange={props.handlePasswordUpdate}
                                                />
                                            </div>
                                            <div className="col-span-6">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="confirmpass">
                                                    Confirm New Password
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="password"
                                                    id="confirmpass"
                                                    value={props.confirmNewpass}
                                                    name='confirmpass'
                                                    onChange={props.handlePasswordUpdate}
                                                />
                                            </div>

                                            <div className='col-span-6'>
                                                <button onClick={props.handlePasswordSubmit} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-red-700 capitalize transition-colors duration-300 transform border-black border rounded">
                                                    Confirm
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
  )
}

export default PasswordModal