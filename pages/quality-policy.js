import React from 'react'

const Quality = () => {
    return (
        <div className='mx-auto md:px-20 md:py-16 px-4 py-12 break-words'>
            <div>
                <span className="inline-block w-12 h-1 bg-red-700"></span>

                <h2
                    className="mt-1 text-2xl font-extrabold tracking-wide uppercase lg:text-3xl text-black"
                >
                    Quality Policy
                </h2>
            </div>
            <p className="mt-8">
                At The Right Spice, we are dedicated to providing our customers with the highest quality spices, free from chemicals, preservatives, and harmful additives. We believe in delivering fresh, unadulterated, and unpolished spices that retain all minerals and enhance the taste of your cuisine while prioritizing your health.
                <br />
                <br />
                Our quality policy is based on the following principles:
            </p>
            <ol>
                <li><b>Sourcing:</b> We source our spices from trusted suppliers and growers who follow ethical and sustainable farming practices.</li>
                <li><b>Testing:</b> Our spices undergo rigorous testing and quality control procedures to ensure that they meet our high standards for purity and flavor.</li>
                <li><b>Packaging:</b> We use airtight and food-grade packaging materials to preserve the freshness and quality of our spices.</li>
                <li><b>Customer Satisfaction:</b> We are committed to exceeding our customers&apos; expectations and addressing any concerns they may have.</li>
                <li><b>Continuous Improvement:</b> We continuously evaluate and improve our processes and procedures to ensure that we are delivering the best quality spices to our customers.</li>
            </ol>
            <p className='mt-8'>
                We take pride in our commitment to quality and are dedicated to ensuring that every bag of spices that leaves our facility meets our high standards. Our goal is to become the preferred choice of our customers for all their spice needs.
            </p>
        </div>
    )
}

export default Quality