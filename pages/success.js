import React from 'react'
import { useRouter } from 'next/router'

const Success = () => {
    const router = useRouter();
    const { slug } = router.query

    return (
        <div>
            <h3>Order Successful</h3>
        </div>
    )
}

export default Success