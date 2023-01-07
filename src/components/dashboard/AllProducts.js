import React, { useEffect , useState } from "react";
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

const AllProducts = ({ products }) => {

  const router = useRouter()
  const [showProducts, setShowProducts] = useState(products.slice(0, 5))
  const [page, setPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
    setShowProducts(products.slice(value * 5 - 5, value * 5))
  };

  useEffect(() => {
    console.log(products);

  }, [])

  const selectAll = (e) => {
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

  const editProduct = (id) => {
    router.push('/admin/products/edit?id=' + id)
  }

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const deleteProducts = async () => {
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
    refreshData()
    document.querySelector('.check-all').checked = false
  }

  return (
    <BaseCard title="All Products">
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
                Category
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
                  <input class="form-check-input products-check appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id="inlineCheckbox1" value={product._id} />
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
                  {product.category}
                </Typography>
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
                  {product.price}
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
      <div className="mt-4 flex justify-end w-full">
        <button
          onClick={deleteProducts}
          className='inline-block px-6 py-2.5 bg-red-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:opacity-90 hover:shadow-lg transition duration-150 ease-in-out'>
          Delete
        </button>
      </div>
      <Pagination className="flex justify-around" count={Math.ceil(products.length/5)} page={page} onChange={handlePageChange} />
    </BaseCard>
  );
};

export default AllProducts;
