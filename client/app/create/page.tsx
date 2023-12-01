"use client"
import Header from "@/components/Header";
import styles from "./page.module.css";
import { useReducer } from 'react';
import ChoosePhase from "@/components/ChoosePhase";
function create() {
    
  return (
    <>
       <Header />
       <ChoosePhase/>

  < div >
    <div  className={styles.section}>
    </div>
    </div>
    </>
    
  );
}

export default create;
