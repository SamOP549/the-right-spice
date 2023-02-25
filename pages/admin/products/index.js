import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, Button } from "@mui/material";
import Link from 'next/link';
import AllProducts from "../../../src/components/dashboard/AllProducts";
import mongoose from 'mongoose';
import Product from '../../../models/Product';
import Combo from '../../../models/Combo';

const Allproducts = ({ products, combos }) => {
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
                        <div className='flex justify-end px-8 space-x-4'>
                            <Link href='/admin/products/add-product'>
                                <Button variant="outlined"
                                    className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                    Add Product
                                </Button>
                            </Link>
                            <Link href='/admin/products/add-combo'>
                                <Button variant="outlined"
                                    className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                    Add Combo
                                </Button>
                            </Link>
                        </div>
                        <AllProducts products={products} combos={combos} />
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
    let combos = await Combo.find()
    return { props: { products: JSON.parse(JSON.stringify(products)), combos: JSON.parse(JSON.stringify(combos)) } }
}