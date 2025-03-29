// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import Login from './pages/auth/Login';
import CustomLayout from './components/Layout';
import Dashboard from './pages/user/Dashboard';
import ViewUsers from './pages/admin/ViewUsers';
import Setting from './pages/user/Setting';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import AdminDashboard from './pages/admin/AdminDashboard';
import { UserContext } from './context/user.context';
import AdminLayout from './components/AdminLayout';
import AddUser from './pages/admin/AddUser';
import UserDetail from './pages/admin/UserDetail';
import EditUser from './pages/user/EditUser';

function App() {

  const [_user, _setUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

  return (
    <UserContext.Provider value={{_user, _setUser}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/view" element={<ViewUsers />} />
            <Route path="/admin/add" element={<AddUser />} />
            <Route path="/admin/edit/:userId" element={<AddUser />} />
            <Route path="/admin/detail/:userId" element={<UserDetail />} />
          </Route>

          <Route path="/users" element={<CustomLayout />}>
            <Route path="/users/dashboard/:userId" element={<Dashboard />} />
            <Route path="/users/setting/:userId" element={<Setting />} />
            <Route path="/users/edit/:userId" element={<EditUser />} />
          </Route>
        </Routes>
        
      </BrowserRouter>
      <ToastContainer />
    </UserContext.Provider>
    
  );
}

export default App;
