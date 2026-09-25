export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // /api/player/details へのリクエストを横取りして代理送信する
        if (url.pathname === '/api/player/details') {
            const name = url.searchParams.get('name');
            if (!name) {
                return new Response('Missing name parameter', { status: 400 });
            }

            const targetUrl = `https://lounge.mkcentral.com/api/player/details?name=${encodeURIComponent(name)}`;

            const response = await fetch(targetUrl, {
                headers: {
                'User-Agent': 'MK8DX-Overlay/1.0'
                }
            });

            const data = await response.text();

            // CORSヘッダーを付与して呼び出し元（自分のHTML）に返す
            return new Response(data, {
                status: response.status,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // その他の静的ファイル (index.html, style.css等) はそのまま返す
        return env.ASSETS.fetch(request);
    }
};