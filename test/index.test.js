import { test } from "node:test";
import assert from "node:assert/strict";
import {
  countries, getCountryByCode, getCountryByName, getCountryByFlag,
  getFlag, getName, isValidCode, searchCountries, codeToFlag, flagToCode
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
