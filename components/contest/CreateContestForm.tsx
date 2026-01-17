import { useState } from 'react';
import styles from './CreateContestForm.module.css';

export default function CreateContestForm() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prize: '',
        deadline: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating contest:', formData);
        // TODO: Implement actual creation logic
        alert('Contest Created (Mock)');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.group}>
                <label className={styles.label}>Contest Title</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g. Best AI Art"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Description</label>
                <textarea
                    className={styles.textarea}
                    placeholder="Describe the rules and theme..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Prize Pool</label>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="e.g. 500 USDC"
                    value={formData.prize}
                    onChange={(e) => setFormData({ ...formData, prize: e.target.value })}
                    required
                />
            </div>

            <div className={styles.group}>
                <label className={styles.label}>Deadline</label>
                <input
                    className={styles.input}
                    type="datetime-local"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    required
                />
            </div>

            <button type="submit" className={styles.submitButton}>
                Launch Contest
            </button>
        </form>
    );
}
