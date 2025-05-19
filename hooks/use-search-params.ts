import { parseAsString, useQueryState } from "nuqs";

export default function useSearchParams() {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
}
