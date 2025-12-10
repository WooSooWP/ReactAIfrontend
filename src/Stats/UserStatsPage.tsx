import React, { useEffect, useState } from 'react';
import apiConfig from '../Data/backEndConnection';
import type { UserModel } from '../Interfaces/LoginConfirm';
import BottomNavBar from '../Layout/BottomNavBar';

type Entry = {
    id: number;
    personId: number;
    data: string;
    place: string;
};

const UserStatsPage: React.FC = () => {
    const [user, setUser] = useState<UserModel | null>(null);

    const [totalEntries, setTotalEntries] = useState<number>(0);
    const [entriesThisMonth, setEntriesThisMonth] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    // 1. Pobieramy użytkownika z localStorage (jeśli dashboard kogoś zapisał)
    useEffect(() => {
        const stored = localStorage.getItem('loggedUser');
        if (stored) {
            try {
                const parsed: UserModel = JSON.parse(stored);
                setUser(parsed);
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, []);

    // 2. Pobieramy statystyki tylko wtedy, gdy user istnieje
    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchStats = async () => {
            try {
                const resp = await fetch(
                    `${apiConfig.getEntriesUrl()}?page=1&pagesize=10000`
                );
                const entries: Entry[] = await resp.json();

                const userEntries = entries.filter(e => e.personId === user.id);
                setTotalEntries(userEntries.length);

                const now = new Date();
                const monthStr = now.toISOString().slice(0, 7); // YYYY-MM
                const monthEntries = userEntries.filter(e =>
                    e.data.startsWith(monthStr)
                );
                setEntriesThisMonth(monthEntries.length);

            } catch (err) {
                console.error("Błąd pobierania statystyk:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user]);

    // 3. Jeśli nie ma usera → brak statystyk
    if (!user) {
        return (
            <div className="stats-page">
                <h2>Twoje statystyki</h2>
                <p>Brak zalogowanego użytkownika – połącz z backendem.</p>
                <BottomNavBar />
            </div>
        );
    }

    if (loading) {
        return (
            <div className="stats-page">
                <h2>Ładowanie...</h2>
                <BottomNavBar />
            </div>
        );
    }

    return (
        <div className="stats-page">
            <h2>Twoje statystyki</h2>
            <p>Użytkownik: {user.name}</p>

            <div className="stats-cards">
                <div className="stat-card">
                    <h4>Łączna liczba wejść</h4>
                    <p className="stat-value">{totalEntries}</p>
                </div>
                <div className="stat-card">
                    <h4>Wejścia w bieżącym miesiącu</h4>
                    <p className="stat-value">{entriesThisMonth}</p>
                </div>
            </div>

            <BottomNavBar />
        </div>
    );
};

export default UserStatsPage;
