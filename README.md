# country-kit

Zero-dependency TypeScript package with all **249 ISO 3166-1 countries** — alpha-2 code, English name, flag emoji, and ITU dial code — plus fast lookup and search helpers. Ships dual ESM + CJS builds with full type declarations. Works in Node and browsers, tree-shakeable, ~10 KB.

## Install

```bash
npm i country-code-kit
```

## Usage

```ts
import {
  countries,
  getCountryByCode,
  getCountryByName,
  getCountryByFlag,
  getFlag,
  getName,
  getDialCode,
  getCountriesByDialCode,
  isValidCode,
  searchCountries,
  codeToFlag,
  flagToCode,
} from "country-kit";

countries.length;                    // 249
getCountryByCode("in");              // { code: "IN", name: "India", flag: "🇮🇳", dialCode: "+91" }
getCountryByName("Japan");           // { code: "JP", name: "Japan", flag: "🇯🇵", dialCode: "+81" }
getCountryByFlag("🇩🇪");             // { code: "DE", name: "Germany", flag: "🇩🇪", dialCode: "+49" }

getFlag("BD");                       // "🇧🇩"
getName("FR");                       // "France"
getDialCode("BD");                   // "+880"
getDialCode("AQ");                   // null  (territory with no assigned dial code)
isValidCode("zz");                   // false

getCountriesByDialCode("+1");
// [{ code: "US", ... }, { code: "CA", ... }, ...]  — all territories sharing +1

searchCountries("uni");
// [United Arab Emirates, United Kingdom, United States, ...]
// ranked: exact match → prefix match → substring match

codeToFlag("NP");                    // "🇳🇵" (no lookup table needed)
flagToCode("🇳🇵");                   // "NP"
```

CommonJS works too:

```js
const { getName } = require("country-kit");
```

## API


| Function                           | Returns                                                                |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `countries`                        | `readonly Country[]` — all 249 entries                                 |
| `getCountryByCode(code)`           | `Country | undefined` (case-insensitive)                               |
| `getCountryByName(name)`           | `Country | undefined` (case-insensitive)                               |
| `getCountryByFlag(flag)`           | `Country | undefined`                                                  |
| `getFlag(code)` / `getName(code)`  | `string | undefined`                                                   |
| `getDialCode(code)`                | `string | null | undefined` — `null` for territories with no dial code |
| `getCountriesByDialCode(dialCode)` | `Country[]` — all countries sharing a dial code (e.g. `"+1"`)          |
| `isValidCode(code)`                | `boolean`                                                              |
| `searchCountries(query)`           | `Country[]` ranked by match quality                                    |
| `codeToFlag(code)`                 | `string` (throws on invalid input)                                     |
| `flagToCode(flag)`                 | `string | undefined`                                                   |


```ts
interface Country {
  code: string;          // ISO 3166-1 alpha-2, e.g. "IN"
  name: string;          // English short name, e.g. "India"
  flag: string;          // Flag emoji, e.g. "🇮🇳"
  dialCode: string | null; // ITU calling code incl. "+", e.g. "+880". Null for territories with no assigned code.
}
```

## License

MIT