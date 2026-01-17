"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import SubmissionCard from "../../../components/contest/SubmissionCard";
import React from 'react';
import { ArrowLeft, Clock, Trophy } from "lucide-react";

// Mock data store
interface Submission {
    id: string;
    username: string;
    votes: number;
    image: string;
    hash?: string;
}

interface ContestDetail {
    id: string;
    title: string;
    description: string;
    prize: string;
    deadline: string;
    submissions: Submission[];
}

const MOCK_CONTESTS: Record<string, ContestDetail> = {
    "1": {
        id: "1",
        title: "Best AI Art Generator Challenge",
        description: "Create the wildest AI art using our proprietary tools. Theme: Cyberpunk Forest.",
        prize: "500 USDC",
        deadline: "2d left",
        submissions: [
            // Real Hashes
            { id: "s1", username: "Loading...", votes: 45, image: "", hash: "0x4d89553e30e3fd16a7df642810a14c8d18b589b2" },
            { id: "s2", username: "Loading...", votes: 32, image: "", hash: "0x3b91c3e03eaf08a3f1f66c686969ba3d18ffb934" },
        ]
    },
    "2": {
        id: "2",
        title: "Degen Meme Wars",
        description: "Make us laugh with the dankest memes regarding the current market state.",
        prize: "100 DEGEN",
        deadline: "5h left",
        submissions: [
            // Real Hash
            { id: "s5", username: "Loading...", votes: 120, image: "", hash: "0xd94005c907a09babad54384a06aebd24b59f6ce7" },
        ]
    }
};

export default function ContestDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { isFrameReady, setFrameReady } = useMiniKit();
    const [contestId, setContestId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'submissions' | 'leaderboard'>('submissions');
    const [leaderboardType, setLeaderboardType] = useState<'entries' | 'users'>('entries');

    useEffect(() => {
        params.then((resolvedParams) => {
            setContestId(resolvedParams.id);
        });
    }, [params]);

    useEffect(() => {
        if (!isFrameReady) {
            setFrameReady();
        }
    }, [setFrameReady, isFrameReady]);

    if (!contestId) return <div className="p-8 text-center opacity-50 text-[13px] font-medium">Loading...</div>;

    const contest = MOCK_CONTESTS[contestId];

    if (!contest) {
        return (
            <div className="px-6 pt-20 pb-24 max-w-[600px] mx-auto min-h-screen">
                <Link href="/" className="inline-flex items-center text-gray-400 hover:text-black transition-colors mb-6 text-[13px] font-medium">
                    <ArrowLeft width={14} className="mr-1" /> Back to Contests
                </Link>
                <div className="text-center mt-10 opacity-60 text-sm font-medium">
                    Contest not found
                </div>
            </div>
        );
    }

    return (
        <div className="px-6 pt-4 pb-0 max-w-[600px] mx-auto min-h-screen">
            <Link href="/" className="inline-flex items-center text-gray-500 hover:text-black transition-colors mb-8 text-[13px] font-medium">
                <ArrowLeft width={14} className="mr-1" /> Back to Contests
            </Link>

            <header className="mb-8">
                <h1 className="text-2xl font-extrabold mb-3 text-black tracking-tight leading-tight">{contest.title}</h1>
                <p className="text-gray-600 leading-relaxed text-[13px] font-medium mb-4">{contest.description}</p>
                <div className="flex gap-3 justify-end">
                    <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold border border-blue-100 shadow-sm">{contest.prize}</span>
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-[11px] font-medium border border-gray-200 flex items-center gap-1">
                        <Clock width={11} height={11} /> {contest.deadline}
                    </span>
                </div>
            </header>

            <section>
                <div className="flex w-full bg-gray-100 p-1 mb-6 rounded-xl relative">
                    <button
                        onClick={() => setActiveTab('submissions')}
                        className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 text-center ${activeTab === 'submissions' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Submissions
                    </button>
                    <button
                        onClick={() => setActiveTab('leaderboard')}
                        className={`flex-1 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 text-center ${activeTab === 'leaderboard' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Leaderboard
                    </button>
                </div>

                {activeTab === 'submissions' ? (
                    <div>
                        <h2 className="text-lg font-bold mb-4 flex justify-between items-center tracking-tight text-black">
                            All Entries
                            <span className="text-[11px] font-normal text-gray-500">{contest.submissions.length} entries</span>
                        </h2>
                        <div className="flex flex-col gap-3">
                            {contest.submissions.map((sub) => (
                                <SubmissionCard
                                    key={sub.id}
                                    {...sub}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-center mb-6">
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button
                                    onClick={() => setLeaderboardType('entries')}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${leaderboardType === 'entries' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Top Entries
                                </button>
                                <button
                                    onClick={() => setLeaderboardType('users')}
                                    className={`px-4 py-1.5 rounded-lg text-[11px] font-bold transition-all ${leaderboardType === 'users' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Top Users
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {leaderboardType === 'entries' ? (
                                [...contest.submissions]
                                    .sort((a, b) => b.votes - a.votes)
                                    .map((sub, index) => (
                                        <div key={sub.id} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-[13px] ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                index === 1 ? 'bg-gray-100 text-gray-600' :
                                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-white text-gray-400 border border-gray-100'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <img src={sub.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            <div className="flex-1">
                                                <div className="font-bold text-[13px] text-gray-900 truncate">{sub.username}</div>
                                                <div className="text-[11px] text-gray-500">{sub.votes} votes</div>
                                            </div>
                                            {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                                        </div>
                                    ))
                            ) : (
                                Object.values(contest.submissions.reduce((acc, sub) => {
                                    if (!acc[sub.username]) {
                                        acc[sub.username] = { username: sub.username, totalVotes: 0, entries: 0 };
                                    }
                                    acc[sub.username].totalVotes += sub.votes;
                                    acc[sub.username].entries += 1;
                                    return acc;
                                }, {} as Record<string, { username: string; totalVotes: number; entries: number }>))
                                    .sort((a, b) => b.totalVotes - a.totalVotes)
                                    .map((user, index) => (
                                        <div key={user.username} className="flex items-center gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                            <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-[13px] ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                index === 1 ? 'bg-gray-100 text-gray-600' :
                                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                                        'bg-white text-gray-400 border border-gray-100'
                                                }`}>
                                                {index + 1}
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-[14px]">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-bold text-[13px] text-gray-900">{user.username}</div>
                                                <div className="text-[11px] text-gray-500">{user.totalVotes} votes • {user.entries} entries</div>
                                            </div>
                                            {index === 0 && <Trophy className="w-4 h-4 text-yellow-500" />}
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                )}
            </section>

            {activeTab === 'submissions' && (
                <div className="mt-8">
                    <button className="w-full bg-[#0000FF] text-white py-4 rounded-full font-bold text-[15px] shadow-lg hover:bg-blue-700 hover:scale-[0.98] active:scale-95 transition-all">
                        Submit Entry
                    </button>
                </div>
            )
            }
        </div >
    );
}
