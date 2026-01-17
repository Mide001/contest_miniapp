import Link from 'next/link';

interface ContestCardProps {
    id: string;
    title: string;
    description: string;
    deadline: string;
    prize: string;
    status?: 'active' | 'upcoming' | 'ended';
    index?: number;
}

export default function ContestCard({ id, title, description, deadline, prize, status = 'active', index = 0 }: ContestCardProps) {
    return (
        <Link
            href={`/contests/${id}`}
            className="flex flex-col p-6 bg-white border border-[#eaeaea] rounded-2xl relative overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] min-h-[180px] no-underline shadow-none opacity-0 animate-popIn hover:border-brand hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,0,255,0.05)] active:scale-[0.98]"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-extrabold text-[#111] m-0 leading-[1.2] tracking-[-0.02em]">{title}</h3>
                <div className={`w-12 h-6 rounded-full border border-black/5 relative flex items-center px-1 transition-all duration-300 bg-gray-100/50 shadow-inner`}>
                    <span className={`absolute text-[9px] font-bold transition-opacity duration-300 ${status === 'active' ? 'left-1.5 opacity-100 text-black/70' : 'left-1.5 opacity-0 text-gray-400'}`}>ON</span>
                    <span className={`absolute text-[9px] font-bold transition-opacity duration-300 ${status === 'active' ? 'right-1.5 opacity-0 text-black/70' : 'right-1.5 opacity-100 text-gray-400'}`}>OFF</span>
                    <div className={`w-4 h-4 rounded-full shadow-md border border-white/50 backdrop-blur-md absolute transition-all duration-300 ${status === 'active' ? 'translate-x-6 bg-white/80' : 'translate-x-0 bg-white/50'}`}></div>
                </div>
            </div>

            <p className="text-sm text-[#666] mb-6 leading-[1.6] overflow-hidden line-clamp-2">
                {description}
            </p>

            <div className="flex justify-between items-end mt-auto pt-5 border-t border-[#f0f0f0]">
                <div className="flex flex-col">
                    <span className="text-[0.65rem] uppercase tracking-[0.05em] text-[#999] mb-1 font-semibold">Prize Pool</span>
                    <span className="text-[1.1rem] font-bold text-[#111] tabular-nums">{prize}</span>
                </div>
                <div className="flex items-center text-xs text-[#666] font-medium bg-[#f5f5f5] px-2.5 py-1.5 rounded-md gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    {deadline}
                </div>
            </div>
        </Link>
    );
}
