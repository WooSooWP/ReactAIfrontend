import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopStatsBar from './Components/TopStatsBar';
import CameraAndFaces from './Components/CameraAndFaces';
import BottomNavBar from '../Layout/BottomNavBar';
import type { UserModel } from '../Interfaces/LoginConfirm';

interface LocationState {
    user?: UserModel;
}

const Dashboard: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState<UserModel | null>(null);

    useEffect(() => {
        const state = location.state as LocationState | undefined;

        if (state?.user) {
            setUser(state.user);
            localStorage.setItem('loggedUser', JSON.stringify(state.user));
        } else {
            const stored = localStorage.getItem('loggedUser');
            if (stored) {
                try {
                    const parsed: UserModel = JSON.parse(stored);
                    setUser(parsed);
                } catch {
                    navigate('/login');
                }
            } else {
                navigate('/login');
            }
        }
    }, [location, navigate]);

    if (!user) {
        return <div>Ładowanie danych użytkownika...</div>;
    }

    return (
        <div className="dashboard-page">
            <TopStatsBar userId={user.id} userName={user.name} />
            <CameraAndFaces userId={user.id} />
            <BottomNavBar />
        </div>
    );
};

export default Dashboard;
