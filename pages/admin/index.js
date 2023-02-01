import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import AllProducts from "../../src/components/dashboard/AllProducts";
import { ThemeProvider } from "@mui/material";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useEffect } from "react";

export default function Index() {
    useEffect(() => {
        const admin = JSON.parse(localStorage.getItem("admin"))
        if (!admin) {
            window.location.href = "/admin/login"
        }
    }, [])
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
                        <SalesOverview />
                    </Grid>
                    {/* ------------------------- row 1 ------------------------- */}
                    <Grid item xs={12} lg={4}>
                        <DailyActivity />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <AllProducts />
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <BlogCard />
                    </Grid>
                </Grid>
            </FullLayout>
        </ThemeProvider>
    );
}
