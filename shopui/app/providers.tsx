"use client";

import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactElement } from "react";
import darkTheme from "./dark.theme";
import { AuthContext, UserRole } from "./auth/auth-context";
import { CartProvider, useCart } from "./cart/cart-context";
import CartDrawer from "./cart/cart-drawer";

interface ProvidersProps {
  children: ReactElement[];
  authenticated: boolean;
  role: UserRole;
}

// Renders the drawer inside CartProvider so useCart() works
function CartRoot({ children }: { children: React.ReactNode }) {
  const { drawerOpen, closeDrawer } = useCart();
  return (
    <>
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
      {children}
    </>
  );
}

export default function Providers({ children, authenticated, role }: ProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={darkTheme}>
        <AuthContext.Provider value={{ authenticated, role }}>
          <CartProvider>
            <CartRoot>{children}</CartRoot>
          </CartProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
