export const MAP = [
  {
    source: "*.block.json",
    target: `:auto`,
  },
  {
    source: "*.block.png",
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
