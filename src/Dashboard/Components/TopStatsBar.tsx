import React, { useEffect, useState } from 'react';
import apiConfig from '../../Data/backEndConnection';
import './TopStatsBar.css';

type Entry = {
    id: number;
    personId: number;
    data: string;
    place: string | null;
};

type EntersInRowRecord = {
    userId: number;
    EntersInRow: number;
    LastEdit: string | null;
};

interface Props {
    userId: number;
    userName: string;
}

const TopStatsBar: React.FC<Props> = ({ userId, userName }) => {
    const [totalEntries, setTotalEntries] = useState<number>(0);
    const [onTimeStreak, setOnTimeStreak] = useState<number>(0);
    const [todayFirstEnter, setTodayFirstEnter] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                const entriesResp = await fetch(
                    `${apiConfig.getEntriesUrl()}?page=1&pagesize=1000`
                );
                const entries: Entry[] = await entriesResp.json();

                const userEntries = entries.filter((e) => e.personId === userId);
                setTotalEntries(userEntries.length);

                const todayStr = new Date().toISOString().slice(0, 10); 
                const todaysEntries = userEntries
                    .filter((e) => e.data.startsWith(todayStr))
                    .sort((a, b) => (a.data > b.data ? 1 : -1));

                if (todaysEntries.length > 0) {
                    const first = todaysEntries[0].data;
                    setTodayFirstEnter(first.slice(11, 19)); 
                } else {
                    setTodayFirstEnter(null);
                }

                
                const baseUrl = apiConfig.getBaseUrl();
                const streakResp = await fetch(`${baseUrl}/entriesInRow/${userId}`);
                if (streakResp.ok) {
                    const streakData: EntersInRowRecord[] = await streakResp.json();
                    if (streakData.length > 0) {
                        setOnTimeStreak(streakData[0].EntersInRow ?? 0);
                    } else {
                        setOnTimeStreak(0);
                    }
                } else {
                    setOnTimeStreak(0);
                }
            } catch (err) {
                console.error('Błąd pobierania danych do górnego paska:', err);
                
            }
        };

        if (userId) {
            fetchData();
        }
    }, [userId]);

    return (
        <div className="top-stats-wrapper">
            <div className="top-stats-row">
                <div className="stat-card left">
                    <h4>Wejścia do pracy</h4>
                    <p className="stat-value">{totalEntries}</p>
                    <span className="stat-label">Łącznie dla: {userName}</span>
                </div>

                <div className="stat-card right">
                    <h4>Wejścia na czas pod rząd</h4>
                    <p className="stat-value">{onTimeStreak}</p>
                    <span className="stat-label">Aktualna seria</span>
                </div>
            </div>

            <div className="today-start">
                {todayFirstEnter ? (
                    <span>Dzisiejsze zaczęcie pracy: {todayFirstEnter}</span>
                ) : (
                    <span>Brak wejścia dzisiaj</span>
                )}
            </div>
        </div>
    );
};

export default TopStatsBar;
