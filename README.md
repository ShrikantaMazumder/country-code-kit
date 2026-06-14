# country-kit

Zero-dependency TypeScript package with all **249 ISO 3166-1 countries** — alpha-2 code, English name, and flag emoji — plus fast lookup and search helpers. Ships dual ESM + CJS builds with full type declarations. Works in Node and browsers, tree-shakeable, ~10 KB.

## Install

```bash
npm install country-kit
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
  isValidCode,
  searchCountries,
  codeToFlag,
  flagToCode,
} from "country-kit";

countries.length;             // 249
getCountryByCode("in");       // { code: "IN", name: "India", flag: "🇮🇳" }
getCountryByName("Japan");    // { code: "JP", name: "Japan", flag: "🇯🇵" }
getCountryByFlag("🇩🇪");      // { code: "DE", name: "Germany", flag: "🇩🇪" }

getFlag("BD");                // "🇧🇩"
getName("FR");                // "France"
isValidCode("zz");            // false

searchCountries("uni");
// [United Arab Emirates, United Kingdom, United States, ...]
// ranked: exact match → prefix match → substring match

codeToFlag("NP");             // "🇳🇵" (no lookup table needed)
flagToCode("🇳🇵");            // "NP"
```

CommonJS works too:

```js
const { getName } = require("country-kit");
```

## API

| Function | Returns |
|---|---|
| `countries` | `readonly Country[]` — all 249 entries |
| `getCountryByCode(code)` | `Country \| undefined` (case-insensitive) |
| `getCountryByName(name)` | `Country \| undefined` (case-insensitive) |
| `getCountryByFlag(flag)` | `Country \| undefined` |
| `getFlag(code)` / `getName(code)` | `string \| undefined` |
| `isValidCode(code)` | `boolean` |
| `searchCountries(query)` | `Country[]` ranked by match quality |
| `codeToFlag(code)` | `string` (throws on invalid input) |
| `flagToCode(flag)` | `string \| undefined` |

```ts
interface Country {
  code: string; // ISO 3166-1 alpha-2, e.g. "IN"
  name: string; // English short name, e.g. "India"
  flag: string; // Flag emoji, e.g. "🇮🇳"
}
```


## License

MIT
