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

let targetPrice = 1000000;  // Valor objetivo inicial

// Ruta para configurar el valor objetivo
app.post('/set-target-price', (req, res) => {
  const { price } = req.body;
  targetPrice = price;
  res.json({ message: `Target price set to ${price}` });
});

// Ruta que revisa si el precio actual alcanza el valor objetivo
app.get('/check-price', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const currentPrice = response.data.bitcoin.usd;

    if (currentPrice >= targetPrice) {
      res.json({ message: `Alert! Bitcoin has reached the target price of $${targetPrice}. Current price: $${currentPrice}` });
    } else {
      res.json({ message: `Bitcoin is below the target price. Current price: $${currentPrice}` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from CoinGecko' });
  }
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
