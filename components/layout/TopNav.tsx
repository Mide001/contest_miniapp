"use client";
import React, { useState, useEffect } from 'react';
import sdk from '@farcaster/miniapp-sdk';

export default function TopNav() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [user, setUser] = useState<{ pfpUrl?: string; username?: string } | null>(null);

    useEffect(() => {
        const loadContext = async () => {
            try {
                const context = await sdk.context;
                if (context && context.user) {
                    setUser({
                        pfpUrl: context.user.pfpUrl,
                        username: context.user.username,
                    });
                }
            } catch (error) {
                console.error('Error loading context:', error);
            }
        };
        loadContext();
    }, []);

    const userPfp = user?.pfpUrl || "https://ui-avatars.com/api/?name=User&background=random";
    const username = user?.username || "user";

    return (
        <nav className="flex justify-between items-center px-6 py-3 pt-[max(12px,env(safe-area-inset-top))] bg-background/80 backdrop-blur-md sticky top-0 z-[100] border-b border-black/5 min-h-[56px]">
            {isSearchOpen ? (
                <div className="absolute inset-0 top-0 left-0 w-full h-full bg-background z-[101] flex items-center px-4 animate-[slideDown_0.2s_ease-out]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '12px', color: '#999' }}>
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search contests..."
                        className="flex-1 bg-black/5 border-none rounded-lg px-3 py-1.5 text-[#171717] text-[0.85rem] mr-3 outline-none focus:bg-black/10"
                        autoFocus
                    />
                    <button onClick={() => setIsSearchOpen(false)} className="bg-none border-none text-brand cursor-pointer p-1 text-xs font-medium">
                        Cancel
                    </button>

                    <style jsx>{`
                        @keyframes slideDown {
                            from { transform: translateY(-10px); opacity: 0; }
                            to { transform: translateY(0); opacity: 1; }
                        }
                    `}</style>
                </div>
            ) : (
                <>
                    <div className="flex-1 flex justify-start">
                        <div className="relative flex flex-col items-center gap-0 no-underline text-inherit transition-opacity duration-200 active:opacity-70 group cursor-default">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#f0f0f0] border border-black/10">
                                <img src={userPfp} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span className="absolute top-full left-0 translate-x-1 -translate-y-1 text-[10px] font-semibold text-[#171717] bg-white/90 px-1.5 py-0.5 rounded-lg shadow-sm border border-black/5 whitespace-nowrap text-center opacity-0 transition-all duration-200 pointer-events-none mt-1 z-10 group-hover:opacity-100 group-hover:translate-y-0">
                                @{username}
                            </span>
                        </div>
                    </div>

                    <div className="flex-[2] flex justify-center items-center">
                        <span className="text-[0.95rem] font-extrabold tracking-tight bg-gradient-to-br from-black to-[#444] bg-clip-text text-transparent uppercase">
                            BASE ARENA
                        </span>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <button onClick={() => setIsSearchOpen(true)} className="bg-none border-none text-[#171717] p-2 rounded-full cursor-pointer flex items-center justify-center transition-colors duration-200 active:bg-black/5 hover:bg-black/5">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </nav>
    );
}
