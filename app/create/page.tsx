"use client";
import CreateContestForm from "../../components/contest/CreateContestForm";

export default function CreateContestPage() {
    return (
        <div style={{ padding: '24px', paddingBottom: '100px', maxWidth: '600px', margin: '0 auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #fff 0%, #aaa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px',
                    letterSpacing: '-0.02em'
                }}>
                    Create Contest
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                    Launch a new challenge for the community.
                </p>
            </header>

            <CreateContestForm />
        </div>
    );
}
