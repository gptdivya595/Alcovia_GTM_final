/**
 * Formats numbers into Indian Rupee format (e.g. ₹32,45,875)
 */
export function formatINR(amount: number, includeDecimals = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  // Format using en-IN locale
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format compact numbers in Lakhs (L) and Crores (Cr) for chart axis or compact badges
 */
export function formatCompactINR(amount: number): string {
  if (Math.abs(amount) >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(amount) >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (Math.abs(amount) >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount}`;
}

/**
 * Format percentages with consistent 1 decimal place
 */
export function formatPercent(value: number, decimals = 1): string {
  if (isNaN(value) || value === null || value === undefined) {
    return '0.0%';
  }
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format plain numbers with Indian numbering commas
 */
export function formatNumberIN(num: number): string {
  if (isNaN(num) || num === null || num === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-IN').format(num);
}
