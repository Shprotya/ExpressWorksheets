import express, { Application, Request, Response } from "express";

const PORT = process.env.PORT || 5000;

const app: Application = express();

app.get("/ping", async (_req: Request, res: Response) => {
  res.json({
    message: "hello from Lisa's server!",
  });
});

app.get('/bananas', async (_req : Request, res: Response) => { 
    res.json({ 
        message: "this is bananas", 
    }); 
}); 

app.get('/havana', async (_req: Request, res: Response) => { 
    res.json({ 
    message: "havana, ooh na-na", 
    }); 
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});