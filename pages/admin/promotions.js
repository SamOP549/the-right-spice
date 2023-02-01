import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid, ImageList, ImageListItem, Modal, Box, Typography, Button, Table, TableCell, TableBody, TableRow, TableHead } from "@mui/material";
import BaseCard from "../../src/components/baseCard/BaseCard";
import ImageUploading from 'react-images-uploading';

const Imageuploader = () => {
    const [images, setImages] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const onImageChange = (imageList, addUpdateIndex) => {
        // data for submit
        setImages(imageList);
    };

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            `}</style>
            <FullLayout>
                <div className='flex justify-end px-8'>
                    <Button variant="outlined"
                        onClick={handleOpen}
                        className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                        Add
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <h1 className='mb-6 font-meduim'>Upload Images here:</h1>
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
                                className='text-white mt-4 bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                                Submit
                            </Button>
                        }
                    </Box>
                </Modal>
                <Grid container spacing={0}>
                    <Grid item xs={12} lg={12}>
                        <BaseCard title="Promotions:">
                            <Table
                                aria-label="simple table"
                                sx={{
                                    mt: 3,
                                    whiteSpace: "nowrap",
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="border-r">
                                            <Typography color="textSecondary" variant="h6">
                                                <input
                                                    onClick={selectAll}
                                                    class="form-check-input check-all appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" />
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                Image
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {showProducts?.map((product) => (
                                        <TableRow key={product._id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <input class="form-check-input products-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={product._id} />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <img src={product.img[0]["data_url"]} alt={product.img} width="50px" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Imageuploader