import React from "react";
import { Scrollbar } from "react-scrollbars-custom";

export default function ScrollbarCustom({ style, children }) {
  return (
    <Scrollbar
      style={style}
      //   renderer={(props) => {
      //     const { elementRef, ...restProps } = props;
      //     return (
      //       <span {...restProps} ref={elementRef} className="p-2 bg-blue-500" />
      //     );
      //   }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className="" />;
        },
      }}
      scrollerProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className="" />;
        },
      }}
      contentProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className="Content" />;
        },
      }}
      trackXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className="TrackX" />;
        },
      }}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <span
              {...restProps}
              ref={elementRef}
              className="trackY bg-red-500"
            />
          );
        },
      }}
      thumbXProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return <span {...restProps} ref={elementRef} className="ThUmBX" />;
        },
      }}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, ...restProps } = props;
          return (
            <span
              {...restProps}
              ref={elementRef}
              className="tHuMbY bg-red-500"
            />
          );
        },
      }}
    >
      {children}
    </Scrollbar>
  );
}
