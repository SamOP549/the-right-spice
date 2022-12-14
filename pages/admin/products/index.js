import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, Button } from "@mui/material";
import Link from 'next/link';
import AllProducts from "../../../src/components/dashboard/AllProducts";
import mongoose from 'mongoose';
import Product from '../../../models/Product';

const Allproducts = ({ products }) => {
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
                        <div className='flex justify-end px-8'>
                        <Link href='/admin/products/add'>
                            <Button variant="outlined"
                                className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                Add
                            </Button>
                            </Link>
                        </div>
                        <AllProducts products={products} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allproducts

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find()
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}