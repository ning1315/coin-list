"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Star, ArrowUpDown } from "lucide-react";
import { Coin, SortField } from "@/api/coin/type";
import { formatPrice } from "@/lib/formatPrice";
import styles from "./index.module.css";

export default function CoinTable({
  coins,
  favorites,
  onToggleFavorite,
}: {
  coins: Coin[];
  favorites: Set<string>;
  onToggleFavorite: (coinId: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentSort = params.get("sort");
    const currentOrder = params.get("order");

    if (currentSort === field) {
      params.set("order", currentOrder === "asc" ? "desc" : "asc");
    } else {
      params.set("sort", field);
      params.set("order", "desc");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th
              onClick={() => handleSort("current_price")}
              className={styles.sortable}
            >
              <div>
                Price <ArrowUpDown size={14} />
              </div>
            </th>
            <th
              onClick={() => handleSort("price_change_percentage_24h")}
              className={styles.sortable}
            >
              <div>
                24h Change <ArrowUpDown size={14} />
              </div>
            </th>
            <th
              onClick={() => handleSort("total_volume")}
              className={styles.sortable}
            >
              <div>
                24h Volume <ArrowUpDown size={14} />
              </div>
            </th>
            <th
              onClick={() => handleSort("market_cap")}
              className={styles.sortable}
            >
              <div>
                Market Cap <ArrowUpDown size={14} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <div className={styles.nameCell}>
                  <button
                    className={styles.favoriteBtn}
                    onClick={() => onToggleFavorite(coin.id)}
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
