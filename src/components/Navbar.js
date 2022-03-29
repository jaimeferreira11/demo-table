import React from 'react'

import logo from "../assets/images/logo/logo.png";


export const Navbar = () => {
  return (
    <>

      <div className="page-main-header">
        <div className="main-header-right row m-0">
          <div className="main-header-left">
            <div className="logo-wrapper"><a href="index.html">
                <img className="img-fluid" src={logo} alt="" />
                    </a></div>
            <div className="dark-logo-wrapper"><a href="index.html">
                <img className="img-fluid" src={logo} alt="" />
                    </a></div>
            <div className="toggle-sidebar"><i className="status_toggle middle" data-feather="align-center" id="sidebar-toggle"></i></div>
          </div>
          
          <div className="nav-right col pull-right right-menu p-0">
            <ul className="nav-menus">
              <li className="onhover-dropdown">
                <div className="bookmark-box"><i data-feather="star"></i></div>
                <div className="bookmark-dropdown onhover-show-div">
                  <div className="form-group mb-0">
                    <div className="input-group">
                      <div className="input-group-prepend"><span className="input-group-text"><i className="fa fa-search"></i></span></div>
                      {/* <input className="form-control" type="text" placeholder="Search for bookmark..."> */}
                    </div>
                  </div>
                  
                </div>
              </li>
              
             
              
              
            </ul>
          </div>
          <div className="d-lg-none mobile-toggle pull-right w-auto"><i data-feather="more-horizontal"></i></div>
        </div>
      </div>
    </>
  )
}
