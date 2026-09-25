export default {
  async fetch(request) {
    const url = new URL(request.url);
    const name = url.searchParams.get("name") || "stardustfall";

    const apiUrl = `https://lounge.mkcentral.com/api/player/details?name=${encodeURIComponent(name)}`;

    try {
      const apiResponse = await fetch(apiUrl, {
        headers: {
          // Cloudflareからのリクエスト拒否を回避するためのUser-Agent
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });

      const data = await apiResponse.text();

      return new Response(data, {
        status: apiResponse.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS"
        }
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
};