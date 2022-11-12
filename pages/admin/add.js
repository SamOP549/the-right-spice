import React, { useState } from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
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
import BaseCard from "../../src/components/baseCard/BaseCard";

const Add = () => {
    const [form, setForm] = useState({})
    const handleChange = (e) => {
        e.preventDefault()
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const sendData = { form };

        const t = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/addproducts`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        const data = await t.json()
        console.log(data)
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
                        <BaseCard title="Add a Product">
                            <Stack spacing={3}>
                                <TextField
                                    name="title"
                                    label="Title"
                                    variant="outlined"
                                    onChange={handleChange}
                                    value={form.title ? form.title : ""}
                                />
                                <TextField onChange={handleChange} value={form.slug ? form.slug : ""} name="slug" label="Slug" variant="outlined" />
                                <TextField onChange={handleChange} value={form.size ? form.size : ""} name="size" label="Size" variant="outlined" />
                                <TextField onChange={handleChange} value={form.price ? form.price : ""} name="price" label="Price" variant="outlined" />
                                <TextField onChange={handleChange} value={form.availableQty ? form.availableQty : ""} name="availableQty" label="Available Quantity" variant="outlined" />
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label" name="category">Category</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="category"
                                        value={form.category ? form.category : ""}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="spices"
                                            control={<Radio />}
                                            label="Spices"
                                        />
                                        <FormControlLabel
                                            value="combos"
                                            control={<Radio />}
                                            label="Combos"
                                        />
                                    </RadioGroup>
                                </FormControl>
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