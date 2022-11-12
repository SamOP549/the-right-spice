import React from 'react'
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { Grid } from "@mui/material";
import AllProducts from "../../src/components/dashboard/AllProducts";

const Allorders = () => {
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
                        <AllProducts />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    )
}

export default Allorders