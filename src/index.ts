import { countries } from "./data.js";
import type { Country } from "./types.js";

export type { Country };
export { countries };

const byCode = new Map<string, Country>(countries.map((c) => [c.code, c]));
const byName = new Map<string, Country>(
  countries.map((c) => [c.name.toLowerCase(), c])
);
const byDialCode = new Map<string, Country[]>();
for (const c of countries) {
  if (c.dialCode) {
    const list = byDialCode.get(c.dialCode) ?? [];
    list.push(c);
    byDialCode.set(c.dialCode, list);
  }
}

/** Get a country by its ISO 3166-1 alpha-2 code (case-insensitive). */
export function getCountryByCode(code: string): Country | undefined {
  return byCode.get(code.trim().toUpperCase());
}

/** Get a country by its exact English name (case-insensitive). */
export function getCountryByName(name: string): Country | undefined {
  return byName.get(name.trim().toLowerCase());
}

/** Get a country by its flag emoji, e.g. "🇮🇳" → India. */
export function getCountryByFlag(flag: string): Country | undefined {
  const code = flagToCode(flag.trim());
  return code ? byCode.get(code) : undefined;
}

/** Get just the flag emoji for a code. Returns undefined for unknown codes. */
export function getFlag(code: string): string | undefined {
  return getCountryByCode(code)?.flag;
}

/** Get just the English name for a code. Returns undefined for unknown codes. */
export function getName(code: string): string | undefined {
  return getCountryByCode(code)?.name;
}

/** Get the dial code (e.g. "+880") for an alpha-2 code. Returns null for territories with no dial code, undefined for unknown codes. */
export function getDialCode(code: string): string | null | undefined {
  return getCountryByCode(code)?.dialCode;
}

/**
 * Get all countries that share a given dial code (e.g. "+1" → US, CA, and many Caribbean territories).
 * The dialCode argument must include the leading "+".
 */
export function getCountriesByDialCode(dialCode: string): Country[] {
  return byDialCode.get(dialCode.trim()) ?? [];
}

/** Check whether a string is a valid ISO 3166-1 alpha-2 code. */
export function isValidCode(code: string): boolean {
  return byCode.has(code.trim().toUpperCase());
}

/**
 * Search countries by partial, case-insensitive match on name or code.
 * Results are ranked: exact code/name match first, then prefix matches,
 * then substring matches.
 */
export function searchCountries(query: string): Country[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const exact: Country[] = [];
  const prefix: Country[] = [];
  const partial: Country[] = [];

  for (const c of countries) {
    const name = c.name.toLowerCase();
    const code = c.code.toLowerCase();
    if (name === q || code === q) exact.push(c);
    else if (name.startsWith(q) || code.startsWith(q)) prefix.push(c);
    else if (name.includes(q)) partial.push(c);
  }
  return [...exact, ...prefix, ...partial];
}

/** Convert an alpha-2 code to its flag emoji without a lookup, e.g. "JP" → "🇯🇵". */
export function codeToFlag(code: string): string {
  const c = code.trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(c)) {
    throw new Error(`Invalid alpha-2 code: "${code}"`);
  }
  return String.fromCodePoint(
    ...[...c].map((ch) => 0x1f1e6 + ch.charCodeAt(0) - 65)
  );
}

/** Convert a flag emoji back to its alpha-2 code, e.g. "🇯🇵" → "JP". */
export function flagToCode(flag: string): string | undefined {
  const points = [...flag].map((ch) => ch.codePointAt(0)!);
  if (
    points.length !== 2 ||
    points.some((p) => p < 0x1f1e6 || p > 0x1f1ff)
  ) {
    return undefined;
  }
  return points.map((p) => String.fromCharCode(p - 0x1f1e6 + 65)).join("");
}
