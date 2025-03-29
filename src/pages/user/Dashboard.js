import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../context/user.context';
import { updateAttendance, fetchUser } from '../../utils/user.util'; 
import { useParams } from 'react-router-dom';
import FaceRecognition from './FaceRecognition';
import { Button, Card, message, Modal, Typography, Row, Col, Statistic, Result } from 'antd';
import { CheckCircleOutlined, UserOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { showErrorTost, showInfoTost, showSuccesssTost } from '../../utils/toastify.util';

const { Title, Text } = Typography;

const Dashboard = () => {
    const { _user } = useContext(UserContext);
    const [attendance, setAttendance] = useState(_user?.attendance || 0); 
    const [showCamera, setShowCamera] = useState(false); 
    const [isProcessing, setIsProcessing] = useState(false);
    const [isCheckedIn, setIsCheckedIn] = useState(false); 
    const [isButtonLoading, setIsButtonLoading] = useState(false); 
    let params = useParams();

    
    const handleAttendance = async () => {
        setIsProcessing(true);
        setIsButtonLoading(true);
    
        const updatedAttendance = (attendance || 0) + 1; 
    
        const updatedUser = { ..._user, attendance: updatedAttendance };
    
        try {
            await updateAttendance(String(params.userId), updatedUser);
            setAttendance(updatedAttendance);
            setIsCheckedIn(true);
            message.success(`✅ Check-in successful! Attendance: ${updatedAttendance}`);
            showSuccesssTost('✅ Check-in successful!');
        } catch (error) {
            console.error('❌ Error updating attendance:', error);
            message.error('❌ Error updating attendance. Please try again.');
            showErrorTost('❌ Error updating attendance. Please try again.');
        }
    
        setIsProcessing(false);
        setIsButtonLoading(false);
        setShowCamera(false);
    };
    
    const fetchLatestAttendance = async () => {
        try {
            const updatedUser = await fetchUser(params.userId);
    
            const newAttendance = updatedUser?.attendance ?? 0; 
            setAttendance(newAttendance);
        } catch (error) {
            console.error('❌ Error fetching user data:', error);
            message.error('❌ Error fetching latest data. Please try again.');
            showErrorTost('Error fetching latest data. Please try again.');
        }
    };
    
    useEffect(() => {
        fetchLatestAttendance(); 
        setIsCheckedIn(false);
    }, [params.userId]);

    const handleCheckInClick = () => {
        setShowCamera(true); 
        
    };

    const handleCheckOutClick = async () => {
        setIsCheckedIn(false);
        message.info('You have checked out!');
        showInfoTost('You have checked out!');
    };

    return (
        <Card 
            title={<Title level={2}>Welcome to the Dashboard</Title>}
            extra={<UserOutlined style={{ fontSize: '24px' }} />}
            style={{ maxWidth: 500, margin: '20px auto' }}
        >
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Title level={4}>Hello, <b>{_user?.name}</b></Title>
                </Col>

                <Col span={12}>
                    <Statistic
                        title="Current Attendance"
                        value={attendance}
                        prefix={<CheckCircleOutlined />}
                        valueStyle={{ color: '#1890ff' }}
                    />
                </Col>
                <Col span={12}>
                    <Statistic
                        title="Status"
                        value={isCheckedIn ? 'Checked In' : 'Not Checked In'}
                        prefix={<UserOutlined />}
                        valueStyle={{ color: isCheckedIn ? '#52c41a' : '#ff4d4f' }}
                    />
                </Col>
            </Row>

            <Button
                type={isCheckedIn ? 'danger' : 'primary'}
                onClick={isCheckedIn ? handleCheckOutClick : handleCheckInClick}
                icon={isCheckedIn ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                block
                size="large"
                style={{ marginTop: 20 }}
                loading={isButtonLoading} 
            >
                {isCheckedIn ? 'Check Out' : 'Check In'}
            </Button>

            <Modal
                title="Face Recognition"
                visible={showCamera}
                footer={null}
                onCancel={() => setShowCamera(false)}
                width={640}
                style={{ textAlign: 'center' }}
            >
                <FaceRecognition
                    onFaceDetected={handleAttendance}
                    onClose={() => setShowCamera(false)}
                    isProcessing={isProcessing} 
                />
            </Modal>

            {isCheckedIn && !isProcessing && (
                <Result
                    status="success"
                    title="Attendance Recorded"
                    subTitle={`You have successfully checked in. Current Attendance: ${attendance}`}
                    extra={[
                        <Button type="primary" key="console" onClick={handleCheckOutClick}>
                            Check Out
                        </Button>,
                    ]}
                />
            )}

            {!isCheckedIn && !isProcessing && (
                <Text
                    style={{ display: 'block', marginTop: '20px', textAlign: 'center', color: '#999' }}
                >
                    <CloseCircleOutlined /> <b>Note:</b> Please check in to start the session.
                </Text>
            )}
        </Card>
    );
};

export default Dashboard;