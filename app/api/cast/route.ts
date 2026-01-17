import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const identifier = searchParams.get('identifier');
    const type = searchParams.get('type') || 'hash';

    if (!identifier) {
        return NextResponse.json({ error: 'Missing identifier' }, { status: 400 });
    }

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            'x-neynar-experimental': 'false',
            'x-api-key': process.env.NEYNAR_API_KEY! // API key from env
        }
    };

    try {
        const response = await fetch(
            `https://api.neynar.com/v2/farcaster/cast?identifier=${identifier}&type=${type}`,
            options
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Neynar API Error:", errorData);
            return NextResponse.json(
                { error: 'Failed to fetch cast data', details: errorData },
                { status: response.status }
            );
        }

        const data = await response.json();
        const cast = data.cast;

        if (!cast) {
            return NextResponse.json({ error: 'Cast not found' }, { status: 404 });
        }

        // Extracting required fields as per user request
        const extractedData = {
            username: cast.author.username,
            pfp_url: cast.author.pfp_url,
            text: cast.text,
            embeds: cast.embeds.map((embed: { url: string }) => embed.url), // Simplified list of URLs
            reactions: {
                likes_count: cast.reactions.likes_count,
                recasts_count: cast.reactions.recasts_count,
            },
            replies: {
                count: cast.replies.count,
            }
        };

        return NextResponse.json(extractedData);

    } catch (err) {
        console.error('API Route Error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
