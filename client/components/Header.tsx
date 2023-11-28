import React, { useState } from 'react';
import Link from 'next/link';


const Header = () => {

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/"
           className="navbar-brand">Documentation System
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link href="/sdlc"
                className="nav-link">SDLC
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/files"
                 className="nav-link">All Filles
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/create"
           className="btn btn-primary" >Create
        </Link>
      </div>
      
    </header>
    
  );
};

export default Header;

