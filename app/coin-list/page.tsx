import Tab from "@/components/tab";
import SearchInput from "@/components/search-input";
import styles from "./page.module.css";

const TABS = [
  { label: "All", value: "all" },
  { label: "My favorite", value: "favorite" },
];

type CoinListProps = {
  searchParams: Promise<{ tab?: string; search?: string }>;
};

export default async function CoinList({ searchParams }: CoinListProps) {
  const { tab } = await searchParams;
  const activeTab = tab === "favorite" ? "favorite" : "all";

  return (
    <div className={styles.pageContainer}>
      <h1>Coin List</h1>
      <Tab tabs={TABS} activeTab={activeTab} />
      <SearchInput placeholder="Search something...(BTC, Bitcoin, B...)" />
    </div>
  );
}
