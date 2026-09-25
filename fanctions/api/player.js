export async function onRequest(context) {
  const url = new URL(context.request.url);
  const name = url.searchParams.get("name") || "stardustfall";

  const targetUrl = `https://www.mk8dx-lounge.com/api/player/details?name=${encodeURIComponent(name)}`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    });

    const data = await res.text();

    return new Response(data, {
      status: res.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}