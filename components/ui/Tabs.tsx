interface Tab {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (id: string) => void;
}

export default function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex w-full bg-black/5 p-1 mb-6 rounded-xl relative">
            {tabs.map((tab) => {
                const getStatusColor = (id: string) => {
                    switch (id) {
                        case 'ongoing': return 'bg-green-500';
                        case 'upcoming': return 'bg-orange-500';
                        case 'previous': return 'bg-red-500';
                        default: return 'bg-gray-400';
                    }
                };

                return (
                    <button
                        key={tab.id}
                        className={`flex-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold cursor-pointer transition-all duration-200 z-10 text-center flex items-center justify-center gap-1.5 ${activeTab === tab.id
                            ? 'bg-white text-black shadow-sm'
                            : 'text-[#666] hover:text-[#333]'
                            }`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        {activeTab === tab.id && (
                            <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(tab.id)}`} />
                        )}
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
