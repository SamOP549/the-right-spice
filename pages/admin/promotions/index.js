import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, ImageList, ImageListItem, Box, Typography, Button, Table, TableCell, TableBody, TableRow, TableHead } from "@mui/material";
import mongoose from 'mongoose';
import Promotion from '../../../models/Promotion';
import Link from "next/link"
import AllPromotions from "../../../src/components/dashboard/AllPromotions";

const Allpromotions = ({ promotions }) => {
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
                        <Link href='/admin/promotions/add'>
                            <Button variant="outlined"
                                className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                Add
                            </Button>
                            </Link>
                        </div>
                        <AllPromotions promotions={promotions} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allpromotions;

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let promotions = await Promotion.find()
    return { props: { promotions: JSON.parse(JSON.stringify(promotions)) } }
}