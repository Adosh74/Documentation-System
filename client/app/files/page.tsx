import Header from "@/components/Header";
import  styles  from "./page.module.css";
import AllFiles from "@/components/AllFiles";
export const metadata ={title:"Files"}

function files() {
 const files : any =[{id:1,file:"../icon.png",fileName:"Database Design"},
 {id:2,file:"../icon.png",fileName:"UML Diagrams"}];

 const useCase ="../icon.png";

  return (
    <div className={styles.section} >
      <Header/>
      <div className="p-5 text-center bg-image" >
        <div style={{borderRadius: "50em"}}>
      <AllFiles files={files} useCase={useCase}/>
    </div>
    </div>  
    </div>
  );
}

export default files;
