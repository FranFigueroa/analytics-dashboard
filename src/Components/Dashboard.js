import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registra las escalas y componentes para Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [chartData, setChartData] = useState(null);

  // Obtener datos de Bitcoin (precio actual, ATH, volumen, etc.)
  useEffect(() => {
    fetch('http://localhost:5000/bitcoin')
      .then((res) => res.json())
      .then((data) => {
        setBitcoinData(data);
      });
  }, []);

  // Obtener los datos históricos de Bitcoin (últimos 30 días)
  useEffect(() => {
    fetch('http://localhost:5000/bitcoin-history')
      .then((res) => res.json())
      .then((data) => {
        const prices = data.prices.map((price) => price[1]); // Precio por día
        const dates = data.prices.map((price) => new Date(price[0]).toLocaleDateString()); // Fechas

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Bitcoin Price (Last 30 Days)',
              data: prices,
              borderColor: 'rgba(75,192,192,1)',
              fill: false,
            },
          ],
        });
      });
  }, []);

  if (!bitcoinData || !chartData) {
    return <div>Loading...</div>;
  }

  // Extraemos información relevante
  const currentPrice = bitcoinData.market_data.current_price.usd;
  const ath = bitcoinData.market_data.ath.usd;
  const priceChange24h = bitcoinData.market_data.price_change_percentage_24h;
  const totalVolume = bitcoinData.market_data.total_volume.usd;
  const marketSentiment = bitcoinData.sentiment_votes_up_percentage;

  return (
    <div>
      <h1>Bitcoin Market Dashboard</h1>
      <div>
        <p><strong>Current Price:</strong> ${currentPrice}</p>
        <p><strong>All-Time High (ATH):</strong> ${ath}</p>
        <p><strong>24h Price Change:</strong> {priceChange24h}%</p>
        <p><strong>Total Volume:</strong> ${totalVolume}</p>
        <p><strong>Market Sentiment:</strong> {marketSentiment}% positive</p>
      </div>

      <div>
        <h2>Price Trend (Last 30 Days)</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;
