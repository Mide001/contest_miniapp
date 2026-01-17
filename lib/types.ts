export interface Contest {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    prizePool: string;
    deadline: number;
    creatorFid: number;
    participants: Participant[];
}

export interface Participant {
    fid: number;
    submissionUrl?: string; // If submission required
    voteCount: number;
}
