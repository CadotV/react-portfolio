const plugin = require("tailwindcss/plugin");

const radialGradientPlugin = plugin(
  function ({ matchUtilities, theme }) {
    matchUtilities(
      {
        // map to bg-radient-[*]
        "bg-radient": (value) => ({
          "background-image": `radient-gradient(${value}, var(--tw-gradient-stops))`,
        }),
      },
      { values: theme("radialGradients") }
    );
  },
  {
    theme: {
      radialGradients: _presets(),
    },
  }
);

function _presets() {
  const shapes = ["circle", "ellipse"];
  const pos = {
    c: "center",
    t: "top",
    b: "bottom",
    l: "left",
    r: "right",
    tl: "top left",
    tr: "top right",
    bl: "bottom left",
    br: "bottom right",
  };
  let result = {};
  for (const shape of shapes)
    for (const [posName, posValue] of Object.entries(pos))
      result[`${shape}-${posName}`] = `${shape} at ${posValue}`;

  return result;
}

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      title: ["Permanent Marker"],
      link: ["Lobster"],
      neon: ["Tilt Neon"],
      body: ["Itim"],
    },
  },
  plugins: [radialGradientPlugin],
};
