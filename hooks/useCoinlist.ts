import { useState, useEffect } from "react";
import { Coin, SortField } from "@/apis/coin/type";
import { getCoins } from "@/apis/coin";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/contexts/ToastContext";

export function useCoinList() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";
  const sort =
    (searchParams.get("sort") as SortField | null) || "current_price";
  const order = (searchParams.get("order") as "asc" | "desc" | null) || "desc";
  const activeTab = tab === "favorite" ? "favorite" : "all";
  const { showToast } = useToast();

  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 즐겨찾기 로드
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(new Set(JSON.parse(stored)));
    }
  }, []);

  // 코인 데이터 로드
  useEffect(() => {
    const fetchCoins = async () => {
      const data = await getCoins();
      if (data.length > 0) {
        setCoins(data);
        setLoading(false);
      } else {
        showToast({
          message: "코인 데이터를 불러오는데 실패했습니다.",
          type: "error",
        });
      }
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

    showToast(
      isAdding
        ? { message: "Successfully added!", type: "success" }
        : { message: "Successfully deleted!", type: "error" }
    );

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
    activeTab,
  };
}
