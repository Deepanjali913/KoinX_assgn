import mongoose from "mongoose";

const cryptoSchema = new mongoose.Schema({
  coinId: { type: String, required: true },
  name: { type: String, required: true },
  currentPrice: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  change24h: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

export default Crypto;
