import { useState, useEffect } from "react";
import { Coin, SortField } from "@/apis/coin/type";
import { getCoins } from "@/apis/coin";

type UseCoinListParams = {
  search?: string;
  tab?: string;
  sort?: SortField;
  order?: "asc" | "desc";
};

export function useCoinList({
  search,
  tab,
  sort,
  order = "desc",
}: UseCoinListParams) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 즐겨찾기 로드
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      // eslint-disable-next-line
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // 코인 데이터 로드
  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      const data = await getCoins();
      setCoins(data);
      setLoading(false);
    };
    fetchCoins();
  }, []);

  const toggleFavorite = (coinId: string) => {
    const newFavorites = new Set(favorites);
    const isAdding = !newFavorites.has(coinId);

    if (isAdding) {
      newFavorites.add(coinId);
    } else {
      newFavorites.delete(coinId);
    }

    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));

    return isAdding;
  };

  // 필터링된 코인 목록
  let filteredCoins = coins.filter((coin) => {
    // 검색 필터
    if (search) {
      const query = search.toLowerCase();
      const matchSearch =
        coin.symbol.toLowerCase().includes(query) ||
        coin.name.toLowerCase().includes(query);
      if (!matchSearch) return false;
    }

    // 즐겨찾기 필터
    if (tab === "favorite") {
      return favorites.has(coin.id);
    }

    return true;
  });

  // 정렬
  if (sort) {
    filteredCoins = [...filteredCoins].sort((a, b) => {
      const aValue = a[sort];
      const bValue = b[sort];
      return order === "asc" ? aValue - bValue : bValue - aValue;
    });
  }

  return {
    coins: filteredCoins,
    loading,
    favorites,
    toggleFavorite,
  };
}
