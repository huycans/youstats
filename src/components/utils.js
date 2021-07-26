//this lib contains helpful functions
import { useState, useEffect, useRef } from "react";

//helper hooks
/**
 * This hook allows you to debounce any fast changing value. The debounced value will only reflect the latest value when the useDebounce hook has not been called for the specified time period.
 * Source: https://usehooks.com/useDebounce/
 * @param {*} value
 * @param {*} delay
 * @return {*} a debounced value
 */
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
}

export { useDebounce };