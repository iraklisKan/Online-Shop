import { Box, Typography, Stack } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Box className="min-h-screen flex items-center justify-center" sx={{ px: 2 }}>
            <Stack spacing={4} alignItems="center" sx={{ width: "100%", maxWidth: 400 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <ShoppingBasketIcon sx={{ fontSize: 32, color: "primary.main" }} />
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 700, letterSpacing: ".1rem" }}
                    >
                        Shoppy
                    </Typography>
                </Stack>
                <Box
                    sx={{
                        width: "100%",
                        p: 4,
                        borderRadius: 3,
                        border: "1px solid rgba(255, 255, 255, 0.06)",
                        backgroundColor: "background.paper",
                    }}
                >
                    {children}
                </Box>
            </Stack>
        </Box>
    );
}