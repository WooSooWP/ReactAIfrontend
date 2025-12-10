import React, { useState } from 'react';
import type { ApiConfigType } from '../../Data/backEndConnection';
import './LoginComponent.css';
import { createRoot } from 'react-dom/client'
import type {UserModel,ApiResponse} from '../../Interfaces/LoginConfirm';
//import { User } from '../../Interfaces/LoginConfirm';


interface LoginPanelProps {
  apiConfig: ApiConfigType;
  onLoginSuccess: (user:UserModel) => void;
}

export const LoginPanel: React.FC<LoginPanelProps> = ({ apiConfig, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${apiConfig.getUserCheckUrl()}?name=${username}&password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data:ApiResponse = await response.json();
      console.log(data);
      if (response.ok) {
        // Zapisz token do localStorage (opcjonalnie)
        console.log(data.success);
        if(data.success==true){
          onLoginSuccess(data.user!);
        }
      } 
    } catch (err) {
      console.error("Błąd połączenia:", err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Logowanie</h1>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Nazwa użytkownika</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Wprowadź nazwę użytkownika"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Wprowadź hasło"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Sprawdzanie danych...' : 'Zaloguj się'}
          </button>
        </form>

        <div className="api-info">
          Połączenie: {apiConfig.ip}:{apiConfig.port}
        </div>
      </div>
    </div>
  );
};
