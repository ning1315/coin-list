"use client";

import { useSearchParams } from "next/navigation";
import Tab from "@/components/tab";
import SearchInput from "@/components/search-input";
import CoinTable from "@/components/coin-table";
import CoinTableSkeleton from "@/components/coin-table/skeleton";
import { useCoinList } from "@/hooks/useCoinlist";
import styles from "./page.module.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "My favorite", value: "favorite" },
];

export default function CoinList() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";
  const activeTab = tab === "favorite" ? "favorite" : "all";

  const { coins, loading } = useCoinList({ search, tab });

  return (
    <div className={styles.pageContainer}>
      <h1>Coin List</h1>
      <Tab tabs={TABS} activeTab={activeTab} />
      <SearchInput placeholder="Search something...(BTC, Bitcoin, B...)" />
      {loading ? <CoinTableSkeleton /> : <CoinTable coins={coins} />}
    </div>
  );
}
