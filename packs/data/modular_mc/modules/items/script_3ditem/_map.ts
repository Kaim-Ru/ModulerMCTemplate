export const MAP = [
  {
    source: "*.item.json",
    target: `:auto`,
  },
  {
    source: "*.block.json",
    target: `:auto`,
  },
  {
    source: "models/*.geo.json",
    target: `:auto`,
  },
  {
    source: "*.item.png",
    target: `:auto`,
  },
  {
    source: "terrain_texture.json",
    target: `RP/textures/terrain_texture.json`,
    onConflict: "merge",
  },
  {
    source: "en_US.lang",
    target: `RP/texts/en_US.lang`,
    onConflict: "appendEnd",
  },
];

export const SCRIPTS = ["./main.ts"];
