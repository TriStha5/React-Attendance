import React from 'react';
import { Card, Row, Col, Statistic, List } from 'antd';
import { UserOutlined, TeamOutlined, CheckCircleOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
    const totalUsers = 6;
    const totalAttendance = 34;

    const roleSummary = [
        { role: "President", count: 1 },
        { role: "Past President", count: 1 },
        { role: "Immidiate Past President", count: 1 },
        { role: "Vice President", count: 1 },
        { role: "Secretary", count: 1 },
        { role: "Treasurer", count: 1 },
        { role: "Club Service Chair", count: 1 },
        { role: "Community Service Chair", count: 1 },
        { role: "International Service Chair", count: 1 },
        { role: "Professional Development Chair", count: 1 },
        { role: "Communication Manager", count: 1 },
        { role: "Seargent-At-Arms", count: 1 },
        { role: "Rotary Foundation Chair", count: 1 },
        { role: "Membership Chair", count: 1 },
        { role: "Public Image Chair", count: 1 },
        { role: "General Member", count: 1 },
        { role: "Proposed Member", count: 1 },
        { role: "Guest Member", count: 1 }
    ];

    return (
        <div>
            <h1>Dashboard</h1>
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Users"
                            value={totalUsers}
                            prefix={<UserOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Total Attendance"
                            value={totalAttendance}
                            prefix={<CheckCircleOutlined />}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic
                            title="Distinct Roles"
                            value={roleSummary.length}
                            prefix={<TeamOutlined />}
                        />
                    </Card>
                </Col>
            </Row>

            <Card title="Role Summary" style={{ marginTop: 10 }}>
                <List
                    itemLayout="horizontal"
                    dataSource={roleSummary}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={item.role}
                                description={`Count: ${item.count}`}
                            />
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}

export default AdminDashboard;
