import React from 'react'


import logo from "../assets/images/1.png";


export const Sidebar = () => {
  return (
    <>
     <header className="main-nav">
          <div className="sidebar-user text-center">
          <img className="img-90 rounded-circle" src={logo} alt="" />
            <div className="badge-bottom"><span className="badge badge-primary">New</span></div><a href="user-profile.html">
              <h6 className="mt-3 f-14 f-w-600">Jaime Ferreira</h6></a>
            <p className="mb-0 font-roboto">Full-Stack Developer</p>
            
          </div>
        </header>
    </>
  )
}
