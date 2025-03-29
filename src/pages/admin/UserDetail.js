import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import axios from 'axios';
import { Card, Typography, Alert, Spin, Badge, Descriptions, Row, Col, Button, Modal } from "antd";
import { UserOutlined } from '@ant-design/icons';
import { deleteUser } from "../../utils/user.util";
import { showInfoTost } from "../../utils/toastify.util";

const { Title } = Typography;

const UserDetail = () => {
    let params = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/users/${params.userId}`)
      .then(response => setUser(response.data))
      .catch(() => setError("Failed to fetch user details."));
  }, [params.userId]);


  const showModal = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const deleteData = () => {
    deleteUser(deleteId).then(() => {
        showInfoTost('User deleted successfully');
        navigate('/admin/view');
        setOpen(false);
    });
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleBack =() => {
    navigate('/admin/view');
  };

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  if (!user) return <Spin size="large" className="flex justify-center items-center min-h-screen" />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <div className="w-full max-w-5xl">
        <Button color="default" variant="outlined" style={{ marginLeft: '10px' }} onClick={handleBack}>Back</Button>
        <Card
          title={<Title level={3} className="text-center">User Details</Title>}
          bordered={false}
          style={{ width: '100%', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
          className="bg-white rounded-2xl flex justify-center"
          extra={
            <div>
                <Button color="primary" variant="solid" style={{ marginLeft: '10px' }} onClick={() => navigate(`/admin/edit/${user.id}`)}>Edit</Button>
                <Button color="danger" variant="solid" style={{ marginLeft: '10px' }} onClick={() => showModal(user.id)}>Delete</Button>
            </div>
          }
        >
          <Row gutter={[32, 16]} align="middle" justify="center">
            <Col flex="0 0 25%">
              {/* Profile Image */}
              <div
                style={{
                  width: '250px',
                  height: '350px',
                  backgroundColor: '#d9d9d9',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '8px',
                  marginLeft: '80px',
                  marginRight: '80px'
                }}
              >
                <UserOutlined style={{ fontSize: '100px', color: '#FFFFF0' }} />
              </div>
            </Col>
            <Col flex="1">
              <Descriptions
                bordered
                column={1}
                size="small"
                labelStyle={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                }}
                contentStyle={{
                  fontSize: '16px',
                }}
              >
                <Descriptions.Item label="Full Name:">{user.name}</Descriptions.Item>
                <Descriptions.Item label="Age:">{user.age}</Descriptions.Item>
                <Descriptions.Item label="Address:">{user.address}</Descriptions.Item>
                <Descriptions.Item label="Email:">{user.email}</Descriptions.Item>
                <Descriptions.Item label="Designation:">{user.designation}</Descriptions.Item>
                <Descriptions.Item label="Attendance:">{user.attendance}</Descriptions.Item>
                <Descriptions.Item label="Password:">
                  <Badge count="Confidential" style={{ backgroundColor: '#f5222d' }} />
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
        <Modal
              title="Confirmation!!"
              open={open}
              onOk={deleteData}
              onCancel={hideModal}
              okText="Delete"
              cancelText="Cancel"
            >
              <p>Are you sure you want to delete this?</p>
            </Modal>
      </div>
    </div>
  );
}

export default UserDetail;
