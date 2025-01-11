import Crypto from "../models/Crypto.js";

export const getCryptoData = async (req, res) => {
  try {
    const cryptoData = await Crypto.find().sort({ lastUpdated: -1 });
    res.status(200).json(cryptoData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCryptoStats = async (req, res) => {
    const { coin } = req.query;
  
    if (!coin) {
      return res.status(400).json({ error: "Query parameter 'coin' is required." });
    }
  
    try {
     
      const crypto = await Crypto.findOne({ coinId: coin }).sort({ lastUpdated: -1 });
  
      if (!crypto) {
        return res.status(404).json({ error: "Cryptocurrency not found." });
      }
  
      
      const response = {
        price: crypto.currentPrice,
        marketCap: crypto.marketCap,
        "24hChange": crypto.change24h,
      };
  
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;
  
    if (!coin) {
      return res.status(400).json({ error: "Query parameter 'coin' is required." });
    }
  
    try {
     
      const records = await Crypto.find({ coinId: coin })
        .sort({ lastUpdated: -1 })
        .limit(100)
        .select("currentPrice");
  
      if (records.length === 0) {
        return res.status(404).json({ error: "No records found for the requested cryptocurrency." });
      }
  
      
      const prices = records.map((record) => record.currentPrice);
      //console.log(prices)
  
      const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
       //console.log(mean)
     
      const variance =
        prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;
  
      
      const deviation = Math.sqrt(variance);
  
      
      res.status(200).json({ deviation: deviation.toFixed(2) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };