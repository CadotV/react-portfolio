import React from "react";
import * as Fiber from "@react-three/fiber";
import { Preload, View } from "@react-three/drei";
import Lenis from "@studio-freight/lenis";
import { geometry } from "maath";

import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { RGBShiftShader } from "three/addons/shaders/RGBShiftShader.js";

import { ThemeProvider } from "./components/context/ThemeProvider";
import CardSection from "./components/CardSection/CardSection";
import BackToTop from "./components/UtilityComponent/BackToTop";
import NavMobile from "./components/Nav/NavMobile";
import * as IconData from "./components/Header/IconData";
import { AtomString } from "./components/three/Atom/Atom.txt";
import Footer from "./components/Footer/Footer";
import MainContent from "./components/Structure/MainContent";
import WideScreenBorders from "./components/Structure/WideScreenBorders";
import HeaderNavLayout from "./components/Structure/HeaderNavLayout";
import CardWebGl from "./components/CardSection/CardWebGl";
import { ViewPostProcessing } from "./components/UtilityComponent/three/ViewPostProcessing";

const Atom = React.lazy(() => import("./components/three/Atom/Atom"));
const PostImageList = React.lazy(() =>
  import("./components/UtilityComponent/PostImageList")
);

Fiber.extend(geometry);

// Use lenis smooth scroll
const lenis = new Lenis({ syncTouch: true });
// Integrate into fibers own raf loop inst                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      ead of opening another
Fiber.addEffect((t) => lenis.raf(t));

import img156 from "./images/IMG_0156.JPG";
import img157 from "./images/IMG_0157.JPG";
import img160 from "./images/IMG_0160.JPG";
import img166 from "./images/IMG_0166.JPG";

const postImages = [
  {
    id: "1",
    src: img156,
    alt: "test",
  },
  {
    id: "2",
    src: img157,
    alt: "test",
  },
  {
    id: "3",
    src: img160,
    alt: "test",
  },
  {
    id: "4",
    src: img166,
    alt: "test",
  },
];

import "./tailwind.css";

function App() {
  const containerRef = React.useRef();

  const rgbPass = new ShaderPass(RGBShiftShader);
  rgbPass.uniforms["amount"].value = 0.035;

  const bloomPass = new UnrealBloomPass(0.05, 0.5);

  return (
    <ThemeProvider>
      {/* <LoadingScreen /> */}
      <WideScreenBorders />
      <div
        id="layout"
        ref={containerRef}
        className="bg-white dark:bg-black overflow-hidden font-body"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <HeaderNavLayout />

        <MainContent>
          <CardSection
            title={{
              fr: "Atom avec nucleon et electrons",
              en: "Atom with nucleon and electrons",
            }}
            skills={[
              IconData.visualStudioCode,
              IconData.threejs,
              IconData.react,
            ]}
            files={{ "Atom.jsx": AtomString }}
            textDone={[
              { fr: "Ajout de Shaders", en: "Added Shaders" },
              { fr: "React fiber", en: "React fiber" },
              { fr: "React spring", en: "React spring" },
            ]}
            textNotDone={[
              {
                fr: "Reset de l'animation à chaque hover",
                en: "Reset animation on hover",
              },
              {
                fr: "Les particules ne devraient pas clignoter",
                en: "Particles flash when they shouldn't",
              },
            ]}
          >
            <CardWebGl
              component={Atom}
              numElectron={100}
              electronRadius={0.05}
              scale={3.5}
              bgColor="#150222"
              passes={[bloomPass]}
            />
          </CardSection>
          <section className="w-full m-0">
            <PostImageList postImages={postImages} />
          </section>
          <Fiber.Canvas
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              overflow: "hidden",
            }}
            className="z-0"
            onCreated={(gl) => {
              gl.alpha = true;
              gl.clearColor = 0x000000;
            }}
            eventSource={containerRef}
            // frameloop="demand"
          >
            <View.Port />
            <ViewPostProcessing.Port />
            <Preload all />
            {/* <Effects /> */}
          </Fiber.Canvas>
        </MainContent>
        <Footer />
      </div>
      <BackToTop />
      <NavMobile />
    </ThemeProvider>
  );
}

export default App;
