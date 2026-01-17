"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="flex justify-center items-center gap-12 fixed bottom-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md border-t border-gray-100 pb-[env(safe-area-inset-bottom)] z-50">
            <Link
                href="/"
                className={`flex flex-col items-center justify-center no-underline text-[8px] font-medium gap-1 w-auto h-full transition-colors duration-200 min-w-[60px] ${isActive('/') ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                Home
            </Link>

            <Link
                href="/create"
                className={`flex flex-col items-center justify-center no-underline text-[8px] font-medium gap-1 w-auto h-full transition-colors duration-200 min-w-[60px] ${isActive('/create') ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                Create
            </Link>
        </nav>
    );
}
