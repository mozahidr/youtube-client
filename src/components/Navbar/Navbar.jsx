import React, { useContext, useState } from 'react';
import './Navbar.scss';
import logo from '../../images/logo.png';
import avatar from '../../images/avatar.png';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthContext';
import { logout } from '../../AuthContext/AuthAction';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
      <div className="container">
        <div className="navbarLeft">
          <img src={logo} alt="logo" />
          <Link to='/' className='link'>
            <span>Home</span>
          </Link>
          <Link to="/series" className='link'>
            <span className='navbarmainLinks'>Series</span>
          </Link>
          <Link to='/movies' className='link'>
            <span className='navbarmainLinks'>Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="navbarRight">
          <SearchIcon className="icon" />
          <span>KID</span>
          <NotificationsIcon className="icon" />
          <img src={avatar} alt="profile" />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <Link to='/profile' className='link'><span>Settings</span></Link>
              <span onClick={() => dispatch(logout())}>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
