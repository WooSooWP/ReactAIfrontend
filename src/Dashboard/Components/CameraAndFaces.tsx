import React, { useEffect, useRef, useState } from 'react';
import './CameraAndFaces.css';

interface Props {
    userId: number; // wykorzystasz później, gdy podłączysz zdjęcia z bazy
}

const CameraAndFaces: React.FC<Props> = ({ userId }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [cameraError, setCameraError] = useState<string | null>(null);

    // URUCHOMIENIE KAMERY
    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false
                });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Nie udało się uruchomić kamery:', err);
                setCameraError('Nie udało się uruchomić kamery.');
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
                tracks.forEach((t) => t.stop());
            }
        };
    }, []);

    return (
        <div className="center-layout">
            {/* LEWA STRONA – KAMERA */}
            <div className="camera-panel">
                <h3>Kamera</h3>
                {cameraError && <p className="faces-error">{cameraError}</p>}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="camera-video"
                />
            </div>

            {/* PRAWA STRONA – placeholder na przyszłe zdjęcia z bazy */}
            <div className="faces-panel">
                <h3>Zdjęcia / rysy twarzy</h3>
                <p className="faces-info">
                    Tutaj będą wyświetlane zdjęcia twarzy pobrane z bazy danych dla
                    użytkownika o ID <strong>{userId}</strong>.
                </p>
                <p className="faces-empty">
                    Backend rozpoznawania twarzy i pobieranie zdjęć możesz dodać w
                    kolejnym etapie.
                </p>
            </div>
        </div>
    );
};

export default CameraAndFaces;
