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
import Modal from "../../../components/Modal";

const AllComments = ({ productComments, articleComments, comboComments }) => {

    const router = useRouter()

    useEffect(() => {

    }, [])

    const approveProductComment = async (productid, commentid) => {

        const data = { productid, commentid, action: "approve" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approveproductcomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    const removeProductComment = async (productid, commentid) => {

        const data = { productid, commentid, action: "remove" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approveproductcomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    const approveComboComment = async (comboid, commentid) => {

        const data = { comboid, commentid, action: "approve" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approvecombocomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    const removeComboComment = async (comboid, commentid) => {

        const data = { comboid, commentid, action: "remove" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approvecombocomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    const approveBlogComment = async (blogid, commentid) => {

        const data = { blogid, commentid, action: "approve" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approveblogcomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    const removeBlogComment = async (blogid, commentid) => {

        const data = { blogid, commentid, action: "remove" }

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/approveblogcomment`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const res = await t.json()
        router.push('/admin/comments', undefined, { scroll: false })
    }

    return (
        <BaseCard title="All Comments">
            <h2 className="font-medium">Product Comments -</h2>
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Rating
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Comment
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(productComments).map((product) => {
                            return (
                                productComments[product].map((comment) => {
                                    if (comment.approved == true) return
                                    return (
                                        <TableRow key={comment._id}>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.rating}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.comment}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-green-600 rounded hover:scale-105" onClick={() => approveProductComment(product, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-red-600 rounded hover:scale-105" onClick={() => removeProductComment(product, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            )
                        }
                        )
                    }
                </TableBody>
            </Table>
            
            <h2 className="font-medium mt-10">Combo Comments -</h2>
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Rating
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Comment
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(comboComments).map((combo) => {
                            return (
                                comboComments[combo].map((comment) => {
                                    if (comment.approved == true) return
                                    return (
                                        <TableRow key={comment._id}>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.rating}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.comment}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-green-600 rounded hover:scale-105" onClick={() => approveComboComment(combo, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-red-600 rounded hover:scale-105" onClick={() => removeComboComment(combo, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            )
                        }
                        )
                    }
                </TableBody>
            </Table>

            <h2 className="font-medium mt-10">Blog Comments -</h2>
            <Table
                aria-label="simple table"
                sx={{
                    mt: 3
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Name
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Rating
                            </Typography>
                        </TableCell>
                        <TableCell className="border-r">
                            <Typography color="textSecondary" variant="h6">
                                Comment
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                Description
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography color="textSecondary" variant="h6">
                                &nbsp;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.keys(articleComments).map((article) => {
                            return (
                                articleComments[article].map((comment) => {
                                    if (comment.approved == true) return
                                    return (
                                        <TableRow key={comment._id}>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.rating}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.comment}
                                                </Typography>
                                            </TableCell>
                                            <TableCell className="border-r">
                                                <Typography color="textSecondary" variant="h6">
                                                    {comment.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-green-600 rounded hover:scale-105" onClick={() => approveBlogComment(article, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <button className="bg-red-600 rounded hover:scale-105" onClick={() => removeBlogComment(article, comment._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                )
                            )
                        }
                        )
                    }
                </TableBody>
            </Table>
        </BaseCard>
    );
};

export default AllComments;
