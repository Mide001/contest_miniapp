import { Heart, MessageCircle, Repeat, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SubmissionProps {
    id: string;
    image?: string;
    username?: string;
    votes?: number;
    hash?: string;
}

export default function SubmissionCard({ image: initialImage, username: initialUsername, votes: initialVotes, hash }: Omit<SubmissionProps, 'id'>) {
    const [image, setImage] = useState(initialImage);
    const [username, setUsername] = useState(initialUsername || 'Loading...');
    const [pfp, setPfp] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [loading, setLoading] = useState(!!hash);
    const [metrics, setMetrics] = useState({ likes: initialVotes || 0, recasts: 0, replies: 0 });

    // Upvote State
    const [voteCount, setVoteCount] = useState(1);

    useEffect(() => {
        if (!hash) return;

        async function fetchCastValue() {
            try {
                const res = await fetch(`/api/cast?identifier=${hash}`);
                const data = await res.json();

                if (data.username) {
                    setUsername(data.username);
                    setPfp(data.pfp_url);
                    setText(data.text);

                    if (data.embeds && data.embeds.length > 0) {
                        setImage(data.embeds[0]);
                    }
                    if (data.reactions) {
                        setMetrics({
                            likes: data.reactions.likes_count || 0,
                            recasts: data.reactions.recasts_count || 0,
                            replies: data.replies?.count || 0
                        });
                    }
                }
            } catch (err) {
                console.error("Failed to fetch cast:", err);
                setUsername("Error loading");
            } finally {
                setLoading(false);
            }
        }

        fetchCastValue();
    }, [hash]);

    const isVideo = image?.endsWith('.m3u8') || image?.endsWith('.mp4');

    const handleDecrement = () => {
        if (voteCount > 1) setVoteCount(prev => prev - 1);
    };

    const handleIncrement = () => {
        setVoteCount(prev => prev + 1);
    };

    const handleUpvote = () => {
        // Todo: Implement actual upvote logic
        console.log(`Upvoting with ${voteCount} votes`);
    };

    return (
        <div className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm ${loading ? 'opacity-70 animate-pulse' : 'opacity-100'}`}>
            <div className="flex gap-3">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    {pfp ? (
                        <img src={pfp} alt={username} className="w-10 h-10 rounded-full bg-gray-100 object-cover" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1">
                        <span className="font-bold text-[15px] text-black truncate">{username}</span>
                        {/* <span className="text-gray-500 text-[13px]">@{username}</span> */}
                    </div>

                    <p className="text-[15px] text-gray-900 leading-normal mb-3 whitespace-pre-wrap">{text}</p>

                    {image && (
                        <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-100 mb-3">
                            {isVideo ? (
                                <video src={image} controls className="w-full h-auto max-h-[400px] object-cover" />
                            ) : (
                                <img src={image} alt="Cast media" className="w-full h-auto max-h-[400px] object-cover" />
                            )}
                        </div>
                    )}

                    {/* Metrics / Actions */}
                    <div className="flex items-center justify-between pr-4 max-w-[80%] mb-4">
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <MessageCircle width={18} height={18} />
                            <span className="text-[13px] font-medium">{metrics.replies}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Repeat width={18} height={18} />
                            <span className="text-[13px] font-medium">{metrics.recasts}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Heart width={18} height={18} />
                            <span className="text-[13px] font-medium">{metrics.likes}</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* Upvote Control */}
            <div className="mt-4 pt-3 border-t border-gray-50">
                <div className="flex justify-between items-center mb-3 px-1">
                    <span className="text-[12px] font-bold text-gray-900">Upvote:</span>
                    <span className="text-[11px] font-medium text-gray-500">$0.01 ${username} per upvote</span>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-2 w-full max-w-[240px]">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                            <button
                                onClick={handleDecrement}
                                className="p-1.5 hover:bg-gray-100 transition-colors text-gray-600 active:bg-gray-200"
                            >
                                <Minus width={14} height={14} />
                            </button>
                            <input
                                type="number"
                                value={voteCount}
                                onChange={(e) => setVoteCount(Math.max(1, parseInt(e.target.value) || 0))}
                                className="flex-1 w-full text-center bg-transparent border-none focus:ring-0 text-[13px] font-bold text-gray-900 py-1 px-0"
                                min="1"
                            />
                            <button
                                onClick={handleIncrement}
                                className="p-1.5 hover:bg-gray-100 transition-colors text-gray-600 active:bg-gray-200"
                            >
                                <Plus width={14} height={14} />
                            </button>
                        </div>
                        <button
                            onClick={handleUpvote}
                            className="w-full bg-black text-white py-1.5 rounded-lg text-[12px] font-bold hover:opacity-90 transition-opacity active:scale-[0.98] transform"
                        >
                            Buy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
