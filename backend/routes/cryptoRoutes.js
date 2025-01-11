import express from "express";
import { getCryptoData } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/cryptos", getCryptoData);

export default router;
