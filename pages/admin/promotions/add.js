import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, Button } from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import ImageUploading from 'react-images-uploading';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';

const Imageuploader = () => {
    const router = useRouter()
    const [images, setImages] = React.useState([]);
    const [title, setTitle] = useState('')

    const onImageChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };

    const handleSubmit = async () => {
        const sendData = { title, images };
        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addpromotion`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        console.log(data)
        router.push("/admin/promotions")
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
                        <BaseCard title="Upload Image here:">
                            <input className='border-2 border-black w-1/3 mb-4 h-10 rounded-lg p-2' placeholder='Promotion Title' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <ImageUploading
                                value={images}
                                onChange={onImageChange}
                                dataURLKey="data_url"
                            >
                                {({
                                    imageList,
                                    onImageUpload,
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
                                        {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img className='my-4' src={image['data_url']} alt="" width={500} />
                                                <div className="image-item__btn-wrapper space-x-4">
                                                    <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg focus:opacity-70 focus:shadow-lg focus:outline-none focus:ring-0 active:opacity-80 active:shadow-lg transition duration-150 ease-in-out' onClick={() => onImageUpdate(index)}>Update</button>
                                                    <button className='inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg focus:opacity-70 focus:shadow-lg focus:outline-none focus:ring-0 active:opacity-80 active:shadow-lg transition duration-150 ease-in-out' onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </ImageUploading>
                            {
                                images.length > 0 &&
                                <Button variant="outlined"
                                    onClick={handleSubmit}
                                    className='text-white mt-4 bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                    Submit
                                </Button>
                            }
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Imageuploader
