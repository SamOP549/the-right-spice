import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../../src/theme/theme";
import FullLayout from "../../../src/layouts/FullLayout";
import { Grid, ImageList, ImageListItem, Box, Typography, Button, Table, TableCell, TableBody, TableRow, TableHead } from "@mui/material";
import BaseCard from "../../../src/components/baseCard/BaseCard";
import { useState } from 'react';
import mongoose from 'mongoose';
import Promotion from '../../../models/Promotion';
import { useRouter } from 'next/router';
import Modal from "../../../components/Modal";
import Link from "next/link"

const Imageuploader = ({ promotions }) => {
    const router = useRouter()
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [availablePromotions, setAvailablePromotions] = useState(promotions)


    const selectAll = (e) => {
        if (e.target.checked) {
            document.querySelectorAll('.promotions-check').forEach((el) => {
                el.checked = true
            })
        } else {
            document.querySelectorAll('.promotions-check').forEach((el) => {
                el.checked = false
            })
        }
    }

    const openModal = (e) => {
        e.preventDefault()
        let count = 0
        document.querySelectorAll('.promotions-check').forEach((el) => {
            if (el.checked) {
                count += 1;
            }
        })
        if (count > 0) {
            setShowDeleteModal(true)
        }
    }

    const onClose = () => {
        setShowDeleteModal(false)
    }

    const del = async () => {
        let ids = []
        document.querySelectorAll('.promotions-check').forEach((el) => {
            if (el.checked) {
                ids.push(el.value)
            }
        })
        const sendData = { ids };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deletepromotion`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        router.reload()
        document.querySelector('.check-all').checked = false
        setShowDeleteModal(false)
    }

    return (
        <ThemeProvider theme={theme}>
            <style jsx global>{`
            .footer{
                display: none;
            }
            `}</style>
            <FullLayout>
                <div className='flex justify-end px-8'>
                    <Link href="/admin/promotions/add">
                        <Button variant="outlined"
                            className='text-white bg-black border-black hover:opacity-60 hover:bg-black hover:border-black'>
                            Add
                        </Button>
                    </Link>
                </div>
                <Modal showDeleteModal={showDeleteModal} onClose={onClose} del={del} />
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
                                                    className="form-check-input check-all appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" />
                                            </Typography>
                                        </TableCell>
                                        <TableCell className="border-r">
                                            <Typography color="textSecondary" variant="h6">
                                                Title
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
                                    {availablePromotions?.map((promotion) => (
                                        <TableRow key={promotion._id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    <input className="form-check-input promotions-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={promotion._id} />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {promotion.title}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <img src={promotion.img[0]["data_url"]} alt={promotion.img} width="50px" />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="mt-4 flex justify-end w-full">
                                <button
                                    onClick={openModal}
                                    className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'>
                                    Delete
                                </button>
                            </div>
                        </BaseCard>
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Imageuploader

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }
    let promotions = await Promotion.find()
    return { props: { promotions: JSON.parse(JSON.stringify(promotions)) } }
}