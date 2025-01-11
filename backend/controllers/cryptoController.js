import Crypto from "../models/Crypto.js";

export const getCryptoData = async (req, res) => {
  try {
    const cryptoData = await Crypto.find().sort({ lastUpdated: -1 });
    res.status(200).json(cryptoData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
