import express from "express";
import { getCryptoData } from "../controllers/cryptoController.js";
import { getCryptoStats } from "../controllers/cryptoController.js";
import { getCryptoDeviation } from "../controllers/cryptoController.js";

const router = express.Router();

router.get("/cryptos", getCryptoData);
router.get("/stats",getCryptoStats);
router.get("/deviation", getCryptoDeviation);

export default router;
