"use client";

import { useSearchParams } from "next/navigation";
import Tab from "@/components/tab";
import SearchInput from "@/components/search-input";
import CoinTable from "@/components/coin-table";
import CoinTableSkeleton from "@/components/coin-table/skeleton";
import { useCoinList } from "@/hooks/useCoinList";
import { useToast } from "@/contexts/ToastContext";
import { SortField } from "@/apis/coin/type";
import styles from "./page.module.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "My favorite", value: "favorite" },
];

export default function CoinList() {
  const { coins, loading, favorites, toggleFavorite, activeTab } =
    useCoinList();

  return (
    <div className={styles.pageContainer}>
      <h1>Coin List</h1>
      <Tab tabs={TABS} activeTab={activeTab} />
      <SearchInput placeholder="Search something...(BTC, Bitcoin, B...)" />
      {loading ? (
        <CoinTableSkeleton />
      ) : (
        <CoinTable
          coins={coins}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
    </div>
  );
}
