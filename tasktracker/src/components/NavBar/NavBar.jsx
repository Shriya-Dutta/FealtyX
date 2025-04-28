import React from 'react';
import './NavBarStyles.css';
import FealtyX_logo from '../../utils/assets/FealtyX_logo.png';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

    const navigate = useNavigate();

    return (
        <>
            <nav id='navbar' className="navBar">
                <div id="title" className='Title'>
                    <img id="fealtyx-logo" src={FealtyX_logo} alt="logo" className='fealtyXLogo' />
                    <h3>{props.value}</h3>
                </div>
                {props.value === "Login" ? null :
                    <Button
                        id="logout-button"
                        className="LogoutButton"
                        type="button"
                        value="Logout"
                        onClick={() => navigate('/')}
                    />
                }
            </nav>
        </>
    )
};

export default NavBar;