"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./index.module.css";
import clsx from "clsx";

type TabProps = {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onTabChange?: (value: string) => void;
  className?: string;
  searchParamKey?: string;
};

export default function Tab({
  tabs,
  activeTab,
  onTabChange,
  className,
  searchParamKey = "tab",
}: TabProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    } else {
      const params = new URLSearchParams(searchParams.toString());
      params.set(searchParamKey, value);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className={clsx(styles.tabContainer, className)} role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            className={clsx(styles.linkedTabButton, {
              [styles.activeTabButton]: isActive,
            })}
            onClick={() => handleTabChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
