import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import slugify from 'react-slugify';
import ImageUploading from 'react-images-uploading';
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
import { useRouter } from 'next/router'

const Add = () => {
    const { quill, quillRef } = useQuill();
    const [form, setForm] = useState({})
    const [excerpt, setExcerpt] = useState('')
    const [images, setImages] = React.useState([]);
    const [text, setText] = useState('')
    const router = useRouter()

    const onImageChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };
    const handleChange = (e) => {
        e.preventDefault()
        setForm({
            title: e.target.value,
            slug: slugify(e.target.value)
        })
    }

    useEffect(() => {
        if (quill) {
            quill.on('text-change', (delta, oldDelta, source) => {
                setText(quill.getText())
                setExcerpt(quill.root.innerHTML); // Get innerHTML using quill
            });
        }
    }, [quill]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sendData = { form, excerpt, text, images, stage: e.target.name == 'save_btn' ? 'Draft' : 'Published' };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addblog`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        console.log(data)
        router.push('/admin/blogs')
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
                        <BaseCard title="Add a Blog">
                            <Stack spacing={3}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={form.title ? form.title : ""}
                                />
                                <TextField value={form.title ? slugify(form.title) : ""} name="slug" label="Slug" variant="outlined" />
                                <label>Upload Cover Image:</label>
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
                                <div style={{ width: "full", height: 400 }}>
                                    <div ref={quillRef} />
                                </div>
                            </Stack>
                            <br />
                            <div className='flex space-x-4'>
                                <button name='save_btn' className='inline-block mt-10 px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg focus:opacity-70 focus:shadow-lg focus:outline-none focus:ring-0 active:opacity-80 active:shadow-lg transition duration-150 ease-in-out' onClick={handleSubmit}>
                                    Save
                                </button>
                                <button name='publish_btn' className='inline-block mt-10 px-6 py-2.5 bg-green-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg focus:opacity-70 focus:shadow-lg focus:outline-none focus:ring-0 active:opacity-80 active:shadow-lg transition duration-150 ease-in-out' onClick={handleSubmit}>
                                    Save and Publish
                                </button>
                            </div>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Add