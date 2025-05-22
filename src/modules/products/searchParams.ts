import { parseAsString, createLoader, parseAsArrayOf, parseAsStringLiteral } from "nuqs/server"

export const sortedValues = ["curated","trending","hot_and_new"] as const

// 9:19:22

const params = {
    sort: parseAsStringLiteral(sortedValues).withDefault("curated"),
    minPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    maxPrice: parseAsString.withOptions({ clearOnDefault: true }).withDefault(""),
    tags: parseAsArrayOf(parseAsString).withOptions({ clearOnDefault: true }).withDefault([]),
}

export const loadProductFilters = createLoader(params);