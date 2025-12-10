import React, { useEffect, useState } from 'react';
import apiConfig from '../Data/backEndConnection';
import BottomNavBar from '../Layout/BottomNavBar';
import type { UserModel } from '../Interfaces/LoginConfirm';

type Entry = {
    id: number;
    personId: number;
    data: string;
    place: string;
};

type AggregatedRow = {
    personId: number;
    name: string;
    entriesThisMonth: number;
};

const CompanyStatsPage: React.FC = () => {
    const [rows, setRows] = useState<AggregatedRow[]>([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [entriesResp, usersResp] = await Promise.all([
                    fetch(`${apiConfig.getEntriesUrl()}?page=1&pagesize=1000`),
                    fetch(`${apiConfig.getUserUrl()}`)
                ]);

                const entries: Entry[] = await entriesResp.json();
                const users: UserModel[] = await usersResp.json();

                const now = new Date();
                const monthStr = now.toISOString().slice(0, 7); 

                const entriesThisMonth = entries.filter(e =>
                    e.data.startsWith(monthStr)
                );

                const map = new Map<number, number>();
                entriesThisMonth.forEach(e => {
                    map.set(e.personId, (map.get(e.personId) || 0) + 1);
                });

                const aggregated: AggregatedRow[] = [];
                map.forEach((count, personId) => {
                    const user = users.find(u => u.id === personId);
                    aggregated.push({
                        personId,
                        name: user ? user.name : `Użytkownik ${personId}`,
                        entriesThisMonth: count
                    });
                });

                aggregated.sort((a, b) => b.entriesThisMonth - a.entriesThisMonth);
                setRows(aggregated);
            } catch (err) {
                console.warn(
                    'Brak połączenia z backendem – wstawiam przykładowe dane firmy'
                );
                setRows([
                    { personId: 1, name: 'Offline User', entriesThisMonth: 10 },
                    { personId: 2, name: 'Jan Kowalski', entriesThisMonth: 7 },
                    { personId: 3, name: 'Anna Nowak', entriesThisMonth: 4 }
                ]);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="stats-page">
            <h2>Statystyki – ten miesiąc</h2>
            <p>Zestawienie liczby wejść pracowników w bieżącym miesiącu.</p>

            <table className="stats-table">
                <thead>
                    <tr>
                        <th>Pracownik</th>
                        <th>Liczba wejść</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map(row => (
                        <tr key={row.personId}>
                            <td>{row.name}</td>
                            <td>{row.entriesThisMonth}</td>
                        </tr>
                    ))}
                    {rows.length === 0 && (
                        <tr>
                            <td colSpan={2}>Brak danych za ten miesiąc.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <BottomNavBar />
        </div>
    );
};

export default CompanyStatsPage;
