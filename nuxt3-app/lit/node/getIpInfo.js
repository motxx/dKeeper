export async function getIpInfo() {
  const headers = new Headers();
  headers.append("User-Agent", "curl/7.72.0");
  const ipURL = "https:/" + "/ipinfo.io";
  const r = await fetch(ipURL);
  return await r.json();
}
