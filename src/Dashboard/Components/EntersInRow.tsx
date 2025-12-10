import React from "react";
import type { ApiConfigType } from "../../Data/backEndConnection";
import { useNavigate, useLocation } from "react-router-dom";
import apiConfig from "../../Data/backEndConnection";
import './EntersInRow.css';

const EntersInRow: React.FC<{ iduser: number }> = ({iduser})=>{
    const [EntersINRow, setEntersINRow] = React.useState<string>('');
    const location = useLocation();
    React.useEffect(()=>{
        
    }, [iduser, location]);
    return <>   
        <div className="row-enters">
            <h3>Dzisiejsze Zaczęcie pracy o: {EntersINRow}</h3>
        </div>
    </>
}
export default EntersInRow;