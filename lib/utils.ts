/**
 * Utility functions for formatting numbers, currency, and classnames.
 * Designed for formal, clean enterprise financial and operational reporting.
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format large numbers to human-readable compact format (e.g. 15.2M, 5.1M, 2.05M).
 */
export function formatCompactNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + "T";
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(0) + "K";
  }
  return num.toString();
}

/**
 * Standard integer with thousand separators (ID locale).
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat("id-ID").format(num);
}

/**
 * Currency formatter (IDR format).
 * Compact option turns 2,458,920,000,000 into "Rp 2,45 T"
 */
export function formatCurrency(amount: number, compact: boolean = false): string {
  if (compact) {
    if (amount >= 1_000_000_000_000) {
      return `Rp ${(amount / 1_000_000_000_000).toFixed(2)} T`;
    }
    if (amount >= 1_000_000_000) {
      return `Rp ${(amount / 1_000_000_000).toFixed(1)} M`;
    }
    if (amount >= 1_000_000) {
      return `Rp ${(amount / 1_000_000).toFixed(1)} Jt`;
    }
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format percentages with standard sign.
 */
export function formatPercentage(val: number, showSign: boolean = true): string {
  const sign = showSign && val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}

