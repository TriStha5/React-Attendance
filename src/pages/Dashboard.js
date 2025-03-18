import { useEffect } from "react";
import { useNavigate } from "react-router";

const Dashboard = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const isLogin  = localStorage.getItem('is_login');
        if (isLogin !== '1') {
        navigate('/users/dashboard');
        }else {
            navigate('/');
        }
    }, [navigate]);
    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    )
}

export default Dashboard;