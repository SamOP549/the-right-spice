import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useRouter } from "next/router";
import Pagination from '@mui/material/Pagination';
import Modal from "../../../components/Modal";

const AllBlogs = ({ articles }) => {

    const router = useRouter()
    const [showArticles, setShowArticles] = useState(articles.slice(0, 5))
    const [page, setPage] = React.useState(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const handlePageChange = (event, value) => {
        setPage(value);
        setShowArticles(articles.slice(value * 5 - 5, value * 5))
    };

    const formatDate = (d) => {
        let date = new Date(Date.parse(d));
        let dispDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}, ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}`
        return dispDate
    }

    const editBlog = (id) => {
        router.push('/admin/blogs/edit?id=' + id)
    }

    const selectAll = (e) => {
        if (e.target.checked) {
            document.querySelectorAll('.blogs-check').forEach((el) => {
                el.checked = true
            })
        } else {
            document.querySelectorAll('.blogs-check').forEach((el) => {
                el.checked = false
            })
        }
    }

    const openModal = (e) => {
        e.preventDefault()
        let count = 0
        document.querySelectorAll('.blogs-check').forEach((el) => {
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
        document.querySelectorAll('.blogs-check').forEach((el) => {
            if (el.checked) {
                ids.push(el.value)
            }
        })
        const sendData = { ids };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteblog`, {
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
        <BaseCard title="All Articles">
            <Modal showDeleteModal={showDeleteModal} onClose={onClose} del={del} />
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
                                    className="form-check-input check-all h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" />
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Stages
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                ID
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Created At
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Updated At
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {showArticles?.map((article, index) => (
                        <TableRow key={article._id}>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    <input className="form-check-input blogs-check h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={article._id} />
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <button onClick={() => editBlog(article._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer active:text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </button>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    className={`${article.stage == 'Published' ? 'text-green-500' : 'text-yellow-500'}`}
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {article.stage}
                                </Typography>
                            </TableCell>
                            <TableCell padding="none">
                                <Typography
                                    className="bg-red-700 rounded border border-red-700 text-white text-center w-auto"
                                    sx={{
                                        fontSize: "12px",
                                        fontWeight: "300",
                                    }}
                                >
                                    {article._id}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {article.title}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {formatDate(article.createdAt)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    sx={{
                                        fontSize: "15px",
                                        fontWeight: "500",
                                    }}
                                >
                                    {formatDate(article.updatedAt)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {
                articles.length == 0 ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="flex flex-col justify-center items-center">
                            <p className="font-medium text-2xl">No articles found</p>
                        </div>
                    </div>
                ) :
                    <div className="mt-4 flex justify-end w-full">
                        <button
                            onClick={openModal}
                            className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'>
                            Delete
                        </button>
                    </div>
            }
            {
                articles.length > 5 ? (
                    <Pagination className="flex justify-around" count={Math.ceil(articles.length / 5)} page={page} onChange={handlePageChange} />
                ) : null
            }
        </BaseCard>
    );
};

export default AllBlogs;
