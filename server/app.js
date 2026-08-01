import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import papersRoutes from "./routes/paper.routes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "https://solve-it-nine.vercel.app"],
  }),
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({
    status: "API is running",
    endpoints: ["/api/auth/signup", "/api/auth/login"],
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/papers", papersRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
