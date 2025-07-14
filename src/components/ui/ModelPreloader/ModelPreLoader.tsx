import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { UseLoading } from "../../../context/loadingContext/LoadingContext";

function ModelPreloader() {
  const { setLoadingComponents } = UseLoading();


  useGLTF.preload("/models/lost_programmer.glb");


  const { scene } = useGLTF("/models/lost_programmer.glb");

  useEffect(() => {
    if (scene) {
      
      setTimeout(() => setLoadingComponents(true), 3000);
      
    }
  }, [scene]);

  return null; 
}

export default ModelPreloader;
