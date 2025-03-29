import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import logo from '../images/RAC_SainbuBhainsepati.png';
import { showInfoTost } from '../utils/toastify.util';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('is_Login');
    if (isLogin !== '1') {
      navigate('/');
    }
  }, [navigate]);

  const handleLogoutClick = () => {
    showInfoTost('Logout Successfully');
    localStorage.setItem('is_Login', 0);
    navigate('/');
  }

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={220}
          style={{
            position: 'sticky', 
            top: 0,
            height: '100vh', 
            overflow: 'auto' 
          }}
        >
          <div
            className="demo-logo-vertical"
            style={{ display: collapsed ? 'none' : 'flex' }}
          >
            <img src={logo} alt="logo" style={{ height: 65, padding: 19 }} />
          </div>

          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: '1',
                icon: <DashboardOutlined />,
                label: 'Dashboard',
                onClick: () => navigate('/admin/dashboard'),
              },
              {
                key: '2',
                icon: <UserOutlined />,
                label: 'View Users',
                onClick: () => navigate('/admin/view'),
              },
              {
                key: '4',
                icon: <LogoutOutlined />,
                label: 'Logout',
                onClick: () => handleLogoutClick(),
              },
            ]}
          />
        </Sider>

        <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            position: 'sticky',
            top: 0,
            zIndex: 10,
            width: '100%',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>

          <Content
            style={{
              margin: '16px 16px',
              padding: 20,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminLayout;
