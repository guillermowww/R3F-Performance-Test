import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import "./style.css";
import { Boxes } from "./Boxes";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { FloatingGrid } from "./FloatingGrid";
import { Rings } from "./Rings";

let resolution = 1024;

function CarShow() {
  // Determina el valor de resolución según el tipo de dispositivo
   // Valor predeterminado para computadoras de escritorio
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // Si el usuario visita desde un dispositivo iOS
    resolution = 512;
    console.log(resolution);
  } else if (/android/i.test(userAgent)) {
    // Si el usuario visita desde un dispositivo Android
    resolution = 128;
    console.log(resolution);
  };
  
  function efectos(){
    if (resolution === 1024) {
      console.log('esta funcionando la funcion effecos');
      return (
        
        <>
          <EffectComposer>
            <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> 
            <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3} // The bloom intensity.
            width={256} // render width
            height={256} // render height
            kernelSize={5} // blur kernel size
            luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            />
            <ChromaticAberration
            blendFunction={BlendFunction.NORMAL} // blend mode
            offset={[0.0005, 0.0012]} // color offset
            />
          </EffectComposer>

        </>
      )

    }
    else {
      console.log('la funcion effecos dice que es un dipositivo movil');
      return(
        <>
          <EffectComposer>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.3} // The bloom intensity.
            width={64} // render width
            height={64} // render height
            kernelSize={3} // blur kernel size
            luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
            luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
            />
          </EffectComposer>
        </>
      )

    }

  }
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

      <color args={[0, 0, 0]} attach="background" />
      

      <CubeCamera resolution={resolution} /*frames={60}*/>
        {(texture) => (
          <>
            <Environment map={texture}  />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
      <FloatingGrid />
      <Boxes />
      <Rings />

      {efectos()}


    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
