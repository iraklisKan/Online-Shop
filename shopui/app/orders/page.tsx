import getMyOrders from "../orders/actions/get-orders";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";

export default async function OrdersPage() {
  const orders = await getMyOrders();

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Orders
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          {orders?.length ?? 0} {orders?.length === 1 ? "order" : "orders"} placed
        </Typography>
      </Box>

      {!orders?.length ? (
        <Typography color="text.secondary">No orders yet.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {orders.map((order) => (
            <Card
              key={order.id}
              sx={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {order.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {order.product.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </Typography>
                </Box>
                <Chip
                  label={`€${order.product.price.toFixed(2)}`}
                  color="primary"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}
