import React, { useState, useEffect } from 'react';
import { LoginPanel } from './Components/LoginComponent';
import ApiConfig from '../Data/backEndConnection';
import { useNavigate } from 'react-router-dom';
import type { UserModel } from '../Interfaces/LoginConfirm';

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState<UserModel | null>(null);

    const navigate = useNavigate();
    
    const handleLoginSuccess = (data: UserModel) => {
        console.log('Zalogowano:', data);
        setUserData(data);
        setIsLoggedIn(true);
    };

    // To się wykona gdy isLoggedIn zmieni się na true
    useEffect(() => {
        if (isLoggedIn) {
            console.log('Przekierowuję do dashboard...');
            navigate('/dashboard', {state:{user: userData}});
        }
    }, [isLoggedIn, navigate]);

    return (
        <LoginPanel 
            apiConfig={ApiConfig} 
            onLoginSuccess={handleLoginSuccess}
        />
    );
}

export default LoginPage;