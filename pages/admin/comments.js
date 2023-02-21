import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllComments from "../../src/components/dashboard/AllComments";
import mongoose from 'mongoose';
import Product from '../../models/Product'

const Comments = ({ products }) => {
    let productComments = {}
    products.forEach((product) => {
        productComments[product._id] = product.comments
    })
    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            `}</style>
            <FullLayout>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <AllComments productComments={productComments} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Comments

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find()
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}