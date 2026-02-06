require("dotenv").config();
const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({ keepAlive: true });

const ASSETS = [
  { name: "Gold", symbol: "XAU" },
  { name: "Silver", symbol: "XAG" },
  { name: "Bitcoin", symbol: "BTC" },
  { name: "Ethereum", symbol: "ETH" },
];

async function fetchAssets() {
  for (const asset of ASSETS) {
    try {
      const res = await axios.get(
        `https://api.gold-api.com/price/${asset.symbol}`,
        {
          httpsAgent,
          headers: {
            "x-api-key":
              "c47881486b7ce9f89518596d56e02ce144486e859412fc542e2f9e633d28fecc",
            Accept: "application/json",
          },
        },
      );

      console.log(`✅ ${asset.name} (${asset.symbol})`);
      console.log("Response:", res.data);
      console.log("-----------------------------");
    } catch (err) {
      console.error(
        `❌ Failed to fetch ${asset.symbol}: ${err.response?.status || err.message}`,
      );
      if (err.response?.data) console.error("Data:", err.response.data);
    }
  }
}

// Run once immediately
fetchAssets();

// Then run every 10 seconds
setInterval(fetchAssets, 10000);