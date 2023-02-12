import React from 'react'

const Return = () => {
    return (
        <div className='mx-auto md:px-20 md:py-16 px-4 py-12 break-words'>
            <div>
                <span className="inline-block w-12 h-1 bg-red-700"></span>

                <h2
                    className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
                >
                    Return Policy
                </h2>
            </div>
            <p className="mt-8">
                In case you receive a wrong or damaged product, you may raise a complaint within 24-48 hours of delivery for exchange. To pass feedback to the merchants to improve the services, it is mandatory to share the images of the items which you were dis-satisfied with. The company may take the returned product and replace with a new one. In case the products received do not match the order placed, we will replace the order with the correct products.
                <br />
                <br />
                If the delivery is not executed during first attempt due to incorrect or insufficient address, recipient not at home, address found locked or refusal to accept, the customer shall still be charged for the order. No refunds would be entertained for such items and an extra 30 rupees will be charged as delivery charges for re-shipping.
            </p>
            <h3 className='mt-8 font-bold'>Cancellation:</h3>
            <p>
                No cancellations accepted from the side of consumers.
            </p>
            <h3 className='mt-8 font-bold'>Refunds:</h3>
            <p>
                No refund policy, we will only replace the packets if there is some manufacturing defect.
            </p>
        </div>
    )
}

export default Return