import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import Link from 'next/link';
import {
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
    Button,
} from "@mui/material";
import AllBlogs from "../../../src/components/dashboard/AllBlogs";
import mongoose from 'mongoose';
import Article from '../../../models/Article';

const Blogs = ({ articles }) => {
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
                            <Link href='/admin/blogs/add'>
                                <Button variant="outlined"
                                    className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                    Add
                                </Button>
                            </Link>
                        </div>
                        <AllBlogs articles={articles} />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Blogs

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let articles = await Article.find().sort({ createdAt: -1 })
    return { props: { articles: JSON.parse(JSON.stringify(articles)) } }
}