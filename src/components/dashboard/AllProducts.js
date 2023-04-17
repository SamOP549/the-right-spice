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

const AllProducts = ({ products, combos }) => {

  const router = useRouter()
  const [showProducts, setShowProducts] = useState(products?.slice(0, 5))
  const [showCombos, setShowCombos] = useState(combos?.slice(0, 5))
  const [productPage, setProductPage] = React.useState(1);
  const [comboPage, setComboPage] = React.useState(1);
  const [showSpicesDeleteModal, setShowSpicesDeleteModal] = useState(false)
  const [showCombosDeleteModal, setShowCombosDeleteModal] = useState(false)

  const handleSpicePageChange = (event, value) => {
    setProductPage(value);
    setShowProducts(products.slice(value * 5 - 5, value * 5))
  };
  const handleComboPageChange = (event, value) => {
    setComboPage(value);
    setShowCombos(combos.slice(value * 5 - 5, value * 5))
  };

  useEffect(() => {
    console.log(products);

  }, [])

  const selectAllSpices = (e) => {
    if (e.target.checked) {
      document.querySelectorAll('.products-check').forEach((el) => {
        el.checked = true
      })
    } else {
      document.querySelectorAll('.products-check').forEach((el) => {
        el.checked = false
      })
    }
  }

  const selectAllCombos = (e) => {
    if (e.target.checked) {
      document.querySelectorAll('.combos-check').forEach((el) => {
        el.checked = true
      })
    } else {
      document.querySelectorAll('.combos-check').forEach((el) => {
        el.checked = false
      })
    }
  }

  const editProduct = (id) => {
    router.push('/admin/products/edit-product?id=' + id)
  }

  const editCombo = (id) => {
    router.push('/admin/products/edit-combo?id=' + id)
  }

  const openSpicesModal = (e) => {
    e.preventDefault()
    let count = 0
    document.querySelectorAll('.products-check').forEach((el) => {
      if (el.checked) {
        count += 1;
      }
    })
    if (count > 0) {
      setShowSpicesDeleteModal(true)
    }
  }

  const openCombosModal = (e) => {
    e.preventDefault()
    let count = 0
    document.querySelectorAll('.combos-check').forEach((el) => {
      if (el.checked) {
        count += 1;
      }
    })
    if (count > 0) {
      setShowCombosDeleteModal(true)
    }
  }

  const onSpicesClose = () => {
    setShowSpicesDeleteModal(false)
  }

  const onCombosClose = () => {
    setShowCombosDeleteModal(false)
  }

  const deleteSpice = async () => {
    let ids = []
    document.querySelectorAll('.products-check').forEach((el) => {
      if (el.checked) {
        ids.push(el.value)
      }
    })
    const sendData = { ids };

    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deleteproduct`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
    const data = await t.json()
    router.reload()
    document.querySelector('.check-all').checked = false
    setShowSpicesDeleteModal(false)
  }

  const deleteCombo = async () => {
    let ids = []
    document.querySelectorAll('.combos-check').forEach((el) => {
      if (el.checked) {
        ids.push(el.value)
      }
    })
    const sendData = { ids };

    const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/deletecombo`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendData),
    })
    const data = await t.json()
    router.reload()
    document.querySelector('.check-all').checked = false
    setShowSpicesDeleteModal(false)
  }

  return (
    <BaseCard title="All Products">
      <Modal showDeleteModal={showSpicesDeleteModal} onClose={onSpicesClose} del={deleteSpice} />
      <Modal showDeleteModal={showCombosDeleteModal} onClose={onCombosClose} del={deleteCombo} />
      <h2 className="font-medium mt-4">Spices -</h2>
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
                  onClick={selectAllSpices}
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
                Title
              </Typography>
            </TableCell>
            <TableCell className="border-r">
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell className="border-r">
              <Typography color="textSecondary" variant="h6">
                Size
              </Typography>
            </TableCell>
            <TableCell className="border-r">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Available Qty
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
                  <input className="form-check-input products-check h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={product._id} />
                </Typography>
              </TableCell>
              <TableCell>
                <button onClick={() => editProduct(product._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer active:text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>
              <TableCell>
                <img src={product.img[0]["data_url"]} alt={product.img} width="50px" />
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.size}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.price.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography
                  align="right"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {product.availableQty}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        products?.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <h1 className="text-2xl font-medium">No Products Found</h1>
          </div>
        ) :
          <div className="mt-4 flex justify-end w-full">
            <button
              onClick={openSpicesModal}
              className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'>
              Delete
            </button>
          </div>
      }
      {
        products?.length > 5 && (
          <Pagination className="flex justify-around" count={Math.ceil(products?.length / 5)} page={productPage} onChange={handleSpicePageChange} />
        )
      }
      <h2 className="font-medium mt-10">Combos -</h2>
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
                  onClick={selectAllCombos}
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
                Title
              </Typography>
            </TableCell>
            <TableCell className="border-r">
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showCombos?.map((combo) => (
            <TableRow key={combo._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  <input className="form-check-input combos-check h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={combo._id} />
                </Typography>
              </TableCell>
              <TableCell>
                <button onClick={() => editCombo(combo._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 hover:text-black cursor-pointer active:text-black">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </button>
              </TableCell>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {combo.title}
                </Typography>
              </TableCell>
              <TableCell>
                <img src={combo.img[0]["data_url"]} alt={combo.img} width="50px" />
              </TableCell>
              <TableCell>
                <Typography
                  align="right"
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >
                  {combo.price.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {
        combos?.length === 0 ? (
          <div className="flex justify-center items-center h-48">
            <h1 className="text-2xl font-medium">No Combos Found</h1>
          </div>
        ) :
          <div className="mt-4 flex justify-end w-full">
            <button
              onClick={openCombosModal}
              className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'>
              Delete
            </button>
          </div>
      }
      {
        combos?.length > 5 && (
          <Pagination className="flex justify-around" count={Math.ceil(combos?.length / 5)} page={comboPage} onChange={handleComboPageChange} />
        )
      }
    </BaseCard>
  );
};

export default AllProducts;
