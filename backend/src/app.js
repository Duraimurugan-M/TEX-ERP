import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import roleRoutes from "./routes/role.routes.js";
import productRoutes from "./routes/product.routes.js";



const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/products", productRoutes);

export default app;