import React, { useEffect } from "react";
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
//import { Container, Row, Col } from 'reactstrap';
//import { Menu, X, Search } from 'react-feather';

import { showRightSidebar } from '../redux/actions';
//import NotificationDropdown from './NotificationDropdown';
//import ProfileDropdown from './ProfileDropdown';
//import LanguageDropdown from './LanguageDropdown';

import logo from '../assets/images/logo.png';
import profilePic from '../assets/images/users/user-3.png';


/*const Notifications = [{
  id: 1,
  text: 'New user registered',
  subText: '1 min ago',
  icon: 'uil uil-user-plus',
  bgColor: 'primary'
}]*/

const Topbar = ( props ) => {

  const info = useSelector( state => state.Auth );

  useEffect( () => {

    //handleRightSideBar();

    // eslint-disable-next-line
  },[] );


  /*const handleRightSideBar = () => {
    props.showRightSidebar();
  }*/

  return ( <React.Fragment>
    <nav className="navbar navbar-expand-md navbar-dark navbar-custom">
    <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
      <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
              <Link to="/dashboard" className="navbar-brand mx-auto logo">
                <span className="logo-lg">
                  <img src={logo} alt="" height="24" />
                  <span className="d-inline h6 ml-2 text-logo">{info.userInfo ? info.userInfo.empresa : ''}</span>
                </span>
              </Link>
          </li>
      </ul>
    </div>
    <div className="mx-auto order-0">
      <Link to="/dashboard" className="navbar-brand mx-auto logo">
        <span className="logo-lg">
          <img src={`https://webapp.crol.mx/pffv2objetos/funciones/verLogoEmpresa?tipo=4&organizacionId=261`} alt="" height="36" />
        </span>
      </Link>
    </div>
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
      <ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
        <li className="d-none d-sm-block">
          <div className="app-search">
            <div className="media user-profile mt-2 mb-2">
              <img src={profilePic}
                className="avatar-sm rounded-circle mr-2" alt="Crol" />
              {/*<img src={info ? info.usuarioImagen.length > 0 ? `data:image/png;base64,${info.usuarioImagen}` : profilePic : profilePic}
                className="avatar-xs rounded-circle mr-2" alt="Crol" />*/}

              <div className="media-body">
                  <h6 className="pro-user-name mt-2 mb-0">{info.userInfo ? info.userInfo.usuario : ''}</h6>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
</nav>
    {/*<div className="navbar navbar-expand flex-column flex-md-row navbar-custom justify-content-center">
      <Container fluid>
        <div className="mx-auto order-0">
          <Link to="/dashboard" className="navbar-brand mx-auto logo">
            <span className="logo-lg">
              <img src={`https://webapp.crol.mx/pffv2objetos/funciones/verLogoEmpresa?tipo=4&organizacionId=261`} alt="" height="36" />
            </span>
            <span className="logo-sm">
              <img src={`https://webapp.crol.mx/pffv2objetos/funciones/verLogoEmpresa?tipo=4&organizacionId=261`} alt="" height="36" />
            </span>
          </Link>
        </div>*/}
        
        {/*<Link to="/dashboard" className="navbar-brand mr-0 mr-md-2 logo">
          <span className="logo-lg">
            <img src={`https://webapp.crol.mx/pffv2objetos/funciones/verLogoEmpresa?tipo=4&organizacionId=261`} alt="" height="36" />
          </span>
          <span className="logo-sm">
            <img src={`https://webapp.crol.mx/pffv2objetos/funciones/verLogoEmpresa?tipo=4&organizacionId=261`} alt="" height="36" />
          </span>
        </Link>*/}

        { /* menu*/}
        {/*<ul className="navbar-nav bd-navbar-nav flex-row list-unstyled menu-left mb-0">
          <li className="">
            <button className="button-menu-mobile open-left disable-btn" onClick={props.openLeftMenuCallBack}>
              <Menu className="menu-icon" />
              <X className="close-icon" />
            </button>
          </li>
        </ul>*/}

        {/*<ul className="navbar-nav flex-row ml-auto d-flex list-unstyled topnav-menu float-right mb-0">
          <li className="d-none d-sm-block">
            <div className="app-search">
              <div className="media user-profile mt-2 mb-2">
                <img src={profilePic} className="avatar-sm rounded-circle mr-2" alt="Crol" />
                <img src={profilePic} className="avatar-xs rounded-circle mr-2" alt="Crol" />

                <div className="media-body">
                    <h6 className="pro-user-name mt-2 mb-0">{info.usuario}</h6>
                </div>
              </div>
            </div>
          </li>
        </ul>

      </Container>
    </div>*/}
  </React.Fragment > 
  );
}
 
//export default Topbar;




export default connect(
  null,
  { showRightSidebar }
)(Topbar);
