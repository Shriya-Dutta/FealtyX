import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { DashboardContainer, Button } from './styles';


const Dashboard = () => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <DashboardContainer>
            <h1>Welcome {user?.role}!</h1>
            <p>Email: {user?.email}</p>
            <Button onClick={handleLogout}>Logout</Button>
        </DashboardContainer>
    );
};

export default Dashboard;