const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Para hacer solicitudes a la API
const app = express();
app.use(cors());
app.use(express.json());

// Ruta para obtener datos detallados de Bitcoin
app.get('/bitcoin', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from CoinGecko' });
  }
});

// Ruta para obtener datos históricos de Bitcoin (últimos 30 días)
app.get('/bitcoin-history', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching historical data from CoinGecko' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
