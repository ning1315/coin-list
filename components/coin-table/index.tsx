"use client";

import { useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Star, ArrowUpDown } from "lucide-react";
import { Coin, SortField } from "@/apis/coin/type";
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
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: coins.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 5,
  });

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

  const items = virtualizer.getVirtualItems();

  return (
    <div ref={parentRef} className={styles.tableWrapper}>
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
          <tr style={{ height: `${items[0]?.start ?? 0}px` }} />
          {items.map((virtualRow) => {
            const coin = coins[virtualRow.index];
            return (
              <tr key={coin.id} data-index={virtualRow.index}>
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
            );
          })}
          <tr
            style={{
              height: `${
                virtualizer.getTotalSize() - (items[items.length - 1]?.end ?? 0)
              }px`,
            }}
          />
        </tbody>
      </table>
    </div>
  );
}
