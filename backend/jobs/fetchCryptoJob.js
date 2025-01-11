import axios from "axios";
import Crypto from "../models/Crypto.js";

const fetchCryptoData = async () => {
  const coinIds = ["bitcoin", "matic-network", "ethereum"];
  const url = `https://api.coingecko.com/api/v3/simple/price`;

  try {
    const { data } = await axios.get(url, {
      params: {
        ids: coinIds.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });

    for (const coinId of coinIds) {
      const coinData = data[coinId];
      await Crypto.findOneAndUpdate(
        { coinId },
        {
          coinId,
          name: coinId.charAt(0).toUpperCase() + coinId.slice(1).replace("-", " "),
          currentPrice: coinData.usd,
          marketCap: coinData.usd_market_cap,
          change24h: coinData.usd_24h_change,
          lastUpdated: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    console.log("Crypto data updated successfully.");
  } catch (error) {
    console.error("Error fetching crypto data:", error.message);
  }
};

export default fetchCryptoData;
