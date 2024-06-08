import React from "react";
import { useSprings, animated, to } from "@react-spring/web";
import { prominent } from "color.js";
import useMeasure from "react-use-measure";
import { useDrag } from "react-use-gesture";
import { clamp, uniq } from "lodash";
import { LangContext } from "../context/ThemeProvider";
import GlassmorphismContainer from "../Structure/GlassmorphismContainer";
import Sparkles from "../Animation/Sparkles";
import LinkWithSparkles from "./LinkWithSparkles";

export default function PostImageList({ postImages }) {
  const [colorImages, setColorImages] = React.useState([]);
  const [colorBG, setColorBG] = React.useState("#ffffff");
  const { langMode } = React.useContext(LangContext);

  const images = React.useMemo(() => {
    return postImages;
  }, [postImages]);

  React.useEffect(() => {
    const colors = [];
    images.forEach((image) => {
      (async () => {
        const color = await prominent(image.src.toString(), {
          amount: 1,
          sample: 10,
          format: "hex",
        });
        // setColorImages((colorImages) => [...colorImages, color]);
        colors.push(color);
        setColorImages(uniq(colors));
        console.log("🚀 ~ colors:", colors);
      })();
    });
    // console.log("colorImages:", colorImages);
    // setColorBG(colorImages[0]);
  }, [postImages]);

  const index = React.useRef(0);
  const [ref, { width, height }] = useMeasure();

  const [props, api] = useSprings(
    postImages.length,
    (i) => ({
      x: i * width,
      scale: width === 0 ? 0 : 1,
      display: "block",
    }),
    [width]
  );

  const bind = useDrag(
    ({ active, movement: [mx], direction: [xDir], distance, cancel }) => {
      if (active && distance > width / 2) {
        if (index.current == postImages.length - 1 && xDir < 0) {
          index.current = 0;
        } else if (index.current == 0 && xDir > 0) {
          index.current = postImages.length - 1;
        } else {
          index.current = clamp(
            index.current + (xDir > 0 ? -1 : 1),
            0,
            postImages.length - 1
          );
        }
        setColorBG(colorImages[index.current]);
        cancel();
      }
      api.start((i) => {
        // if (i < index.current - 1 || i > index.current + 1) {
        //   return { display: "none" };
        // }
        const x = (i - index.current) * width + (active ? mx : 0);
        const scale = active ? 1 - distance / width / 4 : 1;
        return { x, scale, display: "block" };
      });
    }
  );

  return (
    <div
      className="h-[800px] py-4 text-center transition-colors ease-in-out duration-500 overflow-hidden relative -z-1"
      style={{
        backgroundImage: `url('/noisy-texture-100x100.png')`,
        backgroundColor: colorBG,
      }}
    >
      <span className="h-full w-full absolute inset-0 pointer-events-none bg-gradient-to-r from-black from-5% via-transparent to-black to-95% z-10 opacity-50"></span>
      <GlassmorphismContainer className="block text-xl max-w-sm sm:max-w-md md:max-w-lg p-4 mb-4 mx-auto">
        <h2 className="text-black dark:text-white font-title text-2xl">
          {langMode === "fr"
            ? "Mes réalisations avec"
            : "My drawings made with"}{" "}
          <LinkWithSparkles href="https://procreate.com/">
            Procreate
          </LinkWithSparkles>
        </h2>
      </GlassmorphismContainer>
      <div className="h-full flex flex-col justify-center space-y-12">
        <div
          ref={ref}
          className="h-full py-8 w-5/6 relative flex flex-row max-w-2xl"
          style={{
            left: "50%",
            transform: "translate(-50%, 0%)",
          }}
        >
          {props.map(({ x, display, scale }, i) => (
            <React.Suspense fallback={<Loading />} key={i}>
              <animated.div
                {...bind()}
                style={{
                  scale,
                  display,
                  x,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) perspective(300px)",
                  backgroundImage: `url(${postImages[i].src})`,
                  rotateY: x
                    .to([-width, width], [365, 355])
                    .to((value) => `${value}deg`),
                }}
                className={`absolute w-full h-full will-change-transform overflow-hidden rounded-2xl shadow-lg bg-center bg-cover bg-no-repeat max-w-2xl ${
                  i === index.current ? "" : "blur-md"
                }`}
              ></animated.div>
            </React.Suspense>
          ))}
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return <h2>🌀 Loading...</h2>;
}
