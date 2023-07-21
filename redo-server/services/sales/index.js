import express from "express";
import cors from "cors";
import { initializeDatabase } from "../../pkg/db/index.js";
import { makeSales, ticketHistory } from "./handlers/salesHandler.js";

const app = express();

initializeDatabase();
app.use(express.json());
app.use(cors());

// routes
app.post("/api/v1/sales/purchase-ticket", makeSales);
app.get("/api/v1/sales/purchase-history/:customerID", ticketHistory);

app.listen(process.env.PORT_SALES, () =>
  console.log(`sales server listening on port ${process.env.PORT_SALES}`)
);
