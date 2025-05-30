import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

const sortedValues = ["curated","trending","hot_and_new"] as const

const params = {
    sort: parseAsStringLiteral(sortedValues).withDefault("curated"),
    minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
}

export const useProductFilters = () => {
    return useQueryStates(params)
}