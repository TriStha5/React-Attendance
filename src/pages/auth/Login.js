import { useNavigate } from "react-router";
import { Button, Form, Input, Card, Space, Row, Col } from 'antd';
import { showErrorTost, showSuccesssTost } from '../../utils/toastify.util';
import { checkLogin } from "../../utils/user.util";
import { UserContext } from "../../context/user.context";
import { useContext, useState } from "react";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import logo from '../../images/RAC_SainbuBhainsepati.png'; 

const Login = () => {
    const navigate = useNavigate();
    const { _setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false); 

    const onFinish = (values) => {
        setLoading(true); 

        if (values.email === 'admin@gmail.com' && values.password === 'admin') {
            showSuccesssTost('Welcome Admin');
            localStorage.setItem('is_Login', 1);
            navigate('/admin/dashboard');
        } else {
            checkLogin(values.email, values.password).then((data) => {
                setLoading(false); 
                if (data === null) {
                    showErrorTost('Incorrect username or password!!');
                } else {
                    showSuccesssTost('Login successful!!');
                    _setUser(data);
                    localStorage.setItem('is_Login', 1);
                    localStorage.setItem('user', JSON.stringify(data));
                    navigate(`/users/dashboard/${data.id}`);
                }
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        localStorage.setItem('is_Login', 0);
    };

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f0f2f5',
                flexDirection: 'column',
            }}
        >
            <Card
                style={{
                    width: 400,
                    padding: '20px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                }}
                bordered={false}
            >
            
                <img
                    src={logo}
                    alt="Logo"
                    style={{
                        width: '250px',
                    }}
                />
                <h2>Login</h2>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }} 
                    wrapperCol={{ span: 24 }} 
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Enter your email"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Enter your password"
                            style={{ borderRadius: '8px' }}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            loading={loading} 
                            style={{
                                borderRadius: '8px',
                                padding: '10px 0',
                                fontWeight: 'bold',
                            }}
                        >
                            Login
                        </Button>
                    </Form.Item>

                    <Row justify="center">
                        <Col>
                            <Space size="middle">
                                <a href="/forgot-password" style={{ color: '#1890ff' }}>Forgot Password?</a>
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
