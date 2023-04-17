import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import ImageUploading from 'react-images-uploading';
import slugify from 'react-slugify';
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
import BaseCard from "../../../src/components/baseCard/BaseCard";
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import Product from '../../../models/Product';
import { MultiSelect } from "react-multi-select-component";

const Add = ({ products }) => {
    const router = useRouter()
    const [form, setForm] = useState({})
    const [images, setImages] = React.useState([]);
    const maxNumber = 4;
    const [selected, setSelected] = useState([]);
    const options = products.map((product) => {
        return { value: product._id, label: product.title + " - " + product.size, qty: 1, size: product.size }
    })
    useEffect(() => {

    }, [])

    const changeQty = (e) => {
        setSelected(selected.map((item) => {
            if (item.value == e.target.name) {
                return { ...item, qty: e.target.value }
            }
            else {
                return item
            }
        }
        ))
    }


    const handleChange = (e) => {
        e.preventDefault()
        if (e.target.name == 'title') {
            setForm({
                ...form,
                title: e.target.value,
                slug: slugify(form.title)
            })
        }
        else {
            setForm({ ...form, [e.target.name]: e.target.value })
        }
    }

    const onImageChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList)
        setImages(imageList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sendData = { form, images , selected };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addcombos`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        console.log(data)
        router.push('/admin/products')
    }
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
                        <BaseCard title="Add a Combo">
                            <Stack spacing={3}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={form.title ? form.title : ""}
                                />
                                <TextField onChange={handleChange} value={form.title ? slugify(form.title) : ""} name="slug" label="Slug" variant="outlined" />
                                <h1>Select Spices</h1>
                                <MultiSelect
                                    options={options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy="Select"
                                />
                                {
                                    selected?.map((item) => {
                                        return (
                                            <div key={item.value} className="flex space-x-4 items-center">
                                                <h1 className='text-lg'>{item.label}</h1>
                                                <p>X</p>
                                                <TextField name={item.value} type="number" label="Quantity" variant='outlined' value={item.qty} onChange={changeQty} />
                                            </div>
                                        )
                                    }
                                    )
                                }
                                <TextField onChange={handleChange} value={form.price ? form.price : ""} name="price" label="Price" variant="outlined" />
                                <TextField onChange={handleChange} value={form.discount ? form.discount : ""} name="discount" label="Discount (%)" variant="outlined" />
                                <label>Add upto 4 images:</label>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onImageChange}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                            <button
                                                className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                Click or Drop here
                                            </button>
                                            &nbsp;
                                            <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out' onClick={onImageRemoveAll}>Remove all images</button>
                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item flex mt-4 gap-x-4">
                                                    <img src={image['data_url']} alt="" width="120" />
                                                    <div className="image-item__btn-wrapper flex my-auto space-x-2">
                                                        <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out h-10' onClick={() => onImageUpdate(index)}>Update</button>
                                                        <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out h-10' onClick={() => onImageRemove(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                                <TextField
                                    name="desc"
                                    label="Description"
                                    value={form.desc ? form.desc : ""}
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                />
                            </Stack>
                            <br />
                            <Button variant="outlined" mt={2} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Add

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let products = await Product.find()
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}