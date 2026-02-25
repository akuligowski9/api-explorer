import type { ApiEntry } from "./types";

type AuthHeader = { key: string; value: string } | null;

function getAuthHeader(auth: ApiEntry["Auth"]): AuthHeader {
  switch (auth) {
    case "apiKey":
      return { key: "Authorization", value: "Bearer YOUR_API_KEY" };
    case "OAuth":
      return { key: "Authorization", value: "Bearer YOUR_ACCESS_TOKEN" };
    case "X-Mashape-Key":
      return { key: "X-Mashape-Key", value: "YOUR_KEY" };
    case "User-Agent":
      return { key: "User-Agent", value: "YourApp/1.0" };
    default:
      return null;
  }
}

export function generateCurl(api: ApiEntry): string {
  const url = api.Link;
  const header = getAuthHeader(api.Auth);

  if (header) {
    return `curl -X GET "${url}" \\\n  -H "${header.key}: ${header.value}"`;
  }
  return `curl -X GET "${url}"`;
}

export function generateJavaScript(api: ApiEntry): string {
  const url = api.Link;
  const header = getAuthHeader(api.Auth);

  const lines: string[] = [];

  if (header) {
    lines.push(`const response = await fetch("${url}", {`);
    lines.push(`  headers: {`);
    lines.push(`    "${header.key}": "${header.value}"`);
    lines.push(`  }`);
    lines.push(`});`);
  } else {
    lines.push(`const response = await fetch("${url}");`);
  }

  lines.push(`const data = await response.json();`);
  lines.push(`console.log(data);`);

  return lines.join("\n");
}

export function generatePython(api: ApiEntry): string {
  const url = api.Link;
  const header = getAuthHeader(api.Auth);

  const lines: string[] = ["import requests", ""];

  if (header) {
    lines.push(`response = requests.get(`);
    lines.push(`    "${url}",`);
    lines.push(`    headers={"${header.key}": "${header.value}"}`);
    lines.push(`)`);
  } else {
    lines.push(`response = requests.get("${url}")`);
  }

  lines.push(`data = response.json()`);
  lines.push(`print(data)`);

  return lines.join("\n");
}
