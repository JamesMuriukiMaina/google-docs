import { useRef, useCallback } from "react";

export default function useDebounce<
  T extends (...args: Parameters<T>) => ReturnType<T>
>(callback: T, delay = 500) {
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  return useCallback(() => {}, []);
}
