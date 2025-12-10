import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './Login/LoginPage';
import Dashboard from './Dashboard/Dashboard';
import UserStatsPage from './Stats/UserStatsPage';
import CompanyStatsPage from './Stats/CompanyStatsPage';

const App: React.FC = () => {
    return (
        <Routes>
            {/* start -> login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/stats" element={<UserStatsPage />} />
            <Route path="/stats/company" element={<CompanyStatsPage />} />
        </Routes>
    );
};

export default App;
