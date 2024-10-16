# Bitcoin Market Dashboard 

Un **Dashboard de Bitcoin** que muestra información en tiempo real sobre el mercado utilizando la API de CoinGecko. El dashboard incluye el precio actual de Bitcoin, su máximo histórico (ATH), el volumen negociado, el cambio porcentual en las últimas 24 horas, y un gráfico de la evolución del precio en los últimos 30 días.
### https://analytics-dashboard-bay.vercel.app/

## Screenshots

#### Vista principal del dashboard
![Bitcoin Dashboard](./assets/Screenshot.png)

## Características

- **Precio en tiempo real** de Bitcoin en USD.
- **Máximo histórico (ATH)** de Bitcoin.
- **Cambio en las últimas 24 horas** en porcentaje.
- **Volumen total negociado** en USD.
- **Sentimiento del mercado**, que muestra el porcentaje de opiniones positivas.
- **Gráfico de línea** que muestra la tendencia del precio de Bitcoin en los últimos 30 días.

## Tecnologías utilizadas

- **Backend**: Node.js, Express, Axios
- **Frontend**: React, Chart.js, React-Chartjs-2
- **API**: CoinGecko API
- **DEPLOY**: Vercel

## Requisitos previos

Antes de ejecutar este proyecto, asegúrate de tener instalado:

- **Node.js** (v12 o superior)
- **npm** (v6 o superior)

## Instrucciones de instalación

Sigue estos pasos para ejecutar el proyecto localmente:

### Clonar el repositorio

```bash
git clone https://github.com/FranFigueroa/bitcoin-dashboard.git
cd bitcoin-dashboard
