import React from 'react';
import type {ApiConfigType} from '../../Data/backEndConnection';
import { useNavigate, useLocation } from 'react-router-dom';
import apiConfig from '../../Data/backEndConnection';
import './MyEnterComponent.css';

const DashboardComponent: React.FC<{ iduser: number }> = ({iduser}) => {
    const location = useLocation();
    const [enterTime, setEnterTime] = React.useState<string>('');
    React.useEffect(() => {
        console.log('userr:', iduser);
        const a = async () => {
            const response = await fetch(apiConfig.getEntriesUrl() + `/`+iduser);

            const data = await response.json();
            console.log(data);
            setEnterTime(data.data);
        }
        a();
        
    }, [iduser, location]);

    // React.useEffect(() => {

    // }, [navigate]);

    return (
        <div className="enter">
            <h3>Dzisiejsze Zaczęcie pracy o: {enterTime}</h3>
        </div>
    );
};

export default DashboardComponent;