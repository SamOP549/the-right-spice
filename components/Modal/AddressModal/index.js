import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'

const AddressModal = (props) => {
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
                                            <div className="col-span-3">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="first_name">
                                                    First Name
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="text"
                                                    id="fname"
                                                    value={props.completeAddress.fname}
                                                    name='fname'
                                                    onChange={props.handleCAChange}
                                                />
                                            </div>

                                            <div className="col-span-3">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="last_name">
                                                    Last Name
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="text"
                                                    id="lname"
                                                    value={props.completeAddress.lname}
                                                    name='lname'
                                                    onChange={props.handleCAChange}
                                                />
                                            </div>

                                            <div className="col-span-6">
                                                <label className="block mb-1 text-sm text-gray-600" htmlFor="phone">
                                                    Phone
                                                </label>

                                                <input
                                                    className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                    type="tel"
                                                    id="phone"
                                                    value={props.completeAddress.phone}
                                                    name='phone'
                                                    onChange={props.handleCAChange}
                                                />
                                            </div>

                                            <fieldset className="col-span-6 grid grid-cols-6 gap-4">
                                                <legend className="block mb-1 text-sm text-gray-600">
                                                    Billing Address
                                                </legend>
                                                <div className="col-span-6">

                                                    <input
                                                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                        type="number"
                                                        id="pincode"
                                                        placeholder='Pin Code'
                                                        value={props.completeAddress.pincode}
                                                        name='pincode'
                                                        onChange={props.handleCAChange}
                                                    />
                                                </div>

                                                <div className="col-span-6">

                                                    <input
                                                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                        type="text"
                                                        id="address"
                                                        placeholder='Address(House No, Building, Street, Area)'
                                                        value={props.completeAddress.address}
                                                        name='address'
                                                        onChange={props.handleCAChange}
                                                    />
                                                </div>

                                                <div className="col-span-6">

                                                    <input
                                                        className="rounded-lg shadow-sm border-2 border-gray-200 w-full text-sm p-2.5"
                                                        type="text"
                                                        id="locality"
                                                        placeholder='Locality/Town'
                                                        value={props.completeAddress.locality}
                                                        name='locality'
                                                        onChange={props.handleCAChange}
                                                    />
                                                </div>

                                                <div className="col-span-3">

                                                    <input
                                                        className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                                                        type="text"
                                                        id="city"
                                                        placeholder='City/District'
                                                        readOnly
                                                        value={props.completeAddress.city}
                                                        name='city'
                                                        onChange={props.handleCAChange}
                                                    />
                                                </div>
                                                <div className="col-span-3">

                                                    <input
                                                        className="rounded-lg shadow-sm border-2 bg-gray-200 border-gray-200 w-full text-sm p-2.5"
                                                        type="text"
                                                        id="state"
                                                        placeholder='State'
                                                        readOnly
                                                        value={props.completeAddress.state}
                                                        name='state'
                                                        onChange={props.handleCAChange}
                                                    />
                                                </div>
                                            </fieldset>
                                            <div className='col-span-6'>
                                                <button onClick={props.handleAddressSave} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-red-700 capitalize transition-colors duration-300 transform border-black border rounded">
                                                    Save
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

export default AddressModal