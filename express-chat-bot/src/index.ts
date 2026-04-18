import express, { type Request, type Response } from "express";
import { eventRouter } from "./eventRouter.js";

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/api/v1/webhook", (request: Request, response: Response) => {
    eventRouter(request, response);
});
// app.post("/api/v1/webhook/:event", webhookHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});