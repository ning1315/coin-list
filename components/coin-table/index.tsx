"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Coin } from "@/types/coin";
import styles from "./index.module.css";
import { formatPrice } from "@/lib/formatPrice";

type CoinTableProps = {
  coins: Coin[];
};

export default function CoinTable({ coins }: CoinTableProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      // eslint-disable-next-line
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  const toggleFavorite = (coinId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(coinId)) {
      newFavorites.delete(coinId);
    } else {
      newFavorites.add(coinId);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>24h Change</th>
            <th>24h Volume</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <div className={styles.nameCell}>
                  <button
                    className={styles.favoriteBtn}
                    onClick={() => toggleFavorite(coin.id)}
                  >
                    <Star
                      size={16}
                      fill={favorites.has(coin.id) ? "#fbbf24" : "none"}
                      color={favorites.has(coin.id) ? "#fbbf24" : "#666"}
                    />
                  </button>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className={styles.coinIcon}
                  />
                  <div>
                    <div className={styles.coinSymbol}>
                      {coin.symbol.toUpperCase()}
                    </div>
                    <div className={styles.coinName}>{coin.name}</div>
                  </div>
                </div>
              </td>
              <td>
                <div>{coin.current_price.toLocaleString()}</div>
                <div className={styles.priceUsd}>
                  ${coin.current_price.toLocaleString()}
                </div>
              </td>
              <td>
                <span
                  className={
                    coin.price_change_percentage_24h >= 0
                      ? styles.positive
                      : styles.negative
                  }
                >
                  {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </span>
              </td>
              <td>{formatPrice(coin.total_volume)}</td>
              <td>{formatPrice(coin.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
