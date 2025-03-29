import { useEffect, useRef, useState } from 'react';
import { Spin, Button, Alert } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

const FaceRecognition = ({ onFaceDetected, onClose, isProcessing }) => {
    const videoRef = useRef(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setLoading(false); 
                    videoRef.current.play();
                }

                onFaceDetected();
            } catch (err) {
                setError('Unable to access your camera. Please grant permission.');
                setLoading(false);
            }
        };

        startCamera();

        return () => {
            const stream = videoRef.current?.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [onFaceDetected]);

    return (
        <div style={{ textAlign: 'center', marginTop: '20px', position: 'relative' }}>
            {loading ? (
                <Spin size="large" tip="Initializing camera..." />
            ) : error ? (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    action={<Button size="small" icon={<CloseCircleOutlined />} onClick={onClose} />}
                    showIcon
                    style={{ marginBottom: '20px' }}
                />
            ) : (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxWidth: '500px',
                            border: '5px solid #1890ff',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    />
                    <Button
                        type="primary"
                        onClick={onClose}
                        icon={<CloseCircleOutlined />}
                        style={{
                            marginTop: '10px',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 100,
                        }}
                    >
                        Close
                    </Button>
                </>
            )}
        </div>
    );
};

export default FaceRecognition;