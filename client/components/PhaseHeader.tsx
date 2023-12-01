"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import styles from "./Styles.module.css"

const PhaseHeader = () => {
    


  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <i className="fa-solid fa-laptop-code"></i>
        <a
           className="navbar-brand">Project Chapter
        </a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
            
            </li>
            <li className="nav-item">
              
            </li>
          </ul>
        </div>

        <Link href="/create"
           className={styles.closeBtn}>Close
        </Link>
      </div>
      
    </header>
    
  );
};

export default PhaseHeader;

