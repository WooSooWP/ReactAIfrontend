import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('loggedUser');
        navigate('/login');
    };

    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="bottom-nav">
            <button
                className={`bottom-nav-btn ${isActive('/dashboard') ? 'active' : ''}`}
                onClick={() => navigate('/dashboard')}
            >
                Strona główna
            </button>

            <button
                className={`bottom-nav-btn ${isActive('/stats') ? 'active' : ''}`}
                onClick={() => navigate('/stats')}
            >
                Statystyki
            </button>

            <button
                className="bottom-nav-btn account-btn"
                onClick={handleLogout}
                title="Zakończ pracę / wyloguj"
            >
                {/* prosta ikonka konta */}
                <span style={{ fontSize: '1.4rem' }}>👤</span>
            </button>
        </div>
    );
};

export default BottomNavBar;
