import axios from "axios";

// bitly api endpoint
const sm = axios.create({
  baseURL: "https://api.shortmenu.com/",
});

export async function shorten(
  url: string,
  domain: string,
  tags: string[],
  apikey: string,
) {
  const response = await sm.post(
    "links",
    { destinationUrl: url, domain, tags },
    { headers: { "X-Api-Key": apikey } },
  );
  return response.data.shortUrl;
}

export async function test() {
  const key = "XXXX";
  print(await shorten("https://example.com", "shm.to", [], key));
}
