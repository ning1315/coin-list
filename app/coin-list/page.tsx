import Tab from "@/components/tab";
import SearchInput from "@/components/search-input";
import CoinTable from "@/components/coin-table";
import { MOCK_COINS } from "@/lib/mockData";
import styles from "./page.module.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "My favorite", value: "favorite" },
];

type CoinListProps = {
  searchParams: Promise<{
    tab?: string;
    search?: string;
  }>;
};

export default async function CoinList({ searchParams }: CoinListProps) {
  const { tab, search } = await searchParams;
  const activeTab = tab === "favorite" ? "favorite" : "all";

  let coins = MOCK_COINS;

  // 검색 필터링
  if (search) {
    const query = search.toLowerCase();
    coins = coins.filter(
      (coin) =>
        coin.symbol.toLowerCase().includes(query) ||
        coin.name.toLowerCase().includes(query)
    );
  }

  return (
    <div className={styles.pageContainer}>
      <h1>Coin List</h1>
      <Tab tabs={TABS} activeTab={activeTab} />
      <SearchInput placeholder="Search something...(BTC, Bitcoin, B...)" />
      <CoinTable coins={coins} />
    </div>
  );
}
