/** A single country entry. */
export interface Country {
  /** ISO 3166-1 alpha-2 code, e.g. "IN" */
  code: string;
  /** English short name, e.g. "India" */
  name: string;
  /** Flag emoji, e.g. "🇮🇳" */
  flag: string;
  /** ITU calling code including +, e.g. "+880". Null for territories with no assigned dial code. */
  dialCode: string | null;
}
