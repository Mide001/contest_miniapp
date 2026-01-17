"use client";
import { useState } from "react";
import Tabs from "../components/ui/Tabs";
import ContestCard from "../components/contest/ContestCard";

interface Contest {
  id: string;
  title: string;
  description: string;
  deadline: string;
  prize: string;
  status: 'active' | 'upcoming' | 'ended';
}


import sdk from '@farcaster/miniapp-sdk';
import { useEffect } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const context = await sdk.context;
        if (context?.user?.username) {
          setUsername(context.user.username);
        }
      } catch (err) {
        console.error("Failed to load user context", err);
      }
    };
    loadUser();
  }, []);

  const ongoingContests: Contest[] = [
    { id: "1", title: "Best AI Art Generator Challenge", description: "Create the wildest AI art using our proprietary tools.", deadline: "2d left", prize: "500 USDC", status: 'active' },
    { id: "2", title: "Degen Meme Wars", description: "Make us laugh with the dankest memes.", deadline: "5h left", prize: "100 DEGEN", status: 'active' },
  ];

  const upcomingContests: Contest[] = [
    { id: "3", title: "Viral Video Challenge", description: "Create a 30s video that goes viral.", deadline: "Starts in 2d", prize: "1000 USDC", status: 'upcoming' },
  ];

  const previousContests: Contest[] = [
    { id: "4", title: "Logo Design Contest", description: "Design our new logo for rebrand.", deadline: "Ended", prize: "200 USDC", status: 'ended' },
  ];

  const getContests = () => {
    switch (activeTab) {
      case "ongoing": return ongoingContests;
      case "upcoming": return upcomingContests;
      case "previous": return previousContests;
      default: return [];
    }
  };

  const tabs = [
    { id: "ongoing", label: "Live" },
    { id: "upcoming", label: "Upcoming" },
    { id: "previous", label: "Ended" },
  ];

  return (
    <div className="px-6 pt-4 pb-24 max-w-[600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-[15px] font-extrabold mb-2 tracking-tight">bm @{username || "user"}</h1>
        <div className="text-[13px] leading-[1.6] text-gray-600 font-medium">
          <p>
            <strong className="text-black">base arena</strong> is a weekly campus creator challenge on base, creators compete locally and supporters upvote their favorite content to help them win.
          </p>
        </div>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col gap-4">
        {getContests().map((contest, index) => (
          <ContestCard
            key={contest.id}
            {...contest}
            index={index}
          />
        ))}
        {getContests().length === 0 && (
          <div className="text-center py-10 px-5 bg-black/5 rounded-2xl text-black/50 text-[0.95rem]">
            <p>No contests found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}