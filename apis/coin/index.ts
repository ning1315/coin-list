import { Coin } from "@/apis/coin/type";

export async function getCoins(): Promise<Coin[]> {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=100",
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch coins");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching coins:", error);
    return [];
  }
}
