import Link from 'next/link';
import styles from "./Styles.module.css"

const Header = () => {

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <i className="fa-solid fa-laptop-code"></i>
        <Link href="/"
           className="navbar-brand" style={{fontSize:"100",fontWeight:"700"}}>Documentation System
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
                 className="nav-link">Files
              </Link>
            </li>
          </ul>
        </div>

        <Link href="/create"
           className={styles.createBtn}>Create
        </Link>
      </div>
      
    </header>
    
  );
};

export default Header;

