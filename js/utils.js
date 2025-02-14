<file>
// utils.js - Utility functions

// Optimized number formatting - consider memoization for performance if needed in future
export function formatNumber(number) {
  if (typeof number !== 'number') {
    console.warn('formatNumber: Input is not a number.'); // Input validation
    return '0'; // Or handle non-number input appropriately
  }
  return number.toLocaleString();
}
</file>
