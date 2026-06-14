import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countries, getCountryByCode, getCountryByName, getCountryByFlag,
  getFlag, getName, isValidCode, searchCountries, codeToFlag, flagToCode,
  getDialCode, getCountriesByDialCode
} from "../dist/esm/index.js";

test("has all 249 ISO countries", () => assert.equal(countries.length, 249));

test("lookup by code (case-insensitive)", () => {
  assert.equal(getCountryByCode("in").name, "India");
  assert.equal(getCountryByCode("IN").flag, "🇮🇳");
  assert.equal(getCountryByCode("XX"), undefined);
});

test("lookup by name", () => {
  assert.equal(getCountryByName("bangladesh").code, "BD");
  assert.equal(getCountryByName("  Japan ").flag, "🇯🇵");
});

test("lookup by flag", () => {
  assert.equal(getCountryByFlag("🇩🇪").name, "Germany");
  assert.equal(getCountryByFlag("hello"), undefined);
});

test("getFlag / getName / isValidCode", () => {
  assert.equal(getFlag("us"), "🇺🇸");
  assert.equal(getName("FR"), "France");
  assert.equal(isValidCode("gb"), true);
  assert.equal(isValidCode("ZZ"), false);
});

test("search ranks exact > prefix > partial", () => {
  const r = searchCountries("in");
  assert.equal(r[0].code, "IN"); // exact code match first
  assert.ok(searchCountries("united").length >= 3);
  assert.deepEqual(searchCountries(""), []);
});

test("codeToFlag / flagToCode round-trip", () => {
  assert.equal(codeToFlag("np"), "🇳🇵");
  assert.equal(flagToCode("🇳🇵"), "NP");
  assert.throws(() => codeToFlag("USA"));
});

test("getDialCode returns correct dial code", () => {
  assert.equal(getDialCode("BD"), "+880");
  assert.equal(getDialCode("US"), "+1");
  assert.equal(getDialCode("IN"), "+91");
  assert.equal(getDialCode("AQ"), null); // Antarctica has no dial code
  assert.equal(getDialCode("XX"), undefined); // unknown code
});

test("getCountriesByDialCode returns countries sharing a dial code", () => {
  const plus1 = getCountriesByDialCode("+1");
  assert.ok(plus1.some((c) => c.code === "US"));
  assert.ok(plus1.some((c) => c.code === "CA"));
  assert.ok(plus1.length >= 2); // US and CA share +1

  const bd = getCountriesByDialCode("+880");
  assert.equal(bd.length, 1);
  assert.equal(bd[0].code, "BD");

  assert.deepEqual(getCountriesByDialCode("+9999"), []);
});

test("all countries have dialCode field (string or null)", () => {
  for (const c of countries) {
    assert.ok(
      c.dialCode === null || (typeof c.dialCode === "string" && c.dialCode.startsWith("+")),
      `${c.code} has invalid dialCode: ${c.dialCode}`
    );
  }
});
