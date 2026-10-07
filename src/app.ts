import express, { Application, Request, Response } from "express";
import carRoutes from './routers/cars';
import { authenticateKey } from "./middleware/auth.middleware";
import { requestLogger } from "./middleware/requestLgger";
import { swaggerSpec } from "./config/swagger";
import swaggerUi from 'swagger-ui-express';

export const app: Application = express();

// Middleware registered FIRST so it intercepts all incoming requests
app.use(requestLogger);

app.use(express.json()); // Middleware to parse JSON request bodies
app.use('/api/v1/cars', carRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)  
);


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
