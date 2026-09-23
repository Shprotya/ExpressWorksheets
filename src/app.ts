import express, { Application, Request, Response } from "express";
import carRoutes from './routers/cars';
import { env } from "./config/env";
import { connectDB } from "./config/database";

const port = env.port;

const app: Application = express();
app.use('/api/v1/cars', carRoutes);
app.use(express.json()); // Middleware to parse JSON request bodies

// Middleware registered FIRST so it intercepts all incoming requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/ping", async (_req: Request, res: Response) => {
  res.json({
    message: "hello from Lisa's server!",
  });
});

app.get("/bananas", async (_req: Request, res: Response) => {
  res.json({
    message: "this is bananas",
  });
});

app.get("/havana", async (_req: Request, res: Response) => {
  res.json({
    message: "havana, ooh na-na",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

};

startServer();
