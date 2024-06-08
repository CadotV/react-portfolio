import * as React from "react";
import * as THREE from "three";
import {
  RootState,
  context,
  createPortal,
  useFrame,
  useThree,
} from "@react-three/fiber";
import tunnel from "tunnel-rat";

import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";

const isOrthographicCamera = (def) => def && def.isOrthographicCamera;
const col = new THREE.Color();
const tracked = tunnel();

/**
 * In `@react-three/fiber` after `v8.0.0` but prior to `v8.1.0`, `state.size` contained only dimension
 * information. After `v8.1.0`, position information (`top`, `left`) was added
 *
 * @todo remove this when drei supports v9 and up
 */

function isNonLegacyCanvasSize(size) {
  return "top" in size;
}

function computeContainerPosition(canvasSize, trackRect) {
  const {
    right,
    top,
    left: trackLeft,
    bottom: trackBottom,
    width,
    height,
  } = trackRect;
  const isOffscreen =
    trackRect.bottom < 0 ||
    top > canvasSize.height ||
    right < 0 ||
    trackRect.left > canvasSize.width;
  if (isNonLegacyCanvasSize(canvasSize)) {
    const canvasBottom = canvasSize.top + canvasSize.height;
    const bottom = canvasBottom - trackBottom;
    const left = trackLeft - canvasSize.left;
    return {
      position: { width, height, left, top, bottom, right },
      isOffscreen,
    };
  }
  // Fall back on old behavior if r3f < 8.1.0
  const bottom = canvasSize.height - trackBottom;
  return {
    position: { width, height, top, left: trackLeft, bottom, right },
    isOffscreen,
  };
}

function prepareSkissor(state, { left, bottom, width, height }) {
  let autoClear;
  const aspect = width / height;
  if (isOrthographicCamera(state.camera)) {
    if (
      state.camera.left !== width / -2 ||
      state.camera.right !== width / 2 ||
      state.camera.top !== height / 2 ||
      state.camera.bottom !== height / -2
    ) {
      Object.assign(state.camera, {
        left: width / -2,
        right: width / 2,
        top: height / 2,
        bottom: height / -2,
      });
      state.camera.updateProjectionMatrix();
    }
  } else if (state.camera.aspect !== aspect) {
    state.camera.aspect = aspect;
    state.camera.updateProjectionMatrix();
  }
  autoClear = state.gl.autoClear;
  state.gl.autoClear = false;
  state.gl.setViewport(left, bottom, width, height);
  state.gl.setScissor(left, bottom, width, height);
  state.gl.setScissorTest(true);
  // composer.setSize(width, height);
  return autoClear;
}

function finishSkissor(state, autoClear) {
  // Restore the default state
  state.gl.setScissorTest(false);
  state.gl.autoClear = autoClear;
}

function clear(state) {
  state.gl.getClearColor(col);
  state.gl.setClearColor(col, state.gl.getClearAlpha());
  state.gl.clear(true, true);
}

const FancyBorderShader = {
  name: "FancyBorderShader",
  uniforms: {
    tDiffuse: {
      value: null,
    },
    size: {
      value: new THREE.Vector2(0, 0),
    },
    u_time: {
      value: Math.random() * 1000,
    },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {

        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,
  fragmentShader: /* glsl */ `
    #define M_PI 3.1415926535897932384626433832795
    #define M_TWO_PI (2.0 * M_PI)

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 size;
    uniform sampler2D tDiffuse;
    varying vec2 vUv;

    float rand(vec2 n) {
        return fract(sin(dot(n, vec2(12.9898,12.1414))) * 83758.5453);
    }

    float noise(vec2 n) {
        const vec2 d = vec2(0.0, 1.0);
        vec2 b = floor(n);
        vec2 f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
        return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
    }

    vec3 ramp(float t) {
      return t <= .5 ? vec3( 1. - t * 1.4, .2, 1.05 ) / t : vec3( .3 * (1. - t) * 2., .2, 1.05 ) / t;
    }
    vec2 polarMap(vec2 uv, float shift, float inner) {

        uv = vec2(0.5) - uv;
        
        
        float px = 1.0 - fract(atan(uv.y, uv.x) / 6.28 + 0.25) + shift;
        
        float square = max(abs(uv.x) , uv.y);
        float circle = sqrt(uv.x * uv.x + uv.y * uv.y);
        float roundedSquare = length(max(abs(uv.xy+32.0),uv.y))-32.0;
        float squircle = length(uv*uv*uv*4.);
        //float shape = abs(uv.x) > 0.4 && uv.y > 0.32 ? circle : square;
        float py = (squircle * (1.0 + inner * 2.0) - inner) * 2.0;
        
        return vec2(px, py);
    }
    float fire(vec2 n) {
        return noise(n) + noise(n * 2.1) * .6 + noise(n * 5.4) * .42;
    }

    float shade(vec2 uv, float t) {
        uv.x += uv.y < .5 ? 23.0 + t * .035 : -11.0 + t * .03;    
        uv.y = abs(uv.y - .5);
        uv.x *= 35.0;
        
        float q = fire(uv - t * .013) / 2.0;
        vec2 r = vec2(fire(uv + q / 2.0 + t - uv.x - uv.y), fire(uv + q - t));
        
        return pow((r.y + r.y) * max(.0, uv.y) + .1, 4.0);
    }

    vec3 color(float grad) {
        
        // float m2 = iMouse.z < 0.0001 ? 1.15 : iMouse.y * 3.0 / iResolution.y;
        float m2 = 1.15;
        grad =sqrt( grad);
        vec3 color = vec3(1.0 / (pow(vec3(0.5, 0.0, .1) + 2.61, vec3(2.0))));
        vec3 color2 = color;
        color = ramp(grad);
        color /= (m2 + max(vec3(0), color));
        
        return color;

    }

    float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
        return length(max((abs(CenterPosition)-(Size)+Radius),0.0))-Radius;
    }

    void main() {
      
        // float m1 = iMouse.z < 0.0001 ? 3.6 : iMouse.x * 5.0 / iResolution.x;
        float m1 = 3.6;
        
        float t = u_time;
        vec2 uv = vUv;
        float ff = 1.0 - uv.y;
        //uv.x -= (iResolution.x / iResolution.y - 1.0) / 2.0;
        vec2 uv2 = uv;
        uv2.y = 1.0 - uv2.y;
        uv = polarMap(uv, 1.3, m1);
        uv2 = polarMap(uv2, 1.9, m1);

        vec2 halfRes = size / 2.0 ;
        vec2 boxPos = (vUv.xy * size.xy - size / 2.0);

        float distance = roundedBoxSDF(boxPos, halfRes, 32.);

        vec3 c1 = color(shade(uv, t)) * ff;
        vec3 c2 = color(shade(uv2, t)) * (1.0 - ff);

        if(c1 + c2 == vec3(0.0)) {
          discard;
        }
        
        vec4 texel = texture2D(tDiffuse, vUv);
        gl_FragColor = vec4(c1 + c2, 1.0);
    }
  `,
};

const RoundedRectShader = {
  name: "RoundedRectShader",
  uniforms: {
    radius: { value: null },
    size: {
      value: new THREE.Vector2(0, 0),
    },
    containerSize: {
      value: null,
    },
    tDiffuse: {
      value: null,
    },
  },
  vertexShader: /* glsl */ `
        varying vec2 vUv;

        void main() {

            vUv = uv;

            gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

        }`,
  fragmentShader: /* glsl */ `
        #include <common>

        uniform float radius;
        uniform vec2 size;
        uniform vec2 u_resolution;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;

        // make a rounded rectangle to the size of html element, then resize to fullscreen to keep distortion on corners, which will be resized by the viewport

        float roundedBoxSDF(vec2 CenterPosition, vec2 Size, float Radius) {
            return length(max((abs(CenterPosition)-(Size)+Radius),0.0))-Radius;
        }

        void main() {
            vec2 coords = vUv.xy * size.xy;

            vec2 halfRes = size / 2.0 ;
            vec2 boxPos = (coords.xy - halfRes);

            // Bad version ! don't use if, ever !
            // float smoothedAlpha = 1.0;

            // if (length(coords - vec2(0)) < radius ||
            //     length(coords - vec2(0, size.y)) < radius ||
            //     length(coords - vec2(size.x, 0)) < radius ||
            //     length(coords - size) < radius) {
            //     smoothedAlpha = 0.0;
            // }


            float edgeSoftness  = 1.0;

            float distance = roundedBoxSDF(boxPos, halfRes, radius);

            float smoothedAlpha = 1.-smoothstep(0.1, edgeSoftness * 1.0, distance);

            vec4 texel = texture2D(tDiffuse, vUv);
            gl_FragColor = texel * smoothedAlpha;
        }`,
};

function Container({
  visible = true,
  canvasSize,
  index,
  passes,
  children,
  rect,
  track,
  frames,
  borderRadius = undefined,
}) {
  const rootState = useThree();
  const [isOffscreen, setOffscreen] = React.useState(false);

  const params = {
    threshold: 0,
    strength: 1,
    radius: 0,
    exposure: 1,
  };

  const { position } = computeContainerPosition(canvasSize, rect.current);

  const composer = new EffectComposer(rootState.gl);

  composer.setSize(position.width, position.height);
  composer.addPass(new RenderPass(rootState.scene, rootState.camera));

  /* initialize and add passes */
  if (passes?.length) {
    passes.forEach((pass) => {
      composer.addPass(pass);
    });
  }

  if (borderRadius !== undefined) {
    const roundedRectPass = new ShaderPass(RoundedRectShader);
    roundedRectPass.uniforms["radius"].value = borderRadius;
    roundedRectPass.uniforms["size"].value = new THREE.Vector2(
      position.width,
      position.height
    );
    roundedRectPass.uniforms["tDiffuse"].value = composer.readBuffer;
    composer.addPass(roundedRectPass);
  }

  // const fancyBorderPass = new ShaderPass(FancyBorderShader);
  // fancyBorderPass.uniforms["tDiffuse"].value = composer.readBuffer;
  // fancyBorderPass.uniforms["size"].value = new THREE.Vector2(
  //   position.width,
  //   position.height
  // );
  // fancyBorderPass.uniforms["u_time"].value = Math.random() * 10000;
  // composer.addPass(fancyBorderPass);

  const finalPass = new OutputPass();
  composer.addPass(finalPass);

  let frameCount = 0;
  useFrame((state) => {
    if (frames === Infinity || frameCount <= frames) {
      rect.current = track.current?.getBoundingClientRect();
      frameCount++;
    }
    if (rect.current) {
      const { position, isOffscreen: _isOffscreen } = computeContainerPosition(
        canvasSize,
        rect.current
      );
      if (isOffscreen !== _isOffscreen) setOffscreen(_isOffscreen);
      if (visible && !isOffscreen && rect.current) {
        const autoClear = prepareSkissor(state, position);
        // When children are present render the portalled scene, otherwise the default scene
        // state.gl.render(children ? state.scene : scene, state.camera);
        // composer.setSize(position.width, position.height);
        // fancyBorderPass.uniforms["u_time"].value = state.clock.elapsedTime;
        composer.render();
        finishSkissor(state, autoClear);
      }
    }
  }, index);

  React.useLayoutEffect(() => {
    const curRect = rect.current;
    if (curRect && (!visible || !isOffscreen)) {
      // If the view is not visible clear it once, but stop rendering afterwards!
      const { position } = computeContainerPosition(canvasSize, curRect);
      const autoClear = prepareSkissor(rootState, position);
      clear(rootState);
      finishSkissor(rootState, autoClear);
    }
  }, [visible, isOffscreen]);

  React.useEffect(() => {
    const curRect = rect.current;
    // Connect the event layer to the tracking element
    const old = rootState.get().events.connected;
    rootState.setEvents({ connected: track.current });
    return () => {
      if (curRect) {
        const { position } = computeContainerPosition(canvasSize, curRect);
        const autoClear = prepareSkissor(rootState, position);
        clear(rootState);
        finishSkissor(rootState, autoClear);
      }
      rootState.setEvents({ connected: old });
    };
  }, []);

  React.useEffect(() => {
    if (isNonLegacyCanvasSize(canvasSize)) return;
    console.warn(
      "Detected @react-three/fiber canvas size does not include position information. <View /> may not work as expected. " +
        "Upgrade to @react-three/fiber ^8.1.0 for support.\n See https://github.com/pmndrs/drei/issues/944"
    );
  }, []);

  return <>{children}</>;
}

// function ContainerPostProc({ children }: ContainerPostProcProps) {
//   const { gl, scene, camera } = useThree();
//   const composer = new EffectComposer(gl);
//   composer.addPass(new RenderPass(scene, camera));
//   const effect1 = new ShaderPass(DotScreenShader);
//   effect1.uniforms["scale"].value = 4;
//   composer.addPass(effect1);

//   const effect2 = new ShaderPass(RGBShiftShader);
//   effect2.uniforms["amount"].value = 0.0015;
//   composer.addPass(effect2);

//   const effect3 = new OutputPass();
//   composer.addPass(effect3);
//   useFrame((delta) => {
//     composer.render(delta);
//   });

//   return <>{children}</>;
// }

const CanvasView = React.forwardRef(
  (
    {
      track,
      visible = true,
      index = 1,
      id,
      style,
      className,
      frames = Infinity,
      children,
      passes,
      borderRadius = 16,
      ...props
    },
    fref
  ) => {
    const rect = React.useRef();
    const { size, scene } = useThree();
    const [virtualScene] = React.useState(() => new THREE.Scene());
    const [ready, toggle] = React.useReducer(() => true, false);

    const compute = React.useCallback(
      (event, state) => {
        if (rect.current && track.current && event.target === track.current) {
          const { width, height, left, top } = rect.current;
          const x = event.clientX - left;
          const y = event.clientY - top;
          state.pointer.set((x / width) * 2 - 1, -(y / height) * 2 + 1);
          state.raycaster.setFromCamera(state.pointer, state.camera);
        }
      },
      [rect, track]
    );

    React.useEffect(() => {
      // We need the tracking elements bounds beforehand in order to inject it into the portal
      rect.current = track.current?.getBoundingClientRect();
      // And now we can proceed
      toggle();
    }, [track]);

    return (
      <group ref={fref} {...props}>
        {ready &&
          createPortal(
            <Container
              visible={visible}
              canvasSize={size}
              frames={frames}
              passes={passes}
              track={track}
              rect={rect}
              index={index}
              borderRadius={borderRadius}
            >
              {children}
            </Container>,
            virtualScene,
            {
              events: { compute, priority: index },
              size: {
                width: rect.current?.width,
                height: rect.current?.height,
                // @ts-ignore
                top: rect.current?.top,
                // @ts-ignore
                left: rect.current?.left,
              },
            }
          )}
      </group>
    );
  }
);

const HtmlView = React.forwardRef(
  (
    {
      as: El = "div",
      id,
      visible,
      className,
      style,
      index = 1,
      track,
      frames = Infinity,
      children,
      passes,
      borderRadius,
      ...props
    },
    fref
  ) => {
    const uuid = React.useId();
    const ref = React.useRef();
    React.useImperativeHandle(fref, () => ref.current);
    return (
      <>
        {/** @ts-ignore */}
        <El ref={ref} id={id} className={className} style={style} {...props} />
        <tracked.In>
          <CanvasView
            visible={visible}
            key={uuid}
            track={ref}
            frames={frames}
            index={index}
            passes={passes}
            borderRadius={borderRadius}
          >
            {children}
          </CanvasView>
        </tracked.In>
      </>
    );
  }
);

export const ViewPostProcessing = React.forwardRef((props, fref) => {
  // If we're inside a canvas we should be able to access the context store
  const store = React.useContext(context);
  // If that's not the case we render a tunnel
  if (!store) return <HtmlView ref={fref} {...props} />;
  // Otherwise a plain canvas-view
  else return <CanvasView ref={fref} {...props} />;
});

ViewPostProcessing.Port = () => <tracked.Out />;
