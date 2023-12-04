
import Header from "@/components/Header";
import ViewPhases from "@/components/ViewPhases";
import SDLC from "@/components/SDLC";

interface Info{
  ProjectInfo:{};
}

 const Sdlc:React.FC<Info> = ({ProjectInfo})=> {
 
  return (
    <>
      <Header/>
      <ViewPhases ProjectInfo={{ProjectInfo}}/>
         </>
  );
}

export default Sdlc;

