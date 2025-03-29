import { NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Space, Table, Button, Card, Modal, Avatar } from 'antd';
import { deleteUser, getUsers } from "../../utils/user.util";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined // Import UserOutlined icon
} from '@ant-design/icons';
import { showSuccesssTost } from "../../utils/toastify.util";

const ViewUsers = () => {
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const handleAddUser = () => {
        navigate("/admin/add");
    };

    useEffect(() => {
      getUsers().then((response) => {
        setData(response);
      });
    }, []);

    const showModal = (id) => {
      setDeleteId(id);
      setOpen(true);
    };

    const deleteData = () => {
      deleteUser(deleteId).then(() => {
        getUsers().then((response) => {
          setData(response);
          showSuccesssTost('User deleted successfully');
          setOpen(false);
        });
      });
    };

    const hideModal = () => {
      setOpen(false);
    };

    const columns = [
        {
          title: 'User',
          key: 'userIcon',
          render: () => (
            <Avatar 
              size={35} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#d9d9d9' }} // Gray background color
            />
          ),
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: (_, item) => <NavLink to={`/admin/detail/${item.id}`}>{item.name}</NavLink>,
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Attendance',
            dataIndex: 'attendance',
            key: 'attendance',
        },
        {
            title: 'Password',
            dataIndex: 'password',
            key: 'password',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <NavLink to={`/admin/edit/${record.id}`}><EditOutlined /></NavLink>
              <DeleteOutlined onClick={() => showModal(record.id)}/>
            </Space>
          ),
        },
    ];

    return (
        <div>
            <Card
              style={{
                marginTop: 16,
              }}
              type="inner"
              title={<h1>User Details</h1>}
              extra={<Button type="primary" onClick={handleAddUser}>Add User</Button>}
            >
              <Table columns={columns} dataSource={data} />
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
    );
}

export default ViewUsers;
