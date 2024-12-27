/**
 * Home Component
 *
 * This component displays real-time cryptocurrency data fetched from the CoinGecko API.
 * It includes internationalization (i18n) support for multiple languages (English, Spanish, French).
 * The data includes the name, price, and 1-hour price change percentage of the top 10 cryptocurrencies by market cap.
 *
 * Features:
 * - Fetches cryptocurrency data from CoinGecko API.
 * - Displays a table with cryptocurrency information.
 * - Supports language switching (i18n).
 * - Handles loading and error states gracefully.
 */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n"; // i18n configuration
import "../styles/Home.css"; // Styling for the component

// API endpoint for fetching cryptocurrency data
const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

const Home: React.FC = () => {
  // i18n hook for translation and language switching
  const { t, i18n } = useTranslation();

  // State variables
  const [cryptoData, setCryptoData] = useState<any[]>([]); // Stores cryptocurrency data
  const [loading, setLoading] = useState<boolean>(true); // Indicates if data is being loaded
  const [error, setError] = useState<string | null>(null); // Stores error message if fetch fails

  /**
   * Fetches cryptocurrency data from the CoinGecko API on component mount.
   */
  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetch(
          `${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&price_change_percentage=1h`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cryptocurrency data");
        }
        const data = await response.json();
        setCryptoData(data); // Update state with fetched data
        setLoading(false); // Stop loading
      } catch (error: any) {
        console.error("Error fetching data:", error.message);
        setError(error.message); // Set error message
        setLoading(false); // Stop loading
      }
    };

    fetchCryptoData();
  }, []);

  /**
   * Renders the rows for the cryptocurrency table.
   */
  const renderCryptoRows = () => {
    return cryptoData.map((crypto, index) => (
      <div className="table-row" key={crypto.id}>
        <span>
          {index + 1}.&nbsp;{crypto.name} {/* Cryptocurrency name */}
        </span>
        <span>${crypto.current_price.toLocaleString()}</span> {/* Current price */}
        <span></span>
        <span
          className={
            crypto.price_change_percentage_1h_in_currency >= 0 ? "green" : "red"
          }
        >
          {crypto.price_change_percentage_1h_in_currency
            ? `${crypto.price_change_percentage_1h_in_currency.toFixed(2)}%`
            : "N/A"} {/* 1-hour price change */}
        </span>
      </div>
    ));
  };

  return (
    <div className="home-container">
      {/* Language Selector */}
      <select
        onChange={(e) => i18n.changeLanguage(e.target.value)} // Switch language
        className="language-select"
      >
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
      </select>

      {/* Today's Prices Section */}
      <div className="today-prices">
        <h1>{t("todayPrices")}</h1> {/* Translated title */}
        <p>
          {t("globalMarketCap")} <span className="bold">{t("marketCapValue")}</span>,{" "}
          {t("increase")} {/* Example translation with dynamic text */}
        </p>
        <a href="/" className="read-more">
          {t("readMore")} {/* Translated link */}
        </a>
      </div>

      {/* Cryptocurrency Table */}
      <div className="crypto-table">
        {/* Table Header */}
        <div className="table-header">
          <span>{t("table.name")}</span> {/* Name column */}
          <span>{t("table.price")}</span> {/* Price column */}
          <span></span>
          <span>{t("table.change1h")}</span> {/* 1-hour change column */}
        </div>
        {/* Table Content */}
        {loading ? (
          <div>{t("loading")}</div> // Loading state
        ) : error ? (
          <div>{t("error")}</div> // Error state
        ) : (
          renderCryptoRows() // Render cryptocurrency rows
        )}
      </div>
    </div>
  );
};

export default Home;