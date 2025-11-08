"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

interface SearchInputProps {
  placeholder?: string;
}

export default function SearchInput({ placeholder }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const currentSearch = params.get("search") || "";

      if (value !== currentSearch) {
        if (value) {
          params.set("search", value);
        } else {
          params.delete("search");
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value, pathname, router]);

  return (
    <div className={styles.searchContainer}>
      <Search className={styles.searchIcon} size={20} />
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
